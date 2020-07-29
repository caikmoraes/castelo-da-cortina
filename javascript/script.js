const BASE_URL = 'https://teste-json-castelo.herokuapp.com/img'

window.onload = function () {
    const url = window.location.href
    this.getPage()
    this.selectFunctions(url)
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
function selectFunctions(currentUrl){
    const pages =['cortinas', 'persianas', 'toldos']
    pages.forEach(page => {
        if(currentUrl.indexOf(`${page}.html`) != -1) {
            this.getGalleries(currentUrl)
        }
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
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        let status = xhr.status;
        if (status === 200) {
            console.log("Connection completed.\nStatus: " + status);
        } else {
            console.log("Connection failed.\nStatus: " + status);
        }
        callback(status, xhr.response)
    }
    xhr.send();
}
function getGalleries(currentUrl) {
    const url = currentUrl.split('pages/')[1]
    const galleries = document.querySelectorAll('.gallerys')
    galleries.forEach(gallery => this.getTypeOfImage(gallery, url))
}

function getTypeOfImage(gallery, currentUrl) {
    const typeOfGallery = gallery.id
    let imagesUrl = `${BASE_URL}/img_${currentUrl.split('.')[0]}/${typeOfGallery}/`
    this.setGallerysImages(imagesUrl, gallery)
}
function setGallerysImages(imageUrl,gallery) {
    getJSON(imageUrl, (status, data) => {
        console.log(data)
        let newItem
        for (let i = 0; i < data.length; i++){
            if(i < 3) {
                newItem = `
                    <div class="gallery-item">
                        <a href="${data[i].url}" target="_blanl">
                            <img src="${data[i].url}" alt="Imagem">
                        </a>
                    </div>
                `
                gallery.innerHTML += newItem
            }
            else if(i == 3) {
                newItem = `
                    <div class="gallery-item hidden firstHidden">
                        <a href="${data[i].url}" target="_blanl">
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
                        <a href="${data[i].url}" target="_blanl">
                            <img src="${data[i].url}" alt="Imagem">
                        </a>
                    </div>
                `
                gallery.innerHTML += newItem
            }
        }
        this.getImage(gallery)
    })
}

$(document).ready(function () {
    $('#fibraNatural').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });
    $('#romana').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });
    $('#celulares').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });
    $('#tecidos').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });
    $('#rolos').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });
    $('#translucida').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });

    // PERSIANAS
    // Horizontal de Alumínio:
    $('#horAluminio').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });
    $('#horMadeira').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });
    $('#horPvc').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });
    $('#verticalPvc').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });
    $('#verticalTecido').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });
    $('#roloDupla').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });
    $('#toldoTecido').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });
    $('#toldoTransparente').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });
});