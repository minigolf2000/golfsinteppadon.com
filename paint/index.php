<?php
# Written by Golf Sinteppadon
$title = "GS Paint";
$includes = array('<link rel="stylesheet" type="text/css" href="paint.css" />',
				  '<script src="http://code.jquery.com/jquery-latest.min.js"></script>',
                  '<script src="http://golfsinteppadon.com/jquery-paintable.js"></script>',
				  '<script src="paint.js"></script>');
include("../global/header.php");
?>
		<div class="cloud">
			<h2>GS Paint</h2>
			<div id="frame">
				<div id="toolbar"></div>
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
            <p>Also see:</p>
            <ul>
                <li><a class="green" href="/painttheweb"><img src="/painttheweb/icon.png" alt="Paint the Web" />Paint the Web</a></li>
                <li><a href="https://github.com/MiniGolf2000/jquery-paintable"><img src="github.png" alt="Github" />.paintable()</a><span> jQuery plugin on Github</span></li>
		</div>
<?php
include("../global/footer.html");
?>