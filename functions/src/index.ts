import * as functions from 'firebase-functions';
import express = require('express');

const FIREBASE_CONFIG = JSON.parse(process.env.FIREBASE_CONFIG as string);
const region = 'europe-west2'; // London - https://firebase.google.com/docs/functions/locations

const main = express();

export const expressApiV1 = express();
export const expressApiV2 = express();

main.use(express.json());

main.use('/v1', expressApiV1);
main.use('/v2', expressApiV2);

require('./routes/v1');
require('./routes/v2');

export const api = functions.region(region).https.onRequest(main);

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions
  .region(region)
  .https.onRequest((request, response) => {
    functions.logger.info('Hello logs!', { structuredData: true });
    response.send(
      `${
        process.env.TEST
      }, Hello from Firebase! 🐉🐉🐉 ${new Date().toLocaleTimeString()}, projectId: ${
        FIREBASE_CONFIG.projectId
      }, `
    );
  });
