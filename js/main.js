var tags = [];

$(document).ready(function() {


    tags = [
        { text: "Acanthocephala", weight: 7, link: '#' },
        { text: "Annelida", weight: 10, link: '#' },
        { text: "Arthropoda", weight: 13, link: '#' },
        { text: "Brachiopoda", weight: 8, link: '#' },
        { text: "Bryozoa", weight: 10, link: '#' },
        { text: "Chaetognatha", weight: 6, link: '#' },
        { text: "Cnidaria", weight: 13, link: '#' },
        { text: "Ctenophora", weight: 8, link: '#' },
        { text: "Echinodermata", weight: 6, link: '#' },
        { text: "Echiura", weight: 11, link: '#' },
        { text: "Entoprocta", weight: 6, link: '#' },
        { text: "Gastrotricha", weight: 13, link: '#' },
        { text: "Gnathostomulida", weight: 10, link: '#' },
        { text: "Kinorhyncha", weight: 8, link: '#' },
        { text: "Loricifera", weight: 7, link: '#' },
        { text: "Mesozoa", weight: 3, link: '#' },
        { text: "Mollusca", weight: 18, link: '#' },
        { text: "Nematoda", weight: 8, link: '#' },
        { text: "Nematomorpha", weight: 11, link: '#' },
        { text: "Nemertea", weight: 15, link: '#' },
        { text: "Onychophora", weight: 13, link: '#' },
        { text: "Pentastoma", weight: 15, link: '#' },
        { text: "Phoronida", weight: 5, link: '#' },
        { text: "Placozoa", weight: 4, link: '#' },
        { text: "Platyhelminthes", weight: 13, link: '#' },
        { text: "Pogonophora", weight: 11, link: '#' },
        { text: "Porifera", weight: 13, link: '#' },
        { text: "Priapula", weight: 8, link: '#' },
        { text: "Rotifera", weight: 5, link: '#' },
        { text: "Sipuncula", weight: 13, link: '#' },
        { text: "Tardigrada", weight: 10, link: '#' }
    ];

    $('#tagcloud').jQCloud(tags, {
        autoResize: true,
        fontSize: {
            from: 0.05,
            to: 0.01
        }
    });











































});