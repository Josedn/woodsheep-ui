import { render } from "preact";
import { LocationProvider, ErrorBoundary, Router, Route } from "preact-iso";
import { LobbyPage } from "./ui/lobby/LobbyPage.tsx";
import { GameUI } from "./ui/game/GameUI.tsx";
import { HomePage } from "./ui/home/HomePage.tsx";
import "./assets/fonts/fonts.css";
import "./main.scss";
import { GameEngine } from "./engine/GameEngine.ts";

const App = () => {
    return (
        <LocationProvider>
            <ErrorBoundary>
                <Router>
                    <Route default={true} component={HomePage} />
                    <Route path="/game/:id?" component={GameUI} />
                    <Route path="/lobby/:id?" component={LobbyPage} />
                </Router>
            </ErrorBoundary>
        </LocationProvider>
    );
};

render(<App />, document.getElementById("app")!);
