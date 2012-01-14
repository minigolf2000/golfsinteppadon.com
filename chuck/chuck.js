var PAGE_TITLE = " Fact Generator | Golf Sinteppadon";

Event.observe(window, "load", function() {
	// Add spans around chuck norrises
	var facts = $$(".fact");
	for (var i = 0; i < facts.length; i++) {
		facts[i].innerHTML = facts[i].innerHTML.replace("Chuck Norris", "<span class='chucknorris'>Chuck Norris</span>", "gi");
	}

	showRandomFact();
	Event.observe("nextfact", "click", showRandomFact);
	Event.observe("nameinput", "keyup", refreshName);
});

function showRandomFact() {
	while ($$(".fact.visible").length > 0) {
		$$(".fact.visible")[0].removeClassName("visible");
	}
	var facts = $$(".fact");
	var randomFact = facts[Math.floor(Math.random() * facts.length)];
	randomFact.addClassName("visible");
	refreshName();
}

function refreshName() {
	var newName = $("nameinput").value ? $("nameinput").value : "_";
	var staticChuckNorrisStrings = $$(".chucknorris.static, .visible .chucknorris");
	for (var i = 0; i < staticChuckNorrisStrings.length; i++) {
		staticChuckNorrisStrings[i].innerText = staticChuckNorrisStrings[i].textContent = newName;
	}
	document.title = newName + PAGE_TITLE;
}