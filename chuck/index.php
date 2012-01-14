<?php
# Chuck Norris Fact Generator
# Written by Golf Sinteppadon
$title = "Chuck Norris Fact Generator";
$includes = array('<link rel="stylesheet" type="text/css" href="chuck.css" />',
				  '<script src="/global/prototype.js" type="text/javascript"></script>',
				  '<script src="chuck.js" type="text/javascript"></script>');

$facts = explode('","', file_get_contents("chuck.csv"));
include("../global/header.php");
?>
		<div class="cloud">
			<h2><span class="chucknorris static">Chuck Norris</span> Fact Generator</h2>
			<fieldset>
				<legend><strong><span class="chucknorris static">Chuck Norris</span> Fact</strong></legend>
<?php
foreach ($facts as $fact) {
?>
	<span class="fact"><?php echo $fact ?></span>
<?php
}
?>
			</fieldset>
			<p><span id="nextfact">See next fact</span></p>
			
			<label>
				<strong>Viewing awesome facts about</strong>
				<input id="nameinput" autocomplete="off" type="text" name="name" value="Chuck Norris" />
			</label>
		</div>
<?php
include("../global/footer.html");
?>