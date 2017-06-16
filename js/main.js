var taxa_keywords_obj = {
    class: [],
    order: [],
    genus: [],
    phylum: [],
    species: [],
    family: []
};
var tags = [];
var tagsCondensed;
var tagsCount = [];

var test_images = [];
var test_data = [];
var live_data = [];
var numItems = 12;
var parsed_sqldata = [];
var parsed_sampled_sqldata = [];
var cdsData = [];


$(document).ready(function() {

    // parse SQL and create individual presentations for SQL data
    // build array of tags from live data (taxa information)

    _.forEach(sqldata, function(row) {

        var zoomifys = row.media_zoomify_irns.split("|");
        var sliders = row.media_sliders_irns.split("|");

        if (zoomifys.length == 1 && zoomifys[0] == "") { zoomifys = []; }
        if (sliders.length == 1 && sliders[0] == "") { sliders = []; }

        taxa_keywords_obj.class.push(row.class);
        taxa_keywords_obj.order.push(row.order);
        taxa_keywords_obj.genus.push(row.genus);
        taxa_keywords_obj.phylum.push(row.phylum);
        taxa_keywords_obj.species.push(row.species);
        taxa_keywords_obj.family.push(row.family);



        // console.log("\n")
        // console.log("ZOOMIFY +++++++++++++++++++++++++");
        // console.log(row.catalog_number)
        // console.log(zoomifys)

        // console.log("SLIDER +++++++++++++++++++++++++");
        // console.log(row.catalog_number)
        // console.log(sliders)

        // console.log(row.catalog_number + " -- " + zoomifys.length + " zoomifys, " + sliders.length + " sliders");

        _.forEach(zoomifys, function(z) {
            var tmpdata = row;
            tmpdata.irn = z;
            tmpdata.type = "zoomify";
            if (z != "") { parsed_sqldata.push(tmpdata); }
        });

        _.forEach(sliders, function(s) {
            var tmpdata = row;
            tmpdata.irn = s;
            tmpdata.type = "slider";
            if (s != "") { parsed_sqldata.push(tmpdata); }
        });

    });

    console.log("parsed data: ");
    console.log(parsed_sqldata);

    makeTags();
    sampleSlides();






    // var cw = $('.thumbnail').eq(0).width();
    // $('.thumbnail').css({ 'height': cw + 'px' });












    // ==================================== EVENT LISTENERS ==================================== //

    $(window).resize(function() {
        var cw = $('.thumbnail').eq(0).width();
        $('.thumbnail').css({ 'height': cw + 'px' });
    })

    // $(".thumbnail").on("mouseover", function() {
    //     $(this).find("img.thumbnail-hoverimg").css("opacity", 1.0);
    // })


    // $(".thumbnail").on("mouseout", function() {
    //     $(this).find("img.thumbnail-hoverimg").css("opacity", 0);
    // })



});

function sampleSlides() {
    parsed_sampled_sqldata = _.sampleSize(parsed_sqldata, numItems);

    // console.log(parsed_sampled_sqldata);

    _.forEach(parsed_sampled_sqldata, function(row) {
        loadData(row.irn, row.catalog_number, row.type);
    });
}


