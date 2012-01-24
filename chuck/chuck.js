$(document).on('ready', function() {
    $('.fact').each(function() {
        $(this).html($(this).html().replace("Chuck Norris", "<span class='chucknorris'>Chuck Norris</span>", "gi"));
    });

    showRandomFact();
    $('#nextfact').on('click', showRandomFact);
    $('#nameinput').on('keyup', refreshName);
});

function showRandomFact() {
	$('.fact.visible').removeClass('visible');
    // Add class .visible to random element in $('.fact')
    var $facts = $('.fact');
    $facts.eq(Math.floor(Math.random() * $facts.length)).addClass('visible');

	refreshName();
}

function refreshName() {
	var newName = $("#nameinput").val() ? $("#nameinput").val() : "_";
    $('.chucknorris.static, .visible .chucknorris').each(function() {
        $(this).text(newName);
    });
    var PAGE_TITLE = " Fact Generator | Golf Sinteppadon";
	document.title = newName + PAGE_TITLE;
}