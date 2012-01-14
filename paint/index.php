<?php
# Written by Golf Sinteppadon
$title = "GS Paint";
$includes = array('<link rel="stylesheet" type="text/css" href="paint.css" />',
				  '<script src="/global/prototype.js" type="text/javascript"></script>',
				  '<script src="paint.js" type="text/javascript"></script>');
include("../global/header.php");
?>
		<div class="cloud">
			<h2>GS Paint</h2>
			<div id="frame">
				<div id="toolbox">
					<div id="tools"></div>
					<div id="colors"></div>
				</div>
				<canvas id="canvas" width="600" height="500">
					<div id="nocanvas">
						<h3><strong>Sorry!</strong></h3>
						<p>
							GS Paint is not compatible with your browser.
							You could download and install another web browser,
							but it's probably not worth the effort.
						</p>
					</div>
				</canvas>
			</div>
		</div>
<?php
include("../global/footer.html");
?>