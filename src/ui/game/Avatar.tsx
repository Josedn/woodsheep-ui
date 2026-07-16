import type { ComponentChildren } from "preact";
import { UI_ICONS } from "../../assets/images";

export const GenericAvatar = (props: { className?: string; backgroundColor?: string; iconSrc?: string; children?: ComponentChildren }) => {
    const additionalClassName = props.className || "";
    const iconSrc = props.iconSrc || UI_ICONS.iconPlayer;
    const colorClassName = (props.backgroundColor && `generic-avatar--${props.backgroundColor}`) || "";
    const imageClassName = props.backgroundColor == null ? "generic-avatar__image generic-avatar__image--no-background" : "generic-avatar__image";
    return (
        <div className={`generic-avatar ${colorClassName} ${additionalClassName}`}>
            <img className={imageClassName} src={iconSrc} />
            {props.children}
        </div>
    );
};
