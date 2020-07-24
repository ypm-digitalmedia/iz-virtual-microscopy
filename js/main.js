var taxa_keywords_obj = {
	class: [],
	order: [],
	genus: [],
	phylum: [],
	species: [],
	family: [],
	subphylum: [],
	superclass: [],
	superorder: [],
	subclass: [],
	scientific_name: [],
	infraorder: []
};

var themes_obj = {
	sliders: [],
	zoomify: []
};
var themes = [];
var themesCondensed;
var themesCount = {};

var tags = [];
var tagsCondensed;
var tagsCount = [];

var test_images = [];
var test_data = [];
var live_data = [];
var numItems = 12;
var max_parsed_sqldata = null;
var parsed_sqldata = [];
var parsed_sampled_sqldata = [];
var cdsData = [];

var known_annotations = [];

var shown_slides = [];

$(document).ready(function () {

	// parse annotations
	console.log("known annotations",knownAnnotations);
	knownAnnotations.zoomify = knownAnnotations.zoomify.split(",");
	knownAnnotations.slider = knownAnnotations.slider.split(",");

	// parse SQL and create individual presentations for SQL data
	// build array of tags from live data (taxa information)
	_.forEach(sqldata, function (row) {

		var zoomifys = row.media_zoomify_irns.split("|");
		if (zoomifys.length == 1 && zoomifys[0] == "") {
			zoomifys = [];
		}
		_.forEach(zoomifys, function (z) {
			var tmpdataZ = JSON.parse(JSON.stringify(row));
			tmpdataZ.irn = z;
			tmpdataZ.type = "zoomify";
			if (z != "") {
				parsed_sqldata.push(tmpdataZ);
			}
		});

		var sliders = row.media_sliders_irns.split("|");
		if (sliders.length == 1 && sliders[0] == "") {
			sliders = [];
		}
		_.forEach(sliders, function (s) {
			var tmpdataS = JSON.parse(JSON.stringify(row));
			tmpdataS.irn = s;
			tmpdataS.type = "slider";
			if (s != "") {
				parsed_sqldata.push(tmpdataS);
			}
		});

		themes_obj.zoomify.push(row['media-zoomify-themes']);
		themes_obj.sliders.push(row['media-sliders-themes']);

		var themes = "";




		// build taxa keywords object
		taxa_keywords_obj.class.push(row.class);
		taxa_keywords_obj.order.push(row.order);
		taxa_keywords_obj.genus.push(row.genus);
		taxa_keywords_obj.phylum.push(row.phylum);
		taxa_keywords_obj.species.push(row.species);
		taxa_keywords_obj.family.push(row.family);
		taxa_keywords_obj.subphylum.push(row.subphylum);
		taxa_keywords_obj.superclass.push(row.superclass);
		taxa_keywords_obj.superorder.push(row.superorder);
		taxa_keywords_obj.subclass.push(row.subclass);
		taxa_keywords_obj.scientific_name.push(row.scientific_name);
		taxa_keywords_obj.infraorder.push(row.infraorder);

		// build thematic searches object

	});

	// console.log("parsed data: ");
	// console.log(parsed_sqldata);




	if (thePage == "results") {

		var theQuery = qs('q');
		var theTheme = qs('t');

		if (theQuery && !theTheme) {
			//query, no theme

			makeTags();
			makeThemes();
			sampleSlides();

			$("#queryNum").html(max_parsed_sqldata);
			$("#queryType").html(" results for ");
			$("#queryText").html(unesc(qs("q")));
			$("#search").val(unesc(qs("q")));
			$("#search").focus();

		} else if (theTheme && !theQuery) {
			//theme, no query
			makeTags();
			makeThemes();
			sampleSlides();

			// $("#theme").val(unesc(qs("t")));

			$("#queryNum").html(max_parsed_sqldata);
			$("#queryType").html(" results for theme: ");
			$("#queryText").html(unesc(qs("t")));
			setSelect("theme",unesc(qs("t")));

		} else if( theQuery && theTheme ) {
			//query and theme
			makeTags();
			makeThemes();
			sampleSlides();
			
			$("#queryNum").html(max_parsed_sqldata);
			$("#search").val(unesc(qs("q")));
			$("#queryType").html(" results for ");
			$("#queryText").html(unesc(qs("q")) + " [" + unesc(qs("t")) + "]");
			$("#search").val(unesc(qs("q")));
			setSelect("theme",unesc(qs("t")));
			
		} else {
			alert("QUERY ERROR");
		}
		
	} else if (thePage == "home") {
		makeTags();
		makeThemes();
		sampleSlides();
		$("#search").focus();
	}





	// var cw = $('.thumbnail').eq(0).width();
	// $('.thumbnail').css({ 'height': cw + 'px' });









	// ==================================== EVENT LISTENERS ==================================== //

	$(window).resize(function () {
		var cw = $('.thumbnail').eq(0).width();
		$('.thumbnail').css({
			'height': cw + 'px'
		});
	})


	// $(".thumbnail").on("mouseover", function() {
	//     $(this).find("img.thumbnail-hoverimg").css("opacity", 1.0);
	// })


	// $(".thumbnail").on("mouseout", function() {
	//     $(this).find("img.thumbnail-hoverimg").css("opacity", 0);
	// })



});

