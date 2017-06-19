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
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="css/mallory.css">

    <link rel="stylesheet" type="text/css" media="screen" href="css/main.css">
    <link rel="stylesheet" type="text/css" media="screen" href="css/microscope.css">

    <script type="text/javascript">
        var sqldata = [];
        var ids = {};
    </script>


 <?php
    // $servername = "sprout018.sprout.yale.edu";
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

    $sql = "SELECT * FROM emu_metadata WHERE catalog_number = '" . $vars_arr['catalogNum'] ."' LIMIT 1";
    $result = $conn->query($sql);
    




    if ($result->num_rows > 0) {
        echo "<script type='text/javascript'>";

        while($row = $result->fetch_assoc()) {
            echo "sqldata.push({catalog_number: \"" . addslashes($row["catalog_number"]) . "\", emu_irn: \"" . addslashes($row["emu_irn"]) . "\", occurenceID: \"" . addslashes($row["occurenceID"]) . "\", phylum: \"" . addslashes($row["phylum"]) . "\", class: \"" . addslashes($row["class"]) . "\", order: \"" . addslashes($row["order"]) . "\", family: \"" . addslashes($row["family"]) . "\", genus: \"" . addslashes($row["genus"]) . "\", species: \"" . addslashes($row["species"]) . "\", country: \"" . addslashes($row["country"]) . "\", state_province: \"" . addslashes($row["state_province"]) . "\", county_district: \"" . addslashes($row["county_district"]) . "\", nearest_named_place: \"" . addslashes($row["nearest_named_place"]) . "\", precise_locality: \"" . addslashes($row["precise_locality"]) . "\", decimal_latitude: parseFloat(" . $row["decimal_latitude"] . "), decimal_longitude: parseFloat(" . $row["decimal_longitude"] . "), media_zoomify_irns: \"" . addslashes($row["media_zoomify_irns"]) . "\", media_sliders_irns: \"" . addslashes($row["media_sliders_irns"]) . "\"});\n";
        }
        echo "</script>";
    }

    $conn->close();
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
        var imagefolderlocation = docRoot + "/_photos/zoomify/" + slide;

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
                        <form class="navbar-form navbar-right" role="form">


                                <a href="index.php" class="top-right"><button class="btn btn-default"><span class="glyphicon glyphicon-chevron-left"></span>&nbsp;Back to Search</button></a>
                        </form>
                    </div>
                    <!--/.navbar-collapse -->
                </div>
            </nav>

            <!-- Top logo -->

            <div class="container" class="toplogo" style="display: none">
                <div class="nsf-logo pull-left">
                    <img src="img/nsf.png" height="80" width="80" />
                </div>
                <div class="title pull-left">
                    <h1>Invertebrate Zoology</h1>
                    <h3>Virtual Microscopy</h3>
                </div>
            </div>

        </div>
        <!-- /top -->
        <div id="zoomifyMainContainer">
            <div id="myContainer"></div>
        </div>

        <div id="controls" class="container-fluid">
            <!--<div class="row" style="margin-left:0!important;margin-right:0!important;padding-left:0!important;padding-right:0!important;">
                <div id="slider" class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all ui-slider-pips">
                    <div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div>
                    <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0" style="left: 0%;"></span>
                    <span class="ui-slider-pip ui-slider-pip-first ui-slider-pip-label ui-slider-pip-0 ui-slider-pip-initial ui-slider-pip-selected" style="left: 0%"></span>
                </div>
            </div>-->
            <div class="row">
                <div class="col-xs-3" style="padding-top: 2em;">
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
                    <h5 class="viewer-label-location" id="specimen_location">%%LOCATION%%</h5>

                </div>
            </div>
        </div>

        <footer>&nbsp;</footer>

    </div>

    <script type="text/javascript" src="js/vendor/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="js/vendor/lodash.min.js"></script>
    <script type="text/javascript" src="js/zoomify.js"></script>
</body>

</html>