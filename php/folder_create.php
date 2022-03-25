<?php
if(isset($_POST['action']) && $_POST['FolderName'])
{
	$dir = $_POST['DirectoryPath'] . '/' . $_POST['FolderName'];
	if($_POST['action'] == "create")
	{
		$message = "The folder is created";
		$status = "true";

		if (!file_exists($dir)) {
			mkdir($dir, 0777, true);
		}
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