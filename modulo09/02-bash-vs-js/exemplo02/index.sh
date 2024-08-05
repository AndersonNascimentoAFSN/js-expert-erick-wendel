docker run --name andersonafsn_nginx -p "8080:80" -d nginx
# sleep .5
# curl --silent localhost:8080

CONTAINER_ID=$(docker ps | grep andersonafsn_nginx | awk '{print $1}')
echo $CONTAINER_ID | xargs -I {id} docker logs {id}
echo $CONTAINER_ID | xargs -I {id} docker container rm -f {id}


# docker container rm -f andersonafsn_nginx