$(window).load(function() {

    $("#validZoomify > option").each(function() {
        if ($(this).val() != "#") {
            $(this).val($(this).text());
        }
    });

    $("#validZoomify").on("change", function() {
        if ($(this).val() != "#") {
            document.location = "zoomify.html?slide=" + $(this).val();
        }
    });

    $("#validSliders > option").each(function() {
        if ($(this).val() != "#") {
            $(this).val($(this).text());
        }
    });

    $("#validSliders").on("change", function() {
        if ($(this).val() != "#") {
            document.location = "slider.html?slide=" + $(this).val();
        }
    });

});