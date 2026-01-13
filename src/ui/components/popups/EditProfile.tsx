import { GAME_TINTED_ICONS, UI_ICONS } from "../../../assets/images";
import { PopUp } from "./PopUp";
import "./edit-profile.scss";

export const EditProfile = () => {
    return (
        <PopUp title="Edit Profile">
            <div className="edit-profile">
                <div className="edit-profile__container">
                    <img className="edit-profile__avatar" src={UI_ICONS.iconPlayer} />
                    <h2 className="edit-profile__username">Bold</h2>
                </div>
                <img className="edit-profile__edit-icon" src={UI_ICONS.iconPencil} />
            </div>
            <div className="edit-profile__selector-container">
                <div className="edit-profile__selector-grid">
                    <img className="edit-profile__selector-grid-item edit-profile__selector-grid-item--selected" src={GAME_TINTED_ICONS.settlementRed} />
                    <img className="edit-profile__selector-grid-item" src={GAME_TINTED_ICONS.settlementBlue} />
                    <img className="edit-profile__selector-grid-item" src={GAME_TINTED_ICONS.settlementOrange} />
                    <img className="edit-profile__selector-grid-item" src={GAME_TINTED_ICONS.settlementGreen} />
                    <img className="edit-profile__selector-grid-item" src={GAME_TINTED_ICONS.settlementBlack} />
                </div>
            </div>
        </PopUp>
    );
};
