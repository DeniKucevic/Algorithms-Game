import React from 'react';
import PropTypes from 'prop-types';
import BoardWrapper from './styles/BoardWrapper';
import Cell from './Cell';
import RowWrapper from './styles/RowWrapper';

const StyledStage = ({ stage }) => (
	<BoardWrapper>
		{stage.map((rowX, rowId) => (
			<RowWrapper key={`key:${rowX + rowId}`}>
				{
					rowX.map((cell, cellId) => {
						const {
							col, row, isStart, isEnd, isWall, isVisited, isPath,
						} = cell;
						return (
							<Cell
								key={`key:${col}:${row}`}
								col={cellId}
								row={rowId}
								isEnd={isEnd}
								isStart={isStart}
								isVisited={isVisited}
								isWall={isWall}
								isPath={isPath}
							/>
						);
					})
				}
			</RowWrapper>
		))}
	</BoardWrapper>
);

export default StyledStage;

StyledStage.defaultProps = {
	stage: [],
};

StyledStage.propTypes = {
	stage: PropTypes.arrayOf(Number),
};
