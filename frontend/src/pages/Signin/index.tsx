import { Link } from "react-router-dom";
import "../Signup/auth.css";
import { authRepository } from "../../modules/auth/auth.repository";
import { useState } from "react";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    if (email === "" || password === "") return;

    try {
      console.log("Sending signin data:", { email, password: "***" });
      const { user, token } = await authRepository.signin(email, password);
      console.log("Signed in user:", user);
      console.log("Received token:", token);
    } catch (error: any) {
      console.error("Signin error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      alert(
        `ログインエラー: ${error.response?.data?.message || error.message}`,
      );
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="signup-title">Sign in</h1>
        <p className="signup-subtitle">メールアドレスでログインしてください</p>

        <div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="continue-button"
            disabled={email === "" || password === ""}
            onClick={signin}
          >
            Continue
          </button>
        </div>
        <p className="signin-link">
          ユーザー登録は<Link to="/signup">こちら</Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
