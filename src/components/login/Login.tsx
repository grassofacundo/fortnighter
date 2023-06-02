import {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import styles from "./Login.module.scss";
import AuthContext from "../contexts/AuthContext";
import authService from "../../services/authService";

type LoginProps = {
    onLogIn: Dispatch<SetStateAction<boolean>>;
};

const Login: FunctionComponent<LoginProps> = ({ onLogIn }) => {
    const currentUser = useContext(AuthContext);

    const userIsBack = currentUser !== null;
    const [isRegisteredUser, setIsRegisteredUser] = useState<boolean>(false);
    const [isReturningUser, setIsReturningUser] = useState<boolean>(userIsBack);
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

        if (isReturningUser) {
            onLogIn(true);
        }

        if (!emailSubmitted && validEmail(email)) {
            setError("");
            setEmailSubmitted(true);
            return;
        }

        const passRegex: RegExp =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

        if (!isRegisteredUser && !passRegex.test(password)) {
            setError(
                "Password must contain 1 lowercase, 1 uppercase, 1 special character and be at least 8 characters long"
            );
            return;
        }

        if (emailSubmitted && validEmail(email)) {
            if (!isRegisteredUser) {
                authService.createUser(email, password);
                onLogIn(true);
            } else {
                authService.logIn(email, password);
                onLogIn(true);
            }
        }
    }

    function getSubmitButtonText(): string {
        if (isReturningUser) {
            return "Thank you!";
        } else if (!emailSubmitted) {
            return "Submit email";
        } else if (emailSubmitted && isRegisteredUser) {
            return "Log in";
        } else {
            return "Sign up";
        }
    }

    useEffect(() => {
        setIsReturningUser(currentUser !== null);
    }, [currentUser]);

    return (
        <div className={styles.loginContainer}>
            {emailSubmitted && (
                <button
                    onClick={() =>
                        setIsRegisteredUser((prevState) => !prevState)
                    }
                >
                    {isRegisteredUser
                        ? "I don't have an account yet"
                        : "I'm a registered user"}
                </button>
            )}
            {isReturningUser && currentUser?.email && (
                <button
                    onClick={() => {
                        setIsRegisteredUser(false);
                        setIsReturningUser(false);
                        authService.logOut();
                    }}
                >
                    {`I'm not ${currentUser.email}`}
                </button>
            )}
            <form onSubmit={handleSubmit}>
                {!isReturningUser && (
                    <input
                        type="mail"
                        placeholder="email"
                        onChange={(e) => handleEmailChange(e.target.value)}
                    ></input>
                )}
                {!isReturningUser && emailSubmitted && (
                    <input
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                )}
                <button
                    type="submit"
                    disabled={!isReturningUser && !validEmail(email)}
                >
                    {getSubmitButtonText()}
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
