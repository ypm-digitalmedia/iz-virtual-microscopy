<?php
session_start(); 
if(!isset($_SESSION['random'])){  
     $_SESSION['randomone'] = mt_rand(100000, 999999);  
     $_SESSION['randomtwo'] = mt_rand(100000, 999999);
     $_SESSION['randomthree'] = mt_rand(100000, 999999);
     $_SESSION['randomfour'] = mt_rand(100000, 999999);
     $_SESSION['randomfive'] = mt_rand(100000, 999999);
}  
$randomone = $_SESSION['randomone'];  
$randomtwo = $_SESSION['randomtwo'];  
$randomthree = $_SESSION['randomthree'];  
$randomfour = $_SESSION['randomfour'];   
$randomfive = $_SESSION['randomfive']; 
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
		<link rel="shortcut icon" href="https://virtualmicroscopy.peabody.yale.edu/img/favicon.ico" type="image/x-icon">
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="apple-touch-icon" href="apple-touch-icon.png">
		<link rel="stylesheet" href="css/mallory.css">

		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/bootstrap-toggle.min.css">
		<link rel="stylesheet" href="css/bootstrap-theme.min.css">
		<link rel="stylesheet" href="css/jqcloud.css">
		<link href="fonts/FontAwesome-5.2.0/css/all.min.css" rel="stylesheet" />


		<?php echo '<link rel="stylesheet" type="text/css" href="css/main.css?v=' . $randomone . '" />'; ?>
		<!-- <link rel="stylesheet" href="css/main.css"> -->

		<script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>

		<script type="text/javascript">
			var thePage = "home";
			var sqldata = [];

		</script>
	</head>

	<body>

		<?php
    require_once('./include/dbconnect.php');

    $sql = "SELECT * FROM emu_metadata";
    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row to javascript
        echo "<script type='text/javascript'>"; 

        while($row = $result->fetch_assoc()) { $lat_raw = $row["decimal_latitude"]; $lng_raw = $row["decimal_longitude"]; if( empty($lat_raw) ) { $lat_final = 0; } else { $lat_final = $lat_raw; } if( empty($lng_raw) ) { $lng_final = 0; } else { $lng_final = $lng_raw; }echo "sqldata.push({catalog_number: \"" . addslashes($row["catalog_number"]) . "\", emu_irn: \"" . addslashes($row["emu_irn"]) . "\", occurenceID: \"" . addslashes($row["occurenceID"]) . "\", phylum: \"" . addslashes($row["phylum"]) . "\", class: \"" . addslashes($row["class"]) . "\", order: \"" . addslashes($row["order"]) . "\", family: \"" . addslashes($row["family"]) . "\", genus: \"" . addslashes($row["genus"]) . "\", species: \"" . addslashes($row["species"]) . "\", country: \"" . addslashes($row["country"]) . "\", state_province: \"" . addslashes($row["state_province"]) . "\", county_district: \"" . addslashes($row["county_district"]) . "\", nearest_named_place: \"" . addslashes($row["nearest_named_place"]) . "\", precise_locality: \"" . addslashes($row["precise_locality"]) . "\", decimal_latitude: parseFloat(" . $lat_final . "), decimal_longitude: parseFloat(" . $lng_final . "), media_zoomify_irns: \"" . addslashes($row["media_zoomify_irns"]) . "\", media_sliders_irns: \"" . addslashes($row["media_sliders_irns"]) . "\", \"media-zoomify-captions\": \"" . addslashes($row["media-zoomify-captions"]) . "\", \"media-zoomify-themes\": \"" . addslashes($row["media-zoomify-themes"]) . "\",\"media-sliders-captions\": \"" . addslashes($row["media-sliders-captions"]) . "\",\"media-sliders-themes\": \"" . addslashes($row["media-sliders-themes"]) . "\",subphylum: \"" . addslashes($row["subphylum"]) . "\", superclass: \"" . addslashes($row["superclass"]) . "\", subclass: \"" . addslashes($row["subclass"]) . "\", superorder: \"" . addslashes($row["superorder"]) . "\", infraorder: \"" . addslashes($row["infraorder"]) . "\", scientific_name: \"" . addslashes($row["scientific_name"]) . "\", author_string: \"" . addslashes($row["author_string"]) . "\", ocean: \"" . addslashes($row["ocean"]) . "\", sea_gulf: \"" . addslashes($row["sea_gulf"]) . "\", bay_sound: \"" . addslashes($row["bay_sound"]) . "\", common_names: \"" . addslashes($row["common_names"]) . "\"});\n";
        }
        echo "</script>";
        // echo ("<script type='text/javascript'>console.log(sqldata);</script>");
    } else {
        // echo "0 results";
        echo "";
    }
	$connection->close();
	



	// Determine known annotation files
	$folder_zoomify = 'Annotations/zoomify/';
	$folder_slider = 'Annotations/slider/';

	$results_zoomify = scandir($folder_zoomify);
	$results_slider = scandir($folder_slider);
	
	$files_zoomify = array_filter($results_zoomify,function($o){return strpos($o,".xml")!==false;});
	$files_slider = array_filter($results_slider,function($o){return strpos($o,".xml")!==false;});

	$irns_zoomify = array();
	$irns_slider = array();

	foreach ( $files_zoomify as &$fz ) {
		$filename = str_replace(".xml","",substr(strrchr($fz,"_"),1));
		array_push($irns_zoomify,$filename);
	}

	foreach ( $files_slider as &$fs ) {
		$filename = str_replace(".xml","",substr(strrchr($fs,"_"),1));
		array_push($irns_slider,$filename);
	}

	echo "<script type='text/javascript'>";
	echo "	var knownAnnotations = {'zoomify': \"" . implode(",",$irns_zoomify) . "\", 'slider': \"" . implode(",",$irns_slider) . "\"};";
	echo "</script>";
	
