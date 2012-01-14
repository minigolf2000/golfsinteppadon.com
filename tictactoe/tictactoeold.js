var oTurn = false, // False if it is x's turn to go, true if it is o's turn to go
	gameRunning = true, // True if the game is in progress, false if game is over
	oneplay = false, // True if player is playing against AI
	echoEverything = false; // Debugging parameter used to alert all AI board rotations

Event.observe(window, 'load', function() {
	// Preload images
	var imageObj = new Image();
	imageObj.src = "o.png";
	imageObj.src = "x.png";
	imageObj.src = "tictactoeresethover.png";
	
	for (var i = 0; i < 9; i++) {
		var square = document.createElement("div");
		square.id = i + "";
		square.style.top = Math.floor(i / 3) * 60 + "px";
		square.style.left = i % 3 * 60 + "px";
		square.onclick = click;
		square.onmouseover = highlight;
		square.onmouseout = unhighlight;
		$("gameboard").appendChild(square);
	}
	$("easy").onclick = $("hard").onclick = $("reset").onclick = reset;
	$("1player").onclick = oneplayclick;
	$("2player").onclick = twoplayclick;
	oneplayclick();
});

function click() {
	// Remove highlights
	$(this).removeClassName("highlightred");
	$(this).removeClassName("highlightblue");
	
	if (!gameRunning || this.hasClassName("o") || this.hasClassName("x"))
		return;
	if (oTurn)
		this.addClassName("o");
	else
		this.addClassName("x");
	var victorySquares = checkEnd();
	if (victorySquares) {
		// At this point, the game is over
		gameRunning = false;
		if (victorySquares == "tie") { // Tie game
			$("message").innerText = $("message").textContent = "Cat's Game!";
			$("message").className = "";
			return;
		}
		else if (!oTurn) { // X won
			$("message").innerText = $("message").textContent = "X Wins!";
			$("message").className = "red";
		}
		else { // O won
			$("message").innerText = $("message").textContent = "O Wins!";
			$("message").className = "blue";
		}
		Effect.Pulsate("" + parseInt(victorySquares.charAt(0)), {pulses: 3, duration: 1.5});
		Effect.Pulsate("" + parseInt(victorySquares.charAt(1)), {pulses: 3, duration: 1.5});
		Effect.Pulsate("" + parseInt(victorySquares.charAt(2)), {pulses: 3, duration: 1.5});
	}
	oTurn = !oTurn;
	
	// Update turn indicator
	updateTurnIndicator();
	
	// AI move
	if (oTurn && oneplay && gameRunning) {
		// Get the cell to move to, and click that cell
		var board = [];
		for (var i = 0; i < 9; i++) {
			board.push($("" + i).className);
		}
		$("" + aiMove(board)).onclick();
	}
}

/**
* Check if the game is over. If someone won, return a string containing 3 integers representing the winning squares,
* if the game is a tie, return "tie", otherwise return false.
*/
function checkEnd() {
	var player = (oTurn) ? "o" : "x";
	// Check for vertical wins
	if ($("0").hasClassName(player) && $("3").hasClassName(player) && $("6").hasClassName(player))
		return "036";
	if ($("1").hasClassName(player) && $("4").hasClassName(player) && $("7").hasClassName(player))
		return "147";
	if ($("2").hasClassName(player) && $("5").hasClassName(player) && $("8").hasClassName(player))
		return "258";
	// Check for horizontal wins
	if ($("0").hasClassName(player) && $("1").hasClassName(player) && $("2").hasClassName(player))
		return "012";
	if ($("3").hasClassName(player) && $("4").hasClassName(player) && $("5").hasClassName(player))
		return "345";
	if ($("6").hasClassName(player) && $("7").hasClassName(player) && $("8").hasClassName(player))
		return "678";
	// Check for diagonal wins
	if ($("0").hasClassName(player) && $("4").hasClassName(player) && $("8").hasClassName(player))
		return "048";
	if ($("2").hasClassName(player) && $("4").hasClassName(player) && $("6").hasClassName(player))
		return "246";
	
	// Check for a tie
	for (var i = 0; $("" + i).hasClassName("x") || $("" + i).hasClassName("o"); i++) {
		if (i == 8) {
			return "tie";
		}
	}
	return false;
}

function reset() {
	var tiles = $$("#gameboard div");
	for (var i = 0; i < tiles.length; i++) {
		tiles[i].className = "";
	}
	oTurn = false;
	gameRunning = true;
	updateTurnIndicator();
	$("message").innerText = $("message").textContent = "";
}

