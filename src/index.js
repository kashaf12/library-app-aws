/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import Nav from "./components/Nav";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Create from "./components/Create";
Amplify.configure(awsExports);

ReactDOM.render(
	<React.StrictMode>
		<Router>
      <Nav />
      <Switch>
          <Route exact path="/">
            <Create />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
