var targetCdsData;
var targetSqlData;


var parsed_sqldata = [];

var numRelated = 0;

var locString = "";
var mapString = "";
var searchString = "";

var theCaption = "";

var record_irn;
var record_catalogNum;
var record_type;
var labelVisibility = true;

var lastTimeMouseMoved = "";

var irnIndexZ, irnIndexS;

$(window).load(function () {

	record_irn = qs("irn");
	record_catalogNum = qs("catalogNum");
	record_type = "zoomify";
	// loadData(record_irn, record_catalogNum);
	loadDataIIIF(record_irn, record_catalogNum);

	// loadRelatedThumbnails();

	var annoUrl = window.location.href;
	annoUrl = annoUrl.split("zoomify.php").join("annotate.php");
	$("#annoButton").attr("href",annoUrl);
	if( localStorage.getItem('IZ_show_annotation_button') == "true" || localStorage.getItem("IZ_show_annotation_button") == true ) {
		$("#annoButton").fadeIn();
	}

	// load SQL data / URL variables into text area at bottom

	irnIndexZ = sqldata[0]["media-zoomify-index"];
	irnIndexS = -1;

	var place = sqldata[0].nearest_named_place;
	var country = sqldata[0].country;
	var state = sqldata[0].state_province;
	var district = sqldata[0].county_district;
	var lat = parseFloat(sqldata[0].decimal_latitude);
	var lng = parseFloat(sqldata[0].decimal_longitude);

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

	// $('.ab').mousemove(function(e) {
	// 	lastTimeMouseMoved = new Date().getTime();
	// 	var tt=setTimeout(function(){
			
	// 		var currentTime = new Date().getTime();
	// 		if(currentTime - lastTimeMouseMoved > 3000 ){
	// 			$("#annoButton").fadeIn();
	// 		}

	// 	},3000);
	// });

	$('#showAnnoSwitch').bootstrapToggle();
	$('#showAnnoSwitch').change(function() {
		toggleVisibility(true);
	});



	$('.ab').click(function(e) {
		$("#annoButton").fadeIn();
	});

	$("#annoButton").click(function(e) {
		if (localStorage.getItem("IZ_show_annotation_button") === null || localStorage.getItem("IZ_show_annotation_button") === false || localStorage.getItem("IZ_show_annotation_button") == "false" ) {
			var areYouAdmin = confirm("This operation requires administrator status.  Continue?");
			if( areYouAdmin) {
				localStorage.setItem("IZ_show_annotation_button",true);
			} else {
				e.preventDefault();
				localStorage.setItem("IZ_show_annotation_button",false);
				$("#annoButton").hide();
				return false;
			}
		}
	});

	$(window).resize(function () {
		var cw = $('.thumbnail').eq(0).width();
		$('.thumbnail').css({
			'height': cw + 'px'
		});
	})
	$(window).trigger("resize");

	$(window).on('show.bs.modal', function (e) {
		setTimeout(function () {
			$(window).trigger("resize");
		}, 500);
	});

	$(window).on('hide.bs.modal', function (e) {
		setTimeout(function () {
			$(".modalButton").removeClass("active");
			$(".modalButton").blur();
		}, 300);
	});

	$('.modal-toggle').click(function (e) {
		var tab = e.target.hash;
		$('li > a[href="' + tab + '"]').tab("show");
	});
});

function esc(str) {
	return str.split(" ").join("+");
}






function toggleVisibility (individual) {
	Z.Viewport.setLabelsVisibility(!labelVisibility, individual);
	labelVisibility = !labelVisibility;
}




