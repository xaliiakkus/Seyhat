#TODO: DOCKERFILE BUILD FUNCTIONS
############################################################################################################
ifeq ($(IS_FIRST_BUILD),1)
build:
	echo "prod_build çalıştı."
	{ \
		echo "TAG='$(TAG)'"; \
	} > ./build-make/.env.prod
	docker login -u "$(DOCKERHUB_USERNAME)" -p "$(DOCKERHUB_PASSWORD)" "docker.io"
	docker-compose --env-file ./build-make/.env.prod up -d --build next
	{ \
		echo "TAG='$(TAG)'"; \
	} > ./build-make/.env.prod.old
else
build:
	echo "prod_build çalıştı."
	rm -rf ./build-make/.env.prod
	{ \
		echo "TAG='$(TAG)'"; \
	} > ./build-make/.env.prod
	docker login -u "$(DOCKERHUB_USERNAME)" -p "$(DOCKERHUB_PASSWORD)" "docker.io"
	docker-compose --env-file ./build-make/.env.prod pull
	docker-compose --env-file ./build-make/.env.prod down -v
	docker-compose --env-file ./build-make/.env.prod up -d --build next
	docker image prune -af
endif


#TODO: FIRST BUILD FUNCTIONS
############################################################################################################
build_first:
	echo "prod_build_first çalıştı."
	make -f build-make/Makefile build IS_FIRST_BUILD=1


#TODO: REBUILD BUILD FUNCTIONS
############################################################################################################
rebuild:
	echo "prod_rebuild çalıştı."
	make -f build-make/Makefile build IS_FIRST_BUILD=0


#TODO: REMOVE FUNCTIONS
############################################################################################################
remove_container:
	echo "prod_remove_container çalıştı."
	docker-compose --env-file ./build-make/.env.prod down --rmi all -v
	rm -rf ./build-make/.env.prod
	rm -rf ./build-make/.env.prod.old
