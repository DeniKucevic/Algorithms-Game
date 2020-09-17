const createNode = (col, row, startX, startY, endX, endY) => ({
	col,
	row,
	isStart: col === startX && row === startY,
	isEnd: col === endX && row === endY,
	isWall: false,
	isVisited: false,
});

const createMatrix = (size, start, finish) => {
	const matrix = []; // initiate matrix
	for (let row = 0; row < size[1]; row += 1) {
		const yAxis = []; // initiate row so that we can push whole x axis in matrix
		for (let col = 0; col < size[0]; col += 1) {
			yAxis.push(createNode(col, row, start[1], start[0], finish[1], finish[0])); // create cell with info we need about cell
		}
		matrix.push(yAxis);
	}
	return matrix;
};

const randomCoordinates = (size) => {
	const x = Math.floor(Math.random() * Math.floor(size[1]));
	const y = Math.floor(Math.random() * Math.floor(size[0]));
	return [x, y];
};

export { createMatrix, randomCoordinates };
