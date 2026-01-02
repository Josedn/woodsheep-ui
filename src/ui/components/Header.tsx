import { UI_ICONS } from "../../assets/images";

export const Header = () => {
    return (
        <header className="header">
            <div className="header__left">
                <div className="header__profile">
                    <div className="header__profile-logged-in">
                        <div className="header__profile-avatar">
                            <img className="header__profile-avatar-image" src={UI_ICONS.iconPlayer} alt="User" />
                        </div>
                        <div>
                            <p className="header__profile-username">Bold</p>
                            <p className="header__profile-karma">Karma: 20/20</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header__right">
                <div className="header__notifications">
                    <div className="header__notifications-icon">
                        <img className="header__notifications-image" src={UI_ICONS.iconBell} alt="Notification Icon" />
                        <div className="header__notifications-count-container">
                            <span className="header__notifications-count">16</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
