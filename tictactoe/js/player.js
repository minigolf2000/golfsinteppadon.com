var tictactoe = (function (tictactoe) {

    tictactoe.createPlayer = function (isPlayer, isX) {
        var _ = {};

        _.isPlayer = isPlayer;
        _.isX = isX;


        _.highlightCell = function () {
            $(this).addClass("highlight-" + (_.isX ? 'x' : 'o'));
        };

        _.unhighlightCell = function () {
            $(this).removeClass('highlight-x highlight-o');
        };

        _.clickCell = function () {
            $(this).removeClass('highlight-x highlight-o');
            tictactoe.move($(this).get(0).id);
        };

        if (_.isPlayer) {
                    $('#board').on('click', 'div', _.clickCell)
                    .on('mouseover', 'div', _.highlightCell)
                    .on('mouseout', 'div', _.unhighlightCell);
        }

        return {
            isPlayer: _.isPlayer,
            isX: _.isX,
            /**
             * Begin the process of finding the next move. For a human,
             * this means setting up proper click handlers. For an AI,
             * this means searching for the appropriate move to make.
             * Both cases will call tictactoe.move(id) when finished
             */
            findNextMove: function () {
                if (!_.isPlayer) {
                    ($('#easy').get(0).checked) ? tictactoe.easyAI.findNextMove(tictactoe.board.getBoard()) :
                                                  tictactoe.hardAI.findNextMove(tictactoe.board.getBoard());
                }
            },

        };
    };

    return tictactoe;

})(tictactoe || {});
