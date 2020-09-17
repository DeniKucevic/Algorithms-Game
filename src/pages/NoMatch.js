import React from 'react';
import styled from 'styled-components';
import wongPlace from '../img/wongPlace.jpg';

const Img = styled.img`
width: 100vw;
height: 100vh`;
const NoMatch = () => (
	<div>
		<Img src={wongPlace} />
	</div>
);

export default NoMatch;