function setSelect(theID,theVal) {
	
	var dd = document.getElementById(theID);
	for (var i = 0; i < dd.options.length; i++) {
		if (dd.options[i].text === theVal) {
			dd.selectedIndex = i;
			break;
		}
	}
	
}

function search() {
	var anySearch = false;
	var anyTheme = false;
	var searchURL = "results.php?";
	var searchQs = [];
	
	var searchTerm = $("#search").val();
	var themeTerm = $("#theme").find(":selected").val();
	if ( searchTerm && searchTerm != "" && searchTerm != " " ) {
		anySearch = true;
		searchQs.push("q=" + esc(searchTerm));
	}
	if( themeTerm && themeTerm != "" ) {
		anyTheme = true;
		searchQs.push("t=" + esc(themeTerm));
	}
	
	if( themeTerm || searchTerm ) {
//		document.location = "results.php?q=" + esc(searchTerm);
//		document.location = "results.php?t=" + esc(themeTerm);
		document.location = searchURL + searchQs.join("&");
//		alert("anySearch: " + anySearch + "\n" + "anyTheme: " + anyTheme + "\n" + "search text: " + searchTerm + "\n" + "theme: " + themeTerm + "\n" + "search URL: " + searchURL + searchQs.join("&"));
	} else {
		alert("Please enter a search term, select a theme, or both.");
	}
}

function goTheme() {
	var themeTerm = $("#theme").find(":selected").text();
	if (themeTerm != "") {
		document.location = "results.php?t=" + esc(themeTerm);
	} else {
		alert("Please select an option.");
	}
}

function esc(str) {
	return str.split(" ").join("+");
}


function unesc(str) {
	return str.split("+").join(" ");
}


function sampleSlides() {
	
	if (max_parsed_sqldata == null) {
		max_parsed_sqldata = parsed_sqldata.length;
	}

	if (parsed_sqldata.length > 0) {

		for (var a = 0; a < numItems; a++) {
			var targetItem = _.sample(parsed_sqldata);
			// console.log(targetItem);

			if (targetItem && typeof (targetItem) != "undefined") {
				parsed_sqldata = _.reject(parsed_sqldata, function (o) {
					return o.irn == targetItem.irn && o.catalog_number == targetItem.catalog_number && o.type == targetItem.type;
				});

				$("#numRemaining").html(" (" + parsed_sqldata.length + ")");

				parsed_sampled_sqldata.push(targetItem);

				loadData(targetItem.irn, targetItem.catalog_number, targetItem.type);
			}
		}
	} else {
		$("#browseMoreButton").removeClass("btn-primary").addClass("disabled");
	}

}

