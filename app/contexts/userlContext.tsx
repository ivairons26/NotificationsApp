"use client";
import { createContext, ReactNode } from "react";

export interface User {
  id: number;
  name: string;
  avatar?: string;
}

const fakeUsers: User[] = [
  { id: 1, name: "Leanne Graham", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Ervin Howell", avatar: "https://i.pravatar.cc/150?img=3" },
  {
    id: 3,
    name: "Clementine Bauch",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 4,
    name: "Romaguera-Jacob",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  { id: 5, name: "Patricia Lebsack" },
  { id: 6, name: "Chelsey Dietrich" },
  { id: 7, name: "Keebler LLC", avatar: "https://i.pravatar.cc/150?img=7" },
  { id: 8, name: "Kurtis Weissnat", avatar: "https://i.pravatar.cc/150?img=8" },
  { id: 9, name: "Nicholas Runolfstir" },
];

export const UserContext = createContext<User[] | undefined>(undefined);

export default function UserContextProvider({
  children,
}: {
  children?: ReactNode | undefined;
}) {
  return (
    <UserContext.Provider value={fakeUsers}>{children}</UserContext.Provider>
  );
}
