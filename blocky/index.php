<?php
$title = "Blocky&apos;s Page";
$includes = array('<link rel="stylesheet" type="text/css" href="blocky.css" />',
				  '<script src="/global/prototype.js" type="text/javascript"></script>',
				  '<script src="blocky.js" type="text/javascript"></script>');

include("../global/header.php");
?>
		<div class="cloud">
			<div id="controls"><img src="images/controls.png" alt=""/></div>
			<div id="frame"></div>
			<div id="debug"></div>
		</div>
<?php
include("../global/footer.html");