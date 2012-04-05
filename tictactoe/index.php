<?php
$title = "Tic Tac Toe";
$includes = array('<link rel="stylesheet" type="text/css" href="tictactoe.css" />',
				  '<script src="http://code.jquery.com/jquery-latest.min.js"></script>');
if ($handle = opendir('js/')) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != "..") {
            $includes[] = '<script src="js/' . $entry . '"></script>';
        }
    }
    closedir($handle);
}
include("../global/header.php");
?>

		<div class="cloud">
			<h2>Tic Tac Toe</h2>
			<div id="modes">
			</div>
			<div id="gamearea">
				<div id="board"></div>
				<button id="reset">Reset</button>
				<div id="message"></div>
			</div>
            <div id="difficulty">
                <h4>AI Type</h4>
                <label><input id="easyAI" type="radio" checked="checked" name="difficulty" />Random</label>
                <br />
                <label><input id="hardAI" type="radio" name="difficulty" />Perfect</label>
            </div>
		</div>
<?php
include("../global/footer.html");
?>