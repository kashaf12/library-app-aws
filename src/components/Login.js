import React, { useState } from "react";
import {} from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

function Login() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [errorMessage, setErrorMessage] = useState();

  async function login() {
    try {
      let result = await Auth.signIn(email, pass);
      if (result) {
        console.log(result);
        window.location.href = "/";
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  }
  return (
    <div>
      {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}
      <form>
        Login
        <div>
          <div>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div>
            <button type="button" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;