// MAIN FUNCTION
function loadDataIIIF(irn, catalogNum) {
	
	_.forEach(sqldata, function (row) {
		var zoomifys = row.media_zoomify_irns.split("|");
		if (zoomifys.length == 1 && zoomifys[0] == "") {
			zoomifys = [];
		}
		var sliders = row.media_sliders_irns.split("|");
		if (sliders.length == 1 && sliders[0] == "") {
			sliders = [];
		}
		_.forEach(zoomifys, function (z) {
			var tmpdataZ = JSON.parse(JSON.stringify(row));
			// tmpdataZ.irn = z;
			if( z.indexOf(":") > -1){
				tmpdataZ.irn = z.split(":")[0];
				tmpdataZ.mm_uuid = z.split(":")[1];
			} else {
				tmpdataZ.irn = z;
				tmpdataZ.mm_uuid = z;
			}
			tmpdataZ.type = "zoomify";
			if (z != "") {
				if( record_irn != tmpdataZ.irn) {
					parsed_sqldata.push(tmpdataZ);
				}
			}
		});

		_.forEach(sliders, function (s) {
			var tmpdataS = JSON.parse(JSON.stringify(row));
			// tmpdataS.irn = s;
			if( s.indexOf(":") > -1){
				tmpdataS.irn = s.split(":")[0];
				tmpdataS.mm_uuid = s.split(":")[1];
			} else {
				tmpdataS.irn = s;
				tmpdataS.mm_uuid = s;
			}
			tmpdataS.type = "slider";
			if (s != "") {
				parsed_sqldata.push(tmpdataS);
			}
		});
	});
	// console.log(parsed_sqldata);

	$("#numRelatedCounter").html(parsed_sqldata.length);
	$("#numRelatedCounterMain").html(parsed_sqldata.length);
	var captionsList = [];
	var subCaptionsList = [];
	var sciNamesList = [];
	_.forEach(parsed_sqldata, function (item) {
		var c = item.catalog_number;
		var i = item.irn;
		var t = item.type;

		var showAnno = false;
		if( _.includes(knownAnnotations["zoomify"],i) ) {
			showAnno = true;
		}
		if( _.includes(knownAnnotations["slider"],i) ) {
			showAnno = true;
		}
		
		if( item.type == "zoomify" ) { 
			var irn_idx = 0;
			if( item['media-zoomify-captions'].indexOf("|") > -1 && item.media_zoomify_irns.indexOf("|") > -1 ) {
				var irns = item.media_zoomify_irns.split("|");
				for( var z=0; z<irns.length; z++ ) {
					if( irns[z].indexOf(":") > -1 ) {
						var irnUuid = irns[z].split(":");
						if( item.irn == irnUuid[0] ) { 
							irn_idx = z;
						}
					}
				}
				var captions = item['media-zoomify-captions'].split("|");
				var caption = captions[irn_idx];
				// var captions = item['media-zoomify-captions'].split("|");
				// var caption = captions[irnIndexZ];
			} else {
				var caption = item['media-zoomify-captions'];
			}
			subCaptionsList.push(caption);
		} else if( item.type == "slider" ) {
			var irn_idx = 0;
			if( item['media-sliders-captions'].indexOf("|") > -1 && item.media_sliders_irns.indexOf("|") > -1 ) {
				var irns = item.media_sliders_irns.split("|");
				for( var s=0; s<irns.length; s++ ) {
					if( irns[s].indexOf(":") > -1 ) {
						var irnUuid = irns[s].split(":");
						if( item.irn == irnUuid[0] ) { 
							irn_idx = s;
						}
					}
				}
				var captions = item['media-sliders-captions'].split("|");
				var caption = captions[irn_idx];
				// var captions = item['media-sliders-captions'].split("|");
				// var caption = captions[irnIndexS];
				
			} else {
				var caption = item['media-sliders-captions'];
			}
			subCaptionsList.push(caption);
		}
		var captionString = [];
		var thumbnail = "https://images.collections.yale.edu/iiif/2/ypm:" + item.mm_uuid + "/square/,120/0/default.jpg";
	
		captionString[0] = item.scientific_name;
		
		if (captionString[0].length > 1) {
	
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
			caption = captionString.join("<br />") + "<br />" + caption;
		} else {
			caption = "<span class='thumbnail-title-bold it'>" + captionString[0] + "</span>";
			var captionOriginal = captionString[0];
		}
		sciNamesList.push(captionString[0]);
		captionsList.push(caption);











		// CREATE THUMBNAILS
		var thumb = $("#thumbnail-template").html();
		thumb = thumb.replace("%%IMG%%", thumbnail);
		thumb = thumb.replace("%%GUID%%", "thumb_" + i + "_" + c);
		thumb = thumb.replace("%%HOVERIMGTYPE%%", "img/thumbhover_" + t + ".png");
		thumb = thumb.replace("%%ID%%", i);
		// thumb = thumb.replace("%%ID%%", "IRN: " + i);
		thumb = thumb.replace("%%TITLE%%", caption); // if title is blank, use common name
		thumb = thumb.replace("%%HTMLTITLE%%", sqldata[0].scientific_name); 
		thumb = thumb.replace("%%SRTITLE%%", sqldata[0].scientific_name); 
		thumb = thumb.replace("%%URL%%", t + ".php?irn=" + i + "&catalogNum=" + c);
		thumb = thumb.replace("%%IRN%%",i);
		thumb = thumb.replace("%%CATALOGNUMBER%%",c);

		// does this IRN/type combination have an annotation file?
		if( showAnno === true ) {
			thumb = thumb.replace("%%ANNO-CLASS%%"," related-thumbnail-annotated");
			thumb = thumb.replace("%%ANNO-BADGE-SHOWHIDE%%","related-thumbnail-annotated-badge");
		} else {
			thumb = thumb.replace("%%ANNO-CLASS%%","");
			thumb = thumb.replace("%%ANNO-BADGE-SHOWHIDE%%","hidden");
		}

		$("#relatedGallery").append(thumb);

		$(window).trigger("resize");

		if ($(".thumbnail-sm").length > 0) {

			$(".thumbnail-sm").on("mouseover", function () {
				$(this).find("img.thumbnail-hoverimg").css("opacity", 1.0);
			})

			$(".thumbnail-sm").on("mouseout", function () {
				$(this).find("img.thumbnail-hoverimg").css("opacity", 0);
			})
		}

	});






	// FILL IN PAGE ELEMENTS

	// Main title
	var zIdx = sqldata[0]["media-zoomify-index"];
	var captions = sqldata[0]["media-zoomify-captions"].split("|");
	var theCaption = captions[zIdx];

	// $("#specimen_title").html("<strong>" + catalogNum + ": " + captionsList[0] + "</strong>");
	$("#specimen_title").html("<strong>" + catalogNum + ": " + theCaption + "</strong>");
	$("#catalogNumModalHeader").html(catalogNum);
	$("#captionModalSubHeader").html(sciNamesList[0]);

	// theCaption = captionsList[0];

	$("#modal_taxa_phylum").html(sqldata[0].phylum);
	$("#modal_taxa_subphylum").html(sqldata[0].subphylum);
	$("#modal_taxa_superclass").html(sqldata[0].superclass);
	$("#modal_taxa_class").html(sqldata[0].class);
	$("#modal_taxa_subclass").html(sqldata[0].subclass);
	$("#modal_taxa_superorder").html(sqldata[0].superorder);
	$("#modal_taxa_order").html(sqldata[0].order);
	$("#modal_taxa_infraorder").html(sqldata[0].infraorder);
	$("#modal_taxa_family").html(sqldata[0].family);
	$("#modal_taxa_genus").html(sqldata[0].genus);
	$("#modal_taxa_species").html(sqldata[0].species);
	$("#modal_taxa_scientificName").html(sciNamesList[0]);

	// fill in locality table

	$("#modal_locality_country").html(sqldata[0].country);
	$("#modal_locality_stateProvince").html(sqldata[0].state_province);
	$("#modal_locality_countyDistrict").html(sqldata[0].county_district);
	$("#modal_locality_preciseLocality").html(sqldata[0].precise_locality);
	$("#modal_locality_nearestNamedPlace").html(sqldata[0].nearest_named_place);
	$("#modal_locality_ocean").html(sqldata[0].ocean);
	$("#modal_locality_seaGulf").html(sqldata[0].sea_gulf);
	$("#modal_locality_baySound").html(sqldata[0].bay_sound);
	$("#modal_locality_AuthorString").html(sqldata[0].author_string);
	$("#modal_locality_occurrenceID").html(sqldata[0].occurenceID);
	$("#modal_locality_mapString").html(mapString);

	// load Collections Portal URL

	$("#collectionsPortalLink").attr("href", catalogNumUrl(sqldata[0].catalog_number));
	$("#collectionsPortalLink").attr("title", "Collections Portal - " + sqldata[0].catalog_number + " - " + $("#modal_taxa_scientificName").text());

	// build common names

	var cns = sqldata[0].common_names;

	if (cns && typeof (cns) != "undefined" && cns != "") {
		cns = cns.split("|");
		cns = _.without(cns, "Animals");
		cns = _.without(cns, "animals");
		var cnsObj = [];

		_.forEach(cns, function (cn) {
			var cnObj = '<a href="results.php?q=' + esc(cn) + '" title="Search for &quot;' + cn + '&quot;" class="btn btn-sm btn-primary common-name-link"><span class="glyphicon glyphicon-search"></span>&nbsp;' + cn + '</a>';
			cnsObj.push(cnObj);
		})

		cnsObj = _.uniq(cnsObj);
		$("#commonNames").html(cnsObj.join(""));

	}

}	// END loadDataIIIF()








