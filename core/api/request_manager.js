const axios = require('axios').default;
const dotenv = require('dotenv');
dotenv.config();

class RequestManager {
  constructor(baseURL, timeout) {
    const authString = Buffer.from(
      `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
    ).toString('base64');
    this.axios = axios.create({
      baseURL: baseURL,
      timeout: timeout,
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      validateStatus: null,
    });
  }

  async sendRequest(verb, endpoint, body = null, headers = {}) {
    try {
      const config = {
        method: verb,
        url: endpoint,
        headers,
      };

      if (verb.toLowerCase() !== 'get' && body !== null) {
        config.data = body;
      }

      const response = await this.axios.request(config);

      if (response.status >= 400) {
        console.error(`Request failed with status ${response.status}: ${response.statusText}`);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      console.error(
        `Error in ${verb.toUpperCase()} request to ${endpoint}: ${error.response?.status || 'No status'} - ${error.response?.statusText || error.message}`,
        {
          data: error.response?.data || 'No additional data',
          request: error.request || 'No request details',
        }
      );

      throw error;
    }
  }
}

module.exports = new RequestManager(process.env.API_BASE_URL, 10000);
