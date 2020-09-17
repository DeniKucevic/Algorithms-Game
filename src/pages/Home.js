import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import StyledInput from '../components/HomeComponents/styles/StyledInput';
import StyledWrapper from '../components/HomeComponents/styles/StyledWrapper';
import StyledButton from '../components/HomeComponents/styles/StyledButton';
import StyledCheckBox from '../components/HomeComponents/styles/StyledCheckBox';
import StyledLabel from '../components/HomeComponents/styles/StyledLabel';
import StyledTitle from '../components/HomeComponents/styles/StyledTitle';

const Home = ({ config }) => {
	const [stage, setStage] = useState({
		size: [10, 10],
		start: [0, 4],
		finish: [9, 4],
		checked: true,
	});
	const history = useHistory();

	const handleXSize = (x) => {
		stage.size[1] = Number(x);
	};
	const handleYSize = (y) => {
		stage.size[0] = Number(y);
	};
	const handleXStart = (x) => {
		stage.start[1] = Number(x);
	};
	const handleYStart = (y) => {
		stage.start[0] = Number(y);
	};
	const handleXFinish = (x) => {
		stage.finish[1] = Number(x);
	};
	const handleYFinish = (y) => {
		stage.finish[0] = Number(y);
	};
	const handleClick = () => {
		config(stage);
		history.push('/game');
	};

	return (
		<StyledWrapper>
			<StyledTitle>~ Pathfinding Game! ~</StyledTitle>
			<StyledLabel>
				Stage Size :
				<StyledInput placeholder="X" onChange={e => handleXSize(e.target.value)} />
				<StyledInput placeholder="Y" onChange={e => handleYSize(e.target.value)} />
			</StyledLabel>
			<StyledLabel>
				Starting Position :
				<StyledInput placeholder="X" onChange={e => handleXStart(e.target.value)} />
				<StyledInput placeholder="Y" onChange={e => handleYStart(e.target.value)} />
			</StyledLabel>
			<StyledLabel>
				Finish Position :
				<StyledInput placeholder="X" onChange={e => handleXFinish(e.target.value)} />
				<StyledInput placeholder="Y" onChange={e => handleYFinish(e.target.value)} />
			</StyledLabel>
			<StyledLabel>
				Auto Run?
				<StyledCheckBox checked={stage.checked} onChange={() => setStage({ ...stage, checked: !stage.checked })} />
			</StyledLabel>
			<StyledButton onClick={() => handleClick()}>Start Game</StyledButton>
		</StyledWrapper>
	);
};

export default Home;

Home.defaultProps = {
	config: {},
};

Home.propTypes = {
	config: PropTypes.objectOf(Array),
};
