<?php
$title = "Blocky&apos;s Page";
$includes = array('<link rel="stylesheet" type="text/css" href="blocky.css" />',
				  '<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>',
				  '<script src="blocky.js"></script>');

include("../global/header.php");
?>
		<div class="cloud">
			<div id="controls"><img src="images/controls.png" alt=""/></div>
			<div id="frame"></div>
			<div id="debug"></div>
		</div>
<?php
include("../global/footer.html");