var targetCdsData = null;
var targetSqlData = null;

var presentations = [];

var repos = [];

$(document).ready(function() {




    $(".modal-wide").on("show.bs.modal", function() {
        var height = $(window).height() - 200;
        $(this).find(".modal-body").css("max-height", height);
        $("#myModalLoader").show();
    });

    $(".modal-wide").on("hide.bs.modal", function() {

        // $("#theData").html("<p align='center'><img src='ajax-loader.gif' /></p>");
        targetData = null;
        $("#theData").html("");
        $("#repos").html("");
        $("#imagery_slider").html("");
        $("#imagery_zoomify").html("");

        repos = [];

    });




    $('td[rel=cell_zoomify]').each(function() {
        var whichZoomifys = $(this).text().split("|");
        if (getIntersect(valid.zoomify, whichZoomifys).length > 0) {
            $(this).parent().css("background-color", "yellow");
        }

    })

    $('td[rel=cell_slider]').each(function() {
        var whichSliders = $(this).text().split("|");
        if (getIntersect(valid.slider, whichSliders).length > 0) {
            $(this).parent().css("background-color", "yellow");
        }

    })

























});


function loadData(record) {
    var url = "http://deliver.odai.yale.edu/info/repository/YPM/object/" + record + "/type/4";

    var jqxhr = $.getJSON(url, function(data) {
            console.log("GET successful: " + url);
        })
        .done(function(data) {
            $("#myModalLoader").fadeOut();
            console.log("Request complete.  Writing javascript variable.");
            targetCdsData = data;
            // console.log("sqldata:");
            // console.log(sqldata);
            targetSqlData = _.findLast(sqldata, function(d) { return d.catalog_number == record });
            // console.log(targetCdsData);

            var irns = { slider: targetSqlData.media_sliders_irns == "" ? [] : targetSqlData.media_sliders_irns.split("|"), zoomify: targetSqlData.media_zoomify_irns == "" ? [] : targetSqlData.media_zoomify_irns.split("|") };
            // console.log(irns);

            $("#sqlData").html(JSON.stringify(targetSqlData, null, 2));
            $("#cdsData").html(JSON.stringify(targetCdsData, null, 2));

            $("#myModalLabel").text(record);

            _.forEach(irns.slider, function(SI, index) {
                var foundSlider = _.find(targetCdsData, function(a) {
                    return a.metadata.repositoryID == SI;
                });
                // console.log("SI | foundSlider: ");
                // console.log(foundSlider);
                repos.push({ repoIndex: index, type: "slider", obj: foundSlider, thumbnail: foundSlider.derivatives["2"].source, irn: SI });
            });

            _.forEach(irns.zoomify, function(ZI, index) {
                var foundZoomify = _.find(targetCdsData, function(a) {
                    return a.metadata.repositoryID == ZI;
                });
                // console.log("ZI | foundZoomify: ");
                // console.log(foundZoomify);
                repos.push({ repoIndex: index, type: "zoomify", obj: foundZoomify, thumbnail: foundZoomify.derivatives["2"].source, irn: ZI });
                repos = _.uniq(repos);
            });

            console.log("repos: ");
            console.log(repos);

            _.forEach(repos, function(repo) {
                if (repo.type == "zoomify" && valid.zoomify.indexOf(repo.irn) > 0) {
                    $("#imagery_zoomify").append("<a target='_blank' href='../zoomify.html?slide=" + repo.irn + "'><div class='test_thumbnail' title='" + repo.irn + "' style='background-image: url(\"" + repo.thumbnail + "\");'>&nbsp;</div></a>");
                } else if (repo.type == "slider" && valid.slider.indexOf(repo.irn) > 0) {
                    $("#imagery_slider").append("<a target='_blank' href='../slider.html?slide=" + repo.irn + "'><div class='test_thumbnail' title='" + repo.irn + "' style='background-image: url(\"" + repo.thumbnail + "\");'>&nbsp;</div></a>");
                }
            })



        })
        .fail(function() {
            console.log("Error requesting " + url);
        })
        .always(function() {
            console.log("jqxhr request complete.");
        });

    // Perform other work here ...

}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}