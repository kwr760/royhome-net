echo "The deploy script has run!"

eval "$(ssh-agent -s)"
openssl aes-256-cbc -K $encrypted_85fdd383440b_key -iv $encrypted_85fdd383440b_iv -in .travis/private-key.enc -out .travis/private-key -d
chmod 600 .travis/private-key
ssh-add .travis/private-key
rm .travis/private-key

ssh $RELEASE_HOST  mv /var/app/royhome-net.last /var/app/royhome-net.$(date +%F_%T)
ssh $RELEASE_HOST  mv /var/app/royhome-net /var/app/royhome-net.last
ssh $RELEASE_HOST  git clone git@github.com:kwr760/royhome-net.git /var/app/royhome-net.git
ssh $RELEASE_HOST  git clone https://github.com/kwr760/royhome-net.git /var/app/royhome-net.https
ssh $RELEASE_HOST  ls -la /var/app

# Don't forget to cleanup your agent after you're done using it if you're not on an ephemeral build server.
ssh-agent -k


