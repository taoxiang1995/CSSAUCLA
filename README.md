To install react:
npm install react

To install dependency:
npm install --save

To run locally:
npm start

To change back-end server path:
go to ./src/config.js
serverAddress field

Routes for app
landing page: /landingPage
signup: /signup
upload product: /uploadproduct

Workflow:
signup -> uploadproduct -> landingPage

deploy:
git push heroku master
