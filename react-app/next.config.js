/** @type {import('next').NextConfig} */
require('dotenv').config();

module.exports = {
    reactStrictMode: true,
    env: {
        WLD_CLIENT_ID: process.env.WLD_CLIENT_ID,
        WLD_CLIENT_SECRET: process.env.WLD_CLIENT_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
    },
};