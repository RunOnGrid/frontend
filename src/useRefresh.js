import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TokenService } from "../tokenHandler";

const useAuthCheck = () => {
  const [gridId, setGridId] = useState(null);
  const [repos, setRepos] = useState([]);
  const router = useRouter();

  const handleRepos = async () => {
    try {
      const response = await fetch(
        `/api/repositories-proxy?installationId=${gridId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching branches: ${response.statusText}`);
      }

      const data = await response.json();

      setRepos(data.message);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    const { redirectToLogin } = TokenService.getTokens();

    if (redirectToLogin) {
      TokenService.clearTokens();
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const response = TokenService.getTokens();
    if (response.tokens) {
      setGridId(response.tokens.gridId);
    }
  }, []);
  useEffect(() => {
    if (gridId) {
      handleRepos();
    }
  }, [gridId]);
  useEffect(() => {
    if (repos && repos.length > 0 && repos[0].installationId) {
      localStorage.setItem("gridInstalled", true);
    }
  }, [repos]);
};

export default useAuthCheck;
