import { createContext, useState } from "react";
import "./App.css";
import Body from "./body/body";
import DbClass from "../services/dbService";
import Login from "./login/Login";

type AppProps = {};

export const dbContext = createContext<any>(null);
const dbContextValue = {
    db: new DbClass(),
};

const App: React.FC<AppProps> = () => {
    const [logIn, setLogIn] = useState<boolean>(false);

    return (
        <dbContext.Provider value={dbContextValue}>
            {logIn ? <Body /> : <Login onSetLogIn={setLogIn} />}
        </dbContext.Provider>
    );
};

export default App;
