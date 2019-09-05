<?php

if (isset($_POST["name"]) && isset($_POST["phonenumber"]) && isset($_POST["transport_cat"]) && isset($_POST["quantity"]) && isset($_POST["tasks"])) { 

    $to = "ПОЧТА.RU";
    $subject = "M2M";
    
    $message = "Имя: " . $_POST["name"] . "\r\n";
    $message .= "Телефон: " . $_POST["phonenumber"] . "\r\n";
    $message .= "Категория транспорта: " . $_POST["transport_cat"] . "\r\n";
    $message .= "Количество техники: " . $_POST["quantity"] . "\r\n";
    $message .= "Планируемые задачи: " . $_POST["tasks"];
    
    $retval = mail ($to,$subject,$message);
    
    if( $retval == true ) {
     	$result = array(
	    	'name' => $_POST["name"],
	    	'phonenumber' => $_POST["phonenumber"]
	     ); 
    }else{
    	$result = array(
	    	'name' => 0,
	    	'phonenumber' => $_POST["phonenumber"]
	    ); 
    }

    echo json_encode($result);
}

?>
