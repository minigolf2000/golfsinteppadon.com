Heuristic = Class.create({

	/*
		Given a size 9 array of the cells on the board,
		calculate the optimal place to play
	*/
	findNextMove: function(board, clickedCellIndex) {
		
		// Easy AI will pick a winning move if there is one.
		// Otherwise it will randomly pick a cell to move to
		if ($("easy").checked) {
			while (1) {
				var index = Math.floor(Math.random() * 9);
				if (board.cells[index].container.className == "") {
					board.optimalNextMove = index;
					return;
				}
			}
		}
		
		// Hard AI uses minimax algorithm to never lose
		else if ($("hard").checked) {
			this.maximin(board, -1, 1, clickedCellIndex);
			return;
		}
	},
	
	maximin: function(board, lowerBound, upperBound, clickedCellIndex) {
		var end = board.checkEnd(clickedCellIndex);
		if (end == "tie") {
			board.heuristic = 0;
		}
		else if (end) {
			board.heuristic = board.oTurn == "x" ? -1 : 1;
		}
		for (var i = 0; i < 9; i++) {
			if (board.cells[i].container.owner == null) {
				var newBoard = board.clone(board);
				
				board.cells[i].container.onclick();
				
				this.minimax(newBoard, lowerBound, upperBound, clickedCellIndex);
				
				if (newBoard.heuristic > lowerBound) {
					lowerBound = newBoard.heuristic;
					board.optimalNextMove = i;
				}
				if (lowerBound >= upperBound) {
					return lowerBound;
				}
			}
		}
		board.heuristic = lowerBound;
	},
	
	minimax: function(board, lowerBound, upperBound, clickedCellIndex) {
		var end = board.checkEnd(clickedCellIndex);
		if (end == "tie") {
			board.heuristic = 0;
		}
		else if (end) {
			board.heuristic = board.oTurn == "x" ? -1 : 1;
		}
		for (var i = 0; i < 9; i++) {
			if (board.cells[i].container.owner == null) {
				var newBoard = board.clone();
				
				board.cells[i].container.onclick();
				
				this.maximin(newBoard, lowerBound, upperBound, clickedCellIndex);
				
				if (newBoard.heuristic < upperBound) {
					upperBound = newBoard.heuristic;
					board.optimalNextMove = i;
				}
				if (lowerBound >= upperBound) {
					return lowerBound;
				}
			}
		}
		board.heuristic = upperBound;
	},
	
});