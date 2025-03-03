import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TokenService } from "./tokenHandler";


export default function authWrapper() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokens = TokenService.getTokens();
    
    if (tokens.redirectToLogin) {
      TokenService.clearTokens();
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  return { isAuthenticated, isLoading };
}