?>

			<!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
			<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
				<div class="container">
					<div class="navbar-header">
						  <!-- Collapse button -->
							<!-- <button class="navbar-toggler toggler-example" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation"><span class="dark-blue-text"><i class="fas fa-bars fa-1x"></i></span></button>	 -->
						<a class="navbar-brand" href="http://peabody.yale.edu" target="_blank">
                   			 <img src="https://virtualmicroscopy.peabody.yale.edu/img/ypm_wordmark_single_small_white.png" />
                		</a>
					</div>
					<div id="navbar" class="navbar-collapse collapse">

					</div>
					<!--/.navbar-collapse -->
				</div>
			</nav>

			<main>

				<!-- Top logo -->

				<div class="container" class="toplogo">
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


				<!-- Main jumbotron for search / tag cloud -->
				<div class="jumbotron">

					<div class="container">
						<div class="row">
							<div class="col-sm-3">
								<h2 class="searchlabel">Search:</h2>
							</div>
							<div class="col-sm-6">
								<form class="form-horizontal" role="form" action="javascript:search();">
									<div class="form-group">
										<div class="input-group" id="adv-search">
											<input type="text" class="form-control" placeholder="Enter search term" id="search" />
											<div class="input-group-btn">
												<div class="btn-group" role="group">
													<button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
												</div>
											</div>
										</div>


									</div>
<!--								</form>-->
							</div>
							<div class="col-sm-3"></div>
						</div>

						<div class="row">
							<div class="col-sm-3"></div>
							<div class="col-sm-6">
								<!--<h6 style="margin-top: 0">Taxa [phylum, class, order, family, genus, species], identifier, or location.</h6>-->
								<h6 class="input-help">Taxa [phylum, subphylum, superclass, class, subclass, superorder, order, infraorder, family, genus, species, scientific name], common name, caption, author, identifier, or location.</h6>
							</div>
							<div class="col-sm-3"></div>
						</div>


						<div class="row">
							<div class="col-xs-12">&nbsp;</div>
						</div>


						<div class="row">
							<div class="col-sm-3">
								<h2 class="searchlabel">Themes:</h2>
							</div>
							<div class="col-sm-6">
<!--								<form class="form-horizontal" role="form" action="javascript:goTheme();">-->
									<div class="form-group">
										<div class="input-group" id="adv-search">
