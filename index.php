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
		<link rel="shortcut icon" href="https://virtualmicroscopy.peabody.yale.edu/img/favicon.ico" type="image/x-icon">
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="apple-touch-icon" href="apple-touch-icon.png">
		<link rel="stylesheet" href="css/mallory.css">

		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/bootstrap-theme.min.css">
		<link rel="stylesheet" href="css/jqcloud.css">


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

        while($row = $result->fetch_assoc()) {
            echo "sqldata.push({catalog_number: \"" . addslashes($row["catalog_number"]) . "\", emu_irn: \"" . addslashes($row["emu_irn"]) . "\", occurenceID: \"" . addslashes($row["occurenceID"]) . "\", phylum: \"" . addslashes($row["phylum"]) . "\", class: \"" . addslashes($row["class"]) . "\", order: \"" . addslashes($row["order"]) . "\", family: \"" . addslashes($row["family"]) . "\", genus: \"" . addslashes($row["genus"]) . "\", species: \"" . addslashes($row["species"]) . "\", country: \"" . addslashes($row["country"]) . "\", state_province: \"" . addslashes($row["state_province"]) . "\", county_district: \"" . addslashes($row["county_district"]) . "\", nearest_named_place: \"" . addslashes($row["nearest_named_place"]) . "\", precise_locality: \"" . addslashes($row["precise_locality"]) . "\", decimal_latitude: parseFloat(" . $row["decimal_latitude"] . "), decimal_longitude: parseFloat(" . $row["decimal_longitude"] . "), media_zoomify_irns: \"" . addslashes($row["media_zoomify_irns"]) . "\", media_sliders_irns: \"" . addslashes($row["media_sliders_irns"]) . "\", \"media-zoomify-captions\": \"" . addslashes($row["media-zoomify-captions"]) . "\", \"media-zoomify-themes\": \"" . addslashes($row["media-zoomify-themes"]) . "\",\"media-sliders-captions\": \"" . addslashes($row["media-sliders-captions"]) . "\",\"media-sliders-themes\": \"" . addslashes($row["media-sliders-themes"]) . "\",subphylum: \"" . addslashes($row["subphylum"]) . "\", superclass: \"" . addslashes($row["superclass"]) . "\", subclass: \"" . addslashes($row["subclass"]) . "\", superorder: \"" . addslashes($row["superorder"]) . "\", infraorder: \"" . addslashes($row["infraorder"]) . "\", scientific_name: \"" . addslashes($row["scientific_name"]) . "\", author_string: \"" . addslashes($row["author_string"]) . "\", ocean: \"" . addslashes($row["ocean"]) . "\", sea_gulf: \"" . addslashes($row["sea_gulf"]) . "\", bay_sound: \"" . addslashes($row["bay_sound"]) . "\", common_names: \"" . addslashes($row["common_names"]) . "\"});\n";
        }
        echo "</script>";
        // echo ("<script type='text/javascript'>console.log(sqldata);</script>");
    } else {
        // echo "0 results";
        echo "";
    }
    $connection->close();
?>

			<!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
			<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
				<div class="container">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
						<a class="navbar-brand" href="http://peabody.yale.edu" target="_blank">
                    <img src="img/ypm_wordmark_single_small_white.png" />
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
													<!-- <div class="dropdown dropdown-lg">
                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></button>
                                                <div class="dropdown-menu dropdown-menu-right" role="menu">
                                                    <form class="form-horizontal" role="form">
                                                        <div class="form-group">
                                                            <label for="filter">Filter by</label>
                                                            <select class="form-control">
                                                                <option value="0" selected>All Snippets</option>
                                                                <option value="1">Featured</option>
                                                                <option value="2">Most popular</option>
                                                                <option value="3">Top rated</option>
                                                                <option value="4">Most commented</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="contain">Author</label>
                                                            <input class="form-control" type="text" />
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="contain">Contains the words</label>
                                                            <input class="form-control" type="text" />
                                                        </div>
                                                        <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                                                    </form>
                                                </div>
                                            </div> -->
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
								<form class="form-horizontal" role="form" action="javascript:goTheme();">
									<div class="form-group">
										<div class="input-group" id="adv-search">
											<select class="form-control" id="theme" onChange="javascript:goTheme()">
                                            <option value="" disabled selected>Select one...</option>
                                        </select>
											<!-- <div class="input-group-btn">
                                        <div class="btn-group" role="group">
                                            <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                                        </div>
                                    </div> -->
										</div>


									</div>
								</form>
							</div>
							<div class="col-sm-3"></div>
						</div>

						<div class="row">
							<div class="col-sm-3"></div>
							<div class="col-sm-6">
								<h6 class="input-help">Select one of many preset &quot;thematic searches&quot; to explore similar concepts and specimens.</h6>
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
							<a href="javascript:sampleSlides();"><button class="btn btn-primary btn-lg bigcenter" id="browseMoreButton">Browse More<span id="numRemaining"></span></button></a>

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
					<a href="%%URL%%">
						<div class="thumbnail" id="%%GUID%%" style="background-image:url('%%IMG%%')">
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
			<script src="js/vendor/jqcloud.js"></script>

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
