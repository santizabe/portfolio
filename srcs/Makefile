COMPOSE_FILE = srcs/docker-compose.yml


all:
	@docker compose -f ${COMPOSE_FILE} build
	@docker-compose -f ${COMPOSE_FILE} up -d

down:
	@docker-compose -f ${COMPOSE_FILE} down

clean: down
	@printf "Cleaning up\n"
	@docker system prune -af

fclean: clean
	@printf "Complete cleanup coming up\n"
	@if [ -n "$$(docker ps -q)" ]; then \
		docker stop $$(docker ps -q); fi
	@docker system prune --all --force --volumes 
	@docker network prune --force
	@docker volume prune --force
	
re: clean all

.PHONY: all clean fclean re down