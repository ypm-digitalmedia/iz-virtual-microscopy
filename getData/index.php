<!DOCTYPE html>
<html>
<head>
<title>IZ | MySQL-CDS unit test</title>
<meta charset="utf8" />

<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />

<link rel="stylesheet" type="text/css" href="main.css" />

<script type="text/javascript">
    var sqldata = [];

    var valid = {
        slider : ["420984","424789","425809","425816","425817","426566","426909","426910","426911","426912","426913","426915"],
        zoomify : ["420983","420985","425809","429851","484904","542943"]
    };


    function getIntersect(arr1, arr2) {
        var r = [], o = {}, l = arr2.length, i, v;
        for (i = 0; i < l; i++) {
            o[arr2[i]] = true;
        }
        l = arr1.length;
        for (i = 0; i < l; i++) {
            v = arr1[i];
            if (v in o) {
                r.push(v);
            }
        }
        return r;
    }

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
    // output data of each row
    echo "<table>";
    echo "<tr><th>&nbsp;</th><th>catalog_number</th><th>emu_irn</th><th>occurenceID</th><th>phylum</th><th>class</th><th>order</th><th>family</th><th>genus</th><th>species</th><th>country</th><th>state_province</th><th>county_district</th><th>nearest_named_place</th><th>precise_locality</th><th>decimal_latitude</th><th>decimal_longitude</th><th>media_zoomify_irns</th><th>media_sliders_irns</th></tr>";
    while($row = $result->fetch_assoc()) {
        echo "<script type='text/javascript'>sqldata.push({catalog_number: \"" . addslashes($row["catalog_number"]) . "\", emu_irn: \"" . addslashes($row["emu_irn"]) . "\", occurenceID: \"" . addslashes($row["occurenceID"]) . "\", phylum: \"" . addslashes($row["phylum"]) . "\", class: \"" . addslashes($row["class"]) . "\", order: \"" . addslashes($row["order"]) . "\", family: \"" . addslashes($row["family"]) . "\", genus: \"" . addslashes($row["genus"]) . "\", species: \"" . addslashes($row["species"]) . "\", country: \"" . addslashes($row["country"]) . "\", state_province: \"" . addslashes($row["state_province"]) . "\", county_district: \"" . addslashes($row["county_district"]) . "\", nearest_named_place: \"" . addslashes($row["nearest_named_place"]) . "\", precise_locality: \"" . addslashes($row["precise_locality"]) . "\", decimal_latitude: parseFloat(" . $row["decimal_latitude"] . "), decimal_longitude: parseFloat(" . $row["decimal_longitude"] . "), media_zoomify_irns: \"" . addslashes($row["media_zoomify_irns"]) . "\", media_sliders_irns: \"" . addslashes($row["media_sliders_irns"]) . "\"});</script>\n";
        echo "<tr>";
        echo "<td><button type='button' onclick='loadData(\"" . $row["catalog_number"] . "\")' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#myModal'><span class='glyphicon glyphicon-eye-open'></span></button>" . "</td><td>" . $row["catalog_number"] . "</td><td>" . $row["emu_irn"] . "</td><td>" . $row["occurenceID"] . "</td><td>" . $row["phylum"] . "</td><td>" . $row["class"] . "</td><td>" . $row["order"] . "</td><td>" . $row["family"] . "</td><td>" . $row["genus"] . "</td><td>" . $row["species"] . "</td><td>" . $row["country"] . "</td><td>" . $row["state_province"] . "</td><td>" . $row["county_district"] . "</td><td>" . $row["nearest_named_place"] . "</td><td>" . $row["precise_locality"] . "</td><td>" . $row["decimal_latitude"] . "</td><td>" . $row["decimal_longitude"] . "</td><td rel=\"cell_zoomify\">" . $row["media_zoomify_irns"] . "</td><td rel=\"cell_slider\">" . $row["media_sliders_irns"] . "</td>";
        echo "</tr>\n";
    }
    echo "</table>";
} else {
    echo "0 results";
}
$conn->close();
?> 


<!-- Modal -->
<div class="modal modal-wide fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel"></h4>
      </div>
      <div class="modal-body" id="myModalContent">
            <p align="center" id="myModalLoader">
                <img src='ajax-loader.gif' />
            </p>
            <div id="imagery" class="container-fluid">
                <div class="row">
                    <div class="col-sm-12 col-md-6"><h3>Sliders:</h3></div>
                    <div class="col-sm-12 col-md-6"><h3>Zoomifys:</h3></div>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-md-6" id="imagery_slider"></div>
                    <div class="col-sm-12 col-md-6" id="imagery_zoomify"></div>
                </div>
            </div>
            <hr />
            <div id="repos"></div>
            <h3>SQL data:</h3>
            <div id="sqlData" class="well"></div>
            <h3>CDS data:</h3>
            <div id="cdsData" class="well"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <!--<button type="button" class="btn btn-primary">Save changes</button>-->
      </div>
    </div>
  </div>
</div>


<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js" type="text/javascript"></script>

<script src="main.js" type="text/javascript"></script>


</body>
</html>
