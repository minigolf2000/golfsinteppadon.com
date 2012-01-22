<?php
$title = "Checkers";
$includes = array('<link rel="stylesheet" href="checkers.css" type="text/css" />',
				  '<script src="../global/prototype.js"></script>',
				  '<script src="../global/effects.js"></script>',
				  '<script src="checkers.js"></script>');
include("../global/header.php");
?>
		<div class="cloud">
			<h2>Checkers</h2>
			<p>2 Player Checkers</p>
			<div id="gameboard"></div>
			<div id="message"></div>
		</div>
<?php
include("../global/footer.html");
?>