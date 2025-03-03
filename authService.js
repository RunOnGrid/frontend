import axios from "axios";

const API_URL = process.env.GRID_AUTH_API;

const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        const { access_token, refresh_token } = response.data;

        // Almacenar los tokens
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("refreshToken", refresh_token);

        // Configurar el token de acceso para futuras peticiones
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        return {
          success: true,
          message: "Login successful",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "An error occurred during login",
      };
    }
  },

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