function loadData(irn, catalogNum) {


	var url = "//deliver.odai.yale.edu/info/repository/YPM/object/" + catalogNum + "/type/4";

	var jqxhr = $.getJSON(url, function (data) {
			console.log("GET successful: " + url);
		})
		.done(function (data) {
			console.log("Request complete.  Writing javascript variable.");

			targetCdsData = data;

			var repo = _.findLast(targetCdsData, function (a) {
				return a.metadata.repositoryID == irn;
			});
			// console.log(repo);

			var captionString = repo.metadata.caption;
			var caption = "";

			captionString = captionString.split(":");
			if (captionString.length > 1) {
				captionString = captionString[1];
				if (captionString[0] == " ") {
					captionString = captionString.substr(1);
				}
			} else {
				captionString = captionString[0];
			}
			// console.log(captionString)
			captionString = captionString.split(";");
			_.forEach(captionString, function (cs) {
				if (cs.toString()[0] == " ") {
					cs = cs.substr(1);
				}
			})

			if (captionString.length > 1) {

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

				// $("#captionModalSubHeader").html("<span class='thumbnail-title it'>" + captionString[0] + "</span>");
				captionString[0] = "<span class='thumbnail-title-bold it'>" + captionString[0] + "</span>";
				caption = captionString.join("");
			} else {
				caption = "<span class='thumbnail-title-bold it'>" + captionString[0] + "</span>";
				captionString[0] = "<span class='thumbnail-title-bold it'>" + captionString[0] + "</span>";
			}
			$("#specimen_title").html("<strong>" + catalogNum + ": " + caption + "</strong>");
			$("#catalogNumModalHeader").html(catalogNum);
			$("#captionModalSubHeader").html(captionString[0]);

			theCaption = caption;

		})
		.fail(function () {
			console.log("Error requesting " + url);
		})
		.always(function () {
			console.log("jqxhr request complete.");
		});

	// Perform other work here ...

}

function catalogNumUrl(c) {
	return "//collections.peabody.yale.edu/search/Record/YPM-" + c.replace(".", "-");
}







(function ($) {

	$.fn.shuffle = function () {

		var allElems = this.get(),
			getRandom = function (max) {
				return Math.floor(Math.random() * max);
			},
			shuffled = $.map(allElems, function () {
				var random = getRandom(allElems.length),
					randEl = $(allElems[random]).clone(true)[0];
				allElems.splice(random, 1);
				return randEl;
			});

		this.each(function (i) {
			$(this).replaceWith($(shuffled[i]));
		});

		return $(shuffled);

	};

})(jQuery);
