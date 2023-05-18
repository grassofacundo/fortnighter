import { initializeApp } from "firebase/app";
import { getFirestore, Firestore, doc, setDoc } from "firebase/firestore";

export default class DbClass {
    db: Firestore;

    constructor() {
        const firebaseConfig: Object = {
            apiKey: "AIzaSyAWwW7h10kdLmLvGsE1NSry3FmqknGeAQU",
            authDomain: "fortnighter.firebaseapp.com",
            projectId: "fortnighter",
            storageBucket: "fortnighter.appspot.com",
            messagingSenderId: "582555247040",
            appId: "1:582555247040:web:0e7ed9f6443cb9469da825",
        };

        const app = initializeApp(firebaseConfig);
        this.db = getFirestore(app);
    }

    /*get getDb(): Database {
        return getDatabase(this.app);
    }*/

    createDate(date: Date) {
        // Add a new document in collection "cities"
        setDoc(doc(this.db, "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA",
        });
    }
}
