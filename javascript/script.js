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