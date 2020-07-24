<?php
// ob_start();
// var_dump($_POST);
    $irn = $_POST["i"];
    $type = $_POST["t"];
    $cn = $_POST["c"];

    if( $type == "zoomify" ) { 
        $t = "z";
    } else if( $type == "slider" ) {
        $t = "s";
    } else {
        header("Location: index.php");
        exit();
    }

    $file_pointer = "Annotations/" . $type . "/IZ_anno_" . $t . "_" . $irn . ".xml";
    // Use unlink() function to delete a file  
    if (!unlink($file_pointer)) {  
        // echo ($file_pointer . " cannot be deleted due to an error");  
        header("Location: " . $type . ".php?irn=" . $irn . "&catalogNum=" . $cn);
        exit();
    }  
    else {  
        // echo ($file_pointer . " has been deleted");  
        header("Location: " . $type . ".php?irn=" . $irn . "&catalogNum=" . $cn);
        exit();
    } 

        header("Location: " . $type . ".php?irn=" . $irn . "&catalogNum=" . $cn);
        exit();
?>