<?php
session_start(); 
if(!isset($_SESSION['random'])){  
     $_SESSION['randomone'] = mt_rand(100000, 999999);  
     $_SESSION['randomtwo'] = mt_rand(100000, 999999);
     $_SESSION['randomthree'] = mt_rand(100000, 999999);
}  
$randomone = $_SESSION['randomone'];  
$randomtwo = $_SESSION['randomtwo'];  
$randomthree = $_SESSION['randomthree'];  
?>

	<!doctype html>
	<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
	<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
	<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
	<!--[if gt IE 8]><!-->
	<html class="no-js" lang="">
	<!--<![endif]-->

	<head>
		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-3250139-10"></script>
		<script>
			window.dataLayer = window.dataLayer || [];

			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());

			gtag('config', 'UA-3250139-10');

		</script>

		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Virtual Microscopy | Invertebrate Zoology | Yale Peabody Museum of Natural History</title>
		<link rel="shortcut icon" href="http://peabody.yale.edu/sites/default/files/favicon.ico" type="image/x-icon">
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/bootstrap-theme.min.css">
		<link rel="stylesheet" href="css/mallory.css">

		<?php echo '<link rel="stylesheet" type="text/css" href="css/main.css?v=' . $randomone . '" />'; ?>
		<?php echo '<link rel="stylesheet" type="text/css" href="css/microscope.css?v=' . $randomtwo . '" />'; ?>
		<!-- <link rel="stylesheet" type="text/css" media="screen" href="css/main.css">
    <link rel="stylesheet" type="text/css" media="screen" href="css/microscope.css"> -->

		<script type="text/javascript">
			var sqldata = [];
			var ids = {};

		</script>


		<?php
    // $servername = "10.5.32.250";
    // echo '<script type="text/javascript">alert(" ' . $_SERVER['QUERY_STRING'] . '");</script>';
    
    $vars = $_SERVER['QUERY_STRING'];
    if( !isset($vars) || $vars == "" || $vars == " ") {
        //
    } else {
        parse_str($vars, $vars_arr);
        // print_r($vars_arr);
        echo "<script type='text/javascript'>";
        echo "  ids['irn'] = '" . $vars_arr['irn'] . "'; ids['catalogNum'] = '". $vars_arr['catalogNum'] . "'; ";
        echo "</script>";
    }
    
    require_once('./include/dbconnect.php');


    $sql = "SELECT * FROM emu_metadata WHERE catalog_number = '" . $vars_arr['catalogNum'] ."' LIMIT 1";
    $result = $connection->query($sql);
    




    if ($result->num_rows > 0) {
        echo "<script type='text/javascript'>";

        while($row = $result->fetch_assoc()) {
            echo "sqldata.push({catalog_number: \"" . addslashes($row["catalog_number"]) . "\", emu_irn: \"" . addslashes($row["emu_irn"]) . "\", occurenceID: \"" . addslashes($row["occurenceID"]) . "\", phylum: \"" . addslashes($row["phylum"]) . "\", class: \"" . addslashes($row["class"]) . "\", order: \"" . addslashes($row["order"]) . "\", family: \"" . addslashes($row["family"]) . "\", genus: \"" . addslashes($row["genus"]) . "\", species: \"" . addslashes($row["species"]) . "\", country: \"" . addslashes($row["country"]) . "\", state_province: \"" . addslashes($row["state_province"]) . "\", county_district: \"" . addslashes($row["county_district"]) . "\", nearest_named_place: \"" . addslashes($row["nearest_named_place"]) . "\", precise_locality: \"" . addslashes($row["precise_locality"]) . "\", decimal_latitude: parseFloat(" . $row["decimal_latitude"] . "), decimal_longitude: parseFloat(" . $row["decimal_longitude"] . "), media_zoomify_irns: \"" . addslashes($row["media_zoomify_irns"]) . "\", media_sliders_irns: \"" . addslashes($row["media_sliders_irns"]) . "\", \"media-zoomify-captions\": \"" . addslashes($row["media-zoomify-captions"]) . "\", \"media-zoomify-themes\": \"" . addslashes($row["media-zoomify-themes"]) . "\",\"media-sliders-captions\": \"" . addslashes($row["media-sliders-captions"]) . "\",\"media-sliders-themes\": \"" . addslashes($row["media-sliders-themes"]) . "\",subphylum: \"" . addslashes($row["subphylum"]) . "\", superclass: \"" . addslashes($row["superclass"]) . "\", subclass: \"" . addslashes($row["subclass"]) . "\", superorder: \"" . addslashes($row["superorder"]) . "\", infraorder: \"" . addslashes($row["infraorder"]) . "\", scientific_name: \"" . addslashes($row["scientific_name"]) . "\", author_string: \"" . addslashes($row["author_string"]) . "\", ocean: \"" . addslashes($row["ocean"]) . "\", sea_gulf: \"" . addslashes($row["sea_gulf"]) . "\", bay_sound: \"" . addslashes($row["bay_sound"]) . "\", common_names: \"" . addslashes($row["common_names"]) . "\"});\n";
        }
        echo "</script>";
    }

    $connection->close();
