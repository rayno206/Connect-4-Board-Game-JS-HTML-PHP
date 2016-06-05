<?php
	$servername = "ec2-52-6-115-99.compute-1.amazonaws.com";
	$username = "s_user19";
	$password = "s_user19";
	$dbname = "s_user19";

	$pname = $_POST["pname"];
	$ptime = $_POST["ptime"];
	$newDate = $_POST["newDate"];


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO winners(Name, TimeOrScore, RecordDate) VALUES ('" . $pname . "','" . $ptime . "' , '" . $newDate . "')";

if (($conn->query($sql) === TRUE) ) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . ":" . $conn->error;
}

$conn->close();
?>