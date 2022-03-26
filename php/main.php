<?php
function ShowData($dir){
	$response_array = array();
	$res['files'] = [];
	$res['folders'] = [];
	$route_data = (array_slice((scandir($dir)),2));// if array slice isn't done here then it will show 2 more folder which is . and ..

	foreach ($route_data as $element_name) {	
		$ElementPath = $dir . '/' . $element_name;
		if (is_file($ElementPath)) {
			$temp['path'] = $ElementPath;
			$temp['name'] = $element_name;
			$temp['type'] = pathinfo($element_name, PATHINFO_EXTENSION);
			array_push($res['files'], $temp);
		}else{
			$temp['path'] = $ElementPath;
			$temp['name'] = $element_name;
			$temp['type'] = "folder";
			array_push($res['folders'], $temp);
		}
	}
	return $res;
}

if($_POST['action'] == "fetch" && isset($_POST['action'])) {
		$dir = '../root'; //For the very first time we need this path only so pasted statically, You can change according to the req.
		$res = ShowData($dir);
		$response_array['data'] = $res;
		$response_array['rootpath'] = $dir;
		$response_array['message'] = "The data is perfeclty sending to the front side";
		$response_array['status'] = "true";
	}else if($_POST['action'] == "fetch"){ //if you remove this condition and direcly paste the else part then it will affect with EnterFolder ajax call
		$response_array['message'] = "There is a problem while sending the data!";
		$response_array['status'] = "False";
		$res = [];
}

if($_POST['action'] == "EnterFolder" && isset($_POST['action'])){
		$dir = $_POST['FolderPath'] . '/' . $_POST['FolderName'];
		$res = ShowData($dir);
		$response_array['data'] = $res;
		$response_array['rootpath'] = $dir;
		$response_array['message'] = "The data is perfeclty sending to the front side";
		$response_array['status'] = "true";
	}else if($_POST['action'] == "EnterFolder"){//if you remove this condition and direcly paste the else part then it will affect with fetch ajax call
		$response_array['message'] = "There is a problem while sending the data.";
		$response_array['status'] = "False";
		$res = [];
}

header('Content-Type: application/json');
echo (json_encode($response_array));
?>