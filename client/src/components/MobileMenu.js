import React from "react";

function MobileMenu() {
  return (
    <div>
      <div className="mobile-header">
        <input type="checkbox" className="nav__checkbox" id="nav__toggle" />
        <label htmlFor="nav__toggle" className="nav__button">
          <span className="nav__icon">&nbsp;</span>
        </label>
        <div className="nav__background">
          <nav className="mobile-header__content">
            <ul className="nav__list">
              <li>
                <a href="#top" className="nav__link nav__link--home">
                  Timer
                </a>
              </li>
              <li className="nav__link nav__link--projects">
                <a href="#categories">Categories</a>
              </li>
              <li className="nav__link nav__link--about">
                <a href="#latests">Latest Activities</a>
              </li>
              <li className="nav__link nav__link--contact">
                <a href="#daily">Daily Progress</a>
              </li>
              <li className="nav__link nav__link--contact">
                <a href="#breakdown">Breakdown</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
