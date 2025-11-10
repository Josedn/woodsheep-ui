import { render } from "preact";
import { InGame } from "./ui/InGame.tsx";
//import { App } from './app.tsx';
import "./app.scss";
import "./catan.scss";

render(<InGame />, document.getElementById("app")!);
