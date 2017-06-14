var targetCdsData;

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

    // var record = qs("slide");
    // loadData(record);

});



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