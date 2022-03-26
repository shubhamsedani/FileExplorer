<?php
if(isset($_POST['action']) && $_POST['FolderName'])
{
	$dir = $_POST['DirectoryPath'] . '/' . $_POST['FolderName'];
	if($_POST['action'] == "create")
	{
		if (!file_exists($dir)) {
			mkdir($dir, 0777, true);
			$message = "The folder is created";
			$status = "true";
		}else{
			$message = "There is a folder with same name";
			$status = "false";
		}

		$response_array = array();
		$res['files'] = [];
		$res['folders'] = [];
		$route_data = (array_slice((scandir($_POST['DirectoryPath'])),2));// if array slice isn't done here then it will show 2 more folder which is . and ..
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
		$response_array['data'] = $res;
		$response_array['rootpath'] = $_POST['DirectoryPath'];
	}
}else{
	$message = "There is a problem while creating the folder";
	$status = "False";
}

$response_array['message'] = $message;
$response_array['status'] = $status;
header('Content-Type: application/json');
print_r(json_encode($response_array));
?>