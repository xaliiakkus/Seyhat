build_latest:
	make -f build-make/Makefile rebuild \
      TAG='travelshopturkey/next:latest' \
      DOCKERHUB_USERNAME='username' \
      DOCKERHUB_PASSWORD='password';

build_tag:
	make -f build-make/Makefile rebuild \
      TAG='travelshopturkey/next:$(TAG)' \
      DOCKERHUB_USERNAME='username' \
      DOCKERHUB_PASSWORD='password';

build_first:
	make -f build-make/Makefile build_first \
      TAG='travelshopturkey/next:latest' \
      DOCKERHUB_USERNAME='username' \
      DOCKERHUB_PASSWORD='password';
