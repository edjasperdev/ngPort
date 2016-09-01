<?php 
if(isset($_POST['submit'])){
	$errors = '';

    $to = "ed@edwardleonjasper.com"; // this is your Email address
    if(
    	empty($_POST['name'])  || 
   		empty($_POST['email']) || 
   		empty($_POST['message'])
   	) {
    $errors .= "\n Error: all fields are required";
	}

    $from = $_POST['email']; // this is the sender's Email address
    $name = $_POST['name'];
    $subject = "Message from ELJ.com";
    $subject2 = "Copy of Your Message from ELJ.com";
    $message = $name . " from " . $email . " wrote the following:" . "\n\n" . $_POST['message'];
    $message2 = "Here is a copy of your message " . $name . "\n\n" . $_POST['message'];
    if (!preg_match(
		"/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", 
		$from))
	{
    	$errors .= "\n Error: Invalid email address";
	}

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
    if( empty($errors))
	{
	    mail($to,$subject,$message,$headers);
	    mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
	    header('Location: contact.html');
	}
}
?>
