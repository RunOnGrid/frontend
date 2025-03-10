import useCheckAuth from "@/checkAuth";
import Spinner from "@/commons/Spinner";
import LoginScreen from "@/components/login/LoginScreen";

export default function Login() {
  const isLoading = useCheckAuth();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container-homePrincipal2">
      <LoginScreen />
    </div>
  );
}
