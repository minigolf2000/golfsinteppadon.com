var currentBoard; // Tic tac toe board
var oneplay;

var gameRunning = true;
var heuristic;

Event.observe(window, 'load', function() {
	currentBoard = new Board();
	currentBoard.createHTML();
	// Preload images
	var imageObj = new Image();
	imageObj.src = "images/o.png";
	imageObj.src = "images/x.png";
	
	$("easy").onclick = $("hard").onclick = $("reset").onclick = resetBoard;
	$("1player").onclick = oneplayclick;
	$("2player").onclick = twoplayclick;
	
	heuristic = new Heuristic();
	oneplayclick();
});


function click(clickedCellIndex) {
	var victorySquares = currentBoard.checkEnd(clickedCellIndex);
	if (victorySquares) {
		// At this point, the game is over
		gameRunning = false;
		if (victorySquares == "tie") { // Tie game
			$("message").innerText = $("message").textContent = "Cat's Game!";
			$("message").className = "";
			return;
		}
		else if (!currentBoard.oTurn) { // X won
			$("message").innerText = $("message").textContent = "X Wins!";
			$("message").className = "red";
		}
		else { // O won
			$("message").innerText = $("message").textContent = "O Wins!";
			$("message").className = "blue";
		}
		Effect.Pulsate(currentBoard.cells[victorySquares.charAt(0)].container, {pulses: 3, duration: 1.5});
		Effect.Pulsate(currentBoard.cells[victorySquares.charAt(1)].container, {pulses: 3, duration: 1.5});
		Effect.Pulsate(currentBoard.cells[victorySquares.charAt(2)].container, {pulses: 3, duration: 1.5});
		return;
	}
	currentBoard.oTurn = !currentBoard.oTurn;
	
	// Update turn indicator
	updateTurnIndicator();
	
	// // AI move
	if (currentBoard.oTurn && oneplay && gameRunning) {
		// Get the cell to move to, and click that cell
		heuristic.findNextMove(currentBoard, clickedCellIndex);
		currentBoard.cells[currentBoard.optimalNextMove].container.onclick();
	}
}

function oneplayclick() {
	$("gametype").innerText = $("gametype").textContent = "1 Player";
	$("2player").setAttribute("class", "notDisabled");
	$("1player").setAttribute("class", "disabled");
	$("difficulty").style.display = "block";
	$("turnIndicator").style.display = "none";
	resetBoard();
	oneplay = true;
}

function twoplayclick() {
	$("gametype").innerText = $("gametype").textContent = "2 Player";
	$("2player").setAttribute("class", "disabled");
	$("1player").setAttribute("class", "notDisabled");
	$("difficulty").style.display = "none";
	$("turnIndicator").style.display = "block";
	resetBoard();
	oneplay = false;
}

function resetBoard() {
	currentBoard.reset();
	for (var i = 0; i < currentBoard.cells.length; i++) {
		currentBoard.cells[i].reset();
	}
}

// Updates the turn indicator for two player games
function updateTurnIndicator() {
	$("demoCell").setAttribute("class", currentBoard.oTurn ? "o" : "x");
}