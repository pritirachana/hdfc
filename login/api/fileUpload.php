<?php
	$con = mysqli_connect("database-1.cxaubqfbyztl.ap-south-1.rds.amazonaws.com","avaya","Avaya12345","cloudbazaar");
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	$response = "";

	if(isset($_FILES['image']) && isset($_POST['delegate_id'])){
		$file_name = $_FILES['image']['name'];   
		$file_type = $_FILES['image']['type'];
		$temp_file_location = $_FILES['image']['tmp_name']; 
		$ext = pathinfo($file_name, PATHINFO_EXTENSION);
		$rand = rand(1111111111,9999999999);
		move_uploaded_file($temp_file_location,"../upload/".$rand.".".$ext);
		$fileName = "https://cloudbazaar.virtex.in/registration/upload/".$rand.".".$ext;
		$delegate_id = $_POST["delegate_id"];
		$updateExhibitor = mysqli_query($con,"UPDATE delegates SET profile = '$fileName' WHERE id = '$delegate_id'");
		$response = array(
	        'code' => '200',
	        'msg' => 'Updated Successfully'
	    );
		echo json_encode($response);	 
	}
	else{
		$response = array(
	        'code' => '400',
	        'msg' => 'Error in uploading'
	    );
		echo json_encode($response);
	}
?>