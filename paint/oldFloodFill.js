
	/* Works with weird red lines
	var queue = [];
	queue.push(index);
	
	while (queue.length > 0) {
		var i = queue.shift();
		if (pix[i] == oldR && pix[i + 1] == oldG && pix[i + 2] == oldB) {
			pix[i] = newR;
			pix[i + 1] = newG;
			pix[i + 2] = newB;
		}
		
		// Floodfill above pixel
		if (i >= CANVAS_WIDTH * 4 &&
			pix[i - CANVAS_WIDTH * 4] == oldR &&
			pix[i - CANVAS_WIDTH * 4 + 1] == oldG &&
			pix[i - CANVAS_WIDTH * 4 + 2] == oldB) {
				pix[i - CANVAS_WIDTH * 4 * 4] = newR;
				pix[i - CANVAS_WIDTH * 4 + 1] = newG;
				pix[i - CANVAS_WIDTH * 4 + 2] = newB;
				queue.push(i - CANVAS_WIDTH * 4);
		}
		// Floodfill right pixel
		if (i % (CANVAS_WIDTH * 4) != (CANVAS_WIDTH * 4 - 4) &&
			pix[i + 4] == oldR &&
			pix[i + 4 + 1] == oldG &&
			pix[i + 4 + 2] == oldB) {
				pix[i + 4 * 4] = newR;
				pix[i + 4 + 1] = newG;
				pix[i + 4 + 2] = newB;
				queue.push(i + 4);
		}
		// Floodfill below pixel
		if (i < CANVAS_HEIGHT * CANVAS_WIDTH * 4 - CANVAS_WIDTH * 4 &&
			pix[i + CANVAS_WIDTH * 4] == oldR &&
			pix[i + CANVAS_WIDTH * 4 + 1] == oldG &&
			pix[i + CANVAS_WIDTH * 4 + 2] == oldB) {
				pix[i + CANVAS_WIDTH * 4] = newR;
				pix[i + CANVAS_WIDTH * 4 + 1] = newG;
				pix[i + CANVAS_WIDTH * 4 + 2] = newB;
				queue.push(i + CANVAS_WIDTH * 4);
		}
		// Floodfill left pixel
		if (i % (CANVAS_WIDTH * 4) != 0 &&
			pix[i - 4] == oldR &&
			pix[i - 4 + 1] == oldG &&
			pix[i - 4 + 2] == oldB) {
				pix[i - 4] = newR;
				pix[i - 4 + 1] = newG;
				pix[i - 4 + 2] = newB;
				queue.push(i - 4);
		}
	}*/

	
	
	
	/* Old method, stops recursing, but only after a very very long time (firefox breaks)
	if (pix[index] != oldR || pix[index + 1] != oldG || pix[index + 2] != oldB ||
		pix[index] == newR || pix[index + 1] == newG || pix[index + 2] == newB)
			return;
	
	pix[index] = newR;
	pix[index + 1] = newG;
	pix[index + 2] = newB;
	
	// Floodfill above pixel
	if (index >= CANVAS_WIDTH * 4)
				floodFill(pix, index - CANVAS_WIDTH * 4, oldR, oldG, oldB, newR, newG, newB);
	// Floodfill right pixel
	if (index % (CANVAS_WIDTH * 4) != (CANVAS_WIDTH * 4 - 4))
				floodFill(pix, index + 4, oldR, oldG, oldB, newR, newG, newB);
	// Floodfill below pixel
	if (index < CANVAS_HEIGHT * CANVAS_WIDTH * 4 - CANVAS_WIDTH * 4)
				floodFill(pix, index + CANVAS_WIDTH * 4, oldR, oldG, oldB, newR, newG, newB);
	// Floodfill left pixel
	if (index % (CANVAS_WIDTH * 4) != 0)
				floodFill(pix, index - 4, oldR, oldG, oldB, newR, newG, newB);
	*/
	
	
	/* Old method, never stops recursing
	// Floodfill above pixel
	if (index >= CANVAS_WIDTH * 4 &&
			pix[index - CANVAS_WIDTH * 4] == oldR &&
			pix[index - CANVAS_WIDTH * 4 + 1] == oldG &&
			pix[index - CANVAS_WIDTH * 4 + 2] == oldB)
				floodFill(pix, index - CANVAS_WIDTH * 4, oldR, oldG, oldB, newR, newG, newB);
	// Floodfill right pixel
	if (index % (CANVAS_WIDTH * 4) != (CANVAS_WIDTH * 4 - 4) &&
			pix[index + 4] == oldR &&
			pix[index + 4 + 1] == oldG &&
			pix[index + 4 + 2] == oldB)
				floodFill(pix, index + 4, oldR, oldG, oldB, newR, newG, newB);
	// Floodfill below pixel
	if (index < CANVAS_HEIGHT * CANVAS_WIDTH * 4 - CANVAS_WIDTH * 4 &&
			pix[index + CANVAS_WIDTH * 4] == oldR &&
			pix[index + CANVAS_WIDTH * 4 + 1] == oldG &&
			pix[index + CANVAS_WIDTH * 4 + 2] == oldB)
				floodFill(pix, index + CANVAS_WIDTH * 4, oldR, oldG, oldB, newR, newG, newB);
	// Floodfill left pixel
	if (index % (CANVAS_WIDTH * 4) != 0 &&
			pix[index - 4] == oldR &&
			pix[index - 4 + 1] == oldG &&
			pix[index - 4 + 2] == oldB)
				floodFill(pix, index - 4, oldR, oldG, oldB, newR, newG, newB);
	
	pix[index] = newR;
	pix[index + 1] = newG;
	pix[index + 2] = newB;
	*/