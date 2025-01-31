import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IUser } from '../types';
import { getCurrentUser } from '../server/AuthServer';

const UserContext = createContext<IUserProviderValues|undefined>(undefined)
    
interface IUserProviderValues {
    user: IUser | null;
    isLoading: boolean;
    setUser: (user: IUser | null) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  }

const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user,setUser] = useState<IUser|null>(null)
    const [isLoding, setIsLoding] = useState<boolean>(true)
    const handleUser=async()=>{
        const user=await getCurrentUser()
        setUser(user)
        setIsLoding(false)
    }

    useEffect(()=>{
        handleUser()
    },[isLoding])
    return (
        <UserContext.Provider value={{user, isLoading: isLoding, setUser, setIsLoading: setIsLoding}}>
            {children}
        </UserContext.Provider>
    );
};



export const useUser = () => {
    const context = React.useContext(UserContext);
    if (context=== undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}


export default UserProvider;