import {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import FormManager from "../utils/form/FormManager";
import AuthContext from "../contexts/AuthContext";
import authService from "../../services/authService";
import dbService from "../../services/dbService";
import styles from "./Login.module.scss";

type LoginProps = {
    onLogIn: Dispatch<SetStateAction<boolean>>;
};

const Login: FunctionComponent<LoginProps> = ({ onLogIn }) => {
    const currentUser = useContext(AuthContext);

    const [loggedIn, setLoggedIn] = useState<boolean>(!!currentUser);
    const [hasAccount, setHasAccount] = useState<boolean>(true);
    const [Loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [trustDevice, setTrustDevice] = useState<boolean>(() =>
        authService.getIsTrustedDevice()
    );

    function handleNewUser() {
        setHasAccount(false);
        setLoggedIn(false);
        onLogIn(false);
        authService.logOut();
    }

    function handleOptionChange() {
        setHasAccount((prevState) => !prevState);
        setErrorMsg("");
    }

    function handleTrustDeviceCheck(propTrustDevice: boolean) {
        if (propTrustDevice) {
            authService.trustDevice();
            setTrustDevice(true);
        } else {
            authService.untrustDevice();
            setTrustDevice(false);
        }
    }

    async function handleSubmit(answers: formAnswersType[]): Promise<void> {
        const emailAnswer = answers
            .filter((answer) => answer.id === "email")
            .at(0);
        const passwordAnswer = answers
            .filter((answer) => answer.id === "password")
            .at(0);
        const checkboxAnswer = answers
            .filter((answer) => answer.id === "checkbox")
            .at(0);
        const email = emailAnswer?.value as string;
        const password = passwordAnswer?.value as string;
        const checkbox = checkboxAnswer?.value as boolean;

        if (!email || !password || checkbox == null) {
            setErrorMsg("Error on form answers");
            return;
        }

        if (!hasAccount) {
            setLoading(true);
            const responseAuth = await authService.createUser({
                username: email,
                password,
            });
            if (!responseAuth.ok) {
                setErrorMsg(responseAuth.errorMessage);
                return;
            }
            const responseDb = await dbService.createUserCollection(email);
            if (!responseDb.ok) {
                setErrorMsg(responseDb.errorMessage);
                return;
            }
            if (responseAuth.ok && responseDb.ok) {
                handleTrustDeviceCheck(checkbox);
                onLogIn(true);
            }
            setLoading(false);
        }
        if (hasAccount) {
            setLoading(true);
            const response = await authService.logIn({
                username: email,
                password,
                callback: () => onLogIn(true),
            });
            handleTrustDeviceCheck(checkbox);
            setLoading(false);
            if (!response.ok) {
                setErrorMsg(response.errorMessage);
                return;
            }
        }
    }

    useEffect(() => {
        setLoggedIn(currentUser !== null);
    }, [currentUser]);

    return (
        <div id="loginContainer" className={styles.loginContainer}>
            {loggedIn && currentUser?.email && (
                <div className={styles.returningUserForm}>
                    <p>{`Welcome back ${currentUser.email}!`}</p>
                    <button
                        className={styles.thankYouButton}
                        onClick={() => onLogIn(true)}
                    >
                        {"Thank you!"}
                    </button>

                    <label htmlFor="trust-device" className="checkbox-label">
                        <input
                            type="checkbox"
                            name="trust-device"
                            onChange={(e) =>
                                handleTrustDeviceCheck(e.target.checked)
                            }
                            checked={trustDevice}
                        />
                        Trust this device
                    </label>

                    <button
                        className={styles.textButton}
                        onClick={handleNewUser}
                    >
                        {`I'm not ${currentUser.email}`}
                    </button>
                </div>
            )}

            {!loggedIn && (
                <>
                    <button onClick={handleOptionChange}>
                        {hasAccount
                            ? "I don't have an account yet"
                            : "I have an account"}
                    </button>
                    <FormManager
                        inputs={[
                            {
                                type: "mail",
                                id: "email",
                                placeholder: "email",
                                isOptional: false,
                            },
                            {
                                type: "password",
                                id: "password",
                                placeholder: "password",
                                isOptional: false,
                            },
                            {
                                type: "checkbox",
                                id: "checkbox",
                            },
                        ]}
                        submitCallback={handleSubmit}
                        submitText={hasAccount ? "Log in" : "Sign in"}
                        Loading={Loading}
                        serverErrorMsg={errorMsg}
                    />
                </>
            )}
        </div>
    );
};

export default Login;
