import { FirebaseApp } from "firebase/app";
import {
    Auth,
    User,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

let auth: Auth;
let firebaseApp: FirebaseApp;
let monitoringAuthChange: boolean;

class AuthService {
    init(firebaseAppParam: FirebaseApp) {
        firebaseApp = firebaseAppParam;
        this.setAuth();
    }

    setAuth() {
        const authLocal = getAuth(firebaseApp);
        auth = authLocal;
    }

    getAuthService() {
        return auth;
    }

    createUser(username: string, password: string) {
        if (!auth) return;

        console.log(
            `Creating user with username: ${username} and password ${password}`
        );

        createUserWithEmailAndPassword(auth, username, password)
            .then(() => {
                console.log("User created");
            })
            .catch((error) => {
                console.log(
                    `User NOT created and error got: ${error.code}: ${error.message}`
                );
            });
    }

    logIn(username: string, password: string) {
        if (!auth) return;

        console.log(
            `Logging in with username: ${username} and password ${password}`
        );
        signInWithEmailAndPassword(auth, username, password)
            .then(() => {
                console.log("User logged in");
            })
            .catch((error) => {
                console.log(
                    `User NOT logged in and error got: ${error.code}: ${error.message}`
                );
            });
    }

    logOut() {
        auth.signOut();
    }

    getAuthState(onStateChange: Dispatch<SetStateAction<User | null>>): void {
        if (monitoringAuthChange) return;

        monitoringAuthChange = true;
        onAuthStateChanged(authService.getAuthService(), (user) => {
            console.log("Running onAuthStateChanged");
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                console.log(uid);
                onStateChange(user);
                // ...
            } else {
                console.log("Not signed in");
                onStateChange(null);
            }
        });
    }
}

const authService = new AuthService();
export default authService;
