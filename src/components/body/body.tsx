import { createContext, useState } from "react";
import TimetableWrapper from "../timetable/timetableWrapper";
import styles from "./body.module.scss";

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
                className={`${
                    theme === "dark" ? styles.blackBg : styles.whiteBg
                }`}
            >
                <button onClick={() => toggleTheme()}>
                    {`Current theme: ${theme}`}
                </button>
                <TimetableWrapper></TimetableWrapper>
            </div>
        </ThemeContext.Provider>
    );
};

export default Body;
