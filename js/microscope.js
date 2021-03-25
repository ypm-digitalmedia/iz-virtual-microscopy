var frame = 0;
var maxFrames = 0;
var knob;
var mouseScrollFactor = 0.5;

var numRelated = 0;

var targetCdsData;
var targetSqlData;


var parsed_sqldata = [];

var locString = "";
var mapString = "";
var searchString = "";

var theCaption = "";

$(window).load(function () {

	$.blockUI({
		css: {
			'opacity': '0.9'
		},
		message: imageloadmessage,
		onBlock: function () {
			$.when(loadImages()).done(function (total) {
				// console.log(total);
				$.when(loadSlider(total)).done(function () {
					var step = 100 / total;
					console.log("100 / " + total + " = " + step)
					for (var x = 0; x <= total; x++) {
						changeSlideValue(x);
					}

					var iter = 0;
					setInterval(function () {
						var pct = step * iter;
						if (pct <= 100) {
							$(".message-bg").css("width", pct + "%");
							iter++;
						} else {

							$(".message-bg").css("width", "100%");
						}
					}, 50)

					setTimeout(function () {
						$.unblockUI();
					}, (total + 1) * 50);
					setTimeout(function () {
						changeSlideValue(0);
					}, (total + 2) * 50);
				});
				console.log("maximum value: " + maxFrames);
				makeKnob(maxFrames);
			})
		}
	});


	$("#precision_knob").on("change", function (e) {
		console.log("setting precision to " + e.value);
		mouseScrollFactor = e.value;

	});

	$("#knob").on("change", function (e) {
		changeSlideValueInstant(e.value);
	});



	$('#slideshow').on('mousewheel', function (event) {
		// console.log(event.deltaX, event.deltaY, event.deltaFactor);
		frame += parseInt(Math.round(event.deltaY) * mouseScrollFactor);
		if (frame < 0) {
			frame = 0;
		}
		if (frame > maxFrames) {
			frame = maxFrames;
		}
		console.log(frame);
		knob.option("value", frame);
		changeSlideValueInstant(frame);
	});

	$("#precision_knob").roundSlider({
		sliderType: "default",
		circleShape: "quarter",
		value: 0.5,
		keyboardAction: true,
		mouseScrollAction: true,
		step: 0.05,
		min: 0.05,
		max: 1.0,
		editableTooltip: true,
	});

	var record_irn = qs("irn");
	var record_catalogNum = qs("catalogNum");
	// loadData(record_irn, record_catalogNum);
	loadDataIIIF(record_irn, record_catalogNum);
	// loadRelatedThumbnails();

	var annoUrl = window.location.href;
	annoUrl = annoUrl.split("slider.php").join("annotate.php");
	$("#annoButton").attr("href",annoUrl);
	if( localStorage.getItem('IZ_show_annotation_button') == "true" || localStorage.getItem("IZ_show_annotation_button") == true ) {
		$("#annoButton").fadeIn();
	}

	// load SQL data / URL variables into text area at bottom


	var place = sqldata[0].nearest_named_place;
	var district = sqldata[0].county_district;
	var state = sqldata[0].state_province;
	var country = sqldata[0].country;
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
	$("#specimen_id").html("<strong>" + ids.catalogNum + "</strong> &ndash; IRN <strong>" + ids.irn + "</strong>");


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


function loadDataIIIF(irn, catalogNum) {

	_.forEach(sqldata, function (row) {
		var zoomifys = row.media_zoomify_irns.split("|");
		if (zoomifys.length == 1 && zoomifys[0] == "") {
			zoomifys = [];
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
				parsed_sqldata.push(tmpdataZ);
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
		// console.log(caption);














		// CREATE THUMBNAILS
		var thumb = $("#thumbnail-template").html();
		thumb = thumb.replace("%%IMG%%", thumbnail);
		thumb = thumb.replace("%%GUID%%", "thumb_" + i + "_" + c);
		thumb = thumb.replace("%%HOVERIMGTYPE%%", "img/thumbhover_" + t + ".png");
		thumb = thumb.replace("%%ID%%", i);
		// thumb = thumb.replace("%%ID%%", "IRN: " + i);
		thumb = thumb.replace("%%TITLE%%", subCaptionsList[0]); // if title is blank, use common name
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
	// console.log(captionsList)
	// FILL IN PAGE ELEMENTS

	$("#specimen_title").html("<strong>" + catalogNum + ": " + captionsList[0] + "</strong>");
	$("#catalogNumModalHeader").html(catalogNum);
	$("#captionModalSubHeader").html(sciNamesList[0]);

	theCaption = captionsList[0];

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
			// console.log(captionString);
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




function loadRelatedThumbnails() {
	var sliderIrns = sqldata[0].media_sliders_irns.split("|");
	var zoomifyIrns = sqldata[0].media_zoomify_irns.split("|");
	var catalogNum = sqldata[0].catalog_number;

	// console.warn(sliderIrns);
	// console.warn(zoomifyIrns);

	_.forEach(zoomifyIrns, function (zi) {
		if (zi != "") {
			if( zi.indexOf(":") > -1){
				var i = zi.split(":")[0];
				var u = zi.split(":")[1];
			} else {
				var i = zi;
				var u = zi;
			}
			if( _.includes(knownAnnotations["zoomify"],i) ) {
				var showAnno = true;
			} else { var showAnno = false; }
			// loadDataModal(z, catalogNum, "zoomify", showAnno);
			// loadDataModal(i, catalogNum, "zoomify", showAnno);
			// loadDataModalIIIF(i, u, catalogNum, "zoomify", showAnno);
			numRelated++;
			// console.log(zi);
		}
	});

	_.forEach(sliderIrns, function (si) {
		if (si != "") {
			if( si.indexOf(":") > -1){
				var i = si.split(":")[0];
				var u = si.split(":")[1];
			} else {
				var i = si;
				var u = si;
			}
			if( _.includes(knownAnnotations["slider"],i) ) {
				var showAnno = true;
			} else { var showAnno = false; }
			// loadDataModal(s, catalogNum, "slider", showAnno);
			// loadDataModal(i, catalogNum, "slider", showAnno);
			// loadDataModalIIIF(i, u, catalogNum, "slider", showAnno);
			numRelated++;
			// console.log(si);
		}
	});

	$("#numRelatedCounter").html(numRelated);
	$("#numRelatedCounterMain").html(numRelated);
	// $("#catalogNumModalHeader").html(catalogNum);
	// $('#relatedGallery').shuffle();
}








function makeKnob(maximum) {
	$("#knob").roundSlider({
		sliderType: "default",
		circleShape: "full",
		value: 0,
		keyboardAction: true,
		mouseScrollAction: true,
		step: 1,
		min: 0,
		max: maximum,
		editableTooltip: false,
	});
	knob = $("#knob").data("roundSlider");
}

function loadImages() {
	var code = 200;
	for (var x = 0; code == 200; x++) {
		var filenum = pad(x, 3);

		var url = imagefolderlocation + "/" + imagename + filenum + ".jpg";
		// console.log(url);
		code = urlExists(url);
		if (code == 200) {
			// $("#slideshow").append('<img style="position: absolute; top: 0px; left: 0px; z-index: ' + (x + 1) + '; opacity: 1;" src="' + url + '" height="' + imageheight + '">');
			$("#slideshow").append('<img style="position: absolute; z-index: ' + (x + 1) + '; opacity: 1;" src="' + url + '">');
			maxFrames = parseInt(filenum);
			console.log("new image found: #" + maxFrames);
		}
	}
	$("#slideshow").height(imageheight);
	return x - 2;
}

function changeSlideValue(num) {

	setTimeout(function () {
		$('#slider').slider('value', num);
		$("#slideshow").cycle(num);
	}, (num + 1) * 50);

}

function changeSlideValueInstant(num) {

	$('#slider').slider('value', num);
	$("#slideshow").cycle(num);

}

function loadSlider(total) {
	// call cycle immediately, without a ready handler
	$('#slideshow').cycle({
		fx: 'none',
		timeout: 0
	});

	$("#slider").slider({
		range: "min",
		min: 0,
		max: total,
		value: 0,
		slide: function (event, ui) {
			$("#slideshow").cycle(ui.value);
			knob.option("value", ui.value);
		}
	}).slider('pips');


}

function urlExists(testUrl) {
	var http = jQuery.ajax({
		type: "HEAD",
		url: testUrl,
		async: false
	})
	return http.status;
	// this will return 200 on success, and 0 or negative value on error
}

function pad(num, size) {
	var s = num + "";
	while (s.length < size) s = "0" + s;
	return s;
}



function loadDataModal(i, c, t, a) {


	var url = "//deliver.odai.yale.edu/info/repository/YPM/object/" + c + "/type/4";

	var jqxhr = $.getJSON(url, function (data) {
			console.log("GET successful: " + url);
		})
		.done(function (data) {
			console.log("Request complete.  Writing javascript variable. IRN: " + i + ", catalog number: " + c);

			var repo = _.findLast(data, function (a) {
				// console.log(data);
				return a.metadata.repositoryID == i;
			});

			// fill in taxa table

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
			// console.log(captionString);

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


				captionString[0] = "<span class='thumbnail-title it'>" + captionString[0] + "</span>";
				captionString[1] = "";
				caption = captionString.join("");

			} else {
				caption = "<span class='thumbnail-title it'>" + captionString[0] + "</span>";
			}

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
			$("#modal_taxa_scientificName").html(caption);

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

			$("#collectionsPortalLink").attr("href", catalogNumUrl(c));
			$("#collectionsPortalLink").attr("title", "Collections Portal - " + c + " - " + $("#modal_taxa_scientificName").text());

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

			// var stuff = { irn: i, catalogNum: c, caption: repo.metadata.caption, thumbnail: repo.derivatives["2"].source };
			// console.log("return: ")
			// console.log(stuff);
			// cdsData.push({ irn: i, catalogNum: c, caption: repo.metadata.caption, thumbnail: repo.derivatives["2"].source });

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
			});
			if (captionString.length > 1) {
				var captionOriginal = captionString[0];
				caption = "<span class='thumbnail-title-bold it'>" + captionString[1] + "</span>";
			} else {
				var captionOriginal = captionString[0];
				caption = "<span class='thumbnail-title-bold it'>" + captionString[0] + "</span>";
			}

			// CREATE THUMBNAILS
			var thumb = $("#thumbnail-template").html();
			thumb = thumb.replace("%%IMG%%", thumbnail);
			thumb = thumb.replace("%%GUID%%", "thumb_" + i + "_" + c);
			thumb = thumb.replace("%%HOVERIMGTYPE%%", "img/thumbhover_" + t + ".png");
			thumb = thumb.replace("%%ID%%", i);
			// thumb = thumb.replace("%%ID%%", "IRN: " + i);
			thumb = thumb.replace("%%TITLE%%", caption); // if title is blank, use common name
			thumb = thumb.replace("%%URL%%", t + ".php?irn=" + i + "&catalogNum=" + c);


			// does this IRN/type combination have an annotation file?
			if( a === true ) {
				thumb = thumb.replace("%%ANNO-CLASS%%"," related-thumbnail-annotated");
				thumb = thumb.replace("%%ANNO-BADGE-SHOWHIDE%%","related-thumbnail-annotated-badge");
				thumb = thumb.replace("%%SR-TITLE%%",c + ": " + captionOriginal + " - Annotations available");
			} else {
				thumb = thumb.replace("%%ANNO-CLASS%%","");
				thumb = thumb.replace("%%ANNO-BADGE-SHOWHIDE%%","hidden");
				thumb = thumb.replace("%%SR-TITLE%%",c + ": " + captionOriginal);
			}

			$("#relatedGallery").append(thumb);

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
