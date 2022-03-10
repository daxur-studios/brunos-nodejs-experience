// FIREBASE
export const isEmulated = process?.env?.FUNCTIONS_EMULATOR === 'true';

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const FIREBASE_CONFIG = JSON.parse(
  process.env.FIREBASE_CONFIG as string
);
const region = 'europe-west2'; // London - https://firebase.google.com/docs/functions/locations

admin.initializeApp(functions.config().firebase);

// EXPRESS
import express = require('express');
import cors = require('cors');

import { apiFunctionsLimiter } from './middlewares/rateLimiter';

const main = express();

export const expressApiV1 = express();
export const expressApiV2 = express();

main.use(express.json());
main.use(
  cors({
    /* origin: true */
  })
); // enabling CORS for all requests

main.use('/v1', expressApiV1);
main.use('/v2', expressApiV2);

require('./routes/v1/index');
require('./routes/v2/index');

export const api = functions.region(region).https.onRequest(main);

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const test = functions
  .region(region)
  .https.onRequest((request, response) => {
    response.send(
      `${
        process.env.TEST
      }, Hello from Firebase! 🐉🐉🐉 ${new Date().toLocaleTimeString()}, projectId: ${
        FIREBASE_CONFIG.projectId
      }, `
    );
  });

export const testRateLimiter = functions
  .region(region)
  .https.onRequest(async (req, res) => {
    const isOverLimit = await apiFunctionsLimiter
      .rejectOnQuotaExceededOrRecordUsage()
      .catch(async (e) => {
        res.status(429).send('Too many requests: ' + JSON.stringify(e));
        return true;
      }); // will throw HttpsException with proper warning

    if (isOverLimit) {
      // res.status(429).send('Too many requests');
    } else {
      res.send('Function called' + Date.now());
    }
  });
