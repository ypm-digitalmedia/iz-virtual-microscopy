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

    // var record = qs("slide");
    // loadData(record);


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

function loadData(record) {
    alert("make the index file a PHP file.  query mysql to get catalognum, sciname/taxa, etc., then query CDS with it for caption.")

    var url = "http://deliver.odai.yale.edu/info/repository/YPM/object/" + record + "/type/4";

    var jqxhr = $.getJSON(url, function(data) {
            console.log("GET successful: " + url);
        })
        .done(function(data) {
            console.log("Request complete.  Writing javascript variable.");

            targetCdsData = data;

            var repo = _.find(targetCdsData, function(a) {
                return a.metadata.repositoryID == record;
            });

            var catalogNum;
            var caption;
            var capCat = repo.metadata.caption.split(": ");
            if (capCat.length > 1) {
                caption = capCat[1];
                catalogNum = capCat[0];
            } else {
                caption = catalogNum = repo.metadata.caption;
            }

            $("#specimen_title").html("<strong>" + caption + "</strong>");


        })
        .fail(function() {
            console.log("Error requesting " + url);
        })
        .always(function() {
            console.log("jqxhr request complete.");
        });

    // Perform other work here ...

}