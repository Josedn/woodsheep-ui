import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Navigator } from "./Navigator";
import type { ComponentChildren } from "preact";
import { ErrorPopUp } from "./popups/ErrorPopUp";
import { useEffect } from "preact/hooks";
import { GameEngine } from "../../engine/GameEngine";

export const Layout = (props: { children?: ComponentChildren }) => {
    useEffect(() => {
        const game = GameEngine.getGame();

        // for debugging
        const win: any = window;
        win.game = game;

        game.initialize();
    }, []);
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
