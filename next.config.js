// @ts-check
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cmgt.hr.nl',
                port: '',
                pathname: '**',
            }
        ]
    }
    /* config options here */
  }
   
  module.exports = nextConfig