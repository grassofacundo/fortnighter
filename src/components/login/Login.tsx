import { Dispatch, SetStateAction, useState } from "react";
import { getAuth, Auth, signOut } from "firebase/auth";
import LoginForm from "./LoginFrom";
import styles from "./Login.module.scss";

type LoginProps = {
    onSetLogIn: Dispatch<SetStateAction<boolean>>;
};

const Login: React.FC<LoginProps> = ({ onSetLogIn }) => {
    getAuth();
    const [returnedUser, setReturnedUser] = useState<Auth | null>(null);

    function handleAnimationEnd(): void {
        const welcomeSign = document.getElementById("welcomeSign");
        const auth = getAuth();
        setReturnedUser(auth);
    }

    function handleLogOut() {
        if (!returnedUser) return;

        signOut(returnedUser)
            .then(() => {
                setReturnedUser(null);
                setReturnedUser(getAuth());
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /*useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setReturnedUser(auth);
                // ...
            } else {
                console.log("Que pasa aca");
                // User is signed out
                // ...
            }
        });
    }, []);*/

    const isLoading = returnedUser === null;
    const returningUser = returnedUser?.currentUser;

    return (
        <div className={styles.logInContainer}>
            <div className={styles.welcomeContainer}>
                <p
                    id="welcomeSign"
                    className={styles.welcomeSign}
                    onAnimationEnd={handleAnimationEnd}
                >
                    Welcome
                </p>
                {!isLoading && returningUser && (
                    <p id="welcomeBackSign" className={styles.welcomeBackSign}>
                        {", back"}
                    </p>
                )}
            </div>

            {!isLoading && returningUser && (
                <button
                    onClick={handleLogOut}
                >{`Not ${returningUser.email}? Log out`}</button>
            )}
            {!isLoading && !returningUser && (
                <LoginForm onSetLogIn={onSetLogIn} />
            )}
        </div>
    );
};

export default Login;
