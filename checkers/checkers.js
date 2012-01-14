/**
* Javascript Checkers - Standard game of 2 player checkers
* By Golf Sinteppadon
*/

var CELL_SIZE = 60; // side length of each box in the grid
var blueTurn = false; // true if it is blue's turn, false if it is red's turn
var selectedBox; // the panel on the board that has already been selected, null if there is no selected panel
var forcedJumps = []; // array of pieces that are forced to jump another piece

Event.observe(window, 'load', function() {
	// Preload images
	var imageObj = new Image();
	imageObj.src = "blueking.png";
	imageObj.src = "redking.png";
	
	boardSetup();
});

function boardSetup() {

	// Board setup
	var i, panel;
	for (i = 0; i < 64; i++) {
		panel = document.createElement("div");
		panel.style.top = Math.floor(i / 8) * CELL_SIZE + "px";
		panel.style.left = i % 8 * CELL_SIZE + "px";
		
		// If the cell is a playable checkers cell
		if (((i + Math.floor(i / 8)) % 2) == 0) {
			$(panel).addClassName("playable");
			panel.id = "" + Math.floor(i / 8) + i % 8;
			panel.onclick = click;
			panel.onmouseover = highlight;
			panel.onmouseout = unhighlight;
			// Piece setup
			if (i < 24) {
				panel.addClassName("blue");
			}
			if (40 < i) {
				panel.addClassName("red");
			}
		}
		$("gameboard").appendChild(panel);
	}
}

function highlight() {
	if (blueTurn) {
		this.addClassName("highlightblue");
	}
	else {
		this.addClassName("highlightred");
	}
}

function unhighlight() {
	this.removeClassName("highlightred");
	this.removeClassName("highlightblue");
}

/**
* Called when a box is clicked. Acts differently if there is already a selected box.
*/
function click() {
	// If clicking on a cell with your piece in it, highlight the cell
	if (!selectedBox) { // 1st click
		if ((!blueTurn && this.hasClassName("red")) || (blueTurn && this.hasClassName("blue"))) {
			this.addClassName("selected");
			selectedBox = this;
		}
	}
	
	// Player is trying to move a piece
	else { // 2nd click
		selectedBox.removeClassName("selected");
		this.onmouseout();
		
		// If there are forced jumps and player is not jumping, highlight forced jumps
		if (forcedJumps != false) {
			if (!jump(this)) {
				highlightForcedJumps(forcedJumps);
			}
		}
		
		// Try moving, then try jumping
		else if (!move(this))
			jump(this);
			
		selectedBox = null;
		checkVictory();
	}
}

/**
* Move a piece to the selected square if the move is legal
* Returns whether or not the move was successful
*/
function move(currentBox) {
	var currentid = parseInt(currentBox.id),
		selectedid = parseInt(selectedBox.id);
	if (!currentBox.hasClassName("blue") && !currentBox.hasClassName("red") && // Check if panel is empty
	
		(((selectedBox.hasClassName("king") || !blueTurn) && // Check possible red moves
		(currentid == parseInt(selectedid) - 11 || currentid == parseInt(selectedid) - 9)) ||
		((selectedBox.hasClassName("king") || blueTurn) && // Check possible blue moves
		(currentid == parseInt(selectedid) + 11 || currentid == parseInt(selectedid) + 9)))) {
		
		swapClass(selectedBox, currentBox);
		
		blueTurn = !blueTurn;
		forcedJumps = checkForcedJumps($$("div.playable.blue, div.playable.red"));
		king(currentBox);
		return true;
	}
	return false;
}

/**
* Jump a piece over another piece if the jump is legal
*/
function jump(currentBox) {
	var currentid = parseInt(currentBox.id);
	var selectedid = parseInt(selectedBox.id);
	var middleid = (currentid + selectedid) / 2
	if (!currentBox.hasClassName("blue") && !currentBox.hasClassName("red") && // Check if panel is empty
	
		(((selectedBox.hasClassName("king") || !blueTurn) && (currentid == selectedid - 22 || currentid == selectedid - 18)) || // Check possible red moves
		((selectedBox.hasClassName("king") || blueTurn) && (currentid == selectedid + 22 || currentid == selectedid + 18))) && // Check possible blue moves
		
		((!blueTurn && $(middleid + "").hasClassName("blue")) || // Check panel in between jump for red's turn
		(blueTurn && $(middleid + "").hasClassName("red")))) { // Check panel in between jump for blue's turn
		
		swapClass(selectedBox, currentBox);
		$(middleid + "").className = "playable";
		
		forcedJumps = checkForcedJumps([currentBox]);
		if (forcedJumps == false) {
			blueTurn = !blueTurn;
			forcedJumps = checkForcedJumps($$("div.playable.blue, div.playable.red"));
		}
		king(currentBox);
		return true;
	}
	return false;
}

/**
* Given an array of boxes to check, returns the boxes where a piece is forced to jump another piece
*/
function checkForcedJumps(pieces) {
	var forcedJumps = [];
	
	for (var i = 0; i < pieces.length; i++) {
	
		var cellId = parseInt(pieces[i].id);
		
		if ((!blueTurn && pieces[i].hasClassName("red") && checkForcedJump(cellId, "up")) ||
			(blueTurn && pieces[i].hasClassName("blue") && checkForcedJump(cellId, "down")) ||
			(!blueTurn && pieces[i].hasClassName("red king") && checkForcedJump(cellId, "down")) ||
			(blueTurn && pieces[i].hasClassName("blue king") && checkForcedJump(cellId, "up"))) {
			
				forcedJumps.push(pieces[i]);
		}
	}
	return forcedJumps;
}

function checkForcedJump(cellId, direction) {
	var opposingColor = blueTurn ? "red" : "blue";
	if (direction == "up") {
		return (($(cellId - 11 + "") && $(cellId - 11 + "").hasClassName(opposingColor) && // Check up-left jump
			$(cellId - 22 + "") && $(cellId - 22 + "").className == "playable") ||
			($(cellId - 9 + "") && $(cellId - 9 + "").hasClassName(opposingColor) && // Check up-right jump
			$(cellId - 18 + "") && $(cellId - 18 + "").className == "playable"));
	}
	else { // direction == "down"
		return (($(cellId + 11 + "") && $(cellId + 11 + "").hasClassName(opposingColor) && // Check down-right jump
			$(cellId + 22 + "") && $(cellId + 22 + "").className == "playable") ||
			($(cellId + 9 + "") && $(cellId + 9 + "").hasClassName(opposingColor) && // Check down-left jump
			$(cellId + 18 + "") && $(cellId + 18 + "").className == "playable"));
	}
}

/**
* Highlight available jumps if user tries to move while forced jumps exist
*/
function highlightForcedJumps(jumps) {
	for (var i = 0; i < jumps.length; i++) {
		jumps[i].style.opacity = 1;
		new Effect.Pulsate(jumps[i], {duration: 1.0, pulses: 2});
	}
}

function checkVictory() {
	if ($$(".blue").length == 0) {
		$("message").innerText = $("message").textContent = "Red Wins!";
		$("message").style.color = "red";
	}
	else if ($$(".red").length == 0) {
		$("message").innerText = $("message").textContent = "Blue Wins!";
		$("message").style.color = "blue";
	}
}

// Helper method called to swap two boxes' classes
function swapClass(box1, box2) {
	var temp = box1.className;
	box1.className = box2.className;
	box2.className = temp;
}

// Helper method called to king players
function king(currentBox) {
	if (Math.floor(parseInt(currentBox.id) / 10) == 0 || Math.floor(parseInt(currentBox.id) / 10) == 7)
		currentBox.addClassName("king");
}