// import * as admin from 'firebase-admin';

// import { rateLimit } from 'express-rate-limit';
// const rateLimit = require('express-rate-limit');

import type { FirebaseFunctionsRateLimiter } from 'firebase-functions-rate-limiter';

import { isEmulated } from '..';
import { FirebaseManager } from '../controllers/🔥 firebase.manager';

/*
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per `window` (here, per 15 minutes)
  skipSuccessfulRequests: true,
});
*/

export class FirestoreRateLimiter {
  FirebaseFunctionsRateLimiter?: FirebaseFunctionsRateLimiter;

  constructor(
    private periodSeconds?: number,
    private maxCalls?: number,
    private name?: string
  ) {}

  async init() {
    const x = await import('firebase-functions-rate-limiter');
    const firestore = await FirebaseManager.getFirestore();

    const apiFunctionsLimiter =
      x.FirebaseFunctionsRateLimiter.withFirestoreBackend(
        {
          debug: isEmulated,
          periodSeconds: this.periodSeconds || 15,
          maxCalls: this.maxCalls || 3,
          name: this.name || 'apiFunctionsLimiter',
        },
        firestore
      );
    this.FirebaseFunctionsRateLimiter = apiFunctionsLimiter;

    return apiFunctionsLimiter;
  }
}

// or, for functions unit testing convenience:
// export const mockLimiter = FirebaseFunctionsRateLimiter.mock();
