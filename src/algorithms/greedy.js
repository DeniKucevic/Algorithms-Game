const getUnvisitedNeighbors = (grid, current, finish, start) => {
	const { col, row } = current;
	const neighbors = [];
	if (row > 0) neighbors.push(grid[row - 1][col]); // up
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down
	if (col > 0) neighbors.push(grid[row][col - 1]); // left
	if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right
	const unvisitedNeighbors = neighbors.filter(neighbor => !neighbor.isVisited); // only unvisited neighbors
	for (let i = 0; i < unvisitedNeighbors.length; i += 1) {
		const distance = current.distance + 1;
		if (unvisitedNeighbors[i].distance > distance) {
			const dG = Math.abs(current.row - start.row) + Math.abs(current.col - start.col);
			const hG = Math.abs(current.row - finish.row) + Math.abs(current.col - finish.col);
			unvisitedNeighbors[i].distance = dG + hG;
		}
		unvisitedNeighbors[i].parentNode = current;
	}
	return unvisitedNeighbors[0];
};

const checkFinishedNode = (finish) => {
	if (finish.isVisited === true) {
		return true;
	}
	return false;
};

const getSortedSet = (unvisitedSet) => {
	unvisitedSet.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const getUtilities = (grid) => {
	let finish = {};
	let start = {};
	const unvisitedSet = [];
	for (let row = 0; row < grid.length; row += 1) {
		for (let col = 0; col < grid[row].length; col += 1) {
			grid[row][col].isVisited = false;
			if (grid[row][col].isStart) {
				grid[row][col].distance = 0;
				grid[row][col].parentNode = null;
				start = grid[row][col];
			} else if (grid[row][col].isEnd === true) {
				grid[row][col].distance = Infinity;
				finish = grid[row][col];
			} else {
				grid[row][col].distance = Infinity;
			}
			unvisitedSet.push(grid[row][col]);
		}
	}
	return { unvisitedSet, finish, start };
};
const greedy = (grid) => {
	const visitedNodes = [];
	const utilities = getUtilities(grid); // we get our unvisited set and finish node so we can check it later
	const { unvisitedSet, finish, start } = utilities;
	while (unvisitedSet.length) { // we only need to loop once for every node or untill we find finish node
		getSortedSet(unvisitedSet); // we sort by path distance
		const current = unvisitedSet.shift(); // and take the first node (one with smallest distance)
		// eslint-disable-next-line
		if (current.isWall) continue; // skip a wall
		if (current.distance === Infinity) return visitedNodes; // if smallest distance is infinity something is wrong
		current.isVisited = true; // set current node as visited
		visitedNodes.push(current); // we push our node to visited set
		if (checkFinishedNode(finish)) return visitedNodes; // test if we found the finish node
		getUnvisitedNeighbors(grid, current, finish, start); // loop if we did not find it
	}
	return visitedNodes;
};

const greedyPath = (finish) => {
	const path = [];
	let current = finish;
	while (current !== null) {
		path.unshift(current);
		current = current.parentNode;
	}
	return path;
};

export { greedy, greedyPath };
