// FIREBASE
export const isEmulated = process?.env?.FUNCTIONS_EMULATOR === 'true';

//import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const FIREBASE_CONFIG = JSON.parse(
  process.env.FIREBASE_CONFIG as string
);
const region = 'europe-west2'; // London - https://firebase.google.com/docs/functions/locations

import { instanceTest } from './controllers/🔥 firebase.manager';
import { FirestoreRateLimiter } from './middlewares/rateLimiter';
//import { initApiV1 } from './routes/v1';
import { initApiV2 } from './routes/v2';

export const api = functions
  .region(region)
  .https.onRequest(async (req, res) => {
    // EXPRESS
    const express = await import('express');
    const cors = await import('cors');

    const main = express();

    const expressApiV1 = express();
    const expressApiV2 = express();

    main.use(express.json());
    main.use(
      cors({
        /* origin: true */
      })
    ); // enabling CORS for all requests

    main.use('/v1', expressApiV1);
    main.use('/v2', expressApiV2);

    //initApiV1(expressApiV1);
    initApiV2(expressApiV2);

    return main(req, res);
  });

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const test = functions
  .region(region)
  .https.onRequest(async (request, response) => {
    await instanceTest();

    //  functions.logger.debug(functions.config().firebase);

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
    const limiter = new FirestoreRateLimiter(15, 3, 'apiFunctionsLimiter');
    await limiter.init();

    const isOverLimit = await limiter
      .FirebaseFunctionsRateLimiter!.rejectOnQuotaExceededOrRecordUsage()
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
