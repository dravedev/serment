# https://github.com/nodejs/docker-node
docker run -it --rm --name my-running-script -v "$PWD":/usr/src/app -w /usr/src/app node:14 yarn add pdfkit | yarn add signature_pad