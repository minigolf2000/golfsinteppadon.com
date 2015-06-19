###
Minesweeper by Golf Sinteppadon
###
$(() ->

    NUM_HIDDEN_MINES = 10
    NUM_ROWS = 8
    NUM_COLUMNS = 8
    TILE_WIDTH = 20
    TILE_HEIGHT = 20

    # 2D array of tiles
    tiles = []

    Tile = (row, column) ->
        return $('<div class="tile">')
            .offset({left: column * TILE_WIDTH, top: row * TILE_HEIGHT})
            .css({width: TILE_WIDTH, height: TILE_HEIGHT})
            .data('containsMine', false)
            .data('clicked', false)
            .data('row', row)
            .data('column', column)

    changeSettings = () ->
        NUM_COLUMNS = NUM_ROWS = $('input:radio[name=size]:checked').val()
        NUM_HIDDEN_MINES = $('input:radio[name=difficulty]:checked').val()
        createBoard()

    initialize = () ->
        $('#newgame').on('click', createBoard)
        $('#validate').on('click', validate)
        $('#cheat').on('click', cheat)
        $('input:radio').on('click', changeSettings)
        $('#board').on('click', '.tile', tileClick)
                   .on('contextmenu', '.tile', flagClick)
        createBoard()

    createBoard = () ->
        $('#board, #message').empty()
        for row in [0..NUM_ROWS - 1]
            tiles[row] = []
            for column in [0..NUM_COLUMNS - 1]
                $tile = new Tile(row, column)
                tiles[row][column] = $tile
                $('#board').append($tile)

        assignMinesToTiles()

    assignMinesToTiles = () ->
        numMinesPlaced = 0
        while (numMinesPlaced < NUM_HIDDEN_MINES)
            $tile = tiles[Math.floor(Math.random() * NUM_ROWS)][Math.floor(Math.random() * NUM_COLUMNS)]
            if (!$tile.data('containsMine'))
                $tile.data('containsMine', true)
                numMinesPlaced++

    tileClick = () ->
        return if $(this).data('clicked') or $(this).hasClass('flag')
        $(this).data('clicked', true)
        if ($(this).data('containsMine'))
            lose($(this))
        else
            $(this).text(countNearbyMines(($(this))))

    flagClick = (event) ->
        event.preventDefault()
        return if $(this).data('clicked')
        $(this).toggleClass('flag')

    countNearbyMines = ($tile) ->
        mineCount = 0
        for row in [$tile.data('row') - 1..$tile.data('row') + 1]
            for column in [$tile.data('column') - 1..$tile.data('column') + 1]
                if tiles[row] && tiles[row][column] && tiles[row][column].data('containsMine')
                    mineCount++
        return mineCount

    lose = ($tile) ->
        $('#message').text('You lose!')
        $tile.addClass('clickedMine') if $tile
        for row in tiles
            for $tile in row
                $tile.addClass('mine') if $tile.data('containsMine')

    win = () ->
        $('#message').text('You win!')

    validate = () ->
        for row in tiles
            for $tile in row
                if !$tile.data('containsMine') && !$tile.data('clicked')
                    lose()
                    return
        win()

    cheat = () ->
        for row in tiles
            for $tile in row
                $tile.addClass('cheat') if $tile.data('containsMine')


    initialize()
)