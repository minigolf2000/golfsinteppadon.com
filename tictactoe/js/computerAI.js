ComputerAI = Class.create({
	
/**
 * Tic tac toe AI methods
 */
 
// Return the cell to move to
// Board is an array of the current board ([x, o, , , x, o, , , ])
	aiMove: function(board) {
		
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
	},

	// Returns a cell that the AI can move to to win the game. If no such
	// move exists, return -1
	checkForWinningMoves: function(board) {
		echoEverything = false;
		var winningMove = checkWinningMove(board, 3);
		if (winningMove > -1) return winningMove;
		return -1;
	},


	checkWinningMove: function(board, remainingRotations) {
		
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
});