import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Stats from './pages/Stats';

function App() {
	// easiest, but not best, is to hoist the state to the app
	const [initialStage, setInitalStage] = useState({});
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/" exact render={() => <Home config={setInitalStage} />} />
					<Route path="/game" exact render={() => <Game config={initialStage} />} />
					<Route path="/stats" exact component={Stats} />
					<Route component={NoMatch} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
