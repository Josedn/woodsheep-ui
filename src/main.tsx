import { render } from "preact";
import { GameBoard } from "./ui/GameBoard.tsx";
import "./app.scss";
import "./catan.scss";

render(<GameBoard />, document.getElementById("app")!);
