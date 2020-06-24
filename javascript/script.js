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

// Gallery function
window.onload = () => setGallery()

function setGallery() {
    document.addEventListener('DOMContentLoaded', function() {
        var stream = document.querySelector('.gallery__stream');
        var items = document.querySelectorAll('.gallery__item');

        var prev = document.querySelector('.gallery__prev');
        prev.addEventListener('click', function() {
            stream.insertBefore(items[items.length - 1], items[0]);
            items = document.querySelectorAll('.gallery__item');
        });

        var next = document.querySelector('.gallery__next');
        next.addEventListener('click', function() {
            stream.appendChild(items[0]);
            items = document.querySelectorAll('.gallery__item');
        });
    });
}

function showFullGallery() {
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
    let gallery = document.getElementById('full-gallery')
    gallery.style.left = "0%";
    btnTop.style.display = 'none'

}

function exitGallery() {
    let html = jQuery('html');
    let scrollPosition = html.data('scroll-position');
    html.css('overflow', html.data('previous-overflow'));
    window.scrollTo(scrollPosition[0], scrollPosition[1])
    let btnTop = document.getElementById('btnTop')
    let gallery = document.getElementById('full-gallery')
    gallery.style.left = "100%";
    btnTop.style.display = 'block'
}