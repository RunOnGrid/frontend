import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TokenService } from "../tokenHandler";

const useCheckAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const response = TokenService.isAuthenticated();
    if (response.tokens) {
      router.push("/profile");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return isLoading;
};

export default useCheckAuth;
