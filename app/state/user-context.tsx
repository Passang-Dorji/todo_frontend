"use client";

import { createContext, useState, ReactNode, FC } from "react";
import type { Users } from "../model/user";
import type { UserContextType } from "../model/userContext";



// Define the initial state
const initialState: UserContextType = {
    user: null,
    setUser: () => {},
};

// Create the context
export const UserContext = createContext<UserContextType>(initialState);

// Define the UserProvider component
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<Users | null>(null);

    return (
        <UserContext.Provider value={{ 
            user, 
            setUser, 
        }}>
            {children}
        </UserContext.Provider>
    );
};
