import axios from "axios";

const API_URL = process.env.GRID_AUTH_API;

const authService = {
  logout: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await axios.post(`${API_URL}/logout`, null, {
        params: { refres_token: refreshToken },
      });
      localStorage.removeItem("accesToken");
      localStorage.removeItem("refreshToken");
      delete axios.defaults.headers.common["Authorization"];
    } catch (error) {
      console.error("Error during logout:", error);
      localStorage.removeItem("accesToken");
      localStorage.removeItem("refreshToken");
      delete axios.defaults.headers.common["Authorization"];
    }
  },
};

export default authService;
