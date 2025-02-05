import { useEffect } from "react";
import { useRouter } from "next/router";
import { TokenService } from "../tokenHandler";

const useAuthCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const { redirectToLogin } = TokenService.getTokens();

    if (redirectToLogin) {
      TokenService.clearTokens();
      router.push("/login");
    }
  }, [router]);
};

export default useAuthCheck;
