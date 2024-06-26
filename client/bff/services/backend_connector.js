require("dotenv").config;
const axios = require("axios");

const authenticate = async (tokenUrl, clientId, clientSecret) => {
  try {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const response = await axios.post(
      tokenUrl,
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error("Authentication failed:", error);
    throw error;
  }
};

const getAccessToken = async () => {
  const tokenUrl = process.env.BACKEND_OAUTH_TOKEN_URL;
  const clientId = process.env.BACKEND_OAUTH_CLIENT_ID;
  const clientSecret = process.env.BACKEND_OAUTH_CLIENT_SECRET;

  try {
    const accessToken = await authenticate(tokenUrl, clientId, clientSecret);
    return accessToken;
  } catch (error) {
    console.error("Error obtaining access token:", error);
    throw error; // Rethrow the error to handle it in the calling context
  }
};

class BackendConnector {
  async get(path, queryParams = null) {
    console.log(process.env.BACKEND_SERVICE_URL);
    const backendServiceUrl = process.env.BACKEND_SERVICE_URL;
    if (process.env.NODE_ENV === "production") {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        `${backendServiceUrl}${path}${queryParams ? `?${queryParams}` : ``}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } else {
      const response = await axios.get(
        `${backendServiceUrl}${path}${queryParams ? `?${queryParams}` : ``}`
      );
      return response;
    }
  }

  async post(path, body, queryParams = null) {
    const backendServiceUrl = process.env.BACKEND_SERVICE_URL;
    if (process.env.NODE_ENV === "production") {
      const accessToken = await getAccessToken();

      const response = await axios.post(
        `${backendServiceUrl}${path}${queryParams ? `?${queryParams}` : ``}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } else {
      const response = await axios.post(
        `${backendServiceUrl}${path}${queryParams ? `?${queryParams}` : ``}`,
        body
      );
      return response;
    }
  }
}

const bc = new BackendConnector();
module.exports = bc;
