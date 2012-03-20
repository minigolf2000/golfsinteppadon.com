<?php
# Chuck Norris Fact Generator
# Written by Golf Sinteppadon
$title = "Chuck Norris Fact Generator";
$includes = array('<link rel="stylesheet" type="text/css" href="chuck.css" />',
				  '<script src="http://code.jquery.com/jquery-latest.min.js"></script>',
				  '<script src="chuck.js"></script>');

$facts = explode('","', file_get_contents("chuck.csv"));
include("../global/header.php");
?>
		<div class="cloud">
			<h2><span class="chucknorris static">Chuck Norris</span> Fact Generator</h2>
			<fieldset>
				<legend><strong><span class="chucknorris static">Chuck Norris</span> Fact</strong></legend>
<?php
foreach ($facts as $fact) {
    echo '<span class="fact">' . $fact . '</span>';
}
?>
			</fieldset>
			<p><span id="nextfact">See next fact</span></p>

			<label>
				<strong>Now viewing awesome facts about</strong>
				<input id="nameinput" autocomplete="off" type="text" name="name" value="Chuck Norris" />
			</label>
		</div>
<?php
include("../global/footer.html");
?>