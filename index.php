<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="">
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Invertebrate Zoology | Virtual Microscopy</title>
    <link rel="shortcut icon" href="http://peabody.yale.edu/sites/default/files/favicon.ico" type="image/x-icon">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="stylesheet" href="css/mallory.css">

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="css/jqcloud.css">


    <link rel="stylesheet" href="css/main.css">

    <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>

    <script type="text/javascript">
        var thePage = "home";
        var sqldata = [];
    </script>
</head>

<body>

 <?php
// $servername = "sprout018.sprout.yale.edu";
$servername = "localhost";
$username = "general";
$password = "Specific38!";
$dbname = "YPM_IZ_scope";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM emu_metadata";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row to javascript

    while($row = $result->fetch_assoc()) {
        echo "<script type='text/javascript'>sqldata.push({catalog_number: \"" . addslashes($row["catalog_number"]) . "\", emu_irn: \"" . addslashes($row["emu_irn"]) . "\", occurenceID: \"" . addslashes($row["occurenceID"]) . "\", phylum: \"" . addslashes($row["phylum"]) . "\", class: \"" . addslashes($row["class"]) . "\", order: \"" . addslashes($row["order"]) . "\", family: \"" . addslashes($row["family"]) . "\", genus: \"" . addslashes($row["genus"]) . "\", species: \"" . addslashes($row["species"]) . "\", country: \"" . addslashes($row["country"]) . "\", state_province: \"" . addslashes($row["state_province"]) . "\", county_district: \"" . addslashes($row["county_district"]) . "\", nearest_named_place: \"" . addslashes($row["nearest_named_place"]) . "\", precise_locality: \"" . addslashes($row["precise_locality"]) . "\", decimal_latitude: parseFloat(" . $row["decimal_latitude"] . "), decimal_longitude: parseFloat(" . $row["decimal_longitude"] . "), media_zoomify_irns: \"" . addslashes($row["media_zoomify_irns"]) . "\", media_sliders_irns: \"" . addslashes($row["media_sliders_irns"]) . "\"});</script>\n";
    }
    echo ("<script type='text/javascript'>console.log(sqldata);</script>");
} else {
    echo "0 results";
}
$conn->close();
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
            <div class="nsf-logo pull-left">
                <img src="img/nsf.png" height="80" width="80" />
            </div>
            <div class="title pull-left">
                <h1>Invertebrate Zoology</h1>
                <h3>Virtual Microscopy</h3>
            </div>
        </div>


        <!-- Main jumbotron for search / tag cloud -->
        <div class="jumbotron">

            <div class="container">
                <div class="row">
                    <div class="col-sm-3">
                        <h2 class="searchlabel">Search:</h2>
                    </div>
                    <div class="col-sm-6">
                        <div class="input-group" id="adv-search">
                            <input type="text" class="form-control" placeholder="Enter search term" id="search" />
                            <div class="input-group-btn">
                                <div class="btn-group" role="group">
                                    <div class="dropdown dropdown-lg">
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
                                    </div>
                                    <button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-sm-3"></div>
                </div>
                <div class="row">
                    <div class="col-sm-3"></div>
                    <div class="col-sm-6">
                        <h6>Common/scientific name, identifier, taxa, keywords, etc.</h6>
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
                    <a href="#"><button class="btn btn-primary btn-lg bigcenter">View All</button></a>&nbsp;&nbsp;

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
                        <p class="thumbnail-label-id">%%ID%%</p>
                        <p class="thumbnail-label-scientificname">%%SCINAME%%</p>
                    </div>
                </div>
            </a>
        </div>
    </script>









    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script>
        window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')
    </script>

    <script src="js/vendor/lodash.min.js"></script>
    <script src="js/vendor/bootstrap.min.js"></script>
    <script src="js/vendor/jqcloud.js"></script>

    <script src="js/main.js"></script>

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