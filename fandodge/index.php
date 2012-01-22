<?php
$title = "Korean Fan Dodge";
$includes = array('<link rel="stylesheet" type="text/css" href="fandodge.css" />',
				  '<script src="/global/prototype.js"></script>',
				  '<script src="fandodge.js"></script>');

include("../global/header.php");
?>
		<div class="cloud">
			<h2>Korean Fan Dodge</h2>
			Reading for non-Koreans: <a href="http://www.snopes.com/medical/freakish/fandeath.asp">Korean Fan Death Myth</a>
			<div id="frame">
				<p id="timer">&nbsp;</p>
			</div>
			<div id="controls"><img src="images/controls.png" alt="" /></div>
		</div>
<?php
include("../global/footer.html");