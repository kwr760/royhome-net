echo "The deploy script has run!"

eval "$(ssh-agent -s)"

ssh-add <(echo "$SSH_PRIVATE_KEY")

# List out your new key's fingerprint
ssh-add -l

ssh $RELEASE_HOST  ls -la
ssh $RELEASE_HOST  rm -rf /var/app/royhome-net.sav
ssh $RELEASE_HOST  mv /var/app/royhome-net /var/app/royhome-net.sav
ssh $RELEASE_HOST  git clone https://$GITHUB_LOGIN@github.com/kwr760/royhome-net.git /var/app

# Don't forget to cleanup your agent after you're done using it if you're not on an ephemeral build server.
ssh-agent -k

ssh-add -l

#git clone https://${GH_USER}:${GH_PASS}@github.com/kwr760/royhome-net.git /var/www/royhome.net
#cd /var/www/royhome.net
#yarn install
#yarn run build:prod
#yarn run start:prod


