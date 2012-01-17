var CANVAS_HEIGHT = 500,
	CANVAS_WIDTH = 600,
	dragging = false,
	currentTool = "pencil", // Possible tools are "pencil", "eraser", "floodFill", "stamp"
	offsetX, // Distance from canvas to left of screen
	offsetY, // Distance from canvas to top of screen
	oldX = 0, // The mouse's previous x position
	oldY = 0, // The mouse's previous y position
	ctx, // Drawing context
	undoStack = []; // Stack containing imageData of previous states

var stamp = new Image();
stamp.src = "lilypad.png";
var eraser = new Image();
eraser.src = "eraserCursor.png";

Event.observe(window, 'load', function() {
	if (!$("canvas").getContext) return; // Browser does not support Canvas

	// Setup canvas
	ctx = $("canvas").getContext("2d");

	// Setup listeners
	Event.observe('canvas', 'mousedown', mouseDown);
	Event.observe(document, 'mouseup', mouseUp);
	Event.observe(document, 'mousemove', mouseMove);

	// Set global variables
	offsetY = $("canvas").offsetTop;
	offsetX = $("canvas").offsetLeft;

	var img = document.createElement("img");
	img.src = "save.png";
	img.alt = "";
	img.title = "Save";
	var save = document.createElement("div");
	save.id = "save";
	save.onclick = saveImage;
	save.appendChild(img);
	$("tools").appendChild(save);

	// Setup tools
	setupToolbar();

});

function setupToolbar() {

	var tools = ["pencil", "eraser", "floodFill", "stamp"];
	var table = document.createElement("table");

	var tr;
	for (var i = 0; i < tools.length; i++) {
		if (i % 2 == 0)
			tr = document.createElement("tr");
		var td = document.createElement("td");
		td.id = tools[i];
		td.onclick = changeTool;
		var img = document.createElement("img");
		img.src = tools[i] + ".png";
		img.alt = "";
		img.title = tools[i].charAt(0).toUpperCase() + tools[i].substring(1);
		td.appendChild(img);
			tr.appendChild(td);
		if (i % 2 == 1) {
			table.appendChild(tr);
		}
	}
	$("tools").appendChild(table);

	var img = document.createElement("img");
	img.src = "undo.png";
	img.alt = "";
	img.title = "Undo";
	var undo = document.createElement("div");
	undo.id = "undo";
	undo.onclick = revertState;
	undo.appendChild(img);
	$("tools").appendChild(undo);

	// Setup colors
	var colors = ["0, 0, 0",
				  "80, 80, 80",
				  "160, 160, 160",
				  "255, 255, 255",
				  "255, 0, 0",
				  "255, 128, 128",
				  "255, 165, 0",
				  "255, 210, 128",
				  "255, 255, 0",
				  "255, 255, 128",
				  "0, 128, 0",
				  "64, 128, 64",
				  "0, 0, 255",
				  "128, 128, 255",
				  "75, 0, 130",
				  "103, 65, 130",
				  "237, 0, 237",
				  "237, 119, 237"];
	var table = document.createElement("table");
	for (var i = 0; i < colors.length;) {
		var tr = document.createElement("tr");

		var td = document.createElement("td");
		if (i == 0) td.id = "black";
		td.style.backgroundColor = "rgb(" + colors[i++] + ")";
		td.onclick = changeColor;
		tr.appendChild(td);

		var td2 = document.createElement("td");
		td2.style.backgroundColor = "rgb(" + colors[i++] + ")";
		td2.onclick = changeColor;
		tr.appendChild(td2);

		table.appendChild(tr);
	}

	$("colors").appendChild(table);

	var currentColor = document.createElement("div");
	currentColor.id = "currentColor";
	$("colors").appendChild(currentColor);

	// Set defaults
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	$("pencil").onclick();
	$("black").onclick();
	undoStack.push(ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));

	// Set box mouseovers
	var hoverBoxes = $$("td, #tools div");
	for (var i = 0; i < hoverBoxes.length; i++) {
		hoverBoxes[i].onmouseover = boxMouseOver;
		hoverBoxes[i].onmouseout = boxMouseOut;
	}
}

function mouseDown(e) {
	dragging = true;
	var currentX = e.pageX - offsetX;
	var currentY = e.pageY - offsetY;

	switch (currentTool) {

	case "pencil":
		ctx.fillRect(currentX - 1, currentY - 1, 2, 2);
		break;

	case "eraser":
		ctx.beginPath();
		ctx.arc(currentX, currentY, 8, 0, Math.PI * 2, false);
		ctx.fill();
		break;

	case "floodFill":
		var imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		var index = currentX * 4 + currentY * 4 * CANVAS_WIDTH;
		var pix = imageData.data;
		var oldR = pix[index];
		var oldG = pix[index + 1];
		var oldB = pix[index + 2];
		var newR, newG, newB;

		var colors = ctx.fillStyle
		// Safari, Chrome - colors is in form rgb(x, x, x)
		if (colors.length > 7) {
			var colors = colors.substring(4).split(", ");
			newR = parseInt(colors[0]);
			newG = parseInt(colors[1]);
			newB = parseInt(colors[2]);
		}
		// Firefox - colors is in form #xxxxxx
		else {
			newR = parseInt(colors.substring(1, 3), 16);
			newG = parseInt(colors.substring(3, 5), 16);
			newB = parseInt(colors.substring(5, 7), 16);
		}
		floodFill(pix, index, oldR, oldG, oldB, newR, newG, newB);

		ctx.putImageData(imageData, 0, 0);
		break;

	default:
		ctx.drawImage(stamp, currentX - 64, currentY - 44);
		break;
	}
}

