/* Javascript code for interaction logic */
$(document).ready(function () {
    /* Carousel init and pause/play button */
    $("#mycarousel").carousel({ interval: 2000 });
    $("#carouselButton").click(function () {
        if ($("#carouselButton").children("span").hasClass('fa-pause')) {
            $("#mycarousel").carousel({ pause: 'hover' });
            $("#carouselButton").children("span").removeClass('fa-pause');
            $("#carouselButton").children("span").addClass('fa-play');
        }
        else if ($("#carouselButton").children("span").hasClass('fa-play')) {
            $("#mycarousel").carousel('cycle');
            $("#carouselButton").children("span").removeClass('fa-play');
            $("#carouselButton").children("span").addClass('fa-pause');
        }
    });

    /* Login model dialog init and showing model dialog when login button is clicked */
    $("#loginModal").modal();
    $("#loginLink").click(function () {
        $("#loginModal").modal('toggle');
    });

    /* Reserve table model dialog init and showing model dialog when reserve table button is clicked */
    $("#reservetableModal").modal();
    $("#reserveTableBtn").click(function () {
        $("#reservetableModal").modal('toggle');
    });
});