function highlight() {
	if (!gameRunning || $(this).hasClassName("o") || $(this).hasClassName("x"))
		return;
	else if (!oTurn)
		$(this).addClassName("highlightred");
	else
		$(this).addClassName("highlightblue");
}

function unhighlight() {
	$(this).removeClassName("highlightred");
	$(this).removeClassName("highlightblue");
}

function oneplayclick() {
	$("gametype").innerText = $("gametype").textContent = "1 Player";
	$("2player").setAttribute("class", "notDisabled");
	$("1player").setAttribute("class", "disabled");
	$("difficulty").style.display = "block";
	$("turnIndicator").style.display = "none";
	reset();
	oneplay = true;
}

function twoplayclick() {
	$("gametype").innerText = $("gametype").textContent = "2 Player";
	$("2player").setAttribute("class", "disabled");
	$("1player").setAttribute("class", "notDisabled");
	$("difficulty").style.display = "none";
	$("turnIndicator").style.display = "block";
	reset();
	oneplay = false;
}

// Updates the turn indicator for two player games
function updateTurnIndicator() {
	if (gameRunning) {
		$("demoCell").setAttribute("class", oTurn ? "o" : "x");
	}
}

/**
 * Tic tac toe AI methods
 */
 
// Return the cell to move to
// Board is an array of the current board ([x, o, , , x, o, , , ])
function aiMove(board) {
	
	// Easy AI will pick a winning move if there is one.
	// Otherwise it will randomly pick a cell to move to
	if ($("easy").checked) {
		var winningMove = checkForWinningMoves(board);
		if (winningMove > -1) {
			return winningMove;
		
		}
		var cell;
		while (1) {
			cell = Math.floor(Math.random() * 9);
			if ($(cell + "").className == "") {
				return cell;
			}
		}
	}
	// Hard AI uses minimax algorithm to never lose
	else if ($("hard").checked) {
		if (!board[4]) {
			return 4;
		}
		var winningMove = checkForWinningMoves(board);
		if (winningMove > -1) {
			return winningMove;
		}
		var cell;
		while (1) {
			cell = Math.floor(Math.random() * 9);
			if ($(cell + "").className == "") {
				return cell;
			}
		}
	}
}

// Returns a cell that the AI can move to to win the game. If no such
// move exists, return -1
function checkForWinningMoves(board) {
	echoEverything = false;
	var winningMove = checkWinningMove(board, 3);
	if (winningMove > -1) return winningMove;
	return -1;
}


function checkWinningMove(board, remainingRotations) {
	
	if (board[0] == "o" && board[1] == "o" && board[2] == "") {
		//alert(2);
		echoEverything = true;
		return 2;
	}
	if (board[0] == "o" && board[1] == "" && board[2] == "o") {
		//alert(1);
		echoEverything = true;
		return 1;
	}
	if (board[0] == "" && board[1] == "o" && board[2] == "o") {
		//alert(1);
		echoEverything = true;
		return 0;
	}
	if (board[0] == "o" && board[4] == "o" && board[8] == "") {
		//alert(8);
		echoEverything = true;
		return 8;
	}
	if (board[0] == "o" && board[4] == "" && board[8] == "o") {
		//alert(4);
		echoEverything = true;
		return 4;
	}
	if (board[1] == "o" && board[4] == "o" && board[7] == "") {
		//alert(7);
		echoEverything = true;
		return 7;
	}
	if (board[1] == "o" && board[4] == "" && board[7] == "o") {
		//alert(4);
		echoEverything = true;
		return 4;
	}
	if (remainingRotations > 0) {
		var winningMove = unrotate(checkWinningMove(rotateBoard(board), remainingRotations - 1));
		//if (echoEverything) alert(winningMove);
		return winningMove;
	}
	return -1;
}

// Rotate the board by 90 degrees
//      012     630
// from 345  to 741
//      678     852
function rotateBoard(board) {
	return [board[2], board[5], board[8], board[1], board[4], board[7], board[0], board[3], board[6]];
}

// Unrotates a cell by rotating it -90 degrees
//      630     012
// from 741  to 345
//      852     678
function unrotate(cell) {
	return (cell == -1) ? -1 : (cell % 3 * 3 + 2) - Math.floor(cell / 3);
}

// Flip the board over the x axis
//      012     678
// from 345  to 345
//      678     012
// function flipBoard(board) {
	// return [board[6], board[7], board[8], board[3], board[4], board[5], board[0], board[1], board[2]];
// }