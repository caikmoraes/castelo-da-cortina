const BASE_URL = 'https://castelo-da-cortina.herokuapp.com/img'

window.onload = function () {
    this.setFooter()
    this.getPage()
    this.selectFunctions(window.location.href)
}

// Menu function

$(function () {
    $(".toggle").on("click", function () {
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
function selectFunctions(currentUrl) {
    const pages = ['cortinas', 'persianas', 'toldos']
    pages.forEach(page => {
        if (currentUrl.indexOf(`${page}.html`) != -1) {
            this.getGalleries(`${page}.html`)
        }
    })
}
// Footer function
function setFooter() {
    const footers = document.querySelectorAll('footer')
    const footerElements = `
        <article>
            <ul class="social">
                <li><a href="https://www.facebook.com/casteloda.cortina" target="_blank"><i class="fab fa-facebook-square"></i></a></li>
                <li><a href="https://www.instagram.com/castelodacortina" target="_blank"><i class="fab fa-instagram"></i></a></li>
                <li><a href="https://g.page/castelo-da-cortina?gm" target="_blank"><i class="fab fa-google"></i></a></li>
            </ul>
            <p>&copy; 2020 Castelo da Cortina. Todos os direitos reservados.</p>
        </article>`
    footers.forEach(footer => {
        footer.innerHTML = footerElements
    })
}

//botao de voltar ao topo
window.onscroll = function () {
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

// ********************Gallery function********************
function getImage(gallery) {
    this.getNumberOfImages(gallery)
}

function getNumberOfImages(gallery) {
    const linksImg = gallery.querySelectorAll('.gallery-item')
    const linksLenght = linksImg.length
    this.setNumberOfImages(linksLenght, gallery)
}
function setNumberOfImages(images, gallery) {
    const span = gallery.querySelector('.gallery-hidden-span')
    span.innerHTML = `<h3>+${images - 3}</h3>`
}

// ************TESTE******************

function getJSON(url, callback) {
    return new Promise(() => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            let status = xhr.status;
            // if (status === 200) {
            //     console.log("Connection completed.\nStatus: " + status);
            // } else {
            //     console.log("Connection failed.\nStatus: " + status);
            // }
            callback(status, xhr.response)
        }
        xhr.send();
    })
}

function setLoading() {
    return new Promise(() => {
        const gallerys = document.querySelectorAll('.gallerys')
        let loading
        gallerys.forEach(gallery => {
            loading = `<img src="../img/loading.gif" class="loading" alt="Carregando...">`
            gallery.innerHTML = loading
        })
    })
}

function getGalleries(currentUrl) {
    const url = currentUrl
    const galleries = document.querySelectorAll('.gallerys')
    galleries.forEach(gallery => this.getTypeOfImage(gallery, url))
}

function getTypeOfImage(gallery, currentUrl) {
    const typeOfGallery = gallery.id
    let imagesUrl = `${BASE_URL}/img_${currentUrl.split('.')[0]}/${typeOfGallery}/`
    this.setGallerysImages(imagesUrl, gallery)
}
function setGallerysImages(imageUrl, gallery) {
    setLoading()
        .then(getJSON(imageUrl, (status, data) => {
            gallery.innerHTML = ''
            let newItem
            for (let i = 0; i < data.length; i++) {
                if (i < 3) {
                    newItem = `
                        <div class="gallery-item">
                            <a href="${data[i].url}" target="_blanl" class="popup-link">
                                <img src="${data[i].url}" alt="Imagem">
                            </a>
                        </div>
                    `
                    gallery.innerHTML += newItem
                }
                else if (i == 3 && data.length == 4) {
                    newItem = `
                        <div class="gallery-item hidden firstHidden">
                            <a href="${data[i].url}" target="_blanl" class="popup-link">
                                <img src="${data[i].url}" alt="Imagem">
                            </a>
                        </div>
                    `
                    gallery.innerHTML += newItem
                }
                else if (i == 3 && data.length > 4) {
                    newItem = `
                        <div class="gallery-item hidden firstHidden">
                            <a href="${data[i].url}" target="_blanl" class="popup-link">
                                <span class="gallery-hidden-span"></span>
                                <img src="${data[i].url}" alt="Imagem">
                            </a>
                        </div>
                    `
                    gallery.innerHTML += newItem
                }

                else {
                    newItem = `
                        <div class="gallery-item hidden">
                            <a href="${data[i].url}" target="_blanl" class="popup-link">
                                <img src="${data[i].url}" alt="Imagem">
                            </a>
                        </div>
                    `
                    gallery.innerHTML += newItem
                }
            }
            if (data.length > 4) {
                this.getImage(gallery)
            }
            else if (data.length == 3) {
                this.changeGalleryItem(gallery)
            }
        })
        )
}

function changeGalleryItem(gallery) {
    const items = gallery.querySelectorAll('.gallery-item')
    $(items[2]).css("grid-column", "1/3")
    $(items[2]).css("width", "50%")
    $(items[2]).css("height", "100%")
    $(items[2]).css("margin", "auto")
}
$('.carousel').carousel({
    touch: true // default
})
$(document).ready(function () {
    $(".gallerys").each(function () {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            mainClass: 'mfp-with-zoom',
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
                opener: function (openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            },
            gallery: {
                enabled: true,
                tPrev: 'Anterior',
                tNext: 'Próximo',
            },
        })
    })
});
