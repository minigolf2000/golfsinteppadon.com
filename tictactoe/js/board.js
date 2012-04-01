var tictactoe = (function (tictactoe) {

    var self = {};

    var _ = {};

    /** 1-D array of the current board ([x, o, , , x, o, , , ]) */
    _.board = [];

    _.initialize = function () {
        for (var index = 0; index < 9; index++) {
            var $cell = $('<div></div>')
            .attr('id', index)
            .css({top: Math.floor(index / 3) * 60 + 'px', left: index % 3 * 60 + 'px'});
            $('#board').append($cell);
        }
    };

    self.reset = function () {
        $('#board').off();
        $('.x, .o').removeClass('x o');
        _.board = ['', '', '', '', '', '', '', '', ''];
    };

    self.getBoard = function () {
        return _.board;
    };

    /**
    * Check if the game is over.
    * If game is won, return {'winningCells': stringContainingWinningCellIds, 'player': 'x' or 'o'}
    * If the game is a tie, return "tie", if game is not over return false.
    */
    self.checkEnd = function(clickedIndex) {
        var cellsToHighlight = {};
        $.each([[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]], function () {
            if ((_.board[this[0]].length > 0) && (_.board[this[0]] == _.board[this[1]]) && (_.board[this[1]] == _.board[this[2]])) {
                cellsToHighlight[this[0]] = cellsToHighlight[this[1]] = cellsToHighlight[this[2]] = 1;
            }
        });
        if (!$.isEmptyObject(cellsToHighlight)) {
            var winningCells = [];
            $.each(cellsToHighlight, function (cell) {
                winningCells.push(cell);
            });
            return {'winningCells': winningCells, 'player': _.board[winningCells[0]]};
        };

        if (_.board.join('').length == 9) {
            return 'tie';
        }

        return false;
    };

    $(function () {
        _.initialize();
    });

    tictactoe.board = self;
    return tictactoe;

})(tictactoe || {});