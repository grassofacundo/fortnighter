import { Dispatch, SetStateAction, useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "./Login.module.scss";

type LoginFormProps = {
    onSetLogIn: Dispatch<SetStateAction<boolean>>;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSetLogIn }) => {
    const [isNew, setIsNew] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("");
    const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string>("");

    function handleEmailChange(email: string): void {
        if (emailSubmitted) setEmailSubmitted(false);
        setEmail(email);
    }

    function validEmail(email: string): boolean {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return (
            email !== null &&
            email !== "" &&
            email.length > 3 &&
            emailRegex.test(email)
        );
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (!emailSubmitted && validEmail(email)) {
            setError("");
            setEmailSubmitted(true);
            return;
        }

        const passRegex: RegExp =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

        if (isNew && !passRegex.test(password)) {
            setError(
                "Password must contain 1 lowercase, 1 uppercase, 1 special character and be at least 8 characters long"
            );
            return;
        }

        if (emailSubmitted && validEmail(email)) {
            setError("Loading...");
            const auth = getAuth();

            if (isNew) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        setError("");
                        onSetLogIn(true);
                    })
                    .catch((error) => {
                        setError(`Error code:${error.code}: ${error.message}`);
                    });
            } else {
                signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        setError("");
                        onSetLogIn(true);
                    })
                    .catch((error) => {
                        setError(`Error code:${error.code}: ${error.message}`);
                    });
            }
        }
    }

    return (
        <div className={styles.loginFormContainer}>
            {emailSubmitted && (
                <button onClick={() => setIsNew((prevState) => !prevState)}>
                    {isNew
                        ? "I'm a registered user"
                        : "I don't have an account yet"}
                </button>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="mail"
                    placeholder="email"
                    onChange={(e) => handleEmailChange(e.target.value)}
                ></input>
                {emailSubmitted && (
                    <input
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                )}
                <button type="submit" disabled={!validEmail(email)}>
                    {emailSubmitted
                        ? `${isNew ? "Sign up" : "Log in"}`
                        : "Submit email"}
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default LoginForm;
