docker run \
  --name postgres \
  -e POSTGRES_USER=andersonnascimento \
  -e POSTGRES_PASSWORD="senha123" \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker exec -it postgres psql --username andersonnascimento -d heroes
CREATE TABLE IF NOT EXISTS warriors(id SERIAL PRIMARY KEY,name VARCHAR(255) NOT NULL);
SELECT * FROM warrios;

docker run \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=andersonnascimento \
  -e MONGO_INITDB_ROOT_PASSWORD="senha123" \
  -p 27017:27017 \
  -d \
  mongo:4

docker logs mongodb