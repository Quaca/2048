<?php
if($_SERVER['REQUEST_METHOD'] == 'POST'){
	if(empty($_POST['name']) && empty($_POST['score'])){
		header('Access-Control-Allow-Origin: *');  
		header('Content-Type: application/json');
		$response_array['success'] = 'false';
		$response_array['content'] = 'Missing parameters!';
		$encoded = json_encode($response_array, JSON_PRETTY_PRINT);
		echo $encoded;
		exit();
	}
    $con = mysqli_connect("localhost","root","password");
    mysqli_select_db($con, "2048");

    if(mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

	$name = $_POST['name'];
	$score = $_POST['score'];
	$query = mysqli_query($con, "INSERT INTO `Highscore` (`ID`, `Name`, `Score`) VALUES (NULL, '$name', '$score')");
	if($query){
		header('Access-Control-Allow-Origin: *');  
		header('Content-Type: application/json');
		$response_array['success'] = 'true';
		$response_array['content'] = 'Uspjesno unesen rezultat!';
		$encoded = json_encode($response_array, JSON_PRETTY_PRINT);
		echo $encoded;
		exit();
	}
}else{
	die('pogresna metoda..');
}
?> 