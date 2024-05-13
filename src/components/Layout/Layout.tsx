import React from "react";
import { AppShell, Navbar, Header } from "@mantine/core";
import { LayoutHeader } from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60}>
          <LayoutHeader />
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
