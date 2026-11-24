/*
 * Castelo da Cortina — script único, carregado no fim do <body> de todas as páginas.
 *
 * Cada página declara no <body>:
 *   data-page="home|cortinas|persianas|toldos|contato"  → link ativo no menu
 *   data-root=""  (home)  ou  data-root="../"  (pages/*) → prefixo dos caminhos
 *
 * Responsabilidades:
 *   1. Injetar cabeçalho (#site-header), rodapé (#site-footer) e a barra fixa do WhatsApp.
 *   2. Menu recolhível no celular.
 *   3. Seletor de modelos (Cortinas / Persianas).
 *   4. Galerias: botões [data-gallery="img_<página>/<categoria>"] abrem um lightbox
 *      com as fotos de jsons/img_<página>/<categoria>/images.json.
 */
(function () {
  "use strict";

  var body = document.body;
  var ROOT = body.getAttribute("data-root") || "";
  var PAGE = body.getAttribute("data-page") || "";

  var WHATSAPP = "https://wa.me/5511999125703";
  var PHONE = "(11) 3605-9089";
  var EMAIL = "castelodacortina@hotmail.com";

  /* ---------- Ícones (SVG inline, traço) ---------- */

  function icon(paths, cls) {
    return (
      '<svg class="icon' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      paths +
      "</svg>"
    );
  }
  var ICONS = {
    chat: '<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    prev: '<path d="M15 6l-6 6 6 6"/>',
    next: '<path d="M9 6l6 6-6 6"/>',
  };

  /* ---------- Cabeçalho ---------- */

  var NAV = [
    { id: "cortinas", label: "Cortinas", href: "pages/cortinas.html" },
    { id: "persianas", label: "Persianas", href: "pages/persianas.html" },
    { id: "toldos", label: "Toldos", href: "pages/toldos.html" },
    { id: "contato", label: "Contato", href: "pages/contato.html" },
  ];

  function renderHeader() {
    var slot = document.getElementById("site-header");
    if (!slot) return;

    var links = NAV.map(function (item) {
      var current = item.id === PAGE ? ' aria-current="page"' : "";
      return '<li><a href="' + ROOT + item.href + '"' + current + ">" + item.label + "</a></li>";
    }).join("");

    var topbar =
      PAGE === "home"
        ? '<div class="topbar"><div class="container">' +
          "<span>Cortinas, persianas e toldos sob medida · Osasco/SP</span>" +
          '<div class="topbar-contacts">' +
          '<a href="tel:+551136059089">' + PHONE + "</a>" +
          '<a href="mailto:' + EMAIL + '">' + EMAIL + "</a>" +
          "</div></div></div>"
        : "";

    slot.innerHTML =
      '<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>' +
      topbar +
      '<header class="site-header"><div class="container header-inner">' +
      '<a class="brand" href="' + ROOT + 'index.html">' +
      '<img src="' + ROOT + 'img/logo-peq.png" alt="" width="60" height="42">' +
      '<span class="brand-text"><span class="brand-name">Castelo da Cortina</span>' +
      '<span class="brand-tag">Zelito das Cortinas</span></span>' +
      "</a>" +
      '<button type="button" class="menu-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Abrir menu">' +
      icon(ICONS.menu, "icon-open") + icon(ICONS.close, "icon-close") +
      "</button>" +
      '<nav id="site-nav" class="site-nav" aria-label="Principal">' +
      "<ul>" + links + "</ul>" +
      '<a class="btn btn-primary btn-sm" href="' + WHATSAPP + '" target="_blank" rel="noopener">' + icon(ICONS.chat) + "Pedir orçamento</a>" +
      "</nav>" +
      "</div></header>";

    setupMenu(slot);
  }

  function setupMenu(slot) {
    var toggle = slot.querySelector(".menu-toggle");
    var nav = slot.querySelector(".site-nav");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      nav.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    // Fecha com Esc (só quando o foco está no cabeçalho) e ao seguir um link.
    slot.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    // Ao voltar para a largura de desktop, o menu volta ao normal.
    window.matchMedia("(min-width: 1061px)").addEventListener("change", function (e) {
      if (e.matches) setOpen(false);
    });
  }

  /* ---------- Rodapé + barra do WhatsApp ---------- */

  function renderFooter() {
    var slot = document.getElementById("site-footer");
    if (!slot) return;
    var year = new Date().getFullYear();

    slot.innerHTML =
      '<footer class="site-footer"><div class="container">' +
      '<div class="footer-brand"><span class="footer-brand-name">Castelo da Cortina</span>' +
      "<small>© " + year + " Castelo da Cortina. Todos os direitos reservados.</small></div>" +
      '<nav class="footer-social" aria-label="Redes sociais">' +
      '<a href="https://www.instagram.com/castelodacortina" target="_blank" rel="noopener">Instagram</a>' +
      '<a href="https://www.facebook.com/casteloda.cortina" target="_blank" rel="noopener">Facebook</a>' +
      '<a href="https://g.page/castelo-da-cortina?gm" target="_blank" rel="noopener">Google</a>' +
      "</nav></div></footer>" +
      '<div class="wa-bar"><a class="btn btn-primary" href="' + WHATSAPP + '" target="_blank" rel="noopener">' +
      icon(ICONS.chat) + "Orçamento pelo WhatsApp</a></div>";
  }

  /* ---------- Seletor de modelos ---------- */

  function setupModelPicker() {
    var chips = document.querySelector(".chips");
    if (!chips) return;

    var buttons = Array.prototype.slice.call(chips.querySelectorAll(".chip"));
    var models = Array.prototype.slice.call(document.querySelectorAll(".model"));
    if (!buttons.length || !models.length) return;

    function isModel(id) {
      return models.some(function (m) { return m.id === id; });
    }

    function show(id) {
      if (!isModel(id)) id = models[0].id;
      models.forEach(function (m) { m.hidden = m.id !== id; });
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-model") === id));
      });
      return id;
    }

    chips.hidden = false;
    show(location.hash.slice(1));

    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        history.replaceState(null, "", "#" + show(b.getAttribute("data-model")));
      });
    });

    // Só hashes de modelo trocam a seleção; outros (ex.: #conteudo do link
    // "Pular para o conteúdo") mantêm o modelo escolhido.
    window.addEventListener("hashchange", function () {
      var id = location.hash.slice(1);
      if (isModel(id)) show(id);
    });
  }

  /* ---------- Galerias + lightbox ---------- */

  var manifests = {};

  // Os manifestos guardam caminhos a partir da raiz ("/img/..."); prefixar ROOT
  // permite servir o site também a partir de uma subpasta.
  function asset(url) {
    return ROOT + url.replace(/^\//, "");
  }

  function loadManifest(gallery) {
    if (!manifests[gallery]) {
      manifests[gallery] = fetch(ROOT + "jsons/" + gallery + "/images.json").then(function (r) {
        if (!r.ok) throw new Error("Manifesto não encontrado: " + gallery);
        return r.json();
      });
    }
    return manifests[gallery];
  }

  var lightbox = null;

  function buildLightbox() {
    var d = document.createElement("dialog");
    d.className = "lightbox";
    d.setAttribute("aria-labelledby", "lightbox-title");
    d.innerHTML =
      '<div class="lightbox-bar">' +
      '<h2 class="lightbox-title" id="lightbox-title"><span class="lightbox-name"></span>' +
      '<span class="lightbox-counter" aria-live="polite"></span></h2>' +
      '<button type="button" class="lightbox-btn lightbox-close" aria-label="Fechar galeria">' + icon(ICONS.close) + "</button>" +
      "</div>" +
      '<button type="button" class="lightbox-btn lightbox-prev" aria-label="Foto anterior">' + icon(ICONS.prev) + "</button>" +
      '<figure><img alt=""></figure>' +
      '<button type="button" class="lightbox-btn lightbox-next" aria-label="Próxima foto">' + icon(ICONS.next) + "</button>";
    document.body.appendChild(d);

    var state = { photos: [], index: 0, title: "" };
    var img = d.querySelector("img");
    var counter = d.querySelector(".lightbox-counter");
    var prev = d.querySelector(".lightbox-prev");
    var next = d.querySelector(".lightbox-next");

    function render() {
      var p = state.photos[state.index];
      img.src = asset(p.url);
      img.width = p.w;
      img.height = p.h;
      img.alt = state.title + " — foto " + (state.index + 1) + " de " + state.photos.length;
      counter.textContent = (state.index + 1) + " / " + state.photos.length;
      var many = state.photos.length > 1;
      prev.hidden = !many;
      next.hidden = !many;
      // Pré-carrega a próxima foto.
      if (many) new Image().src = asset(state.photos[(state.index + 1) % state.photos.length].url);
    }
    function go(step) {
      var n = state.photos.length;
      state.index = (state.index + step + n) % n;
      render();
    }

    prev.addEventListener("click", function () { go(-1); });
    next.addEventListener("click", function () { go(1); });
    d.querySelector(".lightbox-close").addEventListener("click", function () { d.close(); });
    d.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    });
    // Clique no fundo escuro (fora da foto e dos botões) fecha.
    d.addEventListener("click", function (e) {
      if (e.target === d || e.target.tagName === "FIGURE") d.close();
    });
    // Toque: deslizar para os lados troca a foto.
    var startX = null;
    d.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    d.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      startX = null;
    });

    return {
      open: function (photos, title, index, opener) {
        state.photos = photos;
        state.title = title;
        state.index = index || 0;
        d.querySelector(".lightbox-name").textContent = title;
        render();
        d.showModal();
        d.querySelector(".lightbox-close").focus();
        d.addEventListener("close", function restore() {
          d.removeEventListener("close", restore);
          if (opener) opener.focus();
        });
      },
    };
  }

  function setupGalleries() {
    var openers = document.querySelectorAll("[data-gallery]");
    if (!openers.length) return;

    // Preenche contagens de fotos ("Ver fotos (37)").
    Array.prototype.forEach.call(document.querySelectorAll("[data-count-for]"), function (el) {
      loadManifest(el.getAttribute("data-count-for"))
        .then(function (photos) { el.textContent = "(" + photos.length + ")"; })
        .catch(function () {});
    });

    Array.prototype.forEach.call(openers, function (btn) {
      btn.addEventListener("click", function () {
        if (typeof HTMLDialogElement !== "function") return;
        if (!lightbox) lightbox = buildLightbox();
        btn.setAttribute("aria-busy", "true");
        loadManifest(btn.getAttribute("data-gallery"))
          .then(function (photos) {
            if (photos.length) lightbox.open(photos, btn.getAttribute("data-title") || "", 0, btn);
          })
          .catch(function (err) { console.error(err); })
          .then(function () { btn.removeAttribute("aria-busy"); });
      });
    });
  }

  /* ---------- Início ---------- */

  renderHeader();
  renderFooter();
  setupModelPicker();
  setupGalleries();
})();
