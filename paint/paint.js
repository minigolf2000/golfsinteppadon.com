$(document).on('ready', function() {
	setupTools();
	setupColors();
    $("#canvas").paintable({
        width: 1.5,
        cursor: 'url("pencil.png") 0 16, crosshair',
        color: $('#currentColor').css('background-color')
    });
});

function setupTools() {
    var $tools = $('<div id="tools"></div>');
    $('#toolbar').append($tools);

    // Add Save button
	$tools.append('<div id="save"><img src="save.png" alt="" title="save" /></div>');
    $('#save').on('click', function() {
        $('#canvas').paintable('save');
    });

    // Add tools
    var $table = $('<table></table>');
    $.each([["pencil", "eraser"]], function(index) {
        $table.append('<tr>' +
        '<td id="' + this[0] + '"><img src="' + this[0] + '.png" alt="" title="' + this[0] + '"/></td>' +
        '<td id="' + this[1] + '"><img src="' + this[1] + '.png" alt="" title="' + this[1] + '"/></td>' +
        '</tr>');
	});
    $tools.append($table);
    $('#pencil').on('click', function() {
        $('#canvas').paintable('options', {
            width: 1.5,
            cursor: 'url("pencil.png") 0 16, crosshair',
            color: $('#currentColor').css('background-color')
        })
        .data('erasing', false);
    });
    $('#eraser').on('click', function() {
        $('#canvas').paintable('options', {
            width: 16,
            cursor: 'url("eraserCursor.png") 8 8, crosshair',
            color: 'white'
        })
        .data('erasing', true);
    });

    // Add undo button
	$tools.append('<div id="undo"><img src="undo.png" alt="" title="undo" /></div>');
    $('#undo').on('click', function() {
        $('#canvas').paintable('undo');
    });
}

function setupColors() {
	// Setup colors
    var $colors = $('<div id="colors"></div>');
    $('#toolbar').append($colors);

    var $table = $('<table></table>');
	var colors = [["0, 0, 0", "80, 80, 80"],
				  ["160, 160, 160", "255, 255, 255"],
				  ["255, 0, 0", "255, 128, 128"],
				  ["255, 165, 0", "255, 210, 128"],
				  ["255, 255, 0", "255, 255, 128"],
				  ["0, 128, 0", "64, 128, 64"],
				  ["0, 0, 255", "128, 128, 255"],
				  ["75, 0, 130", "103, 65, 130"],
				  ["237, 0, 237", "237, 119, 237"]];
    $.each(colors, function(index) {
        $table.append('<tr>' +
        '<td style="background-color: rgb(' + this[0] + ')"></td>' +
        '<td style="background-color: rgb(' + this[1] + ')"></td>' +
        '</tr>');
	});

    $('td', $table).on('click', function() {
        var newColor = $(this).css('background-color');

        $("#currentColor").css('background-color', newColor);
        $(this).css('border', "1px solid " + newColor);
        if (!$('#canvas').data('erasing')) {
            $('#canvas').paintable('option', 'color', newColor);
        }
    });

	$colors.append($table).append('<div id="currentColor"></div>');

	// Set box mouseovers
    $('td, #tools div').on('mouseover', function() {
        $(this).css('border', '1px solid ' + $('#currentColor').css('background-color'));
    }).on('mouseout', function() {
        $(this).css('border', '1px solid transparent');
    });
}
