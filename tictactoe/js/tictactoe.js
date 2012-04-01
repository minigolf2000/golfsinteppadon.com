var tictactoe = (function (self) {

    self.oTurn = false;
    self.gameRunning = true;

    var _ = {};

    _.playerIsX = true;
    _.players = {'x': null, 'o': null};

    _.initialize = function () {
        // Preload images
        var imageObj = new Image();
        imageObj.src = "images/o.png";
        imageObj.src = "images/x.png";

        $('#reset').on('click', tictactoe.resetBoard);
        
        tictactoe.resetBoard();
    }

    self.resetBoard = function () {
        tictactoe.board.reset();
        tictactoe.oTurn = false;
        tictactoe.gameRunning = true;
        $("#message").text('');


        _.players = {'x': tictactoe.createPlayer(_.playerIsX /* should be the player */, true /* name is x */),
                     'o': tictactoe.createPlayer(!_.playerIsX /* should be the AI */, false /* name is o */)};
        _.playerIsX = !_.playerIsX;
        _.players.x.findNextMove();
    };

    self.move = function (cell) {
        $('#' + cell).addClass(self.oTurn ? 'o' : 'x');
        tictactoe.board.getBoard()[cell] = (self.oTurn ? 'o' : 'x');

        var victorySquares = tictactoe.board.checkEnd(cell);
        if (victorySquares) {
            tictactoe.gameRunning = false;
            
            $('#board').off();
            if (victorySquares == "tie") { // Tie game
                $("#message").text("Cat's Game!");
            } else {
                $('#message').text(victorySquares.player.toUpperCase() + ' Wins!');
                
                // Animate winning cells
                $('#' + victorySquares.winningCells.join(', #')).fadeTo('fast', 0, function () { $(this).fadeTo('fast', 1); })
            }
            return;
        }

        tictactoe.oTurn = !tictactoe.oTurn;
        _.players[tictactoe.oTurn ? 'o' : 'x'].findNextMove();
    };

    $(function () {
        _.initialize();
    });

    return self;

})(tictactoe || {});