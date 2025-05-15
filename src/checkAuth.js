import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TokenService } from "../tokenHandler";

const useCheckAuth = (minLoadingTime = 700) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const startTime = Date.now();

    const checkAuthentication = async () => {
      const response = TokenService.isAuthenticated();

      if (response.tokens) {
        router.push("/profile");
      } else {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      }
    };

    checkAuthentication();
  }, [router, minLoadingTime]);

  return isLoading;
};

export default useCheckAuth;