echo -e "\nDeploy the latest code"

eval "$(ssh-agent -s)"
openssl aes-256-cbc -K $encrypted_85fdd383440b_key -iv $encrypted_85fdd383440b_iv -in .travis/private-key.enc -out .travis/private-key -d
chmod 600 .travis/private-key
openssl aes-256-cbc -K $encrypted_85fdd383440b_key -iv $encrypted_85fdd383440b_iv -in .travis/.env.enc -out .travis/.env -d
chmod 600 .travis/.env

ssh-add .travis/private-key
rm .travis/private-key

echo -e "\nRemote:  stop existing server"
ssh $RELEASE_HOST 'cd /var/app/royhome-net ; sudo yarn run pm2:stop'
echo -e "\nRemote:  backup existing server"
ssh $RELEASE_HOST 'mv /var/app/royhome-net /var/app/royhome-net.$(date +%F_%T)'
echo -e "\nRemote:  git clone"
ssh $RELEASE_HOST 'git clone https://github.com/kwr760/royhome-net.git /var/app/royhome-net'
scp .travis/.env $RELEASE_HOST:/var/app/royhome-net
rm .travis/.env
echo -e "\nRemote:  yarn install"
ssh $RELEASE_HOST 'cd /var/app/royhome-net ; yarn install'
echo -e "\nRemote:  build webpack"
ssh $RELEASE_HOST 'cd /var/app/royhome-net ; node --version'
ssh $RELEASE_HOST 'cd /var/app/royhome-net ; yarn run build:prod'
echo -e "\nRemote:  certbot renew"
ssh $RELEASE_HOST 'sudo -H certbot renew --standalone'
echo -e "\nRemote:  start new server"
ssh $RELEASE_HOST 'cd /var/app/royhome-net ; sudo yarn run pm2:start'
echo -e "\nRemote:  show new server"
ssh $RELEASE_HOST 'cd /var/app/royhome-net ; sudo yarn run pm2:status'
ssh $RELEASE_HOST 'ls -la /var/app'

# Don't forget to cleanup your agent after you're done using it if you're not on an ephemeral build server.
ssh-agent -k


