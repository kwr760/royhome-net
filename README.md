# Overview
This is my home page

Hello there

## Intent
I want to create a robust and website, even if it is over engineered.  Using good practices.

This is built with SSR react and will have a database on the backend

## Deploy

### Development

Use these steps to start locally as a development build.

#### Steps
- `yarn start build:dev`
- `yarn start start:dev`

### Secure

Use these steps to start locally as a production build.

#### Steps
- `yarn start build:prod`
- `yarn start start:prod`

### Production

At least for now I'm going to pm2 to deploy on a linode server.  I am expecting that pm2 can to used to 
scale the number of servers based on the number of cpus of my instance.  And I believe it could be used to 
help with docker or AWS instance.  When I want to pay for these things, I'll figure it out.

## Certificate - letsencrypt renewal

- sudo yarn pm2:stop
- suod -H certbot renew --standalone
- sudo yarn pm2:start
