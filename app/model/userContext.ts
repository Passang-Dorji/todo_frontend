import type { Users } from "./user";
 export interface UserContextType {
    user: Users | null;
    setUser: (user: Users | null) => void;
    
}