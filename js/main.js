//preloader
var preload = $("#preloader");
$(window).load(function () {
    setTimeout(function () {
        preload.animate({opacity: "0"}, 50, function () {
            preload.html("")
        });
        $(".wrapper").animate({opacity: "1"}, 50);
        $(".preloader_full-screen").css('display','none');
    }, 1000)
});

//flickr search
$(document).ready(function() {
    var apiKey = '67d34e9ebc6870cbee614831f77dd434';
    var flickerAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&jsoncallback=?';
    $('#show-more, #title-result').hide();

    // search img
    function getImages(pageNum) {

        $.getJSON(flickerAPI, {
            tags: $("#search-text").val(),
            tagmode: "photo",
            format: "json",
            extras: "url_q",
            per_page: 10,
            page: pageNum
        })
            .done(function(data) {

                photos = data.photos;

                $.each(photos.photo, function(p, photo) {
                    $('#title-result').show();
                    var resultsClass = $("<div>").addClass('results').appendTo("#images");
                    $("<img>").attr("src", photo.url_q).appendTo(resultsClass);
                });

                if (data.photos.pages !== pageNum) {
                    $('#show-more').show();
                };

            });
    };

    $("#show-more").click(function() {
        // show more img
        more = photos.page + 10;
        getImages(more);
    });

    function searching() {
        $('#show-more').hide();
        getImages(1);
    };

    $('#btn-clear').click(function() {
        // clear filter and results
        $('.results').remove();
        $('#search-text').val('');
        $('#show-more').hide();
        $('#title-result').hide();
    });

    $('#search-text').change(function() {
        // change search text and results
        $('.results').remove();
    });

    $("#search-submit").click(function() {
        searching();
    });

});