if ($('#painttheweb').length > 0) {
    $('#painttheweb').remove();
} else {
    $('body').prepend('<canvas id="painttheweb" height="' + $(document).height() + '" width="' + $(document).width() + '"></canvas>');
    $("#painttheweb").css('position', 'absolute').css('left', '0px').css('top', '0px').css('z-index', '10000').paintable({width: 10});
}