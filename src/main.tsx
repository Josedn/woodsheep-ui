import { render } from "preact";
import { GameUI } from "./ui/GameUI.tsx";
import "./app.scss";
import "./catan.scss";

render(<GameUI />, document.getElementById("app")!);
