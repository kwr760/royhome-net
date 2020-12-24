# Overview
This is my website.

## Intent
I want to create a robust website, even if it is over engineered.  Using good practices.

This is built with SSR react and will have a database on the backend

## Deploy

### Development

Use these steps to start locally as a development build.

#### Steps
- `yarn start build:dev`
- `yarn start start:dev`

### Secure

Use these steps to start locally as a production build.

### encrypted passcodes

Only can include one encrpyted file in travis at a time.  So we need
to tar up the encrypted information.

Currently including the ssh private key for transport and .env for the 
connection to resources, such as the database.

travis encrypt-file needed some setup.  google it.

```
tar cvf secrets.tar private-key .env
cp secrets.tar <project>/.travis
travis encrypt-file secrets.tar
rm <project>/.travis/secrets.tar
```

#### https

Starting https on localhost is a little trickie, at least I don't know
an easy way to way to do it.  At least not one I do not think is hackie.
I updated /etc/hosts to redirect to loopback for local.<domain>.  This 
way I can use my cert for my production site signed at let's encrypt. 
This seems to avoid the self-signing cert required for localhost.


### Production

At least for now I'm going to pm2 to deploy on a linode server.  I am expecting that pm2 can to used to 
scale the number of servers based on the number of cpus of my instance.  And I believe it could be used to 
help with docker or AWS instance.  When I want to pay for these things, I'll figure it out.

## Certificate - letsencrypt renewal

```
sudo yarn pm2:stop
sudo -H certbot renew --standalone
sudo yarn pm2:start
```

## Database
### Setup
#### install postgres
```
sudo apt update
sudo apt install postgresql postgresql-contrib
```
#### create user
```
sudo -u postgres createuser --interactive
> Enter name of role to add: server
> Shall the new role be a superuser? (y/n) y

sudo -u postgres psql
=# ALTER USER postgres WITH PASSWORD '<password>';
=# ALTER USER server WITH PASSWORD '<password>';
```
#### create database
```
sudo -u postgres createdb royhome
sudo -u postgres psql
=# grant all privileges on database royhome to server;
```
#### scripts
An important thing to note, is that these scripts will not retain changes made to the database.  This includes the 
the incrementing of the sequences.  This will become a problem when adding user added data.  
```
deploy.sql - drops/creates/verifies

rollback-0.sql - drop the sequences and tables
upgrade-0.sql - create tables and sequences
validate-0.sql - add the data to the tables
```
