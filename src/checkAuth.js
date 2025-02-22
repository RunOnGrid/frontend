import { useEffect } from "react";
import { useRouter } from "next/router";
import { TokenService } from "../tokenHandler";

const checkAuth = () => {
   
  const router = useRouter();

  useEffect(() => {
    const response = TokenService.isAuthenticated();
    if (response.tokens) {
      router.push("/profile");
    }
    
  }, []);
};

export default checkAuth;
