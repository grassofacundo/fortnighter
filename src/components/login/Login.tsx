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
import InOutAnim from "../utils/InOutAnim";
import Spinner from "../blocks/spinner/Spinner";

type LoginProps = {
    onLogIn: Dispatch<SetStateAction<boolean>>;
};

const Login: FunctionComponent<LoginProps> = ({ onLogIn }) => {
    const currentUser = useContext(AuthContext);

    const [isReturningUser, setIsReturningUser] = useState<boolean>(
        !!currentUser
    );
    const [isRegisteredUser, setIsRegisteredUser] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>("");
    const [Loading, setLoading] = useState<boolean>(false);

    function handleNewUser() {
        setIsRegisteredUser(false);
        setIsReturningUser(false);
        onLogIn(false);
        authService.logOut();
    }

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

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();

        if (!validEmail(email)) {
            const errorMessage = "Email doesn't have the correct format";
            const erroredFieldType = "mail";
            handleError(false, { erroredFieldType, errorMessage });
            return;
        }

        if (!emailSubmitted && validEmail(email)) {
            handleError(true);
            setEmailSubmitted(true);
            return;
        }

        const passRegex: RegExp =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

        if (!isRegisteredUser && !passRegex.test(password)) {
            const errorMessage =
                "Password must contain 1 lowercase, 1 uppercase, 1 special character and be at least 8 characters long";
            const erroredFieldType = "password";
            handleError(false, { erroredFieldType, errorMessage });
            return;
        }

        if (emailSubmitted && validEmail(email)) {
            if (!isRegisteredUser) {
                setLoading(true);
                const response = await authService.createUser({
                    username: email,
                    password,
                    callback: () => onLogIn(true),
                });
                setLoading(false);
                if (!response.ok) {
                    const errorMessage = response.errorMessage;
                    const erroredFieldType = "mail";
                    handleError(response.ok, {
                        erroredFieldType,
                        errorMessage,
                    });
                }
            } else {
                setLoading(true);
                const response = await authService.logIn({
                    username: email,
                    password,
                    callback: () => onLogIn(true),
                });
                setLoading(false);
                if (!response.ok) {
                    const errorMessage = response.errorMessage;
                    const erroredFieldType = "mail";
                    handleError(response.ok, {
                        erroredFieldType,
                        errorMessage,
                    });
                }
            }
        }
    }

    function handleError(
        clearError: boolean,
        error?: { erroredFieldType: string; errorMessage: string }
    ) {
        if (clearError) setError(false);

        if (!error?.erroredFieldType || !error?.errorMessage) return;
        const { erroredFieldType, errorMessage } = error;
        const errorInput = document.querySelector(`[type=${erroredFieldType}]`);
        if (!errorInput) return;
        //Get input position
        const { offsetTop, offsetWidth, offsetHeight } = errorInput as any;
        const top = offsetTop - offsetHeight / 2 - 10;
        const right = offsetWidth - 10;

        const loginContainer = document.querySelector("#loginContainer") as any;
        if (!loginContainer) return;
        loginContainer.style.setProperty("--errorTop", `${top}px`);
        loginContainer.style.setProperty("--errorRight", `${right}px`);

        setErrorText(errorMessage);
        setError(true);
    }

    function getSubmitButtonText(): string {
        if (!emailSubmitted) {
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
        <div id="loginContainer" className={styles.loginContainer}>
            {isReturningUser && currentUser?.email && (
                <div className={styles.returningUserForm}>
                    <p>{`Welcome back ${currentUser.email}!`}</p>
                    <button onClick={() => onLogIn(true)}>
                        {"Thank you!"}
                    </button>
                    <button onClick={handleNewUser}>
                        {`I'm not ${currentUser.email}`}
                    </button>
                </div>
            )}

            {!isReturningUser && emailSubmitted && (
                <button
                    onClick={() => {
                        setIsRegisteredUser((prevState) => !prevState);
                        handleError(true);
                    }}
                >
                    {isRegisteredUser
                        ? "I don't have an account yet"
                        : "I have an account"}
                </button>
            )}

            {!isReturningUser && (
                <form onSubmit={handleSubmit}>
                    {!isReturningUser && (
                        <input
                            type="mail"
                            placeholder="email"
                            onChange={(e) => {
                                handleEmailChange(e.target.value);
                                handleError(true);
                            }}
                        ></input>
                    )}
                    {!isReturningUser && emailSubmitted && (
                        <input
                            type="password"
                            placeholder="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                handleError(true);
                            }}
                        ></input>
                    )}
                    <button type="submit">
                        {Loading ? <Spinner /> : getSubmitButtonText()}
                    </button>
                </form>
            )}

            <InOutAnim inState={error} customClass={styles.errorMessageWrapper}>
                <div className={styles.errorPorUp}>
                    <p className={styles.message}>{errorText}</p>
                </div>
            </InOutAnim>
        </div>
    );
};

export default Login;
