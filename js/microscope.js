var frame = 0;
var maxFrames = 0;
var knob;
var mouseScrollFactor = 0.5;

var targetCdsData;
var targetSqlData;

$(window).load(function() {

    $("#validZoomify > option").each(function() {
        if ($(this).val() != "#") {
            $(this).val($(this).text());
        }
    });

    $("#validZoomify").on("change", function() {
        if ($(this).val() != "#") {
            document.location = "zoomify.php?irn=" + $(this).val() + "&catalogNum=";
        }
    });

    $("#validSliders > option").each(function() {
        if ($(this).val() != "#") {
            $(this).val($(this).text());
        }
    });

    $("#validSliders").on("change", function() {
        if ($(this).val() != "#") {
            document.location = "slider.php?irn=" + $(this).val() + "&catalogNum=";
        }
    });


    $.blockUI({
        css: { 'opacity': '0.9' },
        message: imageloadmessage,
        onBlock: function() {
            $.when(loadImages()).done(function(total) {
                // console.log(total);
                $.when(loadSlider(total)).done(function() {
                    var step = 100 / total;
                    console.log("100 / " + total + " = " + step)
                    for (var x = 0; x <= total; x++) {
                        changeSlideValue(x);
                    }

                    var iter = 0;
                    setInterval(function() {
                        var pct = step * iter;
                        if (pct <= 100) {
                            $(".message-bg").css("width", pct + "%");
                            iter++;
                        } else {

                            $(".message-bg").css("width", "100%");
                        }
                    }, 50)

                    setTimeout(function() { $.unblockUI(); }, (total + 1) * 50);
                    setTimeout(function() { changeSlideValue(0); }, (total + 2) * 50);
                });
                console.log("maximum value: " + maxFrames);
                makeKnob(maxFrames);
            })
        }
    });


    $("#precision_knob").on("change", function(e) {
        console.log("setting precision to " + e.value);
        mouseScrollFactor = e.value;

    });

    $("#knob").on("change", function(e) {
        changeSlideValueInstant(e.value);
    });



    $('#slideshow').on('mousewheel', function(event) {
        // console.log(event.deltaX, event.deltaY, event.deltaFactor);
        frame += parseInt(Math.round(event.deltaY) * mouseScrollFactor);
        if (frame < 0) { frame = 0; }
        if (frame > maxFrames) { frame = maxFrames; }
        console.log(frame);
        knob.option("value", frame);
        changeSlideValueInstant(frame);
    });

    $("#precision_knob").roundSlider({
        sliderType: "default",
        circleShape: "quarter",
        value: 0.5,
        keyboardAction: true,
        mouseScrollAction: true,
        step: 0.05,
        min: 0.05,
        max: 1.0,
        editableTooltip: true,
    });


    // load SQL data / URL variables into text area at bottom
    var locString = "";
    var mapString = "";
    var searchString = "";

    var place = sqldata[0].nearest_named_place;
    var country = sqldata[0].country;
    var state = sqldata[0].state_province;
    var district = sqldata[0].county_district;
    var lat = sqldata[0].decimal_latitude;
    var lng = sqldata[0].decimal_longitude;

    if (place != "") {
        locString += place;
        searchString += esc(place);
    }
    if (district != "") {
        locString += ", " + district;
        searchString += "," + esc(district);
    }
    if (state != "") {
        locString += ", " + state;
        searchString += "," + esc(state);
    }
    if (country != "") {
        locString += ", " + country;
        searchString += "," + esc(country);
    }

    if (lat != 0 && lng != 0) {
        mapString = "<a title='Click here to view coordinates in Google Maps.' href='https://www.google.com/maps/search/?api=1&query=" + lat + "," + lng + "' target=_blank'><span class='glyphicon glyphicon-globe'></span> " + locString + "</a>";
    } else {
        mapString = "<a title='No coordinates included.  Click here to search in Google Maps.' href='https://www.google.com/maps/search/?api=1&query=" + searchString + "' target=_blank'><span class='glyphicon glyphicon-search'></span> " + locString + "</a>";
    }

    $("#specimen_location").html(mapString);
    $("#specimen_id").html("<strong>" + ids.catalogNum + "</strong> &ndash; IRN <strong>" + ids.irn + "</strong>");



});


function esc(str) {
    return str.split(" ").join("+");
}



















function makeKnob(maximum) {
    $("#knob").roundSlider({
        sliderType: "default",
        circleShape: "full",
        value: 0,
        keyboardAction: true,
        mouseScrollAction: true,
        step: 1,
        min: 0,
        max: maximum,
        editableTooltip: false,
    });
    knob = $("#knob").data("roundSlider");
}

function loadImages() {
    var code = 200;
    for (var x = 0; code == 200; x++) {
        var filenum = pad(x, 3);

        var url = imagefolderlocation + "/" + imagename + filenum + ".jpg";
        // console.log(url);
        code = urlExists(url);
        if (code == 200) {
            // $("#slideshow").append('<img style="position: absolute; top: 0px; left: 0px; z-index: ' + (x + 1) + '; opacity: 1;" src="' + url + '" height="' + imageheight + '">');
            $("#slideshow").append('<img style="position: absolute; z-index: ' + (x + 1) + '; opacity: 1;" src="' + url + '">');
            maxFrames = parseInt(filenum);
            console.log("new image found: #" + maxFrames);
        }
    }
    $("#slideshow").height(imageheight);
    return x - 2;
}

function changeSlideValue(num) {

    setTimeout(function() {
        $('#slider').slider('value', num);
        $("#slideshow").cycle(num);
    }, (num + 1) * 50);

}

function changeSlideValueInstant(num) {

    $('#slider').slider('value', num);
    $("#slideshow").cycle(num);

}

function loadSlider(total) {
    // call cycle immediately, without a ready handler
    $('#slideshow').cycle({
        fx: 'none',
        timeout: 0
    });

    $("#slider").slider({
        range: "min",
        min: 0,
        max: total,
        value: 0,
        slide: function(event, ui) {
            $("#slideshow").cycle(ui.value);
            knob.option("value", ui.value);
        }
    }).slider('pips');


}

function urlExists(testUrl) {
    var http = jQuery.ajax({
        type: "HEAD",
        url: testUrl,
        async: false
    })
    return http.status;
    // this will return 200 on success, and 0 or negative value on error
}

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}