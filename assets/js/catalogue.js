/* Sample catalogue for the RN Toys Collectibles NZ pitch.
   Prices, names, stock and artwork are placeholders, not a live shop. */
(function (root) {
  "use strict";
  var games = {
    pokemon: { name: "Pokémon", short: "PKM" },
    magic: { name: "Magic: The Gathering", short: "MTG" },
    yugioh: { name: "Yu-Gi-Oh!", short: "YGO" },
    onepiece: { name: "One Piece", short: "OPC" },
    lorcana: { name: "Lorcana", short: "LOR" },
    toys: { name: "Toys", short: "TOY" },
    accessory: { name: "Accessories", short: "ACC" }
  };
  var kindLabel = { sealed: "Sealed", single: "Single", accessory: "Accessory", toy: "Toy" };
  var palettes = {
    canopy: ["#1C3D34", "#F0C14D", "#F6EFE2"],
    saltwind: ["#1A3650", "#E7C56A", "#E7EEF4"],
    shrine: ["#2C2444", "#F4F1FA", "#E4D8F6"],
    tide: ["#0E3A4A", "#F08A5A", "#E5F6F8"],
    glimmer: ["#3A2A4A", "#F2C14E", "#F8EAF6"],
    supply: ["#243044", "#F4F0E8", "#F7F4EE"],
    signal: ["#7A241C", "#F4D35E", "#F8EFE6"]
  };
  var closer = " This is sample copy for the pitch. Names, art and the price are placeholders. The figure is NZD and already includes GST.";
  function item(p) {
    var options = p.options || [{
      id: p.kind === "sealed" ? "sealed" : "new",
      label: p.kind === "sealed" ? "Factory sealed" : "New",
      price: p.price,
      stock: p.stock
    }];
    return {
      handle: p.handle, title: p.title, game: p.game, kind: p.kind, setName: p.setName || "",
      blurb: p.blurb, description: p.description + closer, contents: p.contents || "", sku: p.sku,
      motif: p.motif, palette: p.palette, featured: !!p.featured, chase: !!p.chase,
      preorder: !!p.preorder, graded: !!p.graded, home: p.home || "", options: options
    };
  }
  var products = [
    item({ handle: "gilded-canopy-booster-box", sku: "RN-001", title: "Gilded Canopy Booster Box", game: "pokemon", kind: "sealed", setName: "Gilded Canopy", price: 239, stock: 8, motif: "canopy", palette: "canopy", featured: true, home: "sealed", contents: "36 booster packs (sample)", blurb: "A sample Pokémon booster box. Gilded Canopy is a fictional set for this pitch.", description: "Factory-sealed sample box in the shape of a Pokémon booster box: 36 packs, still shut, ready for a release-week night." }),
    item({ handle: "gilded-canopy-trainer-box", sku: "RN-002", title: "Gilded Canopy Trainer Box", game: "pokemon", kind: "sealed", setName: "Gilded Canopy", price: 89.95, stock: 14, motif: "canopy", palette: "canopy", featured: true, contents: "8 booster packs plus sample dice and sleeves", blurb: "Sample trainer box. Eight packs and the usual extras, with made-up set dressing.", description: "A sample of the trainer-box format collectors buy when they want packs and somewhere to put the hits." }),
    item({ handle: "gilded-canopy-booster-bundle", sku: "RN-003", title: "Gilded Canopy Booster Bundle", game: "pokemon", kind: "sealed", setName: "Gilded Canopy", price: 64, stock: 18, motif: "canopy", palette: "canopy", contents: "6 booster packs (sample)", blurb: "Six-pack sample bundle. An easy first listing if you don't want a whole box.", description: "A smaller sealed listing, useful on the live shop when a full box is too much for a mid-week order." }),
    item({ handle: "gilded-canopy-collection-case", sku: "RN-004", title: "Gilded Canopy Collection Case", game: "pokemon", kind: "sealed", setName: "Gilded Canopy", price: 179, stock: 0, motif: "canopy", palette: "canopy", featured: true, preorder: true, home: "sealed", contents: "Sample collection case, ships on release", blurb: "Sample pre-order. Pay now in the live shop, and we pack it when the set reaches Auckland.", description: "This listing shows how a pre-order reads: the button says pre-order, stock waits on the set landing, and the page explains that it ships from Auckland once it arrives." }),
    item({ handle: "sample-illustration-canopy-crest", sku: "RN-005", title: "Sample Illustration · Canopy Crest", game: "pokemon", kind: "single", setName: "Gilded Canopy", motif: "canopy", palette: "canopy", chase: true, home: "chase", featured: true, blurb: "Sample chase single with three played conditions. Not a real card.", description: "A stand-in for an illustration rare. Pick Near Mint, Lightly Played or Moderately Played and the sample price follows the condition.", options: [{ id: "nm", label: "Near Mint", price: 149, stock: 2 }, { id: "lp", label: "Lightly Played", price: 119, stock: 2 }, { id: "mp", label: "Moderately Played", price: 89, stock: 1 }] }),
    item({ handle: "sample-special-art-gold-band", sku: "RN-006", title: "Sample Special Art · Gold Band", game: "pokemon", kind: "single", setName: "Gilded Canopy", motif: "canopy", palette: "canopy", chase: true, graded: true, home: "chase", featured: true, blurb: "Sample chase card with raw conditions and two grade options. Grade 10 is sold out on purpose.", description: "The listing to show a buyer who cares about condition. Raw copies sit beside sample Grade 9 and Grade 10 prices. Grade 10 is sold out so the stock indicator and the disabled button are visible. Grades here are labels only — not a slab from any grading company.", options: [{ id: "nm", label: "Near Mint · raw", price: 285, stock: 2 }, { id: "lp", label: "Lightly Played · raw", price: 240, stock: 1 }, { id: "g9", label: "Grade 9", price: 640, stock: 1 }, { id: "g10", label: "Grade 10", price: 1290, stock: 0 }] }),
    item({ handle: "sample-hyper-signal-stripe", sku: "RN-007", title: "Sample Hyper Rare · Signal Stripe", game: "pokemon", kind: "single", setName: "Gilded Canopy", motif: "canopy", palette: "canopy", chase: true, blurb: "A lower sample chase price, for the hits that are exciting without being silly money.", description: "Placeholder for a hyper-style rare. Useful in the pitch as proof the singles grid isn't only three-figure cards.", options: [{ id: "nm", label: "Near Mint", price: 78, stock: 3 }, { id: "lp", label: "Lightly Played", price: 62, stock: 2 }] }),
    item({ handle: "saltwind-play-booster-box", sku: "RN-008", title: "Saltwind Play Booster Box", game: "magic", kind: "sealed", setName: "Saltwind", price: 209, stock: 5, motif: "saltwind", palette: "saltwind", featured: true, contents: "Sample play booster box", blurb: "Sample Magic box. Saltwind is not a real set.", description: "A stand-in for a Magic: The Gathering play booster box. Same template you'll use for whatever set is actually on the table." }),
    item({ handle: "saltwind-collector-booster-box", sku: "RN-009", title: "Saltwind Collector Booster Box", game: "magic", kind: "sealed", setName: "Saltwind", price: 339, stock: 2, motif: "saltwind", palette: "saltwind", featured: true, home: "sealed", contents: "Sample collector booster box", blurb: "Low stock on purpose, so the shelf can show a 'only a couple left' state.", description: "Sample collector box with only two on the shelf. On the live shop this is where a short run gets a low-stock badge instead of a vague 'available'." }),
    item({ handle: "saltwind-bundle", sku: "RN-010", title: "Saltwind Bundle", game: "magic", kind: "sealed", setName: "Saltwind", price: 84, stock: 11, motif: "saltwind", palette: "saltwind", contents: "Sample bundle with a promo placeholder", blurb: "Sample bundle for drafters who don't want a full box.", description: "A mid-price sealed Magic listing. The promo mentioned here is fictional, like the rest of the art." }),
    item({ handle: "sample-mythic-borderless", sku: "RN-011", title: "Sample Mythic · Borderless", game: "magic", kind: "single", setName: "Saltwind", motif: "saltwind", palette: "saltwind", blurb: "Sample mythic single. Condition changes the price.", description: "Placeholder for a borderless mythic. Near Mint and Lightly Played are both on the bench in this sample.", options: [{ id: "nm", label: "Near Mint", price: 68, stock: 2 }, { id: "lp", label: "Lightly Played", price: 52, stock: 1 }] }),
    item({ handle: "sample-chase-mythic-extended", sku: "RN-012", title: "Sample Chase Mythic · Extended", game: "magic", kind: "single", setName: "Saltwind", motif: "saltwind", palette: "saltwind", chase: true, home: "chase", featured: true, blurb: "The Magic chase card in the sample catalogue.", description: "A stand-in for the one mythic people message you about. Stock is thin, which is usually the truth.", options: [{ id: "nm", label: "Near Mint", price: 198, stock: 1 }, { id: "lp", label: "Lightly Played", price: 165, stock: 1 }] }),
    item({ handle: "neon-shrine-booster-box", sku: "RN-013", title: "Neon Shrine Booster Box", game: "yugioh", kind: "sealed", setName: "Neon Shrine", price: 149, stock: 7, motif: "shrine", palette: "shrine", featured: true, contents: "Sample Yu-Gi-Oh! booster box", blurb: "Sample Yu-Gi-Oh! box. Neon Shrine is a pitch name, not a published set.", description: "Factory-sealed sample box for Yu-Gi-Oh!. The live shop swaps in the real set code, the photo and the price you actually want." }),
    item({ handle: "sample-collector-prism-gate", sku: "RN-014", title: "Sample Collector Rare · Prism Gate", game: "yugioh", kind: "single", setName: "Neon Shrine", motif: "shrine", palette: "shrine", chase: true, blurb: "Sample Yu-Gi-Oh! chase single. No official card frame.", description: "Placeholder for a collector-style rare. The foil on the artwork is a CSS sheen, not scanned card art.", options: [{ id: "nm", label: "Near Mint", price: 96, stock: 1 }, { id: "lp", label: "Lightly Played", price: 74, stock: 2 }] }),
    item({ handle: "sample-prism-finish", sku: "RN-015", title: "Sample Prism Finish", game: "yugioh", kind: "single", setName: "Neon Shrine", motif: "shrine", palette: "shrine", blurb: "A cheaper sample single so the Yu-Gi-Oh! page isn't only chase cards.", description: "An everyday rare-shaped listing. Handy when the live catalogue needs pages of two-figure cards, not only trophies.", options: [{ id: "nm", label: "Near Mint", price: 54, stock: 3 }, { id: "lp", label: "Lightly Played", price: 41, stock: 2 }] }),
    item({ handle: "tide-road-booster-box", sku: "RN-016", title: "Tide Road Booster Box", game: "onepiece", kind: "sealed", setName: "Tide Road", price: 199, stock: 4, motif: "tide", palette: "tide", featured: true, home: "sealed", contents: "Sample One Piece Card Game booster box", blurb: "Sample One Piece box. Tide Road is fictional.", description: "A sealed sample for the One Piece Card Game. The waves on the art are ours. Nothing here is from the anime or an official card back." }),
    item({ handle: "sample-alt-art-tide-road", sku: "RN-017", title: "Sample Alt Art · Tide Road", game: "onepiece", kind: "single", setName: "Tide Road", motif: "tide", palette: "tide", chase: true, home: "chase", blurb: "Sample alternate-art single. The character is not depicted.", description: "Stand-in for an alt-art chase. Buyers pick a condition before it goes in the cart, so a played copy can't be added at a Near Mint price.", options: [{ id: "nm", label: "Near Mint", price: 155, stock: 1 }, { id: "lp", label: "Lightly Played", price: 128, stock: 1 }] }),
    item({ handle: "tide-road-starter", sku: "RN-018", title: "Tide Road Starter Deck", game: "onepiece", kind: "sealed", setName: "Tide Road", price: 42.95, stock: 11, motif: "tide", palette: "tide", contents: "Sample starter deck", blurb: "Sample starter. A friendly price next to the boxes.", description: "Placeholder starter deck. On Shopify this becomes whichever starter you actually have stacked under the counter." }),
    item({ handle: "glimmer-market-booster-box", sku: "RN-019", title: "Glimmer Market Booster Box", game: "lorcana", kind: "sealed", setName: "Glimmer Market", price: 219, stock: 3, motif: "glimmer", palette: "glimmer", featured: true, contents: "Sample Lorcana booster box", blurb: "Sample Lorcana box under a made-up set name.", description: "Factory-sealed sample for Lorcana. Glimmer Market is not a published set. Three boxes left in the sample data, so it reads as low stock." }),
    item({ handle: "glimmer-market-gift-set", sku: "RN-020", title: "Glimmer Market Gift Set", game: "lorcana", kind: "sealed", setName: "Glimmer Market", price: 119, stock: 6, motif: "glimmer", palette: "glimmer", contents: "Sample gift set", blurb: "A sample gift-set format, without using an official product name.", description: "Mid-size sealed Lorcana listing. The live version would carry the real set and a photo of the tin or box you have." }),
    item({ handle: "sample-full-art-glimmer", sku: "RN-021", title: "Sample Full Art · Glimmer Market", game: "lorcana", kind: "single", setName: "Glimmer Market", motif: "glimmer", palette: "glimmer", chase: true, blurb: "Sample full-art single. Abstract pattern only.", description: "Placeholder for a full-art card. The picture is geometry, not a character.", options: [{ id: "nm", label: "Near Mint", price: 172, stock: 1 }, { id: "lp", label: "Lightly Played", price: 140, stock: 1 }] }),
    item({ handle: "benchbrand-sleeves-ink", sku: "RN-022", title: "Benchbrand Matte Sleeves · Ink", game: "accessory", kind: "accessory", price: 14, stock: 40, motif: "supply", palette: "supply", home: "supply", contents: "100 matte sleeves", blurb: "House-brand sleeves for the pitch. Not a licensed sleeve company.", description: "A hundred matte sleeves in an ink navy that matches the shop mark. Benchbrand is a made-up accessories line so the mockup doesn't borrow another company's packets." }),
    item({ handle: "benchbrand-sleeves-signal", sku: "RN-023", title: "Benchbrand Matte Sleeves · Signal", game: "accessory", kind: "accessory", price: 14, stock: 28, motif: "supply", palette: "signal", contents: "100 matte sleeves", blurb: "The same sample sleeve, in the shop's signal red.", description: "Second colourway, so the accessories collection looks like a small range rather than a single packet." }),
    item({ handle: "benchbrand-zip-binder", sku: "RN-024", title: "Benchbrand 9-Pocket Zip Binder", game: "accessory", kind: "accessory", price: 56, stock: 10, motif: "supply", palette: "supply", home: "supply", contents: "360-card zip binder, 9-pocket pages", blurb: "Sample binder. Side-loading pages, a zip, and room for a master set.", description: "Placeholder for the binder you already recommend in the Facebook comments. Zip shut, 9-pocket, sized for sleeved cards." }),
    item({ handle: "benchbrand-toploaders", sku: "RN-025", title: "Benchbrand Toploaders · 25", game: "accessory", kind: "accessory", price: 9.5, stock: 35, motif: "supply", palette: "supply", home: "supply", contents: "25 standard toploaders", blurb: "The packet that should sit one click away from a chase single.", description: "Twenty-five standard toploaders. On the live shop these belong in the cart beside any card over a certain price." }),
    item({ handle: "benchbrand-magnetic-holder", sku: "RN-026", title: "Benchbrand Magnetic Holder", game: "accessory", kind: "accessory", price: 6.5, stock: 22, motif: "supply", palette: "supply", contents: "One magnetic holder", blurb: "A sample magnetic holder, under our own name.", description: "For the single someone is keeping raw but wants held flat." }),
    item({ handle: "benchbrand-deck-box", sku: "RN-027", title: "Benchbrand Deck Box", game: "accessory", kind: "accessory", price: 24, stock: 15, motif: "supply", palette: "signal", contents: "Holds a double-sleeved deck (sample)", blurb: "Sample deck box in signal red, with the RN mark.", description: "A sturdy sample box for a double-sleeved deck. The live product can be whichever box you actually like selling." }),
    item({ handle: "sample-vinyl-pilot", sku: "RN-028", title: "Sample Vinyl Figure · Pilot", game: "toys", kind: "toy", price: 48, stock: 4, motif: "toy", palette: "signal", home: "toy", contents: "One unbranded vinyl figure (sample)", blurb: "A generic pilot figure so the toys range is visible. No licensed character.", description: "The shop name says toys as well as cards. This is a placeholder figure — original silhouette, not a character anyone owns." }),
    item({ handle: "sample-diecast-harbour-ute", sku: "RN-029", title: "Sample Die-cast · Harbour Ute", game: "toys", kind: "toy", price: 36, stock: 6, motif: "toy", palette: "tide", home: "toy", contents: "One unbranded die-cast (sample)", blurb: "A small NZ-flavoured die-cast. Not a real vehicle brand.", description: "An Auckland-ish ute, drawn as a generic die-cast. It shows the catalogue can hold toys without turning the card shop into a second website." }),
    item({ handle: "sample-blind-box-series-01", sku: "RN-030", title: "Sample Blind Box · Series 01", game: "toys", kind: "toy", price: 22, stock: 18, motif: "toy", palette: "glimmer", home: "toy", contents: "One blind capsule (sample)", blurb: "Sample blind box. The figure inside is not revealed, and not licensed.", description: "A capsule-toy listing at an impulse price. Series 01 is fictional." })
  ];
  var collections = {
    all: { title: "The whole shelf", lede: "Cards, toys and supplies from the sample catalogue. Every price is in NZD and includes GST.", test: function () { return true; } },
    pokemon: { title: "Pokémon", lede: "Sample Pokémon sealed and singles. The set name Gilded Canopy is fictional, so the pitch doesn't borrow official art.", test: function (p) { return p.game === "pokemon"; } },
    magic: { title: "Magic: The Gathering", lede: "Sample Magic boxes, a bundle and singles. Saltwind is not a published set.", test: function (p) { return p.game === "magic"; } },
    yugioh: { title: "Yu-Gi-Oh!", lede: "Sample Yu-Gi-Oh! stock. Neon Shrine is a stand-in name for whatever set is actually on the bench.", test: function (p) { return p.game === "yugioh"; } },
    onepiece: { title: "One Piece Card Game", lede: "Sample One Piece Card Game listings under the fictional Tide Road name.", test: function (p) { return p.game === "onepiece"; } },
    lorcana: { title: "Lorcana", lede: "Sample Lorcana sealed and one full-art single. Glimmer Market is made up for the mockup.", test: function (p) { return p.game === "lorcana"; } },
    sealed: { title: "Sealed product", lede: "Booster boxes, bundles, starters and a collection case. One of them is a pre-order, so a new-set drop has a shape.", test: function (p) { return p.kind === "sealed"; } },
    singles: { title: "Singles on the bench", lede: "Sample chase cards and everyday singles. Choose a condition or grade and the price moves with it.", test: function (p) { return p.kind === "single"; } },
    toys: { title: "Toys and other collectibles", lede: "A short sample beyond cards, so RN Toys Collectibles NZ can hold both. No licensed characters.", test: function (p) { return p.kind === "toy"; } },
    accessories: { title: "Sleeves, binders and the rest", lede: "Benchbrand is a made-up house line. Sleeves, a binder, toploaders, a magnetic holder and a deck box.", test: function (p) { return p.kind === "accessory"; } }
  };
  var aliases = { ygo: "yugioh", accessory: "accessories" };
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function formatMoney(amount) {
    return new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(amount);
  }
  function findProduct(handle) {
    return products.find(function (p) { return p.handle === handle; }) || null;
  }
  function getCollection(handle) {
    var key = aliases[handle] || handle || "all";
    if (!collections[key]) return null;
    return { handle: key, title: collections[key].title, lede: collections[key].lede, test: collections[key].test };
  }
  function stockOf(product) {
    return product.options.reduce(function (sum, option) { return sum + option.stock; }, 0);
  }
  function activeOptions(product) {
    if (product.preorder) return product.options;
    var live = product.options.filter(function (option) { return option.stock > 0; });
    return live.length ? live : product.options;
  }
  function priceLabel(product) {
    var pool = activeOptions(product);
    var min = Math.min.apply(null, pool.map(function (option) { return option.price; }));
    var varies = new Set(product.options.map(function (option) { return option.price; })).size > 1;
    return (varies ? "From " : "") + formatMoney(min);
  }
  function stockState(product, option) {
    if (product.preorder) return { key: "preorder", label: "Pre-order · ships when it reaches Auckland" };
    if (!option || option.stock <= 0) return { key: "out", label: "Sold out" };
    if (option.stock <= 2) return { key: "low", label: "Low stock · " + option.stock + " left" };
    return { key: "in", label: "In stock · " + option.stock + " on the shelf" };
  }
  function badge(product) {
    if (product.preorder) return { key: "pre", label: "Pre-order" };
    var stock = stockOf(product);
    if (stock <= 0) return { key: "out", label: "Sold out" };
    if (product.kind === "sealed" && stock <= 3) return { key: "low", label: "Low stock" };
    if (product.kind === "single" && product.options.some(function (o) { return o.stock > 0 && o.stock <= 2; })) return { key: "low", label: "Low stock" };
    if (product.chase) return { key: "chase", label: "On the bench" };
    return null;
  }
  function maxQty(product, option) {
    if (product.preorder) return 4;
    return option ? option.stock : 0;
  }
  function searchProducts(query) {
    var needle = String(query || "").trim().toLowerCase();
    if (!needle) return products.slice();
    return products.filter(function (product) {
      var hay = [product.title, product.setName, product.blurb, product.kind, product.sku, games[product.game].name, kindLabel[product.kind]].join(" ").toLowerCase();
      return hay.indexOf(needle) !== -1;
    });
  }
  function minPrice(product) {
    return Math.min.apply(null, activeOptions(product).map(function (option) { return option.price; }));
  }
  function compareProducts(sort) {
    if (sort === "price-asc") return function (a, b) { return minPrice(a) - minPrice(b); };
    if (sort === "price-desc") return function (a, b) { return minPrice(b) - minPrice(a); };
    if (sort === "name") return function (a, b) { return a.title.localeCompare(b.title, "en-NZ"); };
    return function (a, b) {
      return Number(b.featured) - Number(a.featured) || Number(b.chase) - Number(a.chase) || a.title.localeCompare(b.title, "en-NZ");
    };
  }
  function queryProducts(params) {
    var collection = getCollection(params.handle || "all");
    if (!collection) return { collection: null, products: [] };
    var list = products.filter(collection.test);
    if (params.q) {
      var allowed = {};
      searchProducts(params.q).forEach(function (product) { allowed[product.handle] = true; });
      list = list.filter(function (product) { return allowed[product.handle]; });
    }
    if (params.type && params.type !== "all") list = list.filter(function (product) { return product.kind === params.type; });
    if (params.avail === "instock") list = list.filter(function (product) { return !product.preorder && product.options.some(function (option) { return option.stock > 0; }); });
    else if (params.avail === "preorder") list = list.filter(function (product) { return product.preorder; });
    list.sort(compareProducts(params.sort || "featured"));
    return { collection: collection, products: list };
  }
  function setQty(cart, handle, optionId, qty) {
    var product = findProduct(handle);
    var option = product && product.options.find(function (itemOption) { return itemOption.id === optionId; });
    if (!product || !option) return { cart: cart, notice: "That listing isn't in the sample catalogue." };
    var cap = maxQty(product, option);
    if (cap <= 0) return { cart: cart, notice: "Sold out in the sample catalogue." };
    var safe = Math.max(0, Math.min(Number(qty) || 0, cap));
    var next = cart.filter(function (line) { return !(line.handle === handle && line.optionId === optionId); });
    if (safe > 0) next.push({ handle: handle, optionId: optionId, qty: safe });
    return { cart: next, notice: qty > cap ? "Only " + cap + " available on this sample listing." : "" };
  }
  function cartSummary(cart) {
    var lines = [];
    var subtotal = 0;
    var count = 0;
    (cart || []).forEach(function (line) {
      var product = findProduct(line.handle);
      var option = product && product.options.find(function (itemOption) { return itemOption.id === line.optionId; });
      if (!product || !option) return;
      var cap = maxQty(product, option);
      var qty = Math.max(0, Math.min(line.qty, cap));
      if (qty <= 0) return;
      var lineTotal = Math.round(option.price * qty * 100) / 100;
      subtotal += lineTotal;
      count += qty;
      lines.push({ handle: product.handle, optionId: option.id, qty: qty, product: product, option: option, lineTotal: lineTotal });
    });
    subtotal = Math.round(subtotal * 100) / 100;
    var shipping = subtotal <= 0 ? 0 : subtotal >= 150 ? 0 : 7.5;
    return { lines: lines, subtotal: subtotal, count: count, shipping: shipping, total: Math.round((subtotal + shipping) * 100) / 100 };
  }
  function markShapes() {
    return '<rect width="32" height="32" rx="8" fill="#B42318"/>' +
      '<path d="M12 6.8 16 4.2 20 6.8" fill="none" stroke="#E8B84A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="9.3" cy="11.3" r="3.35" fill="#FFF6EA"/>' +
      '<circle cx="22.7" cy="11.3" r="3.35" fill="#FFF6EA"/>' +
      '<circle cx="16" cy="19" r="7.5" fill="#FFF6EA"/>' +
      '<circle cx="9.3" cy="10.6" r="1.45" fill="#1F4E89"/>' +
      '<circle cx="22.7" cy="10.6" r="1.45" fill="#1F4E89"/>' +
      '<circle cx="13.2" cy="17.9" r="1.3" fill="#142033"/>' +
      '<circle cx="18.8" cy="17.9" r="1.3" fill="#142033"/>' +
      '<ellipse cx="16" cy="21.15" rx="2.5" ry="1.65" fill="#F0D2B0"/>' +
      '<ellipse cx="16" cy="20.75" rx="0.8" ry="0.55" fill="#E8B84A"/>';
  }
  function chevron(x, y, fill) {
    return '<path fill="' + fill + '" d="M' + x + ' ' + (y + 6) + 'l8-7 8 7h-3.4l-4.6-4-4.6 4z"/>';
  }
  function motifMarkup(motif, accent, paper) {
    if (motif === "canopy") {
      return '<path d="M120 64c8 26 6 40-2 52 22-8 40-6 58 6-20-4-32 6-36 22 18-12 38-12 58-2-16 10-24 26-22 46H62c6-22 0-40-16-52 16-6 34-8 52-2-2-16-14-28-32-24 8-8 14-20 16-46z" fill="' + paper + '" opacity=".22"/>' +
        '<path d="M120 86c-8 24-30 40-54 46 22 2 38 16 46 36 8-30 26-48 54-54-24-8-38-22-46-28z" fill="' + accent + '"/>' +
        '<path d="M74 156c10-26 28-40 46-44-2 22 2 38 12 52-20 4-38 0-58-8z" fill="' + paper + '" opacity=".82"/>' +
        '<path d="M166 156c-10-26-28-40-46-44 2 22-2 38-12 52 20 4 38 0 58-8z" fill="' + paper + '" opacity=".5"/>' +
        '<rect x="38" y="164" width="164" height="16" rx="8" fill="' + accent + '"/>' +
        '<rect x="38" y="169" width="164" height="5" rx="2.5" fill="' + paper + '" opacity=".6"/>' +
        '<rect x="110" y="180" width="20" height="30" rx="4" fill="' + paper + '" opacity=".78"/>';
    }
    if (motif === "saltwind") {
      return '<path d="M32 92c30-18 46 12 74-6" fill="none" stroke="' + paper + '" stroke-width="4" stroke-linecap="round" opacity=".75"/>' +
        '<path d="M154 80c26-16 42 10 58-4" fill="none" stroke="' + accent + '" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M118 70v132" stroke="' + paper + '" stroke-width="6" stroke-linecap="round"/>' +
        '<path d="M118 76l64 90H118z" fill="' + paper + '" opacity=".9"/>' +
        '<path d="M118 96L60 162h58z" fill="' + accent + '"/>' +
        '<path d="M52 186h136l-12 16H66z" fill="' + paper + '" opacity=".38"/>' +
        '<g transform="translate(56 132)"><circle r="20" fill="#101820" stroke="' + accent + '" stroke-width="3"/><path d="M0-15 6 0 0 15-6 0z" fill="' + accent + '"/><path d="M-15 0 0-6 15 0 0 6z" fill="' + paper + '"/></g>';
    }
    if (motif === "shrine") {
      return '<rect x="54" y="70" width="132" height="10" rx="2" fill="' + paper + '"/>' +
        '<rect x="42" y="84" width="156" height="14" rx="2" fill="' + accent + '"/>' +
        '<rect x="60" y="98" width="16" height="112" rx="2" fill="' + paper + '"/>' +
        '<rect x="164" y="98" width="16" height="112" rx="2" fill="' + paper + '"/>' +
        '<path d="M78 210h84" stroke="' + accent + '" stroke-width="6" stroke-linecap="round"/>' +
        '<path d="M120 112l30 38-30 42-30-42z" fill="' + accent + '"/>' +
        '<path d="M120 112l30 38H120z" fill="' + paper + '" opacity=".5"/>' +
        '<path d="M120 192l-30-42h30z" fill="#fff" opacity=".2"/>';
    }
    if (motif === "tide") {
      return '<g fill="' + accent + '"><rect x="116" y="70" width="8" height="18" rx="2"/><rect x="116" y="140" width="8" height="18" rx="2"/><rect x="78" y="106" width="18" height="8" rx="2"/><rect x="144" y="106" width="18" height="8" rx="2"/>' +
        '<rect x="92" y="84" width="16" height="8" rx="2" transform="rotate(-40 100 88)"/><rect x="136" y="84" width="16" height="8" rx="2" transform="rotate(40 144 88)"/><rect x="92" y="136" width="16" height="8" rx="2" transform="rotate(40 100 140)"/><rect x="136" y="136" width="16" height="8" rx="2" transform="rotate(-40 144 140)"/></g>' +
        '<circle cx="120" cy="114" r="20" fill="' + accent + '"/><circle cx="120" cy="114" r="8" fill="' + paper + '" opacity=".45"/>' +
        '<path d="M20 176c22 18 36-14 58 2s36 18 58 2 36-16 58 2 22 10 28 2v30H20z" fill="' + paper + '" opacity=".28"/>' +
        '<path d="M20 198c24 16 38-14 62 2s38 16 62 2 36-14 58 2v28H20z" fill="' + accent + '" opacity=".9"/>' +
        '<path d="M20 218c26 12 40-10 64 2s40 12 64 0 34-10 52 2v16H20z" fill="' + paper + '" opacity=".62"/>';
    }
    if (motif === "glimmer") {
      return '<path d="M46 150c20-34 10-46 28-70 8 30 22 36 42 28-10 18-2 34 14 48-26 2-34 16-30 36-16-16-34-14-48 0 2-20-8-30-24-34 18-6 20-12 18-8z" fill="' + paper + '" opacity=".16"/>' +
        '<path d="M120 72l24 44 48 8-36 32 10 48-46-26-46 26 10-48-36-32 48-8z" fill="' + accent + '"/>' +
        '<path d="M120 96l14 24 26 4-20 16 6 26-26-14-26 14 6-26-20-16 26-4z" fill="' + paper + '"/>' +
        '<path d="M176 178l6 12 12 2-9 8 3 12-12-7-12 7 3-12-9-8 12-2z" fill="' + paper + '" opacity=".85"/>' +
        '<path d="M62 176l4 8 8 1-6 5 2 8-8-4-8 4 2-8-6-5 8-1z" fill="' + accent + '"/>';
    }
    if (motif === "toy") {
      return chevron(104, 70, "#F0C14D") +
        '<circle cx="96" cy="96" r="14" fill="#7A4A28"/><circle cx="144" cy="96" r="14" fill="#7A4A28"/>' +
        '<circle cx="92" cy="94" r="6" fill="#C4895A"/><circle cx="148" cy="94" r="6" fill="#C4895A"/>' +
        '<circle cx="120" cy="118" r="30" fill="#A56B3C"/>' +
        '<ellipse cx="120" cy="128" rx="13" ry="9" fill="#F6E4D0"/>' +
        '<circle cx="110" cy="114" r="3.4" fill="#24160E"/><circle cx="130" cy="114" r="3.4" fill="#24160E"/>' +
        '<ellipse cx="120" cy="124" rx="3.2" ry="2.2" fill="#5A341C"/>' +
        '<rect x="86" y="148" width="68" height="56" rx="16" fill="' + paper + '"/>' +
        '<rect x="100" y="158" width="40" height="26" rx="6" fill="' + accent + '"/>' +
        '<rect x="76" y="160" width="16" height="26" rx="6" fill="' + accent + '"/>' +
        '<rect x="148" y="160" width="16" height="26" rx="6" fill="' + accent + '"/>';
    }
    return '<rect x="62" y="86" width="34" height="52" rx="4" fill="' + paper + '" transform="rotate(-8 79 112)"/>' +
      '<rect x="102" y="78" width="36" height="58" rx="4" fill="' + accent + '"/>' +
      '<rect x="142" y="90" width="34" height="50" rx="4" fill="' + paper + '" opacity=".85" transform="rotate(7 159 115)"/>' +
      '<rect x="62" y="150" width="34" height="52" rx="4" fill="' + accent + '" opacity=".8"/>' +
      '<rect x="104" y="146" width="36" height="56" rx="4" fill="' + paper + '"/>' +
      '<rect x="146" y="154" width="34" height="50" rx="4" fill="' + accent + '"/>';
  }
  function facePlate(product, accent, paper) {
    var parts = String(product.title).split("·");
    var name = parts.length > 1 ? parts[parts.length - 1].trim() : (product.setName || product.title);
    var size = name.length > 18 ? 12 : 15;
    var sub = (product.setName || games[product.game].name) + " · SAMPLE";
    return '<rect x="24" y="228" width="192" height="70" rx="8" fill="rgba(8,12,18,.55)"/>' +
      '<text x="36" y="254" fill="' + paper + '" font-family="Outfit, Arial, sans-serif" font-size="' + size + '" font-weight="700">' + escapeHtml(name) + '</text>' +
      '<text x="36" y="274" fill="' + accent + '" font-family="Outfit, Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="1.1">' + escapeHtml(sub) + '</text>' +
      '<text x="36" y="290" fill="' + paper + '" font-family="Outfit, Arial, sans-serif" font-size="7" letter-spacing="0.4" opacity="0.8">PLACEHOLDER · NOT A PUBLISHED CARD</text>';
  }
  function goldBand(accent, paper) {
    return '<rect x="20" y="64" width="200" height="16" fill="#C4922E"/>' +
      '<rect x="20" y="64" width="200" height="4" fill="#F8E7B0"/>' +
      '<rect x="20" y="108" width="200" height="28" fill="' + accent + '"/>' +
      '<rect x="20" y="108" width="200" height="6" fill="#F8E7B0" opacity="0.9"/>' +
      '<rect x="20" y="168" width="200" height="14" fill="#C4922E"/>' +
      '<rect x="20" y="168" width="200" height="4" fill="#F8E7B0"/>' +
      '<circle cx="120" cy="122" r="22" fill="#101820" stroke="' + paper + '" stroke-width="4"/>' +
      '<circle cx="120" cy="122" r="8" fill="' + accent + '"/>';
  }
  function signalStripe(accent, paper) {
    return '<g transform="rotate(-28 120 132)">' +
      '<rect x="-10" y="78" width="260" height="14" fill="#B42318"/>' +
      '<rect x="-10" y="98" width="260" height="8" fill="' + paper + '"/>' +
      '<rect x="-10" y="112" width="260" height="24" fill="' + accent + '"/>' +
      '<rect x="-10" y="142" width="260" height="8" fill="' + paper + '" opacity="0.85"/>' +
      '<rect x="-10" y="156" width="260" height="12" fill="#B42318"/>' +
      '</g>';
  }
  function openWaves(accent, paper) {
    var out = '<circle cx="158" cy="74" r="16" fill="' + accent + '"/><circle cx="164" cy="70" r="7" fill="' + paper + '"/>';
    var i;
    for (i = 0; i < 6; i += 1) {
      var y = 86 + i * 18;
      out += '<path d="M16 ' + y + 'c26 12 42 12 68 0s42-12 68 0 38 12 72 0" fill="none" stroke="' + (i % 2 ? accent : paper) + '" stroke-width="5" stroke-linecap="round"/>';
    }
    return out;
  }
  function prismField(accent, paper) {
    var out = "";
    var r;
    var c;
    for (r = 0; r < 4; r += 1) {
      for (c = 0; c < 4; c += 1) {
        var cx = 52 + c * 40;
        var cy = 72 + r * 34;
        out += '<path d="M' + cx + ' ' + (cy - 12) + ' l16 14 -16 14 -16 -14 z" fill="' + ((r + c) % 2 ? accent : paper) + '"/>';
      }
    }
    return out;
  }
  function singleMotif(product, accent, paper) {
    var handle = product.handle;
    if (handle.indexOf("gold-band") !== -1) return goldBand(accent, paper);
    if (handle.indexOf("signal-stripe") !== -1) return signalStripe(accent, paper);
    if (handle.indexOf("borderless") !== -1) return openWaves(accent, paper);
    if (handle.indexOf("prism-finish") !== -1) return prismField(accent, paper);
    return motifMarkup(product.motif, accent, paper);
  }
  function singleScene(product, id, bg, accent, paper, detail) {
    var holo = true;
    var foilOpacity = product.chase || product.graded ? 0.38 : 0.22;
    var motif = singleMotif(product, accent, paper);
    if (detail) motif = '<g transform="translate(120 136) scale(1.28) translate(-120 -136)">' + motif + "</g>";
    var foil = holo
      ? '<linearGradient id="holo-' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7ad7ff" stop-opacity="0"/><stop offset=".32" stop-color="#7ad7ff" stop-opacity=".7"/><stop offset=".5" stop-color="#f0c14d" stop-opacity=".8"/><stop offset=".68" stop-color="#ff7eb6" stop-opacity=".55"/><stop offset="1" stop-color="#b8ffcf" stop-opacity="0"/></linearGradient>' +
        '<pattern id="foil-' + id + '" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(32)"><path d="M0 12L12 0" stroke="#fff" stroke-opacity=".45" stroke-width="2"/></pattern>'
      : "";
    var shine = holo
      ? '<rect x="28" y="48" width="184" height="168" rx="8" fill="url(#holo-' + id + ')" opacity="' + foilOpacity + '" style="mix-blend-mode:screen"/><rect x="28" y="48" width="184" height="168" rx="8" fill="url(#foil-' + id + ')" opacity="' + foilOpacity + '" style="mix-blend-mode:soft-light"/>'
      : "";
    return '<defs><linearGradient id="bg-' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + bg + '"/><stop offset="1" stop-color="#101820"/></linearGradient>' + foil + '</defs>' +
      '<rect width="240" height="336" rx="16" fill="' + paper + '"/>' +
      '<rect x="8" y="8" width="224" height="320" rx="12" fill="url(#bg-' + id + ')"/>' +
      '<rect x="16" y="16" width="208" height="304" rx="10" fill="none" stroke="' + accent + '" stroke-width="3"/>' +
      '<rect x="24" y="24" width="192" height="288" rx="8" fill="none" stroke="' + paper + '" stroke-opacity=".45" stroke-width="1.2"/>' +
      '<g transform="translate(186 20) scale(0.72)">' + markShapes() + '</g>' +
      '<rect x="28" y="48" width="184" height="168" rx="8" fill="#0c1218"/>' +
      '<clipPath id="win-' + id + '"><rect x="28" y="48" width="184" height="168" rx="8"/></clipPath>' +
      '<g clip-path="url(#win-' + id + ')">' + motif + shine + "</g>" +
      '<rect x="28" y="48" width="184" height="168" rx="8" fill="none" stroke="' + accent + '" stroke-opacity=".8"/>' +
      facePlate(product, accent, paper) +
      '<text x="120" y="318" text-anchor="middle" fill="' + paper + '" font-family="Outfit, Arial, sans-serif" font-size="6.5" letter-spacing="1.35" opacity="0.8">SAMPLE · RN TOYS · SAMPLE · RN TOYS · SAMPLE</text>';
  }
  function sealedScene(product, id, bg, accent, paper, detail) {
    var icon = '<g transform="translate(120 150) scale(0.42) translate(-120 -150)">' + motifMarkup(product.motif, accent, paper) + "</g>";
    var scene = '<defs><linearGradient id="box-' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + bg + '"/><stop offset="1" stop-color="#101820"/></linearGradient></defs>' +
      '<rect width="240" height="336" rx="16" fill="#141b24"/>' +
      '<path d="M46 86h148l18 22v154l-18 20H46l-18-20V108z" fill="url(#box-' + id + ')"/>' +
      '<path d="M194 86l18 22v154l-18 20V86z" fill="#070b10" opacity=".45"/>' +
      '<path d="M28 108l18-22h148l18 22H28z" fill="' + accent + '"/>' +
      '<rect x="48" y="112" width="136" height="104" rx="8" fill="#0e141c"/>' +
      icon +
      '<rect x="44" y="196" width="144" height="18" rx="3" fill="' + accent + '"/>' +
      '<text x="116" y="209" text-anchor="middle" fill="#1a1208" font-family="Outfit, Arial, sans-serif" font-size="11" font-weight="700">SEALED SAMPLE</text>' +
      '<text x="120" y="248" text-anchor="middle" fill="' + paper + '" font-family="Outfit, Arial, sans-serif" font-size="14" font-weight="700">' + escapeHtml(product.setName || "RN Toys") + '</text>' +
      '<text x="120" y="268" text-anchor="middle" fill="' + accent + '" font-family="Outfit, Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="1.2">' + escapeHtml(games[product.game].short) + "</text>";
    if (!detail) return scene;
    return '<g transform="translate(120 175) scale(1.18) translate(-120 -175)">' + scene + "</g>";
  }
  function supplyScene(product, accent, paper, bg) {
    var handle = product.handle;
    var graphic;
    if (handle.indexOf("binder") !== -1) {
      graphic = '<rect x="58" y="78" width="124" height="156" rx="8" fill="' + bg + '"/><rect x="58" y="78" width="20" height="156" fill="' + accent + '"/><circle cx="68" cy="118" r="4" fill="' + paper + '"/><circle cx="68" cy="146" r="4" fill="' + paper + '"/><circle cx="68" cy="174" r="4" fill="' + paper + '"/><rect x="90" y="98" width="76" height="116" rx="4" fill="none" stroke="' + paper + '" stroke-opacity=".7"/>';
    } else if (handle.indexOf("toploader") !== -1) {
      graphic = '<rect x="62" y="74" width="108" height="150" rx="4" fill="' + paper + '" opacity=".12" stroke="' + paper + '"/><rect x="74" y="86" width="108" height="150" rx="4" fill="' + paper + '" opacity=".18" stroke="' + paper + '"/><rect x="86" y="98" width="108" height="150" rx="4" fill="' + accent + '" opacity=".25" stroke="' + accent + '" stroke-width="3"/>';
    } else if (handle.indexOf("magnetic") !== -1) {
      graphic = '<rect x="64" y="72" width="112" height="160" rx="8" fill="#d5dbe2"/><rect x="76" y="90" width="88" height="124" rx="4" fill="' + bg + '"/><rect x="76" y="142" width="88" height="10" fill="' + accent + '"/>' + chevron(104, 108, "#F0C14D");
    } else if (handle.indexOf("deck") !== -1) {
      graphic = '<rect x="62" y="64" width="116" height="176" rx="12" fill="' + bg + '"/><rect x="62" y="64" width="116" height="28" rx="12" fill="' + accent + '"/><rect x="62" y="80" width="116" height="12" fill="' + accent + '"/><g transform="translate(88 118) scale(2)">' + markShapes() + "</g>";
    } else {
      graphic = '<rect x="70" y="92" width="78" height="108" rx="6" fill="' + paper + '" opacity=".75" transform="rotate(-10 109 146)"/><rect x="92" y="84" width="78" height="108" rx="6" fill="' + accent + '" transform="rotate(8 131 138)"/><rect x="78" y="100" width="84" height="112" rx="6" fill="' + paper + '"/><rect x="78" y="100" width="84" height="18" fill="' + bg + '"/><rect x="90" y="154" width="60" height="8" rx="4" fill="' + accent + '"/>';
    }
    return '<rect width="240" height="336" rx="16" fill="' + paper + '"/>' +
      '<rect x="10" y="10" width="220" height="316" rx="12" fill="' + bg + '"/>' +
      '<text x="24" y="40" fill="' + accent + '" font-family="Outfit, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="1.4">BENCHBRAND</text>' +
      graphic +
      '<text x="24" y="300" fill="' + paper + '" font-family="Outfit, Arial, sans-serif" font-size="13" font-weight="700">' + escapeHtml(product.title.replace("Benchbrand ", "")) + "</text>";
  }
  function toyScene(product, accent, paper, bg) {
    var handle = product.handle;
    var graphic;
    if (handle.indexOf("ute") !== -1) {
      graphic = '<path d="M28 176h86v-40h40l32 40h28v26H28z" fill="' + paper + '"/><path d="M114 144h34l26 32h-60z" fill="' + accent + '"/><rect x="32" y="176" width="176" height="20" fill="' + accent + '"/><circle cx="74" cy="208" r="20" fill="#141820"/><circle cx="74" cy="208" r="8" fill="' + paper + '"/><circle cx="168" cy="208" r="20" fill="#141820"/><circle cx="168" cy="208" r="8" fill="' + paper + '"/>' + chevron(48, 150, "#F0C14D");
    } else if (handle.indexOf("blind") !== -1) {
      graphic = '<rect x="58" y="68" width="124" height="164" rx="18" fill="' + accent + '"/><rect x="72" y="84" width="96" height="86" rx="14" fill="#101820"/><text x="120" y="146" text-anchor="middle" fill="' + paper + '" font-family="Outfit, Arial, sans-serif" font-size="48" font-weight="700">?</text><rect x="78" y="184" width="84" height="10" rx="5" fill="' + paper + '" opacity=".75"/><rect x="96" y="204" width="48" height="8" rx="4" fill="' + paper + '" opacity=".45"/>';
    } else {
      graphic = motifMarkup("toy", accent, paper);
    }
    return '<rect width="240" height="336" rx="16" fill="' + paper + '"/>' +
      '<rect x="10" y="10" width="220" height="316" rx="12" fill="' + bg + '"/>' +
      graphic +
      '<text x="24" y="292" fill="' + paper + '" font-family="Outfit, Arial, sans-serif" font-size="13" font-weight="700">SAMPLE TOY</text>' +
      '<text x="24" y="312" fill="' + accent + '" font-family="Outfit, Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="1.2">NOT A LICENSED CHARACTER</text>';
  }
  function artMarkup(product, variant, uid, labelled) {
    var id = String(product.handle + "-" + variant + "-" + (uid || "a")).replace(/[^a-z0-9-]/gi, "");
    var palette = palettes[product.palette] || palettes.supply;
    var bg = palette[0], accent = palette[1], paper = palette[2];
    var a11y = labelled ? 'role="img" aria-label="' + escapeHtml(product.title) + ', original sample artwork"' : 'aria-hidden="true" focusable="false"';
    var inner;
    if (variant === "back") {
      inner = '<rect width="240" height="336" rx="16" fill="' + paper + '"/><rect x="12" y="12" width="216" height="312" rx="12" fill="#1a2433"/>' +
        '<g transform="translate(72 78) scale(3)">' + markShapes() + "</g>" +
        '<text x="120" y="210" text-anchor="middle" fill="#F6EFE2" font-family="Outfit, Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="1.4">RN TOYS COLLECTIBLES</text>' +
        '<text x="120" y="230" text-anchor="middle" fill="' + accent + '" font-family="Outfit, Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="2.2">NEW ZEALAND</text>';
    } else if (product.kind === "sealed") {
      inner = sealedScene(product, id, bg, accent, paper, variant === "detail");
    } else if (product.kind === "accessory") {
      inner = supplyScene(product, accent, paper, bg);
    } else if (product.kind === "toy") {
      inner = toyScene(product, accent, paper, bg);
    } else {
      inner = singleScene(product, id, bg, accent, paper, variant === "detail");
    }
    return '<div class="card-art"><svg viewBox="0 0 240 336" ' + a11y + '><title>' + escapeHtml(product.title) + ' sample art</title>' + inner + '</svg><span class="sheen" aria-hidden="true"></span></div>';
  }
  var api = {
    games: games, kindLabel: kindLabel, products: products, escapeHtml: escapeHtml, formatMoney: formatMoney,
    findProduct: findProduct, getCollection: getCollection, priceLabel: priceLabel, stockState: stockState,
    badge: badge, maxQty: maxQty, searchProducts: searchProducts, queryProducts: queryProducts, setQty: setQty,
    cartSummary: cartSummary, artMarkup: artMarkup, stockOf: stockOf
  };
  root.RNShop = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
