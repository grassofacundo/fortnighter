import { useState, FunctionComponent, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import WelcomeAnimation from "../blocks/welcomeAnimation/WelcomeAnimation";
import InOutAnim from "../utils/InOutAnim";
import Login from "../login/Login";
import Body from "../body/body";
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
        console.log("Checking logIn and currentUser");
        if (logIn && !currentUser) setLogIn(false);
    }, [currentUser, logIn]);

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
                    <Body />
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
