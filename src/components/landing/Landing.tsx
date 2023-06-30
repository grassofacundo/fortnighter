import { useState, FunctionComponent, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import WelcomeAnimation from "../blocks/welcomeAnimation/WelcomeAnimation";
import InOutAnim from "../utils/InOutAnim";
import Login from "../login/Login";
import Dashboard from "../dashboard/Dashboard";
import styles from "./Landing.module.scss";
import ThemeContext from "../contexts/ThemeContext";
import authService from "../../services/authService";

const Landing: FunctionComponent = () => {
    const currentUser = useContext(AuthContext);

    const themeContent = useContext(ThemeContext);
    const theme = themeContent?.theme;
    const toggleTheme = themeContent?.toggleTheme;

    const [logIn, setLogIn] = useState<boolean>(false);
    const [animationEnded, setAnimationEnded] = useState<boolean>(false);

    useEffect(() => {
        if (logIn && !currentUser) {
            setLogIn(false);
        }
    }, [currentUser, logIn]);

    useEffect(() => {
        if (animationEnded && authService.getIsTrustedDevice() && currentUser)
            setLogIn(true);
    }, [animationEnded, currentUser]);

    return (
        <div className={styles.appContainer}>
            {!logIn && (
                <>
                    <WelcomeAnimation
                        fullText="Fortnighter"
                        onSetAnimationEnded={setAnimationEnded}
                    />
                    <InOutAnim
                        inState={animationEnded}
                        unmountOnExit={false}
                        customClass={styles.loginWrapper}
                    >
                        <Login onLogIn={setLogIn} />
                    </InOutAnim>
                </>
            )}
            {
                <InOutAnim
                    inState={logIn && animationEnded}
                    customClass="bodyInOut"
                >
                    <Dashboard />
                </InOutAnim>
            }
            {animationEnded && (
                <footer>
                    <button
                        className={styles.logOutButton}
                        style={{ opacity: logIn ? "1" : "0" }}
                        disabled={!logIn}
                        onClick={() => authService.logOut()}
                    >
                        Log out
                    </button>
                    <button
                        className={`${styles.themeButton} ${
                            theme === "dark" ? styles.inverted : ""
                        }`}
                        onClick={() => {
                            if (toggleTheme) toggleTheme();
                        }}
                    ></button>
                </footer>
            )}
        </div>
    );
};

export default Landing;
