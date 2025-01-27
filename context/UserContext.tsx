import React, { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URI from "../config/config";

interface UserData {
  name: string;
  email: string;
  avatar: {
    url: string;
  };
}

interface UserContextType {
  userData: UserData;
  setUserData: (data: UserData) => void;
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  userData: {
    name: "",
    email: "",
    avatar: { url: "" },
  },
  setUserData: () => {},
  refreshUserData: async () => {},
});

export const UserProvider : React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    avatar: { url: "" },
  });

  const refreshUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await fetch(`${API_URI}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setUserData(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, refreshUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);