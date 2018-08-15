# pushkin-vk
pushkin-vk

mongo pushkinvk-ru --eval "db.dropDatabase()"

docker-compose -f docker-compose.yml up

sudo docker-compose -f docker-compose-dev.yml up --no-deps --build