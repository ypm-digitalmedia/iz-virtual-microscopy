var targetCdsData;
var targetSqlData;

$(window).load(function() {

    var record_irn = qs("irn");
    var record_catalogNum = qs("catalogNum");
    loadData(record_irn, record_catalogNum);


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

    var commaOne = ", ";
    var commaTwo = ", ";
    var commaThree = ", ";


    //3
    if (country == "") {
        commaOne = ", ";
        commaTwo = ", ";
        commaThree = "";
    }
    if (place == "") {
        commaOne = "";
        commaTwo = ", ";
        commaThree = ", ";
    }

    if (district == "") {
        commaOne = "";
        commaTwo = ", ";
        commaThree = ", ";
    }

    if (state == "") {
        commaOne = ", ";
        commaTwo = "";
        commaThree = ", ";
    }

    //2
    if (state == "" && country == "") {
        commaOne = ", ";
        commaTwo = "";
        commaThree = "";
    }
    if (district == "" && country == "") {
        commaOne = "";
        commaTwo = ", ";
        commaThree = "";
    }
    if (district == "" && state == "") {
        commaOne = "";
        commaTwo = "";
        commaThree = ", ";
    }
    if (place == "" && district == "") {
        commaOne = "";
        commaTwo = "";
        commaThree = ", ";
    }
    if (place == "" && state == "") {
        commaOne = "";
        commaTwo = "";
        commaThree = ", ";
    }
    if (place == "" && country == "") {
        commaOne = "";
        commaTwo = ", ";
        commaThree = "";
    }


    // 1
    if (place == "" && district == "" && state == "") {
        commaOne = "";
        commaTwo = "";
        commaThree = "";
    }
    if (place == "" && district == "" && country == "") {
        commaOne = "";
        commaTwo = "";
        commaThree = "";
    }
    if (place == "" && state == "" && country == "") {
        commaOne = "";
        commaTwo = "";
        commaThree = "";
    }
    if (district == "" && state == "" && country == "") {
        commaOne = "";
        commaTwo = "";
        commaThree = "";
    }


    // 0
    if (place == "" && district == "" && state == "" && country == "") {
        commaOne = "";
        commaTwo = "";
        commaThree = "";
    }


    locString = place + commaOne + district + commaTwo + state + commaThree + country;
    searchString = esc(place) + commaOne + esc(district) + commaTwo + esc(state) + commaThree + esc(country);
    searchString = esc(searchString);

    if (lat != 0 && lng != 0) {
        mapString = "<a title='Click here to view coordinates in Google Maps.' href='https://www.google.com/maps/search/?api=1&query=" + lat + "," + lng + "' target=_blank'><span class='glyphicon glyphicon-globe'></span> " + locString + "</a>";
    } else {
        mapString = "<a title='No coordinates included.  Click here to search in Google Maps.' href='https://www.google.com/maps/search/?api=1&query=" + searchString + "' target=_blank'><span class='glyphicon glyphicon-search'></span> " + locString + "</a>";
    }

    if (place == "" && district == "" && state == "" && country == "") {
        mapString = "";
    }

    $("#specimen_location").html(mapString);
    // $("#specimen_id").html("<strong>" + ids.catalogNum + "</strong> &ndash; IRN <strong>" + ids.irn + "</strong>");

});

function esc(str) {
    return str.split(" ").join("+");
}

function loadData(irn, catalogNum) {


    var url = "http://deliver.odai.yale.edu/info/repository/YPM/object/" + catalogNum + "/type/4";

    var jqxhr = $.getJSON(url, function(data) {
            console.log("GET successful: " + url);
        })
        .done(function(data) {
            console.log("Request complete.  Writing javascript variable.");

            targetCdsData = data;

            var repo = _.findLast(targetCdsData, function(a) {
                return a.metadata.repositoryID == irn;
            });
            // console.log(repo);

            var captionString = repo.metadata.caption;
            var caption = "";

            captionString = captionString.split(":");
            if (captionString.length > 1) {
                captionString = captionString[1];
                if (captionString[0] == " ") { captionString = captionString.substr(1); }
            } else {
                captionString = captionString[0];
            }
            // console.log(captionString);

            captionString = captionString.split(";");
            _.forEach(captionString, function(cs) { if (cs.toString()[0] == " ") { cs = cs.substr(1); } })
            if (captionString.length > 1) {

                if (captionString[0].indexOf("sp.") > -1) { captionString[0] = captionString[0].replace("sp.", "<span class='noit'>sp.</span>"); }
                if (captionString[0].indexOf("nf.") > -1) { captionString[0] = captionString[0].replace("nf.", "<span class='noit'>nf.</span>"); }
                if (captionString[0].indexOf("cf.") > -1) { captionString[0] = captionString[0].replace("cf.", "<span class='noit'>cf.</span>"); }
                if (captionString[0].indexOf("spp.") > -1) { captionString[0] = captionString[0].replace("spp.", "<span class='noit'>spp.</span>"); }
                if (captionString[0].indexOf("var.") > -1) { captionString[0] = captionString[0].replace("var.", "<span class='noit'>var.</span>"); }


                captionString[0] = "<span class='thumbnail-title-bold it'>" + captionString[0] + "</span> &ndash; ";
                caption = captionString.join("");
            } else {
                caption = "<span class='thumbnail-title-bold it'>" + captionString[0] + "</span>";
            }
            $("#specimen_title").html("<strong>" + catalogNum + ": " + caption + "</strong>");


        })
        .fail(function() {
            console.log("Error requesting " + url);
        })
        .always(function() {
            console.log("jqxhr request complete.");
        });

    // Perform other work here ...

}