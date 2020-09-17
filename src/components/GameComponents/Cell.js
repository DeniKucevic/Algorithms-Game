import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
display:flex;
flex:1;
justify-content:center;`;
let extraClassName = '';

const Cell = ({
	col, row, isStart, isEnd, isWall, isVisited, isPath,
}) => {
	switch (true) {
	case isStart:
		extraClassName = '😸';
		break;
	case isEnd:
		extraClassName = '🏁';
		break;
	case isWall:
		extraClassName = '❌';
		break;
	case isPath:
		extraClassName = '🚓';
		break;
	case isVisited:
		extraClassName = 'x';
		break;
	default:
		extraClassName = 'o';
		break;
	}

	return (
		<Wrapper
			id={`cell ${col} : ${row}`}
			className={`node ${extraClassName}`}
		>
			<p style={{ backgroundColor: `${extraClassName === 'x' ? 'red' : 'white'}` }}>{extraClassName}</p>
		</Wrapper>
	);
};

Cell.defaultProps = {
	col: 0,
	row: 0,
	isStart: false,
	isEnd: false,
	isWall: false,
	isVisited: false,
	isPath: false,
};

Cell.propTypes = {
	col: PropTypes.number,
	row: PropTypes.number,
	isStart: PropTypes.bool,
	isEnd: PropTypes.bool,
	isWall: PropTypes.bool,
	isVisited: PropTypes.bool,
	isPath: PropTypes.bool,
};

export default Cell;
