// @ts-check
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
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