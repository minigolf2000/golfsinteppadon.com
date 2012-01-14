<?php
$title = "Tic Tac Toe";
$includes = array('<link rel="stylesheet" type="text/css" href="tictactoe.css" />',
				  '<script src="../global/prototype.js" type="text/javascript"></script>',
				  '<script src="../global/effects.js" type="text/javascript"></script>',
				  '<script src="tictactoe.js" type="text/javascript"></script>',
				  '<script src="board.js" type="text/javascript"></script>',
				  '<script src="cell.js" type="text/javascript"></script>',
				  '<script src="computerAI.js" type="text/javascript"></script>',
				  '<script src="heuristic.js" type="text/javascript"></script>');
include("../global/header.php");
?>
		<div class="cloud">
			<h2>Tic Tac Toe</h2>
			<div id="modes">
			</div>
			<div id="gamearea">
				<h3 id="gametype"></h3>
				<button id="1player">1 Player</button>
				<button id="2player">2 Player</button>
				<div id="gameboard"></div>
				<button id="reset">Reset</button>
				<div id="message"></div>
			</div>
			<div id="sidebar">
				<div id="difficulty">
					<h4>AI Type</h4>
					<label><input id="easy" type="radio" checked="checked" name="difficulty" />Random</label>
					<br />
					<label><input id="hard" type="radio" name="difficulty" />Perfect</label>
				</div>
				<div id="turnIndicator">
					<div id="demoCell">'s turn</div>
				</div>
			</div>
			<p id="debug"></p>
		</div>
<?php
include("../global/footer.html");
?>