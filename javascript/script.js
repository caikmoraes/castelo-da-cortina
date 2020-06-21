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
window.onscroll = function(){
    scroll();
}
function scroll(){
    var btn =document.getElementById("btnTop");
    if(document.documentElement.scrollTop > 50){
        btn.style.display="block"
    }
    else{
        btn.style.display="none"
    }
}

function voltarTopo(){
    document.documentElement.scrollTop=0;
}