window.onload = function () {
    this.getPage()
    this.getImage()
}

// Menu function
$(function() {
    $(".toggle").on("click", function() {
        if ($(".item").hasClass("active")) {
            $(".item").removeClass("active")
        } else {
            $(".item").addClass("active")
        }
    })
})

function openMenu() {
    document.getElementById('open-menu').style.display = 'none'
    document.getElementById('exit-menu').style.display = 'block'
}

function exitMenu() {
    document.getElementById('open-menu').style.display = 'block'
    document.getElementById('exit-menu').style.display = 'none'
}

function getPage() {
    const menuLink = document.querySelectorAll('.menu-link')
    const url = window.location.href
    menuLink.forEach(element => {
        if (url.indexOf(`/${element.id}.html`) != -1) {
            element.classList.add('active')
        }
    })
}

//botao de voltar ao topo
window.onscroll = function() {
    scroll();
}

function scroll() {
    let btn = document.getElementById("btnTop");
    btn.style.outline = 'none'
    if (document.documentElement.scrollTop > 50) {
        btn.style.display = "block"
    } else {
        btn.style.display = "none"
    }
}

function voltarTopo() {
    document.documentElement.scrollTop = 0;
}

// ********************Gallery function CORTINAS PAGE********************
function getImage() {
    const galleries = document.querySelectorAll('.gallerys')
    console.log(galleries)
    galleries.forEach(gallery => this.getNumberOfImages(gallery))
}

function getNumberOfImages(gallery) {
    const linksImg = document.querySelectorAll('.gallery-item')
    const linksLenght = linksImg.length
    console.log(linksLenght)
    this.setNumberOfImages(linksLenght)
}
function setNumberOfImages(images) {
    const spans = document.querySelectorAll('.gallery-hidden-span')
    spans.forEach(span => span.innerHTML = `<h3>+${images}</h3>`)
}

function galleryShow() {
    let scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    ];
    let html = jQuery('html');
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
    let btnTop = document.getElementById('btnTop')
    btnTop.style.display = 'none'
}

function galleryExit() {
    let html = jQuery('html');
    let scrollPosition = html.data('scroll-position');
    html.css('overflow', html.data('previous-overflow'));
    window.scrollTo(scrollPosition[0], scrollPosition[1])
    let btnTop = document.getElementById('btnTop')
    btnTop.style.display = 'block'
}

// Fibra natural

function showFullGalleryFn() {
    this.galleryShow();
    let gallery = document.getElementById('full-gallery-fn')
    gallery.style.left = "0%";
}

function exitGalleryFn() {
    this.galleryExit()
    let gallery = document.getElementById('full-gallery-fn')
    gallery.style.left = "100%";
}

// Romana

function showFullGalleryRomana() {
    this.galleryShow();
    let gallery = document.getElementById('full-gallery-romana')
    gallery.style.left = "0%";
}

function exitGalleryRomana() {
    this.galleryExit()
    let gallery = document.getElementById('full-gallery-romana')
    gallery.style.left = "100%";
}
// Celular

function showFullGalleryCelular() {
    this.galleryShow();
    let gallery = document.getElementById('full-gallery-celulares')
    gallery.style.left = "0%";
}

function exitGalleryCelular() {
    this.galleryExit()
    let gallery = document.getElementById('full-gallery-celulares')
    gallery.style.left = "100%";
}
// Tecidos

function showFullGalleryTecidos() {
    this.galleryShow();
    let gallery = document.getElementById('full-gallery-tecidos')
    gallery.style.left = "0%";
}

function exitGalleryTecidos() {
    this.galleryExit()
    let gallery = document.getElementById('full-gallery-tecidos')
    gallery.style.left = "100%";
}

// Rolo

function showFullGalleryRolo() {
    this.galleryShow();
    let gallery = document.getElementById('full-gallery-rolo')
    gallery.style.left = "0%";
}

function exitGalleryRolo() {
    this.galleryExit()
    let gallery = document.getElementById('full-gallery-rolo')
    gallery.style.left = "100%";
}
// Tetos

function showFullGalleryTetos() {
    this.galleryShow();
    let gallery = document.getElementById('full-gallery-tetos')
    gallery.style.left = "0%";
}

function exitGalleryTetos() {
    this.galleryExit()
    let gallery = document.getElementById('full-gallery-tetos')
    gallery.style.left = "100%";
}

// Translucida

function showFullGalleryTr() {
    this.galleryShow();
    let gallery = document.getElementById('full-gallery-tr')
    gallery.style.left = "0%";
}

function exitGalleryTr() {
    this.galleryExit()
    let gallery = document.getElementById('full-gallery-tr')
    gallery.style.left = "100%";
}

// ********************Gallery function PERSIANAS PAGE********************

// Horizontal de Alumínio

function showFullGalleryHal() {
    this.galleryShow();
    let gallery = document.getElementById('full-gallery-hal')
    gallery.style.left = "0%";
}

function exitGalleryHal() {
    this.galleryExit()
    let gallery = document.getElementById('full-gallery-hal')
    gallery.style.left = "100%";
}
// Horizontal de Madeira

function showFullGalleryHmad() {
    this.galleryShow();
    let gallery = document.getElementById('full-gallery-hmad')
    gallery.style.left = "0%";
}

function exitGalleryHmad() {
    this.galleryExit()
    let gallery = document.getElementById('full-gallery-hmad')
    gallery.style.left = "100%";
}
// Horizontal de PVC

function showFullGalleryHpvc() {
    this.galleryShow();
    let gallery = document.getElementById('full-gallery-hpvc')
    gallery.style.left = "0%";
}

function exitGalleryHpvc() {
    this.galleryExit()
    let gallery = document.getElementById('full-gallery-hpvc')
    gallery.style.left = "100%";
}
// Vertical de PVC

function showFullGalleryVpvc() {
    this.galleryShow();
    let gallery = document.getElementById('full-gallery-vpvc')
    gallery.style.left = "0%";
}

function exitGalleryVpvc() {
    this.galleryExit()
    let gallery = document.getElementById('full-gallery-vpvc')
    gallery.style.left = "100%";
}
// Vertical de Tecido

function showFullGalleryVtec() {
    this.galleryShow();
    let gallery = document.getElementById('full-gallery-vtec')
    gallery.style.left = "0%";
}

function exitGalleryVtec() {
    this.galleryExit()
    let gallery = document.getElementById('full-gallery-vtec')
    gallery.style.left = "100%";
}
// Persiana Rolo dupla

function showFullGalleryProd() {
    this.galleryShow();
    let gallery = document.getElementById('full-gallery-prod')
    gallery.style.left = "0%";
}

function exitGalleryProd() {
    this.galleryExit()
    let gallery = document.getElementById('full-gallery-prod')
    gallery.style.left = "100%";
}

// ********************Gallery function Toldos PAGE********************

// Toldo de tecido

function showFullGalleryToldotec() {
    this.galleryShow();
    let gallery = document.getElementById('full-gallery-toltec')
    gallery.style.left = "0%";
}

function exitGalleryToldotec() {
    this.galleryExit()
    let gallery = document.getElementById('full-gallery-toltec')
    gallery.style.left = "100%";
}
// Toldo transparente

function showFullGalleryToldotrans() {
    this.galleryShow();
    let gallery = document.getElementById('full-gallery-toltrans')
    gallery.style.left = "0%";
}

function exitGalleryToldotrans() {
    this.galleryExit()
    let gallery = document.getElementById('full-gallery-toltrans')
    gallery.style.left = "100%";
}