?>










			<script type="text/javascript" src="js/vendor/ZoomifyImageViewerPro.min.js"></script>
			<script type="text/javascript">
				/* URL grabber function */

				function qs(name) {
					name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
					var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
					var results = regex.exec(location.search);
					return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
				};

				/* Configuration values */
				// File location of images
				var imageloadmessage = "";
				var folderName = qs('irn');
				var catalogNum = qs('catalogNum');
				var slide;


				if (folderName) {
					console.log(folderName);
					slide = folderName
					imageloadmessage = "<h2>Please wait&hellip;<br />Microscope is loading.</h2>";
				} else {
					console.log("no folder name");
					// imageloadmessage = "<h2>Invalid parameter.</h2>";
					document.location = "index.php";
				}


				var docRoot = document.URL.substr(0, document.URL.lastIndexOf('/'));
				// var imagefolderlocation = docRoot + "/_photos/zoomify/" + slide;

				var loc = window.location.pathname;
				var dir = loc.substring(0, loc.lastIndexOf('/'));

				var imagefolderlocation = "https://virtualmicroscopy.peabody.yale.edu/other/izscope/microscopy/zoomify/" + slide;
				//				var imagefolderlocation = dir + "/other/izscope/microscopy/zoomify/" + slide;


				Z.showImage("myContainer", imagefolderlocation, "zAutoResize=1&zSkinPath=Assets/Skins/Light&zNavigatorVisible=1&zToolbarVisible=0&zLogoVisible=0&zSliderVisible=0&zFullPageVisible=1&zProgressVisible=0&zTooltipsVisible=1");

			</script>

	</head>

	<body class="presentation_zoomify">
		<div id="everything">
			<div id="top">
				<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
					<div class="container-fluid">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span title="Toggle navigation" aria-label="Toggle navigation" class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
							<a title="" aria-label="" class="navbar-brand" href="http://peabody.yale.edu" target="_blank">
                            <img src="img/ypm_wordmark_single_small_white.png" />
                        </a>
						</div>
						<div id="navbar" class="navbar-collapse collapse">
							<form class="navbar-form navbar-right" role="form">


								<a href="index.php" class="top-right"><button class="btn btn-default"><span class="glyphicon glyphicon-chevron-left"></span>&nbsp;Back to Search</button></a>
							</form>
						</div>
						<!--/.navbar-collapse -->
					</div>
				</nav>

				<!-- Top logo -->

				<div class="container" class="toplogo" style="display: none">
					<a href="index.php" title="Home" class="black-text">
						<div class="nsf-logo pull-left">
							<img src="img/nsf.png" height="80" width="80" />
						</div>
						<div class="title pull-left">
							<h1>Invertebrate Zoology</h1>
							<h3>Virtual Microscopy</h3>
						</div>
					</a>
				</div>

			</div>
			<!-- /top -->
			<div id="zoomifyMainContainer">
				<div id="myContainer"></div>
			</div>

			<div id="controls" class="controls-zoomify container-fluid">
				<!--<div class="row" style="margin-left:0!important;margin-right:0!important;padding-left:0!important;padding-right:0!important;">
                <div id="slider" class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all ui-slider-pips">
                    <div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div>
                    <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0" style="left: 0%;"></span>
                    <span class="ui-slider-pip ui-slider-pip-first ui-slider-pip-label ui-slider-pip-0 ui-slider-pip-initial ui-slider-pip-selected" style="left: 0%"></span>
                </div>
            </div>-->
				<div class="row">
					<div class="col-xs-3" style="padding-top: 0.5em;">
						<div class="nsf-logo-footer pull-left">
							<img src="img/nsf.png" height="80" width="80" />
						</div>
						<h4 style="margin-top:1em;">Invertebrate Zoology</h4>
						<h5>Virtual Microscopy</h5>
					</div>
					<div class="col-xs-4">
						<div id="knob" class="rslider"></div>
						<div id="precision_knob" class="rslider"></div>
					</div>
					<div class="col-xs-5" id="specimenInfo">
						<h3 class="viewer-label-title" id="specimen_title"><strong>%%TITLE%%</strong></h3>
						<!--<p class="viewer-label-id" id="specimen_id">%%ID%%</p>-->
						<!-- <h5 class="viewer-label-location" id="specimen_location">%%LOCATION%%</h5> -->
						<!-- <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#related-modal"> Related Media </button> -->
						<ul class="nav nav-pills">
							<li role="presentation" class="modalButton"><a href="#relatedMedia" data-toggle="modal" data-target="#related-modal" class="modal-toggle"><span class="glyphicon glyphicon-picture"></span> Related Media <span class="badge" id="numRelatedCounterMain">0</span> </a> </li>
							<li role="presentation" class="modalButton"><a href="#relatedTaxa" data-toggle="modal" data-target="#related-modal" class="modal-toggle"><span class="glyphicon glyphicon-stats"></span> Taxa</a></li>
							<li role="presentation" class="modalButton"><a href="#relatedOccurrence" data-toggle="modal" data-target="#related-modal" class="modal-toggle"><span class="glyphicon glyphicon-globe"></span> Occurrence</a></li>
						</ul>
					</div>
				</div>
			</div>

			<footer>&nbsp;</footer>




			<!-- Modal -->
			<div class="modal fade" id="related-modal" tabindex="-1" role="dialog" aria-hidden="true" data-keyboard="false" data-backdrop="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" id="modalClose" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>

                </button>
							<h1 id="catalogNumModalHeader">%%%%%%</h1>
							<h4 id="captionModalSubHeader">%%%%%%</h4>

						</div>
						<div class="modal-body">
							<div role="tabpanel">
								<!-- Nav tabs -->
								<ul class="nav nav-tabs" role="tablist">
									<li role="presentation" class="active"><a href="#relatedMedia" aria-controls="relatedMedia" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-picture"></span> Related Media <span class="badge" id="numRelatedCounter">0</span> </a> </li>
									<li role="presentation"><a href="#relatedTaxa" aria-controls="relatedTaxa" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-stats"></span> Taxa</a></li>
									<li role="presentation"><a href="#relatedOccurrence" aria-controls="relatedOccurrence" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-globe"></span> Occurrence</a></li>
								</ul>
								<!-- Tab panes -->
								<div class="tab-content">
									<div role="tabpanel" class="tab-pane active" id="relatedMedia">
										<div class="container-fluid" id="relatedGallery"></div>
									</div>
									<div role="tabpanel" class="tab-pane" id="relatedTaxa">
										<div class="container-fluid">
											<div class="row">
												<div class="col col-xs-12">
													<h3 class="tab-heading">Taxonomic Ranks</h3>
												</div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Phylum: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_taxa_phylum"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Subphylum: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_taxa_subphylum"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Superclass: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_taxa_superclass"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Class: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_taxa_class"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Subclass: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_taxa_subclass"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Superorder: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_taxa_superorder"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Order: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_taxa_order"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Infraorder: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_taxa_infraorder"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Family: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_taxa_family"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Genus: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_taxa_genus"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Species: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_taxa_species"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Scientific Name: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_taxa_scientificName"></div>
											</div>
											<div class="row">
												<hr />
												<div class="col col-xs-12">
													<h3 class="tab-heading">Common Names</h3>
												</div>
											</div>
											<div class="row">
												<div class="col col-xs-12" id="commonNames"></div>
											</div>
										</div>
									</div>
									<div role="tabpanel" class="tab-pane" id="relatedOccurrence">
										<div class="container-fluid">
											<div class="row">
												<div class="col col-xs-12">
													<h3 class="tab-heading">Locality</h3>
												</div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Country: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_locality_country"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>State/Province: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_locality_stateProvince"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>County/District: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_locality_countyDistrict"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Precise Locality: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_locality_preciseLocality"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Nearest Named Place: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_locality_nearestNamedPlace"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12" id="modal_locality_mapString"></div>
											</div>
											<div class="row">
												<hr />
												<div class="col col-xs-12">
													<h3 class="tab-heading">Body of Water</h3>
												</div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Ocean: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_locality_ocean"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Sea/Gulf: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_locality_seaGulf"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Bay/Sound: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_locality_baySound"></div>
											</div>
											<div class="row">
												<hr />
												<div class="col col-xs-12">
													<h3 class="tab-heading">Author/Occurrence</h3>
												</div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Author: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_locality_AuthorString"></div>
											</div>
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-4"><strong>Occurrence ID: </strong></div>
												<div class="col col-xs-12 col-sm-6 col-md-8" id="modal_locality_occurrenceID"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
							<!-- <button type="button" class="btn btn-primary save">Save changes</button> -->
							<span class="pull-left"><a id="collectionsPortalLink" target="_blank" href="#" title=""><span class="glyphicon glyphicon-link"></span>&nbsp;Click for Collections Portal record</a>
							</span>
						</div>
					</div>
				</div>
			</div>


			<!-- Thumbnail content template -->

			<script type="text/content" id="thumbnail-template">
				<div class="col-md-3 col-sm-6 col-xs-12">
					<a href="%%URL%%">
						<div class="thumbnail" id="%%GUID%%" style="background-image:url('%%IMG%%')">
							<img class="thumbnail-hoverimg" src="%%HOVERIMGTYPE%%" />
							<div class="thumbnail-label">
								<p class="thumbnail-label-id">%%ID%%</p>
								<p class="thumbnail-label-title">%%TITLE%%</p>
							</div>
						</div>
					</a>
				</div>
			</script>


		</div>

		<script type="text/javascript" src="js/vendor/jquery-1.10.2.js"></script>
		<script type="text/javascript" src="js/vendor/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/vendor/lodash.min.js"></script>

		<?php echo '<script type="text/javascript" src="js/zoomify.js?v=' . $randomthree . '"></script>'; ?>
		<!-- <script type="text/javascript" src="js/zoomify.js"></script> -->
	</body>

	</html>
