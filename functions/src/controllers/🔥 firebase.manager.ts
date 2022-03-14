import type { App } from 'firebase-admin/app';
import type { Firestore } from 'firebase-admin/firestore';
import type { Storage } from 'firebase-admin/storage';
import type { Auth } from 'firebase-admin/auth';
import type { Messaging } from 'firebase-admin/messaging';

import { FIREBASE_CONFIG } from '..';

export class FirebaseManager {
  static app: App;
  static firestore: Firestore;
  static storage: Storage;
  static auth: Auth;
  static messaging: Messaging;

  /**
   * constructor is set private, only one instance should exist
   */
  private constructor() {}

  /**
   * Gets the | App service for the default app or a given app.
   */
  static async getApp(): Promise<App> {
    if (!FirebaseManager.app) {
      const fbApp = await import('firebase-admin/app');
      FirebaseManager.app = fbApp.initializeApp(FIREBASE_CONFIG);
    }
    //admin.initializeApp(FIREBASE_CONFIG /* functions.config().firebase*/);
    return FirebaseManager.app;
  }

  /**
   * Gets the | Firestore service for the default app or a given app.
   */
  static async getFirestore(): Promise<Firestore> {
    await FirebaseManager.getApp(); // must initialize app first

    if (!FirebaseManager.firestore) {
      const m = await import('firebase-admin/firestore');
      FirebaseManager.firestore = m.getFirestore();
    }
    return FirebaseManager.firestore;
  }
  /**
   * Gets the Storage service for the default app or a given app.
   */
  static async getStorage(): Promise<Storage> {
    await FirebaseManager.getApp(); // must initialize app first

    if (!FirebaseManager.storage) {
      const m = await import('firebase-admin/storage');
      FirebaseManager.storage = m.getStorage();
    }
    return FirebaseManager.storage;
  }
  /**
   * Gets the Auth service for the default app or a given app.
   */
  static async getAuth(): Promise<Auth> {
    await FirebaseManager.getApp(); // must initialize app first

    if (!FirebaseManager.auth) {
      const m = await import('firebase-admin/auth');
      FirebaseManager.auth = m.getAuth();
    }
    return FirebaseManager.auth;
  }
  /**
   * Gets the Messaging service for the default app or a given app.
   */
  static async getMessaging(): Promise<Messaging> {
    await FirebaseManager.getApp(); // must initialize app first

    if (!FirebaseManager.messaging) {
      const m = await import('firebase-admin/messaging');
      FirebaseManager.messaging = m.getMessaging();
    }
    return FirebaseManager.messaging;
  }
}

export async function instanceTest() {
  const fs = await FirebaseManager.getFirestore();

  console.debug(FirebaseManager);

  fs.doc('test/test').set({ works: true });
}
