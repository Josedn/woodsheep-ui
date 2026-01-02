import type { ComponentChildren } from "preact";
import { UI_ICONS } from "../../../assets/images";
import "./popup.scss";

export const PopUp = (props: { title: string; children?: ComponentChildren }) => {
    return (
        <div className="popup">
            <div className="popup__content">
                <div className="popup__header">
                    <div className="popup__heading">{props.title}</div>
                    <img class="popup__close" src={UI_ICONS.iconCross} />
                </div>
                <div className="popup__body">{props.children}</div>
                <div className="popup__footer"></div>
            </div>
        </div>
    );
};
