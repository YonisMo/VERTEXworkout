import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div
      className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12"
    >
      {children}
    </div>
  );
}