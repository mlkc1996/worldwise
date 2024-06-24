import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    authenticated: false
};

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};


const reducer = (state, action) => {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload,
                authenticated: true
            };
        case "logout":
            return {
                ...state,
                user: null,
                authenticated: false
            };
    }
};


const AuthProvider = ({ children }) => {

    const [{ user, authenticated }, dispatch] = useReducer(reducer, initialState);

    const login = (email, password) => {
        if (email.toLowerCase() === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: "login", payload: FAKE_USER });
        }
    };

    const logout = () => {
        dispatch({ type: "logout" });
    };



    return (
        <AuthContext.Provider value={{
            login,
            logout,
            user,
            authenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("AuthContext is out of scope");
    }
    return context;
};

export { useAuth, AuthProvider };