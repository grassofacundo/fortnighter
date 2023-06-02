import { useState, FunctionComponent, useEffect, useContext } from "react";
import Body from "./body/body";
import Login from "./login/Login";
import WelcomeAnimation from "./blocks/welcomeAnimation/WelcomeAnimation";
import styles from "./App.module.scss";
import InOutAnim from "./utils/InOutAnim";
import AuthContext, { UserProvider } from "./contexts/AuthContext";

const App: FunctionComponent = () => {
    const currentUser = useContext(AuthContext);
    const [logIn, setLogIn] = useState<boolean>(false);
    const [animationEnded, setAnimationEnded] = useState<boolean>(false);

    useEffect(() => {
        if (logIn && !currentUser) setLogIn(false);
    }, [currentUser, logIn]);

    return (
        <UserProvider>
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
                {logIn && animationEnded && <Body />}
            </div>
        </UserProvider>
    );
};

export default App;
