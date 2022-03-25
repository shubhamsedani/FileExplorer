<?php
$dir = '../root';
if(isset($_POST['action']))
{
	if($_POST['action'] == "fetch")
	{
		$response_array = array();
		$res['files'] = [];
		$res['folders'] = [];
		$route_data = (array_slice((scandir($dir)),2));
		$message = "The data is perfeclty sending to the front side";
		$status = "true";

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
	}
}else{
	$message = "There is a problem while sending the data.";
	$status = "False";
	$res = [];
}

$response_array['data'] = $res;
$response_array['rootpath'] = $dir;
$response_array['message'] = $message;
$response_array['status'] = $status;
header('Content-Type: application/json');
print_r(json_encode($response_array));
?>
