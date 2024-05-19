import { FC, ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
};

export const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
      {children}
    </header>
  );
};
