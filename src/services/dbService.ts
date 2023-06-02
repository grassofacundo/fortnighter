import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig: Object = {
    apiKey: "AIzaSyAWwW7h10kdLmLvGsE1NSry3FmqknGeAQU",
    authDomain: "fortnighter.firebaseapp.com",
    projectId: "fortnighter",
    storageBucket: "fortnighter.appspot.com",
    messagingSenderId: "582555247040",
    appId: "1:582555247040:web:0e7ed9f6443cb9469da825",
};
let app: FirebaseApp;
let db: Firestore;

class DbService {
    init() {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
    }

    getApp() {
        return app;
    }

    getDb() {
        return db;
    }

    /*createDate(date: Date) {
        // Add a new document in collection "cities"
        setDoc(doc(this.getDb(), "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA",
        });
    }*/
}

const dbService = new DbService();
export default dbService;
