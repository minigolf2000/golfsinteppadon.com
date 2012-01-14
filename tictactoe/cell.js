Cell = Class.create({
	
	initialize: function(index) {
		this.createHTML(index);
	},
	
	createHTML: function(index) {
		this.container = document.createElement("div");
		this.container.style.top = Math.floor(index / 3) * 60 + "px";
		this.container.style.left = index % 3 * 60 + "px";
		
		this.container.onclick = this.click;
		this.container.onmouseover = this.highlight;
		this.container.onmouseout = this.unhighlight;
		
		this.container.owner = null;
		this.container.index = index;
	},
	
	/* I don't know why, but scoping in functions that are called from event handlers changes
		"this" keyword no longer represents the object, but the clicked container */
	highlight: function() {
		var player = currentBoard.oTurn ? "blue" : "red";
		if (this.owner == null && gameRunning) {
			this.addClassName("highlight" + player);
		}
	},

	unhighlight: function() {
		this.removeClassName("highlightred");
		this.removeClassName("highlightblue");
	},

	/**
	*	Reset owner to null
	*/
	reset: function() {
		this.container.owner = null;
		this.container.removeClassName("x");
		this.container.removeClassName("o");
	},

	click: function() {
		this.removeClassName("highlightred");
		this.removeClassName("highlightblue");
		
		if (!gameRunning || this.hasClassName("o") || this.hasClassName("x"))
			return;
		if (currentBoard.oTurn) {
			this.addClassName("o");
			this.owner = "o";
		}
		else {
			this.addClassName("x");
			this.owner = "x";
		}
		click(this.index);
	},
	
	toString: function() {
		return this.container.owner;
	},
	
	clone: function() {
		var clone = new Cell(this.container.index);
		clone.container.owner = this.container.owner;
		clone.container.className = this.container.className;
		
		return clone;
	}
});