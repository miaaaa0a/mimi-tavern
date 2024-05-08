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

var timeout = 200;
function dynUpdate(partial) {
    $("#content").animate({"opacity": 0}, timeout);
    setTimeout(() => {
        $("#content").load(partial);
    }, timeout);
    $("#content").animate({"opacity": 1}, timeout);
}

$("#tabs").on("change", (event) => {
    switch (event.target.activeTabIndex) {
        case 0:
            console.log("About me");
            dynUpdate("/partials/aboutme");
            break;
        case 1:
            console.log("Credits");
            dynUpdate("/partials/credits");
            break;
    }
});

dynUpdate("/partials/aboutme");
$(".social").load("/partials/socialmedia");