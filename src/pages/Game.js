import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import useInterval from '../hooks/useInterval';

// styled components
import StyledLevelTitle from '../components/GameComponents/styles/StyledLevelTitle';
import StyledStage from '../components/GameComponents/StyledStage';
import StyledStartButton from '../components/GameComponents/styles/StyledStartButton';
import StyledWrapper from '../components/GameComponents/styles/StyledWrapper';

// algorithms
import { createMatrix, randomCoordinates } from '../gameHelpers';
import { dijkstra, dijkstraPath } from '../algorithms/dijkstra';
// import { aStar, aStarPath } from '../algorithms/aStar'

const Game = ({ config }) => {
	const [stage, setStage] = useState([]);
	const [count, setCount] = useState(0);
	const [isOver, setIsOver] = useState(false);
	const [buttonCheck, setButtonCheck] = useState(true);

	const {
		size, start, finish, checked,
	} = config;

	const history = useHistory();

	// need to add a check for finish and end positions not to be off board!!
	const userRequest = {};
	userRequest.size = size === undefined ? [10, 10] : size;
	userRequest.start = start === undefined ? [0, 4] : start;
	userRequest.finish = finish === undefined ? [9, 4] : finish;

	useEffect(() => {
		userRequest.checked = checked ? setButtonCheck(true) : setButtonCheck(false);
		let isCancelled = false;
		if (!isCancelled) {
			const matrix = createMatrix(userRequest.size, userRequest.start, userRequest.finish);
			setStage(matrix);
		}
		return () => {
			isCancelled = true;
		};
		// eslint-disable-next-line
  }, [])

	const deepCopy = (arr) => {
		const newStage = [];
		for (let i = 0; i < arr.length; i += 1) {
			const row = [];
			for (let j = 0; j < arr[i].length; j += 1) {
				row.push({ ...(arr[i][j]) });
			}
			newStage.push(row);
		}
		return newStage;
	};

	const cleanStage = () => {
		const newStage = [...stage];
		for (let i = 0; i < stage.length; i += 1) {
			for (let j = 0; j < stage[0].length; j += 1) {
				newStage[i][j].isVisited = false;
				newStage[i][j].isPath = false;
			}
		}
		return setStage(newStage);
	};

	const placeRandomWall = () => {
		const coor = randomCoordinates([stage.length, stage[0].length]);
		const newArray = [...stage];
		if (newArray[coor[1]][coor[0]].isWall === true ||
      newArray[coor[1]][coor[0]].isStart === true ||
      newArray[coor[1]][coor[0]].isEnd === true) {
			return placeRandomWall();
		}
		newArray[coor[1]][coor[0]].isWall = true;
		return setStage(newArray);
	};

	const animateDijkstra = () => {
		if (isOver === true) history.push('/stats');
		cleanStage();
		if (!checked) {
			if (count !== 0) placeRandomWall();
		}
		// let t0 = performance.now()
		const newStage = deepCopy(stage);
		const visited = dijkstra(newStage);
		const timeout = (i) => {
			if (i === visited.length) {
				const path = dijkstraPath(stage[userRequest.finish[0]][userRequest.finish[1]]);
				if (path === false) {
					setIsOver(true);
				}
				for (let x = 0; x < path.length; x += 1) {
					setStage((prev) => {
						const tmp = deepCopy(prev);
						tmp[path[x].row][path[x].col].isPath = true;
						return tmp;
					});
					if (x === path.length - 1) setCount(prev => prev + 1);
				}
				if (checked) {
					setTimeout(() => {
						placeRandomWall();
						animateDijkstra();
					}, 1000);
				}
				return;
			}
			setTimeout(() => {
				stage[visited[i].row][visited[i].col] = visited[i];
				setStage((prev) => {
					const tmp = deepCopy(prev);
					tmp[visited[i].row][visited[i].col] = visited[i];
					return tmp;
				});
				timeout(i + 1);
			}, 28);
		};
		if (visited.length !== 0) {
			timeout(0);
		}
	};

	// custom hook
	// useInterval(() => {
	//   if (checked === true) {
	//     animateDijkstra();
	//   } else if (isOver === true) {
	//     history.push('/stats');
	//   }
	// }, 1000);
	const handleButton = () => {
		if (checked) {
			if (buttonCheck) {
				return <StyledStartButton onClick={() => { setButtonCheck(false); animateDijkstra(); }}>Run!</StyledStartButton>;
			}
		} else {
			return <StyledStartButton onClick={() => { animateDijkstra(); }}>Next!</StyledStartButton>;
		}
		return null;
	};

	return (
		<StyledWrapper>
			<StyledLevelTitle>
				Level_{count}
			</StyledLevelTitle>
			<StyledStage stage={stage} />
			{handleButton()}
		</StyledWrapper>
	);
};

export default Game;

Game.defaultProps = {
	config: {},
	size: [],
	start: [],
	finish: [],
	checked: true,
};

Game.propTypes = {
	config: PropTypes.objectOf(Array),
	size: PropTypes.arrayOf(Number),
	start: PropTypes.arrayOf(Number),
	finish: PropTypes.arrayOf(Number),
	checked: PropTypes.bool,
};
