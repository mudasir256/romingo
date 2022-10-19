FROM gcr.io/google_appengine/nodejs
WORKDIR /
ADD . .
RUN npm install --force
EXPOSE 5000
RUN npm run build
CMD ["npm", "run", "start:prod"]