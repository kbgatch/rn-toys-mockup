/* Shared shop behaviour: cart drawer, search, collection and product pages.
   Client-side only. Nothing is sent to a server. */
(function () {
  "use strict";

  var RN = window.RNShop;
  var CART_KEY = "rn-cart-v1";
  var cart = loadCart();
  var lastFocus = null;
  var toastTimer = 0;

  function loadCart() {
    try {
      var raw = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      if (!Array.isArray(raw)) return [];
      return RN.cartSummary(raw).lines.map(function (line) {
        return { handle: line.handle, optionId: line.optionId, qty: line.qty };
      });
    } catch (err) {
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (err) {}
  }

  function announce(message) {
    var live = document.getElementById("cart-status");
    if (live) live.textContent = message;
  }

  function money(amount) {
    return RN.formatMoney(amount);
  }

  function params() {
    return new URLSearchParams(window.location.search);
  }

  function collectionHref(next) {
    var search = new URLSearchParams();
    search.set("handle", next.handle || "all");
    if (next.q) search.set("q", next.q);
    if (next.sort && next.sort !== "featured") search.set("sort", next.sort);
    if (next.avail && next.avail !== "all") search.set("avail", next.avail);
    if (next.type && next.type !== "all") search.set("type", next.type);
    return "collection.html?" + search.toString();
  }

  function productHref(handle) {
    return "product.html?handle=" + encodeURIComponent(handle);
  }

  function currentQty(handle, optionId) {
    var line = cart.find(function (item) {
      return item.handle === handle && item.optionId === optionId;
    });
    return line ? line.qty : 0;
  }

  function updateCount() {
    var count = RN.cartSummary(cart).count;
    document.querySelectorAll("[data-cart-count]").forEach(function (node) {
      node.textContent = String(count);
    });
    document.querySelectorAll(".cart-btn").forEach(function (button) {
      var noun = count === 1 ? "item" : "items";
      button.setAttribute("aria-label", "Open cart, " + count + " " + noun);
    });
  }

  function showToast(message) {
    var toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerHTML = "<p>" + RN.escapeHtml(message) + '</p><button type="button" data-toast-cart>View cart</button>';
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.hidden = true; }, 3400);
  }

  function cardHtml(product) {
    var badge = RN.badge(product);
    var simple = product.options.length === 1 && !product.preorder && product.options[0].stock > 0;
    var action;
    if (product.preorder) action = '<a class="btn btn-secondary btn-small" href="' + productHref(product.handle) + '">Pre-order</a>';
    else if (simple) action = '<button class="btn btn-secondary btn-small" type="button" data-add="' + product.handle + '" data-option="' + product.options[0].id + '">Add to cart</button>';
    else if (RN.stockOf(product) <= 0) action = '<a class="btn btn-secondary btn-small" href="' + productHref(product.handle) + '">Sold out</a>';
    else action = '<a class="btn btn-secondary btn-small" href="' + productHref(product.handle) + '">Choose condition</a>';
    return '<article class="pcard"><a class="pcard-link" href="' + productHref(product.handle) + '"><div class="art-wrap">' +
      RN.artMarkup(product, "front", "card", false) +
      (badge ? '<span class="badge">' + RN.escapeHtml(badge.label) + "</span>" : "") +
      '</div><p class="kicker">' + RN.escapeHtml(RN.games[product.game].name) + " · " + RN.escapeHtml(RN.kindLabel[product.kind]) + "</p><h3>" +
      RN.escapeHtml(product.title) + '</h3><p class="price"><span class="sample">Sample</span> ' + RN.escapeHtml(RN.priceLabel(product)) +
      '</p><p class="gst">NZD incl. GST</p></a><div class="pcard-actions">' + action + "</div></article>";
  }

  function renderCards(list, mount, cols) {
    if (!mount) return;
    if (cols) mount.classList.toggle("cols-4", cols === 4 && list.length >= 4);
    if (!list.length) {
      mount.innerHTML = '<div class="empty"><h2>Nothing on this shelf</h2><p>No sample listings match. Clear the filter and try the full catalogue.</p></div>';
      return;
    }
    mount.innerHTML = list.map(cardHtml).join("");
  }

  function fillCounts() {
    document.querySelectorAll("[data-count-game]").forEach(function (node) {
      var game = node.getAttribute("data-count-game");
      var count = RN.products.filter(function (product) { return product.game === game; }).length;
      node.textContent = count + " sample";
    });
    document.querySelectorAll("[data-count-kind]").forEach(function (node) {
      var kind = node.getAttribute("data-count-kind");
      var count = RN.products.filter(function (product) { return product.kind === kind; }).length;
      node.textContent = count + " sample listings";
    });
  }

  function renderHome() {
    fillCounts();
    var caseBox = document.getElementById("hero-case");
    if (caseBox) {
      var handles = ["gilded-canopy-booster-box", "sample-special-art-gold-band", "sample-vinyl-pilot"];
      caseBox.innerHTML = handles.map(function (handle, index) {
        var product = RN.findProduct(handle);
        return '<a class="hero-card" href="' + productHref(handle) + '" aria-label="' + RN.escapeHtml(product.title) + ', sample art">' +
          RN.artMarkup(product, "front", "hero" + index, false) + "</a>";
      }).join("");
    }
    renderCards(RN.products.filter(function (p) { return p.home === "sealed"; }), document.getElementById("home-sealed"), 4);
    renderCards(RN.products.filter(function (p) { return p.home === "chase"; }), document.getElementById("home-chase"), 4);
    renderCards(RN.products.filter(function (p) { return p.home === "supply"; }), document.getElementById("home-supply"), 3);
    renderCards(RN.products.filter(function (p) { return p.home === "toy"; }), document.getElementById("home-toys"), 3);
  }

  function chip(href, label, on) {
    return '<a class="chip" href="' + href + '"' + (on ? ' aria-current="true"' : "") + ">" + label + "</a>";
  }

  function option(value, label, current) {
    return '<option value="' + value + '"' + (value === current ? " selected" : "") + ">" + label + "</option>";
  }

  function toolbarHtml(state, showTypes) {
    var base = { handle: state.handle, q: state.q, sort: state.sort, avail: state.avail, type: state.type };
    var avail = [
      chip(collectionHref(Object.assign({}, base, { avail: "all" })), "All stock", state.avail === "all"),
      chip(collectionHref(Object.assign({}, base, { avail: "instock" })), "In stock", state.avail === "instock"),
      chip(collectionHref(Object.assign({}, base, { avail: "preorder" })), "Pre-order", state.avail === "preorder")
    ].join("");
    var types = "";
    if (showTypes) {
      types = '<div class="toolbar" aria-label="Product type">' + [
        ["all", "All types"], ["sealed", "Sealed"], ["single", "Singles"], ["toy", "Toys"], ["accessory", "Accessories"]
      ].map(function (kind) {
        return chip(collectionHref(Object.assign({}, base, { type: kind[0] })), kind[1], state.type === kind[0]);
      }).join("") + "</div>";
    }
    return '<div class="toolbar" aria-label="Availability">' + avail +
      '<label class="sort">Sort <span class="sr-only">the sample catalogue</span><select id="sort">' +
      option("featured", "Featured", state.sort) +
      option("price-asc", "Price, low to high", state.sort) +
      option("price-desc", "Price, high to low", state.sort) +
      option("name", "Name", state.sort) +
      "</select></label></div>" + types;
  }

  function renderCollection() {
    var query = params();
    var state = {
      handle: query.get("handle") || "all",
      q: (query.get("q") || "").trim(),
      sort: query.get("sort") || "featured",
      avail: query.get("avail") || "all",
      type: query.get("type") || "all"
    };
    var searchInput = document.getElementById("q");
    if (searchInput && state.q) searchInput.value = state.q;
    var title = document.getElementById("collection-title");
    var lede = document.getElementById("collection-lede");
    var crumb = document.getElementById("collection-crumb");
    var result = RN.queryProducts(state);
    if (!result.collection) {
      if (title) title.textContent = "That shelf isn't in the sample shop";
      if (lede) lede.textContent = "The link doesn't match a collection. The whole shelf is still here.";
      if (crumb) crumb.textContent = "Missing collection";
      document.title = "Collection not found · RN Toys Collectibles NZ";
      var gridMissing = document.getElementById("collection-grid");
      if (gridMissing) gridMissing.innerHTML = '<div class="empty"><h2>Try the full shelf</h2><p>Sample collections use handles like pokemon, sealed, singles, toys and accessories.</p><a class="btn btn-primary" href="collection.html?handle=all">Shop everything</a></div>';
      var toolbarMissing = document.getElementById("collection-toolbar");
      if (toolbarMissing) toolbarMissing.innerHTML = "";
      return;
    }
    var heading = state.q ? "Results for “" + state.q + "”" : result.collection.title;
    if (title) title.textContent = heading;
    if (lede) lede.textContent = state.q ? "Sample listings matching that search" + (result.collection.handle !== "all" ? " in " + result.collection.title : "") + ". Prices include GST." : result.collection.lede;
    if (crumb) crumb.textContent = result.collection.title;
    document.title = heading + " · RN Toys Collectibles NZ";
    var locked = { sealed: true, singles: true, toys: true, accessories: true };
    var toolbar = document.getElementById("collection-toolbar");
    if (toolbar) toolbar.innerHTML = toolbarHtml(state, !locked[result.collection.handle]);
    var count = document.getElementById("result-count");
    if (count) count.textContent = result.products.length + " " + (result.products.length === 1 ? "sample listing" : "sample listings");
    var grid = document.getElementById("collection-grid");
    if (!result.products.length && grid) {
      grid.innerHTML = '<div class="empty"><h2>Nothing matches</h2><p>No sample listings fit that filter. Clear it and the shelf comes back.</p><a class="btn btn-secondary" href="' + collectionHref({ handle: state.handle }) + '">Clear filters</a></div>';
      return;
    }
    renderCards(result.products, grid, 4);
    var sort = document.getElementById("sort");
    if (sort) {
      sort.value = state.sort;
      sort.addEventListener("change", function () {
        window.location.href = collectionHref({ handle: state.handle, q: state.q, sort: sort.value, avail: state.avail, type: state.type });
      });
    }
  }

  function specRows(product) {
    var rows = [["Catalogue", "Sample data"], ["SKU", product.sku], ["Game", RN.games[product.game].name]];
    if (product.setName) rows.push(["Set", product.setName + " (sample)"]);
    if (product.contents) rows.push(["Contains", product.contents]);
    rows.push(["Price", "NZD, GST included"]);
    return rows.map(function (row) {
      return "<dt>" + RN.escapeHtml(row[0]) + "</dt><dd>" + RN.escapeHtml(row[1]) + "</dd>";
    }).join("");
  }

  function renderProduct() {
    var product = RN.findProduct(params().get("handle") || "");
    var root = document.getElementById("product-root");
    var related = document.getElementById("related-grid");
    var relatedSection = document.querySelector(".related");
    if (!product) {
      document.title = "Listing not found · RN Toys Collectibles NZ";
      if (relatedSection) relatedSection.hidden = true;
      if (root) root.innerHTML = '<div class="empty"><h1>That listing isn\'t in the sample catalogue</h1><p>The shelf is still open.</p><a class="btn btn-primary" href="collection.html?handle=all">Back to the shelf</a></div>';
      return;
    }
    document.title = product.title + " · RN Toys Collectibles NZ";
    var game = RN.games[product.game];
    var gameHandle = product.kind === "toy" ? "toys" : product.kind === "accessory" ? "accessories" : product.game;
    var defaultOption = product.options.find(function (item) { return product.preorder || item.stock > 0; }) || product.options[0];
    var legend = product.kind === "single" ? "Condition or grade" : product.kind === "sealed" ? "Seal" : "Option";
    root.innerHTML =
      '<nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="index.html">Home</a></li><li><a href="collection.html?handle=' + gameHandle + '">' + RN.escapeHtml(game.name) + "</a></li><li>" + RN.escapeHtml(product.title) + "</li></ol></nav>" +
      '<div class="product-layout"><div class="gallery"><div class="gallery-main" id="gallery-main"></div><div class="thumbs" role="group" aria-label="Sample artwork views">' +
      '<button type="button" data-view="front" aria-pressed="true">Front</button><button type="button" data-view="detail" aria-pressed="false">Detail</button><button type="button" data-view="back" aria-pressed="false">Brand back</button></div></div>' +
      '<div class="buybox"><p class="eyebrow">' + RN.escapeHtml(game.name) + " · " + RN.escapeHtml(RN.kindLabel[product.kind]) + "</p><h1>" + RN.escapeHtml(product.title) + "</h1>" +
      '<p class="kicker"><span class="sample">Sample listing</span> SKU ' + RN.escapeHtml(product.sku) + '</p><p class="price" id="product-price"></p><p class="gst">NZD, GST included</p><p class="stock" id="product-stock"></p>' +
      '<fieldset class="options-set"><legend>' + legend + '</legend><div class="options" id="option-list"></div></fieldset>' +
      '<div class="qty-row"><span id="qty-label">Quantity</span><div class="qty"><button type="button" data-qty-step="-1" aria-label="Decrease quantity">−</button><input id="qty" type="number" inputmode="numeric" min="1" value="1" aria-labelledby="qty-label"><button type="button" data-qty-step="1" aria-label="Increase quantity">+</button></div></div>' +
      '<button class="btn btn-primary" type="button" id="add-btn">Add to cart</button><p class="add-note" id="add-note" role="status"></p><dl class="specs">' + specRows(product) + "</dl>" +
      '<div class="prose"><p>' + RN.escapeHtml(product.description) + "</p></div>" +
      "<details open><summary>Postage and pickup</summary><p>In-stock orders are packed in Auckland, usually the next working day. Tracked post or courier across New Zealand. Sample timing: North Island 1–2 working days, South Island 2–4, after dispatch. Sample postage is $7.50, and free once the order reaches $150. Auckland pickup can be arranged — the bench address is shared when you book, not published here." +
      (product.preorder ? " Pre-orders ship when the set reaches the bench." : "") + "</p></details>" +
      "<details><summary>Genuine stock</summary><p>We list cards we believe are genuine. No proxies and no counterfeits. Played cards are called Near Mint, Lightly Played or Moderately Played, and photos are available if you ask. Grades on this mockup are sample labels, not a slab from a grading company.</p></details>" +
      (product.graded ? "<p class='fine'>Grade 9 and Grade 10 in this listing are examples of how a graded copy would be priced. They are not certificates.</p>" : "") +
      "</div></div>";

    var gallery = document.getElementById("gallery-main");
    function paintArt(view) { gallery.innerHTML = RN.artMarkup(product, view, "gallery", true); }
    paintArt("front");
    root.querySelectorAll("[data-view]").forEach(function (button) {
      button.addEventListener("click", function () {
        root.querySelectorAll("[data-view]").forEach(function (other) {
          other.setAttribute("aria-pressed", other === button ? "true" : "false");
        });
        paintArt(button.getAttribute("data-view"));
      });
    });
    var optionList = document.getElementById("option-list");
    optionList.innerHTML = product.options.map(function (itemOption) {
      var state = RN.stockState(product, itemOption);
      return '<label class="option"><input type="radio" name="condition" value="' + itemOption.id + '"' + (itemOption.id === defaultOption.id ? " checked" : "") + "><span><span class=\"opt-name\">" + RN.escapeHtml(itemOption.label) + '</span><span class="opt-meta">' + RN.escapeHtml(state.label) + '</span></span><span class="opt-price">' + money(itemOption.price) + "</span></label>";
    }).join("");
    function selectedOption() {
      var picked = optionList.querySelector("input:checked");
      return product.options.find(function (itemOption) { return itemOption.id === picked.value; });
    }
    function paintBuy() {
      var itemOption = selectedOption();
      var state = RN.stockState(product, itemOption);
      document.getElementById("product-price").innerHTML = '<span class="sample">Sample</span> ' + money(itemOption.price);
      var stock = document.getElementById("product-stock");
      stock.textContent = state.label;
      stock.dataset.state = state.key;
      var cap = RN.maxQty(product, itemOption);
      var qty = document.getElementById("qty");
      qty.max = String(Math.max(cap, 1));
      if (Number(qty.value) > cap) qty.value = String(Math.max(cap, 1));
      if (cap <= 0) qty.value = "1";
      var add = document.getElementById("add-btn");
      add.disabled = cap <= 0;
      add.textContent = product.preorder ? "Pre-order" : cap <= 0 ? "Sold out" : "Add to cart";
      document.getElementById("add-note").innerHTML = cap <= 0 ? 'This condition is gone in the sample data. <a href="index.html#drops">Join the drop list</a> on the live shop.' : "";
    }
    optionList.addEventListener("change", paintBuy);
    paintBuy();
    root.querySelector("[data-qty-step='-1']").addEventListener("click", function () {
      var qty = document.getElementById("qty");
      qty.value = String(Math.max(1, (Number(qty.value) || 1) - 1));
    });
    root.querySelector("[data-qty-step='1']").addEventListener("click", function () {
      var qty = document.getElementById("qty");
      var cap = RN.maxQty(product, selectedOption());
      var room = Math.max(1, cap - currentQty(product.handle, selectedOption().id));
      qty.value = String(Math.min(room, (Number(qty.value) || 1) + 1));
    });
    document.getElementById("add-btn").addEventListener("click", function () {
      var itemOption = selectedOption();
      var cap = RN.maxQty(product, itemOption);
      if (cap <= 0) return;
      var addQty = Math.max(1, Number(document.getElementById("qty").value) || 1);
      var result = RN.setQty(cart, product.handle, itemOption.id, currentQty(product.handle, itemOption.id) + addQty);
      cart = result.cart;
      saveCart();
      updateCount();
      renderCart();
      var note = result.notice || (product.preorder ? "Pre-order added to the sample cart." : "Added to the sample cart.");
      document.getElementById("add-note").textContent = note;
      announce(note + " " + product.title + ", " + itemOption.label);
      showToast(product.preorder ? "Pre-order added" : "Added to cart");
    });
    var more = RN.products.filter(function (other) {
      return other.handle !== product.handle && (other.game === product.game || other.kind === product.kind);
    }).slice(0, 4);
    if (relatedSection && !more.length) relatedSection.hidden = true;
    renderCards(more, related, 4);
  }

  function renderCart() {
    var body = document.getElementById("cart-body");
    var foot = document.getElementById("cart-foot");
    if (!body || !foot) return;
    var summary = RN.cartSummary(cart);
    if (!summary.lines.length) {
      body.innerHTML = '<div class="empty"><h3>The cart is empty</h3><p>The shelf is not. Sample listings stay in this browser only.</p><a class="btn btn-primary" href="collection.html?handle=all" data-close-cart>Shop the shelf</a></div>';
      foot.hidden = true;
      return;
    }
    foot.hidden = false;
    body.innerHTML = summary.lines.map(function (line) {
      return '<article class="line"><a href="' + productHref(line.handle) + '" aria-hidden="true" tabindex="-1">' + RN.artMarkup(line.product, "front", "cart" + line.optionId, false) + "</a><div><h3><a href=\"" + productHref(line.handle) + '">' + RN.escapeHtml(line.product.title) + '</a></h3><p class="fine">' + RN.escapeHtml(line.option.label) + '</p><p class="price">' + money(line.lineTotal) + '</p><div class="line-actions"><div class="qty"><button type="button" data-line-qty="' + line.handle + "|" + line.optionId + '|-1" aria-label="Decrease quantity">−</button><input value="' + line.qty + '" aria-label="Quantity" readonly><button type="button" data-line-qty="' + line.handle + "|" + line.optionId + '|1" aria-label="Increase quantity">+</button></div><button class="linkish" type="button" data-remove="' + line.handle + "|" + line.optionId + '">Remove</button></div></div></article>';
    }).join("");
    var shipLabel = summary.shipping === 0 ? "Free" : money(summary.shipping);
    foot.innerHTML = '<div id="cart-review"><p class="totals"><span>Subtotal</span><strong>' + money(summary.subtotal) + '</strong></p><p class="totals"><span>Sample postage</span><strong>' + shipLabel + '</strong></p><p class="totals"><span>Total</span><strong>' + money(summary.total) + '</strong></p><p class="fine">Prices include GST. Sample postage is $7.50, and free on orders of $150 or more. Nothing here is a real charge.</p><button class="btn btn-primary" type="button" id="checkout-btn">Checkout</button></div><div id="checkout-view" hidden><h3>This is where Shopify checkout opens</h3><p>The pitch stops before payment. On the live shop this button starts checkout, with Afterpay offered there and shipping calculated for a New Zealand address. No order has been placed and no payment details were asked for.</p><button class="btn btn-secondary" type="button" id="checkout-back">Back to the cart</button></div>';
  }

  function setInert(on) {
    ["main", ".site-footer", ".site-header", ".concept-bar", ".announce"].forEach(function (selector) {
      var node = document.querySelector(selector);
      if (node) node.inert = on;
    });
  }

  function openCart() {
    closeNav();
    var root = document.getElementById("drawer-root");
    if (!root) return;
    lastFocus = document.activeElement;
    root.hidden = false;
    window.requestAnimationFrame(function () { root.classList.add("is-open"); });
    document.body.classList.add("lock");
    document.querySelectorAll(".cart-btn").forEach(function (button) { button.setAttribute("aria-expanded", "true"); });
    setInert(true);
    var closer = root.querySelector(".drawer-head [data-close-cart]");
    if (closer) closer.focus();
  }

  function closeCart() {
    var root = document.getElementById("drawer-root");
    if (!root || root.hidden) return;
    root.classList.remove("is-open");
    document.body.classList.remove("lock");
    document.querySelectorAll(".cart-btn").forEach(function (button) { button.setAttribute("aria-expanded", "false"); });
    setInert(false);
    var finish = function () {
      root.hidden = true;
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) finish();
    else window.setTimeout(finish, 280);
  }

  function openNav() {
    closeCart();
    var nav = document.getElementById("mobile-nav");
    var button = document.querySelector(".menu-btn");
    if (!nav) return;
    nav.hidden = false;
    document.body.classList.add("lock");
    if (button) button.setAttribute("aria-expanded", "true");
    var closer = nav.querySelector("[data-close-nav]");
    if (closer) closer.focus();
  }

  function closeNav() {
    var nav = document.getElementById("mobile-nav");
    var button = document.querySelector(".menu-btn");
    if (!nav || nav.hidden) return;
    nav.hidden = true;
    var drawer = document.getElementById("drawer-root");
    if (!drawer || drawer.hidden) document.body.classList.remove("lock");
    if (button) {
      button.setAttribute("aria-expanded", "false");
      if (document.activeElement && nav.contains(document.activeElement)) button.focus();
    }
  }

  function trapCart(event) {
    var root = document.getElementById("drawer-root");
    if (!root || root.hidden || event.key !== "Tab") return;
    var nodes = root.querySelectorAll("a, button, input, select, textarea");
    var list = Array.prototype.filter.call(nodes, function (node) {
      return !node.disabled && !node.hidden && node.tabIndex >= 0 && node.offsetParent !== null;
    });
    if (!list.length) return;
    var first = list[0];
    var last = list[list.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function bindSearch() {
    var form = document.getElementById("site-search");
    var input = document.getElementById("q");
    var panel = document.getElementById("search-panel");
    var toggle = document.querySelector(".search-btn");
    if (!form || !input || !panel) return;
    if (toggle) toggle.addEventListener("click", function () {
      var open = form.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) input.focus();
    });
    input.addEventListener("input", function () {
      var q = input.value.trim();
      if (q.length < 1) { panel.hidden = true; panel.innerHTML = ""; return; }
      var hits = RN.searchProducts(q).slice(0, 6);
      panel.hidden = false;
      if (!hits.length) {
        panel.innerHTML = '<p class="fine" style="padding:.7rem .8rem">No sample listings match “' + RN.escapeHtml(q) + "”.</p>";
        return;
      }
      panel.innerHTML = hits.map(function (product) {
        return '<a href="' + productHref(product.handle) + '"><strong>' + RN.escapeHtml(product.title) + "</strong><small>" + RN.escapeHtml(RN.games[product.game].name) + " · " + RN.escapeHtml(RN.priceLabel(product)) + " sample</small></a>";
      }).join("") + '<a href="collection.html?q=' + encodeURIComponent(q) + '"><strong>See all sample results</strong></a>';
    });
    document.addEventListener("click", function (event) {
      if (!form.contains(event.target) && (!toggle || !toggle.contains(event.target))) panel.hidden = true;
    });
    input.addEventListener("keydown", function (event) { if (event.key === "Escape") panel.hidden = true; });
  }

  function bindMockForm(form, successText) {
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var error = form.querySelector(".form-error");
      var ok = form.querySelector(".form-ok");
      var email = form.querySelector('input[type="email"]');
      var problem = "";
      form.querySelectorAll("[required]").forEach(function (field) {
        if (problem || field.type === "email") return;
        if (!String(field.value || "").trim()) problem = "Add the missing details and try again.";
      });
      var emailValue = email ? email.value.trim() : "";
      if (!problem && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) problem = "Enter an email address, like you@example.co.nz.";
      if (problem) {
        if (ok) ok.hidden = true;
        if (error) error.textContent = problem;
        return;
      }
      form.reset();
      if (error) error.textContent = "";
      if (ok) { ok.hidden = false; ok.textContent = successText; }
    });
  }

  function markNav() {
    var page = document.body.getAttribute("data-page");
    document.querySelectorAll("[data-nav]").forEach(function (link) {
      var key = link.getAttribute("data-nav");
      if (key === page || ((page === "product" || page === "collection") && key === "shop")) link.setAttribute("aria-current", "page");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    markNav();
    updateCount();
    renderCart();
    bindSearch();
    var page = document.body.getAttribute("data-page");
    if (page === "home") renderHome();
    if (page === "collection") renderCollection();
    if (page === "product") renderProduct();
    else fillCounts();
    document.body.addEventListener("click", function (event) {
      var add = event.target.closest("[data-add]");
      if (add) {
        var handle = add.getAttribute("data-add");
        var optionId = add.getAttribute("data-option");
        var result = RN.setQty(cart, handle, optionId, currentQty(handle, optionId) + 1);
        cart = result.cart;
        saveCart();
        updateCount();
        renderCart();
        var product = RN.findProduct(handle);
        announce((result.notice || "Added to the sample cart.") + " " + (product ? product.title : ""));
        showToast(result.notice || "Added to cart");
      }
      if (event.target.closest("[data-toast-cart]") || event.target.closest(".cart-btn")) {
        var toast = document.getElementById("toast");
        if (toast) toast.hidden = true;
        openCart();
      }
      if (event.target.closest("[data-close-cart]")) closeCart();
      if (event.target.closest(".menu-btn")) openNav();
      if (event.target.closest("[data-close-nav]")) closeNav();
      var step = event.target.closest("[data-line-qty]");
      if (step) {
        var parts = step.getAttribute("data-line-qty").split("|");
        var resultLine = RN.setQty(cart, parts[0], parts[1], currentQty(parts[0], parts[1]) + Number(parts[2]));
        cart = resultLine.cart;
        saveCart();
        updateCount();
        renderCart();
        if (resultLine.notice) announce(resultLine.notice);
      }
      var remove = event.target.closest("[data-remove]");
      if (remove) {
        var bits = remove.getAttribute("data-remove").split("|");
        cart = RN.setQty(cart, bits[0], bits[1], 0).cart;
        saveCart();
        updateCount();
        renderCart();
        announce("Removed from the sample cart.");
      }
      if (event.target.closest("#checkout-btn")) {
        document.getElementById("cart-review").hidden = true;
        document.getElementById("checkout-view").hidden = false;
      }
      if (event.target.closest("#checkout-back")) {
        document.getElementById("checkout-view").hidden = true;
        document.getElementById("cart-review").hidden = false;
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeCart();
        closeNav();
        document.querySelectorAll(".nav-drop[open]").forEach(function (menu) { menu.open = false; });
        var panel = document.getElementById("search-panel");
        if (panel) panel.hidden = true;
      }
      trapCart(event);
    });
    document.addEventListener("click", function (event) {
      document.querySelectorAll(".nav-drop[open]").forEach(function (menu) {
        if (!menu.contains(event.target)) menu.open = false;
      });
    });
    bindMockForm(document.getElementById("drop-form"), "Thanks — this mockup did not store or send that email. On the live shop it joins the new-set list.");
    bindMockForm(document.getElementById("contact-form"), "Message not sent. This is a pitch mockup, so nothing left this browser. On Shopify the note would land in the shop inbox.");
  });
})();