<!--											<select class="form-control" id="theme" onChange="javascript:goTheme()">-->
											<select class="form-control" id="theme">
                                            <option value="" selected>None</option>
                                        </select>
											 <div class="input-group-btn">
                                        <div class="btn-group" role="group">
                                            <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                                        </div>
                                    </div> 
										</div>


									</div>
								</form>
							</div>
							<div class="col-sm-3"></div>
						</div>

						<div class="row">
							<div class="col-sm-3"></div>
							<div class="col-sm-6">
								<h6 class="input-help" style="margin-top: 10px;">Select one of many preset &quot;thematic searches&quot; to explore similar concepts and specimens, or specific laboratory sets.</h6>
							</div>
							<div class="col-sm-3"></div>
						</div>

						<hr />

						<div class="row">
							<div id="tagcloud"></div>
						</div>


					</div>


				</div>


				<div class="container-fluid divider">

					<div class="container">
						<div class="row">
							<h2>Browse:</h2>
						</div>
					</div>
				</div>






				<div class="container">
					<!-- search results -->
					<div class="row" id="results">

						<!-- THUMBNAILS HERE -->

					</div>

					<div class="row">
						<p align="center">
							<a href="javascript:sampleSlides();"><button class="btn btn-primary btn-lg bigcenter" id="browseMoreButton">Load More<span id="numRemaining"></span></button></a>

						</p>
					</div>

					<hr />

					<div class="row">
						<div class="nsf-logo-footer pull-left">
							<img src="img/nsf.png" height="80" width="80" />
						</div>
						<span class="pull-left nsf-info"><a href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=1349111&HistoricalAwards=false" target="_blank">Award #1349111</a>
                <br />
                <h6>(Buss, Lazo-Wasem)</h6></span>

					</div>


				</div>
			</main>
			<footer>
				<!--<p>&copy; Company 2015</p>-->
			</footer>
			<!-- /container -->


			<!-- Thumbnail content template -->

			<script type="text/content" id="thumbnail-template">
				<div class="col-md-3 col-sm-4 col-xs-6">
					<a class="search-results-link" href="%%URL%%" title="%%SR-TITLE%%" aria-label="%%SR-TITLE%%">
						<div class="thumbnail %%ANNO-CLASS%%" data-irn="%%IRN%%" data-cn="%%CATALOGNUMBER%%" id="%%GUID%%" style="background-image:url('%%IMG%%')">
							<div class="%%ANNO-BADGE-SHOWHIDE%%"><i class="fas fa-comments"></i></div>
							<img class="thumbnail-hoverimg" src="%%HOVERIMGTYPE%%" />
							<div class="thumbnail-label">
								<p class="thumbnail-label-title">%%TITLE%%</p>
								<!-- <p class="thumbnail-label-scientificname">%%SCINAME%%</p> -->
								<p class="thumbnail-label-id">%%ID%%</p>
							</div>
						</div>
					</a>
				</div>
			</script>









			<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
			<script>
				window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')

			</script>
			<!--<script src="js/vendor/object-watch.js"></script>-->

			<script src="js/vendor/lodash.min.js"></script>
			<script src="js/vendor/bootstrap.min.js"></script>
			<script type="text/javascript" src="js/vendor/bootstrap-toggle.min.js"></script>
			<script src="js/vendor/jqcloud.js"></script>	
			<script src="fonts/FontAwesome-5.2.0/js/all.min.js"></script>

			<?php echo '<script type="text/javascript" src="js/main.js?v=' . $randomtwo . '"></script>'; ?>
			<!-- <script src="js/main.js"></script> -->

			<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
			<script>
				(function(b, o, i, l, e, r) {
					b.GoogleAnalyticsObject = l;
					b[l] || (b[l] =
						function() {
							(b[l].q = b[l].q || []).push(arguments)
						});
					b[l].l = +new Date;
					e = o.createElement(i);
					r = o.getElementsByTagName(i)[0];
					e.src = '//www.google-analytics.com/analytics.js';
					r.parentNode.insertBefore(e, r)
				}(window, document, 'script', 'ga'));
				ga('create', 'UA-XXXXX-X', 'auto');
				ga('send', 'pageview');

			</script>
	</body>

	</html>