function makeThemes() {
	themesCondensed = themes_obj.sliders.concat(themes_obj.zoomify);
	themesCondensed = _.without(themesCondensed, "");
	// console.warn("THEMES CONDENSED:");
	// console.warn(themesCondensed);

	_.forEach(themesCondensed, function (t) {
		var arr = t.split("|");
		_.forEach(arr, function (tt) {
			themes.push(tt);
		});
	});

	// console.warn("THEMES FINAL:");
	// console.warn(themes);

	themes = _.without(themes, "");
	themes = _.uniq(themes);
	themes.sort();
	// console.warn(themes);


	_.forEach(themes, function (ttt) {

		// var selectedString = ttt == unesc(qs('t')) ? " selected" : "";
		var selectedString = "";
		var selectOption = '<option value="' + ttt + '"' + selectedString + '>' + ttt + '</option>';
		$("#theme").append(selectOption);
	});

	if (thePage == "results") {
		if (qs("t") && !qs("q")) {
			$('#theme option[value=\"' + unesc(qs("t")) + '\"]').attr('selected', 'selected');
		} else if (!qs("t") && qs("q")) {
			$('#theme').prop('selectedIndex', 0);
		}
	}

}


function makeTags() {

	// tagsCondensed = _.union(taxa_keywords_obj.class, taxa_keywords_obj.order, taxa_keywords_obj.genus, taxa_keywords_obj.phylum, taxa_keywords_obj.species, taxa_keywords_obj.family);

	// tagsCondensed = taxa_keywords_obj.class.concat(taxa_keywords_obj.order).concat(taxa_keywords_obj.genus).concat(taxa_keywords_obj.phylum).concat(taxa_keywords_obj.species).concat(taxa_keywords_obj.family);
	
	var themeSuffix = "";
	if (thePage == "results") {

		var theTheme = qs('t');
		 if( theTheme && theTheme != "" && theTheme != " " ) {
			themeSuffix = "&t=" + esc(theTheme);
		 }
	}
	
	tagsCondensed = taxa_keywords_obj.class.concat(taxa_keywords_obj.order).concat(taxa_keywords_obj.genus).concat(taxa_keywords_obj.phylum).concat(taxa_keywords_obj.family).concat(taxa_keywords_obj.subphylum).concat(taxa_keywords_obj.superclass).concat(taxa_keywords_obj.superorder).concat(taxa_keywords_obj.subclass).concat(taxa_keywords_obj.infraorder);
	// tagsCondensed = _.uniq(tagsCondensed);
	tagsCondensed = _.without(tagsCondensed, "");

	_.forEach(tagsCondensed, function (tag) {
		var arr = _.filter(tagsCondensed, function (o) {
			return o == tag
		})
		var linkstr = "results.php?q=" + esc(tag) + themeSuffix;
		if( thePage == "results" ) {
			if( qs('q') ) {
				if( tag.toLowerCase() != qs('q').toLowerCase() ) {
					tagsCount.push({
						text: tag,
						weight: arr.length,
						link: linkstr
					});
				}
			} else {
				tagsCount.push({
					text: tag,
					weight: arr.length,
					link: linkstr
				});
			}
		} else {
			tagsCount.push({
				text: tag,
				weight: arr.length,
				link: linkstr
			});
		}
	});

	tags = _.uniqBy(tagsCount, 'text');
	tags = _.orderBy(tags, 'weight', 'desc');


	$('#tagcloud').jQCloud(tags, {
		autoResize: true,
		// fontSize: {
		//     from: 0.05,
		//     to: 0.01
		// }
	});
}


function clone(oldObject) {
	var newObject = jQuery.extend(true, {}, oldObject);
	return newObject;
}


