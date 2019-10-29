const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    SERVER_URI: process.env.SERVER_URI,
    TARGET: process.env.TARGET,
    DEVICe: process.env.DEVICE,
    WS_SERVER_PORT: process.env.WS_SERVER_PORT || 8080
};