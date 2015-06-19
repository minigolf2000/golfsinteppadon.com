<?php
# AI Soccer
# Written by Golf Sinteppadon
$title = "AI Soccer";
$includes = array('<link rel="stylesheet" type="text/css" href="soccer.css" />',
				  '<script src="/global/prototype.js"></script>',
				  '<script src="js/main.js"></script>',
				  '<script src="js/ball.js"></script>',
				  '<script src="js/soccerPitch.js"></script>',
				  '<script src="js/soccerTeam.js"></script>',
				  '<script src="js/teamStates.js"></script>',
				  '<script src="js/goal.js"></script>',
				  '<script src="js/player.js"></script>',
				  '<script src="js/fieldPlayerState.js"></script>',
				  '<script src="js/goalKeeperState.js"></script>');
include("../global/header.php");
?>
		<div class="cloud">
			<h2>AI Soccer</h2>
			<!--[if IE]>
			<p id="browserWarning"><strong>Warning: </strong>AI Soccer is not compatible with your browser. It may display incorrectly.</p>
			<![endif]-->
			<div id="field">
			</div>
			<div id="scoreboard">
				<span class="red">Red: </span><span class="red" id="redGoals"></span> -
				<span class="blue">Blue: </span><span class="blue" id="blueGoals"></span>
			</div>
		</div>
<?php
include("../global/footer.html");
?>
