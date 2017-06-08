var frame = 0;
var maxFrames = 0;
var knob;
var mouseScrollFactor = 0.5;

$(window).load(function() {

    $("#validSliders > option").each(function() {
        if ($(this).val() != "#") {
            $(this).val($(this).text());
        }
    });

    $("#validSliders").on("change", function() {
        if ($(this).val() != "#") {
            document.location = "slider.html?slide=" + $(this).val();
        }
    })

    $.blockUI({
        css: { 'opacity': '0.9' },
        message: imageloadmessage,
        onBlock: function() {
            $.when(loadImages()).done(function(total) {
                $.when(loadSlider(total)).done(function() {
                    for (var x = 0; x <= total; x++) {
                        changeSlideValue(x);
                    }
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

});

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