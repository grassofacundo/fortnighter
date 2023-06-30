import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAWwW7h10kdLmLvGsE1NSry3FmqknGeAQU",
    authDomain: "fortnighter.firebaseapp.com",
    projectId: "fortnighter",
    storageBucket: "fortnighter.appspot.com",
    messagingSenderId: "582555247040",
    appId: "1:582555247040:web:0e7ed9f6443cb9469da825",
};
let app: FirebaseApp;
let collectionName: string | null;

class DbService {
    init() {
        app = initializeApp(firebaseConfig);
    }

    setCollectionName(email: string) {
        collectionName = email;
    }

    clearCollectionName() {
        collectionName = null;
    }

    getApp() {
        return app;
    }

    getDb() {
        return getFirestore(this.getApp());
    }

    checkCollectionName(response: FirebaseEventReturn) {
        if (!collectionName) {
            response.ok = false;
            response.errorMessage = "Collection name is empty";
        }
        return response;
    }

    async createUserCollection(email: string): Promise<FirebaseEventReturn> {
        const response: FirebaseEventReturn = {
            ok: true,
            errorMessage: "",
        };

        this.checkCollectionName(response);
        if (!response.errorMessage) {
            await setDoc(
                doc(this.getDb(), collectionName as string, "userInformation"),
                {
                    email: email,
                }
            )
                .then(() => {
                    console.log("Collection created");
                })
                .catch((error) => {
                    console.error(error.message);
                    response.ok = false;
                    response.errorMessage = error.message;
                });

            console.log("Finished createUserCollection");
        }
        return response;
    }

    async createJobPosition(
        positionName: string
    ): Promise<FirebaseEventReturn> {
        const response: FirebaseEventReturn = {
            ok: true,
            errorMessage: "",
            content: null,
        };

        this.checkCollectionName(response);

        if (!response.errorMessage) {
            await setDoc(
                doc(this.getDb(), collectionName as string, "job-positions"),
                {
                    positionName: positionName,
                }
            )
                .then((resp) => (response.content = resp))
                .catch((error) => {
                    response.ok = false;
                    response.errorMessage = error.message;
                });
        }

        return response;
    }

    async getJobPositions() {
        const response: FirebaseEventReturn = {
            ok: true,
            errorMessage: "",
            content: null,
        };

        const docSnap = await getDoc(
            doc(this.getDb(), collectionName as string, "job-positions")
        );

        if (docSnap.exists()) {
            response.content = docSnap.data();
        } else {
            // docSnap.data() will be undefined in this case
            response.ok = false;
            response.errorMessage = "No such document";
        }

        return response;
    }
}

const dbService = new DbService();
export default dbService;
