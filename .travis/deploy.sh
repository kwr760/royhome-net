echo "The deploy script has run!"

echo $RELEASE_IP_ADDR

ping 45.79.110.249

ssh server@45.79.110.249

git clone https://${GH_USER}:${GH_PASS}@github.com/kwr760/royhome-net.git /var/www/royhome.net
cd /var/www/royhome.net
yarn install
yarn run build:prod
yarn run start:prod


