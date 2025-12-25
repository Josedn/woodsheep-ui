import { render } from "preact";
import { GameUI } from "./ui/GameUI.tsx";
import "./app.scss";
import "./catan.scss";
import "./fonts.css";

render(<GameUI />, document.getElementById("app")!);
