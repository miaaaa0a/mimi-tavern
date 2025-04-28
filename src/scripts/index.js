document.addEventListener("keydown", e => {
    if (e.shiftKey) {
        $(".twt-icon").css('display', '');
        $(".x-icon").css('display', 'none');
    }
});
document.addEventListener("keyup", function() {
    $(".twt-icon").css('display', 'none');
    $(".x-icon").css('display', '');
});

$(".social").load("/partials/socialmedia");