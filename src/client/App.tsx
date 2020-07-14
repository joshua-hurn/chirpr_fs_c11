import * as React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./views/Home";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route to="/">
					<Home />
				</Route>
			</Switch>
		</BrowserRouter>
	)
}

export default App;