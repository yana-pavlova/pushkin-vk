# pushkin-vk
pushkin-vk

mongo pushkinvk-ru --eval "db.dropDatabase()"

docker-compose -f docker-compose.yml up

sudo docker-compose -f docker-compose-dev.yml up --no-deps --build

#TODO
+ редактор комментов
+ обработка ошибок запросов
ускорение рендера постов - аппенд не ререндер
+ больше постов 
длиннее текст постов
сессия кеш