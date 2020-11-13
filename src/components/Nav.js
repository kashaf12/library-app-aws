/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Hub, Auth } from "aws-amplify";

function Nav() {
	const [user, setUser] = useState(null);
	const [userGroups, setUserGroups] = useState(null);

	useEffect(() => {
		Hub.listen("auth", ({ payload: { event, data } }) => {
			switch (event) {
				case "signIn":
					getUser().then((userData) => setUser(userData));
					break;
				case "signOut":
					setUser(null);
					setUserGroups(null);
					break;
				case "signIn_failure":
					console.log("Sign in failure", data);
					break;
				default:
			}
		});

		getUser().then((userData) => {
			setUser(userData);
			if (userData) {
				setUserGroups(
					userData.signInUserSession.accessToken.payload["cognito:groups"]
				);
			} else {
				setUserGroups(null);
			}
		});
	}, []);

	function getUser() {
		return Auth.currentAuthenticatedUser()
			.then((userData) => userData)
			.catch(() => console.log("Not signed in"));
	}

	return (
		<header className='App-header'>
			<h1 className='flex-1'>Book Store</h1>
			<div className='float-right'>
				{user ? (
					<>
						<span style={{ marginRight: "5px" }}>
							Welcome <b>{user ? user.attributes.name : null}</b>
						</span>
						{userGroups &&
						userGroups.filter((f) => f.indexOf("Admins") > -1).length > 0 ? (
							<Link to='/add-book'>Add a book</Link>
						) : null}
						<Link to='/'>Books</Link>
						<button onClick={() => Auth.signOut()}>Sign Out</button>
					</>
				) : (
					<>
						<Link to='/'>Books</Link>
						<Link to='/signup'>Signup</Link>
						<Link to='/login'>Login</Link>
					</>
				)}
			</div>
		</header>
	);
}

export default Nav;
