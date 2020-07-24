$(document).ready(function() {
	if(newAnnotation) {

		$("#intro-annotate-modal").modal({
            backdrop: 'static',
            keyboard: false
        });

	}

	var viewUrl = window.location.href;
	viewUrl = viewUrl.split("annotate.php").join("zoomify.php");
	$("#viewLiveButton").attr("href",viewUrl);

	$("#deleteButton").click(function() {
		var deleteIt = confirm("This will remove all annotations created for this presentation.  Are you sure you want to do this?");
		if( deleteIt ) {
			cancelAnno();
		}
	});

});

function cancelAnno() {
	// alert('cancelling!')
	// var record_irn = qs("irn");
	// var record_catalogNum = qs("catalogNum");
	// var record_type = "zoomify";

	$.ajax({
		type: "POST",
		url: "anno_delete.php",
		data: {i:record_irn, c:record_catalogNum, t:record_type},
		success : function(data){
			if (data == 'success'){
				console.log(data);
				document.location = record_type + ".php?irn=" + record_irn + "&catalogNum=" + record_catalogNum;
			} else {
				console.error("error")
				document.location = record_type + ".php?irn=" + record_irn + "&catalogNum=" + record_catalogNum;
			}
		}
	});

}