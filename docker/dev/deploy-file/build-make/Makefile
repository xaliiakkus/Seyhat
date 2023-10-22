#TODO: DOCKERFILE BUILD FUNCTIONS
############################################################################################################
ifeq ($(IS_FIRST_BUILD),1)
build:
	echo "dev_build çalıştı."
	{ \
		echo "TAG='$(TAG)'"; \
	} > ./build-make/.env.dev
	docker login -u "$(DOCKERHUB_USERNAME)" -p "$(DOCKERHUB_PASSWORD)" "docker.io"
	docker-compose --env-file ./build-make/.env.dev up -d --build next
	{ \
		echo "TAG='$(TAG)'"; \
	} > ./build-make/.env.dev.old
else
build:
	echo "dev_build çalıştı."
	rm -rf ./build-make/.env.dev
	{ \
		echo "TAG='$(TAG)'"; \
	} > ./build-make/.env.dev
	docker login -u "$(DOCKERHUB_USERNAME)" -p "$(DOCKERHUB_PASSWORD)" "docker.io"
	docker-compose --env-file ./build-make/.env.dev pull
	docker-compose --env-file ./build-make/.env.dev down -v
	docker-compose --env-file ./build-make/.env.dev up -d --build next
	docker image prune -af
endif


#TODO: FIRST BUILD FUNCTIONS
############################################################################################################
build_first:
	echo "dev_build_first çalıştı."
	make -f build-make/Makefile build IS_FIRST_BUILD=1


#TODO: REBUILD BUILD FUNCTIONS
############################################################################################################
rebuild:
	echo "dev_rebuild çalıştı."
	make -f build-make/Makefile build IS_FIRST_BUILD=0


#TODO: REMOVE FUNCTIONS
############################################################################################################
remove_container:
	echo "dev_remove_container çalıştı."
	docker-compose --env-file ./build-make/.env.dev down --rmi all -v
	rm -rf ./build-make/.env.dev
	rm -rf ./build-make/.env.dev.old
