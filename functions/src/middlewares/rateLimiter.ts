import * as admin from 'firebase-admin';

// import { rateLimit } from 'express-rate-limit';
// const rateLimit = require('express-rate-limit');

import { FirebaseFunctionsRateLimiter } from 'firebase-functions-rate-limiter';
import { isEmulated } from '..';

/*
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per `window` (here, per 15 minutes)
  skipSuccessfulRequests: true,
});
*/

export const apiFunctionsLimiter =
  FirebaseFunctionsRateLimiter.withFirestoreBackend(
    {
      debug: isEmulated,
      periodSeconds: 15,
      maxCalls: 3,
      name: 'apiFunctionsLimiter',
    },
    admin.firestore()
  );
// or, for functions unit testing convenience:
export const mockLimiter = FirebaseFunctionsRateLimiter.mock();
