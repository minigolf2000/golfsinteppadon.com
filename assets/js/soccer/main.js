/**
*	AI Soccer
*	By Golf Sinteppadon
*/
var pitch,
	FRICTION = 0.93;

Event.observe(window, "load", function() {
	// Create pitch and start game
	pitch = new SoccerPitch();
	setInterval(loop, 40);
	
	if (navigator.appName == "Opera") {
		$("browserWarning").style.display = "block";
	}
});

// Loop that keeps the game running
function loop() {
	pitch.update();
	pitch.render();
}

///////////////////////////////////////// HELPER VECTOR FUNCTIONS /////////////////////////////////////////
function normalize(vector) {
	var magnitude = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
	return (magnitude === 0) ? [0, 0] : [vector[0] / magnitude, vector[1] / magnitude];
}
	
function truncate(vector, max) {
	var magnitude = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
	if (magnitude > max) {
		return [vector[0] * (max / magnitude), vector[1] * max / magnitude];
	}
	return [vector[0], vector[1]];
}

function length(a) {
	return Math.sqrt(lengthSquared(a));
}

function lengthSquared(a) {
	return a[0] * a[0] + a[1] * a[1];
}

function distance(a, b) {
	return Math.sqrt(distanceSquared(a, b));
}

function distanceSquared(a, b) {
	return (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]);
}

function dotProduct(a, b) {
	return a[0] * b[0] + a[1] * b[1];
}