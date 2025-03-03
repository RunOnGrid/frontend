import checkAuth from "@/checkAuth";
import LoginScreen from "@/components/login/LoginScreen";

export default function Login() {
  checkAuth();
  return (
    <div className="container-homePrincipal2">
      <LoginScreen />
    </div>
  );
}
