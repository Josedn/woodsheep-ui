import { render } from "preact";
import { LocationProvider, ErrorBoundary, Router, Route } from "preact-iso";
import { Home } from "./pages/Home.tsx";
import { GameUI } from "./pages/GameUI.tsx";
import "./assets/fonts/fonts.css";
import "./main.scss";

const App = () => {
    return (
        <LocationProvider>
            <ErrorBoundary>
                <Router>
                    <Route default={true} component={Home} />
                    <Route path="/game/:id?" component={GameUI} />
                </Router>
            </ErrorBoundary>
        </LocationProvider>
    );
};

render(<App />, document.getElementById("app")!);