/**
 * Floodfill the canvas starting at the clicked pixel. Fills in each neighboring pixel that has a color within the MAX_COLOR_DIFFERENCE.
 * pix - the 1-D array containing every pixel (pix.length = CANVAS_WIDTH * CANVAS_HEIGHT * 4)
 * index - int containing the index of the current pixel in the 1-D array
 * oldR, oldG, oldB - ints containing the components of the old color to be replaced
 * newR, newG, newB - ints containing the components of the new color to be filled in
 */
function floodFill(pix, index, oldR, oldG, oldB, newR, newG, newB) {
	var MAX_COLOR_DIFFERENCE = 63;
	var queue = [];
	if (pix[index] != oldR && pix[i + 1] != oldG && pix[i + 2] != oldB)
		return;
	queue.push(index);
	
	while (queue.length > 0) {
		var i = queue.shift();
		if (Math.abs(pix[i] - oldR) < MAX_COLOR_DIFFERENCE && Math.abs(pix[i + 1] - oldG) < MAX_COLOR_DIFFERENCE && Math.abs(pix[i + 2] - oldB) < MAX_COLOR_DIFFERENCE) {
			var w = i;
			var e = i + 4;
			while (w % (CANVAS_WIDTH * 4) != (CANVAS_WIDTH * 4 - 4) && Math.abs(pix[w] - oldR) < MAX_COLOR_DIFFERENCE && Math.abs(pix[w + 1] - oldG) < MAX_COLOR_DIFFERENCE && Math.abs(pix[w + 2] - oldB) < MAX_COLOR_DIFFERENCE) {
				w -= 4;
			}
			while (e % (CANVAS_WIDTH * 4) != 0 && Math.abs(pix[e] - oldR) < MAX_COLOR_DIFFERENCE && Math.abs(pix[e + 1] - oldG) < MAX_COLOR_DIFFERENCE && Math.abs(pix[e + 2] - oldB) < MAX_COLOR_DIFFERENCE) {
				e += 4;
			}
			for (var j = w + 4; j < e; j += 4) {
				pix[j] = newR;
				pix[j + 1] = newG;
				pix[j + 2] = newB;
				if (j >= CANVAS_WIDTH * 4 &&
					pix[j - CANVAS_WIDTH * 4] == oldR &&
					pix[j - CANVAS_WIDTH * 4 + 1] == oldG &&
					pix[j - CANVAS_WIDTH * 4 + 2] == oldB)
					queue.push(j - CANVAS_WIDTH * 4);
				if (j < CANVAS_HEIGHT * CANVAS_WIDTH * 4 - CANVAS_WIDTH * 4 &&
					pix[j + CANVAS_WIDTH * 4] == oldR &&
					pix[j + CANVAS_WIDTH * 4 + 1] == oldG &&
					pix[j + CANVAS_WIDTH * 4 + 2] == oldB)
					queue.push(j + CANVAS_WIDTH * 4);
			}
		}
	}
}

function revertState() {
	if (undoStack.length > 1) {
		ctx.putImageData(undoStack[undoStack.length - 2], 0, 0);
		undoStack.pop();
	}
}

function saveImage() {
	var dataURL = $("canvas").toDataURL();
	window.location.href = dataURL;
}

function mouseUp() {
	if (dragging) {
		dragging = false;
		undoStack.push(ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));
	}
}

function mouseMove(e) {
	if (currentTool == "pencil" || currentTool == "eraser") {
		var currentX = e.pageX - offsetX;
		var currentY = e.pageY - offsetY;
		ctx.beginPath();
		ctx.moveTo(oldX, oldY);
		if (dragging) {
			ctx.lineTo(currentX, currentY);
			ctx.stroke();
		}
		oldX = currentX;
		oldY = currentY;
	}
}

function changeColor() {
	if (currentTool == "pencil" || currentTool == "floodFill") {
		ctx.fillStyle = ctx.strokeStyle = this.style.backgroundColor;
	}
	$("currentColor").style.backgroundColor = this.style.backgroundColor;
	this.style.border = "1px solid " + $("currentColor").style.backgroundColor;
}

function changeTool() {
	currentTool = this.id;

	switch (currentTool) {
	case "pencil":
		$("canvas").style.cursor = "url(pencil.png) 0 16, crosshair";
		ctx.strokeStyle = $("currentColor").style.backgroundColor;
		ctx.fillStyle = $("currentColor").style.backgroundColor;
		ctx.lineWidth = 2;
		ctx.lineCap = "butt";
		break;

	case "eraser":
		$("canvas").style.cursor = "url(eraserCursor.png) 8 8, crosshair";
		ctx.fillStyle = "white";
		ctx.strokeStyle = "white";
		ctx.lineWidth = 16;
		ctx.lineCap = "round";
		break;

	case "floodFill":
		ctx.fillStyle = $("currentColor").style.backgroundColor;
		$("canvas").style.cursor = "url(floodFill.png) 14 11, crosshair";
		break;

	default:
		$("canvas").style.cursor = "url(lilypad.png) 64 44, crosshair";
		break;
	}
}

function boxMouseOver() {
	this.style.border = "1px solid " + $("currentColor").style.backgroundColor;
}

function boxMouseOut() {
	this.style.border = "1px solid #6BABCE";
}