import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Navigator } from "./Navigator";
import type { ComponentChildren } from "preact";
import { ErrorPopUp } from "./popups/ErrorPopUp";

export const Layout = (props: { children?: ComponentChildren }) => {
    return (
        <div className="layout">
            <Navigator />
            <Sidebar />
            <Header />
            <ErrorPopUp />
            {props.children}
        </div>
    );
};
