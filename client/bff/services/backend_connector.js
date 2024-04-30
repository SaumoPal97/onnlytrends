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
  const tokenUrl = process.env.APPOINTMENTS_OAUTH_TOKEN_URL;
  const clientId = process.env.APPOINTMENTS_OAUTH_CLIENT_ID;
  const clientSecret = process.env.APPOINTMENTS_OAUTH_CLIENT_SECRET;

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
    const accessToken = await getAccessToken();
    const backendServiceUrl = process.env.BACKEND_SERVICE_URL;

    const response = await axios.get(
      `${backendServiceUrl}/${path}${queryParams ? `?${queryParams}` : ``}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }

  async post(path, body, queryParams = null) {
    const accessToken = await getAccessToken();
    const backendServiceUrl = process.env.BACKEND_SERVICE_URL;

    const response = await axios.post(
      `${backendServiceUrl}/${path}${queryParams ? `?${queryParams}` : ``}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }
}

const bc = new BackendConnector();
module.exports = bc;
