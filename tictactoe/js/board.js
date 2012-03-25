Board = Class.create({
	
	initialize: function() {
		this.cells = [];
		this.oTurn = false;
		for (var i = 0; i < 9; i++) {
			this.cells[i] = new Cell(i);
		}
		
		this.heuristic = null;
		this.optimalNextMove = null;
	/*
		The map of cells to check after a cell has been played
		012
		345
		678
	*/
	this.WINNING_CELLS = [["12", "36", "48"],
						 ["02", "47"],
						 ["01", "58", "46"],
						 ["45", "06"],
						 ["35", "17", "08", "26"],
						 ["34", "28"],
						 ["78", "03", "24"],
						 ["68", "14"],
						 ["67", "25", "04"]];
	},
	
	createHTML: function() {
		this.container = $("gameboard");
		for (var i = 0; i < 9; i++) {
			this.container.appendChild(this.cells[i].container);
		}
	},
	
	clone: function() {
		var clone = new Board();
		
		clone.oTurn = this.oTurn;
		for (var i = 0; i < this.cells.length; i++) {
			clone.cells[i] = this.cells[i].clone();
		}
		return clone;
	},
	
		
	/**
	* Check if the game is over. If someone won, return a string containing 3 integers representing the winning squares,
	* if the game is a tie, return "tie", otherwise return false.
	*/
	checkEnd: function(clickedIndex) {
		var player = (this.oTurn) ? "o" : "x";
		
		//$("debug").textContent += this.toString();
		var cellCombosToCheck = this.WINNING_CELLS[clickedIndex];
		for (var i = 0; i < cellCombosToCheck.length; i++) {
			if (this.cells[cellCombosToCheck[i][0]].container.owner == player &&
				this.cells[cellCombosToCheck[i][1]].container.owner == player) {
				return "" + clickedIndex + cellCombosToCheck[i][0] + cellCombosToCheck[i][1];
			}
		}
		// Check for a tie
		for (var i = 0; this.cells[i].container.hasClassName("x") || this.cells[i].container.hasClassName("o"); i++) {
			if (i == 8) {
				return "tie";
			}
		}
		
		return false;
	},

	reset: function() {
		this.oTurn = false;
		updateTurnIndicator();
		gameRunning = true;
		$("message").innerText = $("message").textContent = "";
	},
	
	toString: function() {
		var toReturn = [];
		for (var i = 0; i < this.cells.length; i++) {
			toReturn[i] = this.cells[i].toString();
		}
		return "[" + toReturn.join(",") + "]";
	}
});