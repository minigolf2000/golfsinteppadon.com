Event.observe(window, "load", function() {
	var frames = $$(".frame");
	frames[0].style.display = "block";
	
	var hitboxes = $$(".hitbox, .nextButton");
	for (var i = 0; i < hitboxes.length; i++) {
		Event.observe(hitboxes[i], "click", nextFrame);
	}
	
});

function nextFrame(e) {
	var currentFrame = getParentFrame(e.target);
	var nextFrame = currentFrame.next();
	
	currentFrame.style.display = "none";
	
	if (nextFrame) {
		nextFrame.style.display = "block";
	}
	fadeInElements(nextFrame);
}

function getParentFrame(element) {
	while (!element.hasClassName("frame")) {
		element = element.parentNode;
	}
	return element;
}

function fadeInElements(element) {
	for (var i = 0; i < element.childElements().length; i++) {
		if (navigator.appName !== "Microsoft Internet Explorer" && (
			element.childElements()[i].hasClassName("description") || element.childElements()[i].hasClassName("hitbox"))) {
			element.childElements()[i].style.opacity = "0";
			new Effect.Appear(element.childElements()[i]);
		}
	}
	
	if (element.id == "1_start") {
		updateTaskNumber(1);
	}
	if (element.id == "2_start") {
		updateTaskNumber(2);
	}
	if (element.id == "3_start") {
		updateTaskNumber(3);
	}
}

function jumpToTask(taskNumber) {
	var frames = $$(".frame");
	for (var i = 0; i < frames.length; i++) {
		frames[i].style.display = "none";
	}
	var newFrame = $(taskNumber + "_start");
	newFrame.style.display = "block";
	fadeInElements(newFrame);
}

function updateTaskNumber(taskNo) {
	var buttons = $$(".jumpButtons button");
	
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].removeClassName("current");
		if (i == taskNo - 1) {
			buttons[i].addClassName("current");
		}
	}
}