import { ReactElement } from "react";
import { Header } from "@/components/Header";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const ChatLayout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}
  </>
);
