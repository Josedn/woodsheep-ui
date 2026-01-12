import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Navigator } from "./Navigator";
import type { ComponentChildren } from "preact";
import { ErrorPopUp } from "./popups/ErrorPopUp";
import { useEffect, useState } from "preact/hooks";
import { GameEngine } from "../../engine/GameEngine";

export const Layout = (props: { children?: ComponentChildren }) => {
    const [loadedGame, setLoadedGame] = useState(false);

    useEffect(() => {
        const game = GameEngine.getGame();

        // for debugging
        const win: any = window;
        win.game = game;

        game.initialize()
            .then(() => {})
            .catch(() => {})
            .finally(() => {
                setLoadedGame(true);
            });
    }, []);

    return (
        <>
            {loadedGame && (
                <div className="layout">
                    <Navigator />
                    <Sidebar />
                    <Header />
                    <ErrorPopUp />
                    {props.children}
                </div>
            )}
        </>
    );
};