function loadData(i, c, t) {

	var url = "http://deliver.odai.yale.edu/info/repository/YPM/object/" + c + "/type/4";

	var jqxhr = $.getJSON(url, function (data) {
			console.log("GET successful: " + url);
		})
		.done(function (data) {
			console.log("Request complete.  Writing javascript variable. IRN: " + i + ", catalog number: " + c);

			var repo = _.findLast(data, function (a) {
				// console.log(data);
				return a.metadata.repositoryID == i;
			});
			console.log(repo);

			// var stuff = { irn: i, catalogNum: c, caption: repo.metadata.caption, thumbnail: repo.derivatives["2"].source };
			// console.log("return: ")
			// console.log(stuff);
			cdsData.push({
				irn: i,
				catalogNum: c,
				caption: repo.metadata.caption,
				thumbnail: repo.derivatives["2"].source
			});

			var captionString = repo.metadata.caption;
			var caption = "";
			var thumbnail = repo.derivatives["2"].source;

			captionString = captionString.split(":");
			if (captionString.length > 1) {
				captionString = captionString[1];
				if (captionString[0] == " ") {
					captionString = captionString.substr(1);
				}
			} else {
				captionString = captionString[0];
			}
			// console.log(captionString);

			captionString = captionString.split(";");
			_.forEach(captionString, function (cs) {
				if (cs.toString()[0] == " ") {
					cs = cs.substr(1);
				}
			})
			if (captionString.length > 1) {

				var captionOriginal = captionString[0];

				if (captionString[0].indexOf("sp.") > -1) {
					captionString[0] = captionString[0].replace("sp.", "<span class='noit'>sp.</span>");
				}
				if (captionString[0].indexOf("nf.") > -1) {
					captionString[0] = captionString[0].replace("nf.", "<span class='noit'>nf.</span>");
				}
				if (captionString[0].indexOf("cf.") > -1) {
					captionString[0] = captionString[0].replace("cf.", "<span class='noit'>cf.</span>");
				}
				if (captionString[0].indexOf("spp.") > -1) {
					captionString[0] = captionString[0].replace("spp.", "<span class='noit'>spp.</span>");
				}
				if (captionString[0].indexOf("var.") > -1) {
					captionString[0] = captionString[0].replace("var.", "<span class='noit'>var.</span>");
				}


				captionString[0] = "<span class='thumbnail-title-bold it'>" + captionString[0] + "</span>";
				caption = captionString.join("<br />");
			} else {
				caption = "<span class='thumbnail-title-bold it'>" + captionString[0] + "</span>";
				var captionOriginal = captionString[0];
			}
			// console.log(caption);

			// CREATE THUMBNAILS
			var thumb = $("#thumbnail-template").html();
			thumb = thumb.replace("%%IMG%%", thumbnail);
			thumb = thumb.replace("%%GUID%%", "thumb_" + i + "_" + c);
			thumb = thumb.replace("%%HOVERIMGTYPE%%", "img/thumbhover_" + t + ".png");
			thumb = thumb.replace("%%ID%%", c);
			// thumb = thumb.replace("%%ID%%", "IRN: " + i);
			thumb = thumb.replace("%%TITLE%%", caption); // if title is blank, use common name
			thumb = thumb.replace("%%URL%%", t + ".php?irn=" + i + "&catalogNum=" + c);
			thumb = thumb.replace("%%IRN%%",i);
			thumb = thumb.replace("%%CATALOGNUMBER%%",c);

			// does this IRN/type combination have an annotation file?
			if( _.includes(knownAnnotations[t],i) ) {
				thumb = thumb.replace("%%ANNO-CLASS%%"," thumbnail-annotated");
				thumb = thumb.replace("%%ANNO-BADGE-SHOWHIDE%%","thumbnail-annotated-badge");
				thumb = thumb.replace("%%SR-TITLE%%",c + ": " + captionOriginal + " - Annotations available");
			} else {
				thumb = thumb.replace("%%ANNO-CLASS%%","");
				thumb = thumb.replace("%%ANNO-BADGE-SHOWHIDE%%","hidden");
				thumb = thumb.replace("%%SR-TITLE%%",c + ": " + captionOriginal);
			}

			$("#results").append(thumb);

			$(window).trigger("resize");

			if ($(".thumbnail").length > 0) {

				$(".thumbnail").on("mouseover", function () {
					$(this).find("img.thumbnail-hoverimg").css("opacity", 1.0);
				})

				$(".thumbnail").on("mouseout", function () {
					$(this).find("img.thumbnail-hoverimg").css("opacity", 0);
				})
			}

		})
		.fail(function () {
			console.log("Error requesting " + url);
			// return { caption: null, thumbnail: null };
		})
		.always(function () {
			console.log("jqxhr request complete.");
			// return { caption: null, thumbnail: null };
		});

	// Perform other work here ...

}

function isFile(filename) {
    fetch(filename).then(function(response) {
        if (!response.ok) { 
		// throw Error(); 
		}
        return response;
    }).then(function(response) {
            console.log("true");
            return true;
    }).catch(function(error) {
            console.log("false");
            return false;
    });
}