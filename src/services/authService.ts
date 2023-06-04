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

interface AuthParams {
    username: string;
    password: string;
    callback?: SetStateAction<any>;
}
interface AuthEventReturn {
    ok: boolean;
    errorMessage: string;
}
//type AuthFunc = (AuthParams: AuthParams) => AuthEventReturn;

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

    async createUser(AuthParams: AuthParams): Promise<AuthEventReturn> {
        const response = {
            ok: true,
            errorMessage: "",
        };

        if (!auth) {
            response.ok = false;
            response.errorMessage = "Auth not yet initialized";
        }

        const { username, password, callback } = AuthParams;

        await createUserWithEmailAndPassword(auth, username, password).catch(
            (error) => {
                response.ok = false;
                response.errorMessage = error.message;
                if (error.message.includes("email-already-in-use"))
                    response.errorMessage =
                        "Email is already in use, try logging in instead";
            }
        );
        if (response.ok) callback();
        return response;
    }

    async logIn(AuthParams: AuthParams): Promise<AuthEventReturn> {
        const response = {
            ok: true,
            errorMessage: "",
        };

        if (!auth) {
            response.ok = false;
            response.errorMessage = "Auth not yet initialized";
        }

        const { username, password, callback } = AuthParams;

        await signInWithEmailAndPassword(auth, username, password).catch(
            (error) => {
                response.ok = false;
                response.errorMessage = error.message;
                if (
                    error.message.includes("wrong-password") ||
                    error.message.includes("user-not-found")
                )
                    response.errorMessage = "Username or password is incorrect";
            }
        );

        if (response.ok) callback();
        return response;
    }

    logOut() {
        auth.signOut();
    }

    getAuthState(onStateChange: Dispatch<SetStateAction<User | null>>): void {
        if (monitoringAuthChange) {
            console.log("Not monitoring again");
            return;
        }

        console.log("Monitoring");
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
