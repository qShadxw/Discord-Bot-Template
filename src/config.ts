// Environment Variables.
require('dotenv').config();

export default {
	clientToken : process.env.CLIENT_TOKEN ?? '',
	clientId : process.env.CLIENT_ID ?? '',
	baseURL: process.env.BASE_URL ?? '',
}