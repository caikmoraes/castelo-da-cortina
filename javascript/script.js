window.onload = function () {
    this.getPage()
    // this.setGallerysImages()
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
    galleries.forEach(gallery => this.getNumberOfImages(gallery))
}

function getNumberOfImages(gallery) {
    const linksImg = gallery.querySelectorAll('.gallery-item')
    const linksLenght = linksImg.length
    this.setNumberOfImages(linksLenght, gallery)
}
function setNumberOfImages(images, gallery) {
    const span = gallery.querySelector('.gallery-hidden-span')
    span.innerHTML = `<h3>+${images - 4}</h3>`
}




// Galleries JQuery
$(document).ready(function() {
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
});