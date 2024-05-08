import React from "react";
import Header from "../Header/Header";
import './Layout.css';
import RootStore from "../../stores/root.store";

interface LayoutProps {
    children: React.ReactNode;
    rootStore: typeof RootStore
}
const Layout: React.FC<LayoutProps> = ({ children, rootStore }) => {
    return (
        <div className="layout">
            <Header rootStore={rootStore} />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
