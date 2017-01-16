<!DOCTYPE html>
<html>
<head>
	<link href='http://fonts.googleapis.com/css?family=Droid+Sans:regular,bold' rel='stylesheet' type='text/css'>
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="stylesheet" type="text/css" href="/global/global.css" />
<?php
# $includes - text string containing the file to include in the HTML document
# $title - text string of the page title
	if ($includes) {
		foreach ($includes as $include) {
?>
	<?php echo $include ?>

<?php
		}
	}
?>
	<title><?php echo ($title) ? $title . " | " : "" ?>Golf Sinteppadon</title>
</head>
<body>
<div id="container">
	<h1><a href="/">Golf Sinteppadon</a></h1>
