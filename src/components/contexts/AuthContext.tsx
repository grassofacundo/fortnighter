import { User } from "firebase/auth";
import {
    FunctionComponent,
    ReactNode,
    createContext,
    useEffect,
    useState,
} from "react";
import authService from "../../services/authService";

type thisProps = {
    children: ReactNode;
};

type userContext = User | null;

const AuthContext = createContext<userContext>(null);

export const UserProvider: FunctionComponent<thisProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<userContext>(null);

    useEffect(() => {
        if (!authService.getAuthService()) return;

        authService.getAuthState(setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
