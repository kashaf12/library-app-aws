import React, { useState } from "react";
import { Auth } from "aws-amplify";

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [pass, setPass] = useState();
  const [screen, setScreen] = useState("signup");
  const [code, setCode] = useState();

  async function signup() {
    try {
      let result = await Auth.signUp({
        username: email,
        password: pass,
        attributes: {
          name,
          email,
        },
      });
      if (!result.userConfirmed) {
        setScreen("code");
      } else {
        const user = await Auth.signIn(email, pass);
        if (user) {
          window.location.href = "/";
        }
      }
    } catch (ex) {
      setErrorMessage(ex.message);
    }
  }

  async function verify() {
    try {
      let result = await Auth.confirmSignUp(email, code);
      if (result) {
        const user = await Auth.signIn(email, pass);
        if (user) {
          window.location.href = "/";
        }
      }
    } catch (error) {}
  }

  return (
    <div>
      {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}
      {screen === "signup" ? (
        <div>
          Signup
          <form>
            <div>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              <button type="button" onClick={signup}>
                Signup
              </button>
            </div>
          </form>
        </div>
      ) : screen === "code" ? (
        <div>
          Verification Code
          <form>
            <div>
              <input
                type="text"
                placeholder="Code"
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div>
              <button type="button" onClick={verify}>
                Verify
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
