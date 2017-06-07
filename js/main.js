var tags = [];
var test_images = [];
var test_data = [];
var numThumbs = 12;

$(document).ready(function() {

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
        { title: "?", commonName: "Salty Clam", sciName: "Phyllopodopsyllus sp.", id: "IZ.198151", guid: 6516516984961621, type: "zoomify", url: "#" },
        { title: "?", commonName: "Dereticulated Clownworm", sciName: "Aedes sollicitans", id: "IZ.994751", guid: 658490165191651, type: "slider", url: "#" },
        { title: "?", commonName: "Common Sea Sponge", sciName: "Cyathura polita", id: "IZ.984523", guid: 68794605494650, type: "zoomify", url: "#" },
        { title: "?", commonName: "Knifeworm", sciName: "Scottolana canadensis", id: "IZ.012672", guid: 97906519849801, type: "slider", url: "#" },
        { title: "?", commonName: "Atlantic Horror of the Deep", sciName: "Gammarus palustrus", id: "IZ.123456", guid: 5665191849810, type: "slider", url: "#" },
        { title: "?", commonName: "Greater Bloodsponge", sciName: "Argiope sp.", id: "IZ.561987", guid: 44132104561, type: "zoomify", url: "#" },
        { title: "Sponge Spicules", commonName: "Some Kind of Crab", sciName: "Tubificoides wasselli", id: "IZ.317811", guid: 654104602619540, type: "zoomify", url: "#" },
        { title: "?", commonName: "Sea Pickle", sciName: "Tubificoides benedeni", id: "IZ.884165", guid: 5108965189489040, type: "zoomify", url: "#" },
        { title: "?", commonName: "Giant Barnacle", sciName: "Gammarus sp.", id: "IZ.068465", guid: 103213134849890, type: "zoomify", url: "#" },
        { title: "?", commonName: "Praying Mantis Shrimp", sciName: "Aedes sp.", id: "IZ.884165", guid: 5695498498108940, type: "slider", url: "#" },
        { title: "?", commonName: "Painted Sillyworm", sciName: "Cyathura sp.", id: "IZ.655872", guid: 4984891981980, type: "slider", url: "#" },
        { title: "?", commonName: "False Crab", sciName: "Tubificoides sp.", id: "IZ.108946", guid: 98798409598498049, type: "zoomify", url: "#" }
    ];

    // var img = _.sample(test_images);

    _.forEach(test_data, function(d) {
        var thumb = $("#thumbnail-template").html();
        thumb = thumb.replace("%%IMG%%", _.sample(test_images));
        thumb = thumb.replace("%%GUID%%", "thumb_" + d.guid);
        thumb = thumb.replace("%%HOVERIMGTYPE%%", "img/thumbhover_" + d.type + ".png");
        thumb = thumb.replace("%%ID%%", d.id);
        thumb = thumb.replace("%%COMNAME%%", d.commonName);
        thumb = thumb.replace("%%TITLE%%", d.title == "?" ? d.commonName : d.title); // if title is blank, use common name
        thumb = thumb.replace("%%SCINAME%%", d.sciName);
        thumb = thumb.replace("%%URL%%", d.url);

        // console.log(thumb);

        $("#results").append(thumb);
    });

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