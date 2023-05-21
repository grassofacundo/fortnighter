import { createContext, useState } from "react";
import TimetableWrapper from "../timetable/timetableWrapper";
import styles from "./body.module.scss";
import InOutAnim from "../utils/InOutAnim";

type BodyProps = {};
type Theme = "light" | "dark";
interface ThemeContextInterface {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextInterface | null>(null);

const Body: React.FC<BodyProps> = () => {
    /*
    Theme change code start
    */
    const [theme, setTheme] = useState<Theme>("light");
    const [showTimetable, setShowTimetable] = useState<boolean>(false);

    const toggleTheme = (): void => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const themeContextValue: ThemeContextInterface = {
        theme,
        toggleTheme,
    };
    /*
    Theme change end
    */

    return (
        <ThemeContext.Provider value={themeContextValue}>
            <div
                className={`${styles.mainBody} ${
                    theme === "dark" ? styles.blackBg : styles.whiteBg
                }`}
            >
                <button onClick={() => setShowTimetable((prev) => !prev)}>
                    {`${showTimetable ? "Hide" : "Show"} timetable`}
                </button>
                <InOutAnim inState={showTimetable}>
                    <div>
                        <button onClick={() => toggleTheme()}>
                            {`Current theme: ${theme}`}
                        </button>
                        <TimetableWrapper></TimetableWrapper>
                    </div>
                </InOutAnim>
            </div>
        </ThemeContext.Provider>
    );
};

export default Body;
