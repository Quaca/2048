<?php
    $con = mysqli_connect("localhost","root","password");
    mysqli_select_db($con, "2048");

    if(mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
	
	$return = '<table class="table table-hover" id="table">
					<thead>
						<tr>
							<th>#</th>
							<th>IME</th>
							<th>SKOR</th>
						</tr>
					</thead>
					<tbody>';
    $results = mysqli_query($con, "SELECT * FROM Highscore ORDER BY score DESC");
	
	$redniBroj = 1;
    while($result = mysqli_fetch_array($results, MYSQL_ASSOC)){
		$return .= "<tr>
						<td>{$redniBroj}.</td>";
		$return .= "<td>{$result['Name']}</td>";
        $return .= "<td>{$result['Score']}<td><tr>";
        $redniBroj++;
	}
	
	$return .= '</tbody></table>';
	
	header('Access-Control-Allow-Origin: *');  
	header('Content-Type: application/json');
	$response_array['success'] = 'true';
	$response_array['content'] = $return;
	$encoded = json_encode($response_array, JSON_PRETTY_PRINT);
	echo $encoded;
	exit();
?> 