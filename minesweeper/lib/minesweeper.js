// Generated by CoffeeScript 1.3.1

/*
Minesweeper by Golf Sinteppadon
*/


(function() {

  $(function() {
    var NUM_COLUMNS, NUM_HIDDEN_MINES, NUM_ROWS, TILE_HEIGHT, TILE_WIDTH, Tile, assignMinesToTiles, changeSettings, cheat, countNearbyMines, createBoard, flagClick, initialize, lose, tileClick, tiles, validate, win;
    NUM_HIDDEN_MINES = 10;
    NUM_ROWS = 8;
    NUM_COLUMNS = 8;
    TILE_WIDTH = 20;
    TILE_HEIGHT = 20;
    tiles = [];
    Tile = function(row, column) {
      return $('<div class="tile">').offset({
        left: column * TILE_WIDTH,
        top: row * TILE_HEIGHT
      }).css({
        width: TILE_WIDTH,
        height: TILE_HEIGHT
      }).data('containsMine', false).data('clicked', false).data('row', row).data('column', column);
    };
    changeSettings = function() {
      NUM_COLUMNS = NUM_ROWS = $('input:radio[name=size]:checked').val();
      NUM_HIDDEN_MINES = $('input:radio[name=difficulty]:checked').val();
      return createBoard();
    };
    initialize = function() {
      $('#newgame').on('click', createBoard);
      $('#validate').on('click', validate);
      $('#cheat').on('click', cheat);
      $('input:radio').on('click', changeSettings);
      $('#board').on('click', '.tile', tileClick).on('contextmenu', '.tile', flagClick);
      return createBoard();
    };
    createBoard = function() {
      var $tile, column, row, _i, _j, _ref, _ref1;
      $('#board, #message').empty();
      for (row = _i = 0, _ref = NUM_ROWS - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; row = 0 <= _ref ? ++_i : --_i) {
        tiles[row] = [];
        for (column = _j = 0, _ref1 = NUM_COLUMNS - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; column = 0 <= _ref1 ? ++_j : --_j) {
          $tile = new Tile(row, column);
          tiles[row][column] = $tile;
          $('#board').append($tile);
        }
      }
      return assignMinesToTiles();
    };
    assignMinesToTiles = function() {
      var $tile, numMinesPlaced, _results;
      numMinesPlaced = 0;
      _results = [];
      while (numMinesPlaced < NUM_HIDDEN_MINES) {
        $tile = tiles[Math.floor(Math.random() * NUM_ROWS)][Math.floor(Math.random() * NUM_COLUMNS)];
        if (!$tile.data('containsMine')) {
          $tile.data('containsMine', true);
          _results.push(numMinesPlaced++);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    tileClick = function() {
      if ($(this).data('clicked') || $(this).hasClass('flag')) {
        return;
      }
      $(this).data('clicked', true);
      if ($(this).data('containsMine')) {
        return lose($(this));
      } else {
        return $(this).text(countNearbyMines($(this)));
      }
    };
    flagClick = function(event) {
      event.preventDefault();
      if ($(this).data('clicked')) {
        return;
      }
      return $(this).toggleClass('flag');
    };
    countNearbyMines = function($tile) {
      var column, mineCount, row, _i, _j, _ref, _ref1, _ref2, _ref3;
      mineCount = 0;
      for (row = _i = _ref = $tile.data('row') - 1, _ref1 = $tile.data('row') + 1; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; row = _ref <= _ref1 ? ++_i : --_i) {
        for (column = _j = _ref2 = $tile.data('column') - 1, _ref3 = $tile.data('column') + 1; _ref2 <= _ref3 ? _j <= _ref3 : _j >= _ref3; column = _ref2 <= _ref3 ? ++_j : --_j) {
          if (tiles[row] && tiles[row][column] && tiles[row][column].data('containsMine')) {
            mineCount++;
          }
        }
      }
      return mineCount;
    };
    lose = function($tile) {
      var $tile, row, _i, _len, _results;
      $('#message').text('You lose!');
      if ($tile) {
        $tile.addClass('clickedMine');
      }
      _results = [];
      for (_i = 0, _len = tiles.length; _i < _len; _i++) {
        row = tiles[_i];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
            $tile = row[_j];
            if ($tile.data('containsMine')) {
              _results1.push($tile.addClass('mine'));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        })());
      }
      return _results;
    };
    win = function() {
      return $('#message').text('You win!');
    };
    validate = function() {
      var $tile, row, _i, _j, _len, _len1;
      for (_i = 0, _len = tiles.length; _i < _len; _i++) {
        row = tiles[_i];
        for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
          $tile = row[_j];
          if (!$tile.data('containsMine') && !$tile.data('clicked')) {
            lose();
            return;
          }
        }
      }
      return win();
    };
    cheat = function() {
      var $tile, row, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = tiles.length; _i < _len; _i++) {
        row = tiles[_i];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
            $tile = row[_j];
            if ($tile.data('containsMine')) {
              _results1.push($tile.addClass('cheat'));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        })());
      }
      return _results;
    };
    return initialize();
  });

}).call(this);
