"use client";

import { createContext, useState } from "react";
import { User, users } from "@/lib/users";

type ContextValue = {
  user: User;
  setUser: (value: User) => void;
};

export const UserContext = createContext({} as ContextValue);

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>(users[0]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
