var tags = [];
var test_images = [];
var test_data = [];
var live_data = [];
var numItems = 16;
var parsed_sqldata = [];
var parsed_sampled_sqldata = [];

$(document).ready(function() {

    // parse SQL and create individual presentations for SQL data
    // build array of tags from live data (taxa information)

    _.forEach(sqldata, function(row) {

        var zoomifys = row.media_zoomify_irns.split("|");
        var sliders = row.media_sliders_irns.split("|");

        if (zoomifys.length == 1 && zoomifys[0] == "") { zoomifys = []; }
        if (sliders.length == 1 && sliders[0] == "") { sliders = []; }

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

    tags = [
        { text: "Acanthocephala", weight: 1, link: '#' },
        { text: "Annelida", weight: 1, link: '#' },
        { text: "Arthropoda", weight: 1, link: '#' },
        { text: "Brachiopoda", weight: 1, link: '#' },
        { text: "Bryozoa", weight: 1, link: '#' },
        { text: "Chaetognatha", weight: 1, link: '#' },
        { text: "Cnidaria", weight: 1, link: '#' },
        { text: "Ctenophora", weight: 1, link: '#' },
        { text: "Echinodermata", weight: 1, link: '#' },
        { text: "Echiura", weight: 1, link: '#' },
        { text: "Entoprocta", weight: 1, link: '#' },
        { text: "Gastrotricha", weight: 1, link: '#' },
        { text: "Gnathostomulida", weight: 1, link: '#' },
        { text: "Kinorhyncha", weight: 1, link: '#' },
        { text: "Loricifera", weight: 1, link: '#' },
        { text: "Mesozoa", weight: 1, link: '#' },
        { text: "Mollusca", weight: 1, link: '#' },
        { text: "Nematoda", weight: 1, link: '#' },
        { text: "Nematomorpha", weight: 1, link: '#' },
        { text: "Nemertea", weight: 1, link: '#' },
        { text: "Onychophora", weight: 1, link: '#' },
        { text: "Pentastoma", weight: 1, link: '#' },
        { text: "Phoronida", weight: 1, link: '#' },
        { text: "Placozoa", weight: 1, link: '#' },
        { text: "Platyhelminthes", weight: 1, link: '#' },
        { text: "Pogonophora", weight: 1, link: '#' },
        { text: "Porifera", weight: 1, link: '#' },
        { text: "Priapula", weight: 1, link: '#' },
        { text: "Rotifera", weight: 1, link: '#' },
        { text: "Sipuncula", weight: 1, link: '#' },
        { text: "Tardigrada", weight: 1, link: '#' }
    ];

    _.forEach(tags, function(t) {
        t.weight = _.random(5, 15);
    })

    $('#tagcloud').jQCloud(tags, {
        autoResize: true,
        fontSize: {
            from: 0.05,
            to: 0.01
        }
    });

    test_images = [
        "img/test/slide1.png",
        "img/test/slide2.png",
        "img/test/slide3.png",
        "img/test/slide4.png",
        "img/test/slide5.png",
        "img/test/slide6.png",
        "img/test/slide7.png",
        "img/test/slide8.png",
        "img/test/slide9.png"
    ];

    test_data = [
        { title: "?", commonName: "Salty Clam", sciName: "Phyllopodopsyllus sp.", id: "4208965", guid: 6516516984961621, type: "zoomify", url: "#" },
        { title: "?", commonName: "Dereticulated Clownworm", sciName: "Aedes sollicitans", id: "4216540", guid: 658490165191651, type: "slider", url: "#" },
        { title: "?", commonName: "Common Sea Sponge", sciName: "Cyathura polita", id: "9849106", guid: 68794605494650, type: "zoomify", url: "#" },
        { title: "?", commonName: "Knifeworm", sciName: "Scottolana canadensis", id: "8498406", guid: 97906519849801, type: "slider", url: "#" },
        { title: "?", commonName: "Atlantic Horror of the Deep", sciName: "Gammarus palustrus", id: "9879840", guid: 5665191849810, type: "slider", url: "#" },
        { title: "?", commonName: "Greater Bloodsponge", sciName: "Argiope sp.", id: "90849840", guid: 44132104561, type: "zoomify", url: "#" },
        { title: "Sponge Spicules", commonName: "Some Kind of Crab", sciName: "Tubificoides wasselli", id: "13211048", guid: 654104602619540, type: "zoomify", url: "#" },
        { title: "?", commonName: "Sea Pickle", sciName: "Tubificoides benedeni", id: "748948940", guid: 5108965189489040, type: "zoomify", url: "#" },
        { title: "?", commonName: "Giant Barnacle", sciName: "Gammarus sp.", id: "4018987", guid: 103213134849890, type: "zoomify", url: "#" },
        { title: "?", commonName: "Praying Mantis Shrimp", sciName: "Aedes sp.", id: "54691984", guid: 5695498498108940, type: "slider", url: "#" },
        { title: "?", commonName: "Painted Sillyworm", sciName: "Cyathura sp.", id: "6549870", guid: 4984891981980, type: "slider", url: "#" },
        { title: "?", commonName: "False Crab", sciName: "Tubificoides sp.", id: "10811234", guid: 98798409598498049, type: "zoomify", url: "#" }
    ];

    _.forEach(test_data, function(d) {
        var thumb = $("#thumbnail-template").html();
        thumb = thumb.replace("%%IMG%%", _.sample(test_images));
        thumb = thumb.replace("%%GUID%%", "thumb_" + d.guid);
        thumb = thumb.replace("%%HOVERIMGTYPE%%", "img/thumbhover_" + d.type + ".png");
        thumb = thumb.replace("%%ID%%", "IRN: " + d.id);
        thumb = thumb.replace("%%COMNAME%%", d.commonName);
        thumb = thumb.replace("%%TITLE%%", d.title == "?" ? d.commonName : d.title + "<br />" + d.commonName); // if title is blank, use common name
        thumb = thumb.replace("%%SCINAME%%", d.sciName);
        thumb = thumb.replace("%%URL%%", d.url);

        $("#results").append(thumb);
    });


    parsed_sampled_sqldata = _.sampleSize(parsed_sqldata, numItems);

    _.forEach(parsed_sampled_sqldata, function(row) {
        loadData(row.irn, row.catalog_number)
    })










    var cw = $('.thumbnail').eq(0).width();
    $('.thumbnail').css({ 'height': cw + 'px' });




    // ==================================== EVENT LISTENERS ==================================== //

    $(window).resize(function() {
        var cw = $('.thumbnail').eq(0).width();
        $('.thumbnail').css({ 'height': cw + 'px' });
    })

    $(".thumbnail").on("mouseover", function() {
        $(this).find("img.thumbnail-hoverimg").css("opacity", 1.0);
    })


    $(".thumbnail").on("mouseout", function() {
        $(this).find("img.thumbnail-hoverimg").css("opacity", 0);
    })























});


function loadData(irn, catalogNum) {


    var url = "http://deliver.odai.yale.edu/info/repository/YPM/object/" + catalogNum + "/type/4";

    var jqxhr = $.getJSON(url, function(data) {
            console.log("GET successful: " + url);
        })
        .done(function(data) {
            console.log("Request complete.  Writing javascript variable. IRN: " + irn);

            var repo = _.findLast(data, function(a) {
                // console.log(data);
                return a.metadata.repositoryID == irn;
            });

            var stuff = { caption: repo.metadata.caption, thumbnail: repo.derivatives["2"].source };
            console.log("return: ")
            console.log(stuff);
            return stuff;

        })
        .fail(function() {
            console.log("Error requesting " + url);
            return { caption: null, thumbnail: null };
        })
        .always(function() {
            console.log("jqxhr request complete.");
            return { caption: null, thumbnail: null };
        });

    // Perform other work here ...

}