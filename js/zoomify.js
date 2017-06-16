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
            $("#specimen_title").html("<strong>" + repo.metadata.caption + "</strong>");


        })
        .fail(function() {
            console.log("Error requesting " + url);
        })
        .always(function() {
            console.log("jqxhr request complete.");
        });

    // Perform other work here ...

}