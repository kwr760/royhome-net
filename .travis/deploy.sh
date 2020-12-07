echo -e "\nDeploy the latest code"

eval "$(ssh-agent -s)"

echo -e "\nTravis:  openssl decrypt"
openssl aes-256-cbc -K $encrypted_3b9f0b9d36d1_key -iv $encrypted_3b9f0b9d36d1_iv -in .travis/secrets.tar.enc -out .travis/secrets.tar -d
echo -e "\nTravis:  tar xvf"
tar xvf .travis/secrets.tar
echo -e "\nTravis:  openssl chmod"
chmod 600 private-key
echo -e "\nTravis:  openssl ssh-add"
ssh-add private-key
echo -e "\nTravis:  openssl rm"
rm private-key

echo -e "\nRemote:  copy new code to stage"
ssh $RELEASE_HOST 'git clone https://github.com/kwr760/royhome-net.git /var/app/royhome-net.stage'
echo -e "\nRemote:  scp env"
scp .env $RELEASE_HOST:/var/app/royhome-net.stage
echo -e "\nRemote:  docker-compose build"
ssh $RELEASE_HOST 'cd /var/app/royhome-net.stage ; RELEASE=prod docker-compose build'
echo -e "\nRemote:  stop existing server"
ssh $RELEASE_HOST 'cd /var/app/royhome-net ; RELEASE=prod docker-compose down'
echo -e "\nRemote:  remove old release"
ssh $RELEASE_HOST 'rm -rf /var/app/royhome-net.rollback'
echo -e "\nRemote:  backup existing server"
ssh $RELEASE_HOST 'mv /var/app/royhome-net /var/app/royhome-net.rollback'
echo -e "\nRemote:  promote staging"
ssh $RELEASE_HOST 'mv /var/app/royhome-net.stage /var/app/royhome-net'
echo -e "\nRemote:  start new server"
ssh $RELEASE_HOST 'cd /var/app/royhome-net ; RELEASE=prod docker-compose up -d'

echo -e "\nRemote:  certbot renew"
ssh $RELEASE_HOST 'sudo -H certbot renew --standalone'

# Don't forget to cleanup your agent after you're done using it if you're not on an ephemeral build server.
ssh-agent -k


