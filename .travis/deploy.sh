echo "The deploy script has run!"

echo $RELEASE_IP_ADDR
echo $RELEASE_PASSWORD
echo $GH_USER
echo $GH_PASS

sshpass -p $RELEASE_PASSWORD ssh $RELEASE_IP_ADDR ls

#git clone https://${GH_USER}:${GH_PASS}@github.com/kwr760/royhome-net.git /var/www/royhome.net
#cd /var/www/royhome.net
#yarn install
#yarn run build:prod
#yarn run start:prod