function makeTags() {

    // tagsCondensed = _.union(taxa_keywords_obj.class, taxa_keywords_obj.order, taxa_keywords_obj.genus, taxa_keywords_obj.phylum, taxa_keywords_obj.species, taxa_keywords_obj.family);
    tagsCondensed = taxa_keywords_obj.class.concat(taxa_keywords_obj.order).concat(taxa_keywords_obj.genus).concat(taxa_keywords_obj.phylum).concat(taxa_keywords_obj.species).concat(taxa_keywords_obj.family);
    // tagsCondensed = _.uniq(tagsCondensed);
    tagsCondensed = _.without(tagsCondensed, "");

    _.forEach(tagsCondensed, function(tag) {
        var arr = _.filter(tagsCondensed, function(o) { return o == tag })
        var linkstr = "results.php?q=" + esc(tag);
        tagsCount.push({ text: tag, weight: arr.length, link: linkstr });
    });

    tags = _.uniqBy(tagsCount, 'text');
    tags = _.orderBy(tags, 'weight', 'desc');

    // tags = [
    //     { text: "Acanthocephala", weight: 1, link: '#' },
    //     { text: "Annelida", weight: 1, link: '#' },
    //     { text: "Arthropoda", weight: 1, link: '#' },
    //     { text: "Brachiopoda", weight: 1, link: '#' },
    //     { text: "Bryozoa", weight: 1, link: '#' },
    //     { text: "Chaetognatha", weight: 1, link: '#' },
    //     { text: "Cnidaria", weight: 1, link: '#' },
    //     { text: "Ctenophora", weight: 1, link: '#' },
    //     { text: "Echinodermata", weight: 1, link: '#' },
    //     { text: "Echiura", weight: 1, link: '#' },
    //     { text: "Entoprocta", weight: 1, link: '#' },
    //     { text: "Gastrotricha", weight: 1, link: '#' },
    //     { text: "Gnathostomulida", weight: 1, link: '#' },
    //     { text: "Kinorhyncha", weight: 1, link: '#' },
    //     { text: "Loricifera", weight: 1, link: '#' },
    //     { text: "Mesozoa", weight: 1, link: '#' },
    //     { text: "Mollusca", weight: 1, link: '#' },
    //     { text: "Nematoda", weight: 1, link: '#' },
    //     { text: "Nematomorpha", weight: 1, link: '#' },
    //     { text: "Nemertea", weight: 1, link: '#' },
    //     { text: "Onychophora", weight: 1, link: '#' },
    //     { text: "Pentastoma", weight: 1, link: '#' },
    //     { text: "Phoronida", weight: 1, link: '#' },
    //     { text: "Placozoa", weight: 1, link: '#' },
    //     { text: "Platyhelminthes", weight: 1, link: '#' },
    //     { text: "Pogonophora", weight: 1, link: '#' },
    //     { text: "Porifera", weight: 1, link: '#' },
    //     { text: "Priapula", weight: 1, link: '#' },
    //     { text: "Rotifera", weight: 1, link: '#' },
    //     { text: "Sipuncula", weight: 1, link: '#' },
    //     { text: "Tardigrada", weight: 1, link: '#' }
    // ];

    // _.forEach(tags, function(t) {
    //     t.weight = _.random(5, 15);
    // })

    $('#tagcloud').jQCloud(tags, {
        autoResize: true,
        // fontSize: {
        //     from: 0.05,
        //     to: 0.01
        // }
    });
}






function esc(str) {
    return str.split(" ").join("+");
}



function loadData(i, c, t) {


    var url = "http://deliver.odai.yale.edu/info/repository/YPM/object/" + c + "/type/4";

    var jqxhr = $.getJSON(url, function(data) {
            console.log("GET successful: " + url);
        })
        .done(function(data) {
            console.log("Request complete.  Writing javascript variable. IRN: " + i);

            var repo = _.findLast(data, function(a) {
                // console.log(data);
                return a.metadata.repositoryID == i;
            });

            // var stuff = { irn: i, catalogNum: c, caption: repo.metadata.caption, thumbnail: repo.derivatives["2"].source };
            // console.log("return: ")
            // console.log(stuff);
            cdsData.push({ irn: i, catalogNum: c, caption: repo.metadata.caption, thumbnail: repo.derivatives["2"].source });

            var captionString = repo.metadata.caption;
            var caption = "";
            var thumbnail = repo.derivatives["2"].source;

            captionString = captionString.split(":");
            if (captionString.length > 1) {
                captionString = captionString[1];
                if (captionString[0] == " ") { captionString = captionString.substr(1); }
            } else {
                captionString = captionString[0];
            }
            // console.log(captionString);

            captionString = captionString.split(";");
            _.forEach(captionString, function(cs) { if (cs[0].toString() == " ") { cs = cs.substr(1); } })
            if (captionString.length > 1) {
                caption = captionString.join("<br />");
            } else {
                caption = captionString[0];
            }
            // console.log(caption);

            // CREATE THUMBNAILS

            var thumb = $("#thumbnail-template").html();
            thumb = thumb.replace("%%IMG%%", thumbnail);
            thumb = thumb.replace("%%GUID%%", "thumb_" + i + "_" + c);
            thumb = thumb.replace("%%HOVERIMGTYPE%%", "img/thumbhover_" + t + ".png");
            thumb = thumb.replace("%%ID%%", "IRN: " + i);
            thumb = thumb.replace("%%TITLE%%", caption); // if title is blank, use common name
            thumb = thumb.replace("%%URL%%", t + ".php?irn=" + i + "&catalogNum=" + c);

            $("#results").append(thumb);

            $(window).trigger("resize")

            if ($(".thumbnail").length >= numItems) {

                $(".thumbnail").on("mouseover", function() {
                    $(this).find("img.thumbnail-hoverimg").css("opacity", 1.0);
                })

                $(".thumbnail").on("mouseout", function() {
                    $(this).find("img.thumbnail-hoverimg").css("opacity", 0);
                })
            }

        })
        .fail(function() {
            console.log("Error requesting " + url);
            // return { caption: null, thumbnail: null };
        })
        .always(function() {
            console.log("jqxhr request complete.");
            // return { caption: null, thumbnail: null };
        });

    // Perform other work here ...

}