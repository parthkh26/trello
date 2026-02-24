import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin() {
    await login();
    navigate("/");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login to Trello Clone</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default Login;