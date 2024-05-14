import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DropdownMenu from './DropdownMenu';

function MenuButtons({
  disabled = false,
  classNames = {},
  menuItems = {},
  icons = { plus: '', dots: '' },
}) {
  const [isOpenDotsMenu, setIsOpenDotsMenu] = useState(false);
  const [isOpenPlusMenu, setIsOpenPlusMenu] = useState(false);

  const buttons = Object.entries(menuItems)
    .map(([id, menu]) => ({
      id,
      icon: icons[id],
      menu,
      action: id === 'plus' ? setIsOpenPlusMenu : setIsOpenDotsMenu,
      isOpen: id === 'plus' ? isOpenPlusMenu : isOpenDotsMenu,
    }))
    .filter(({ id }) => !!icons[id]);

  return (
    <div className={classNames.container}>
      {buttons.map(({ id, icon, menu, action, isOpen }) => (
        <div key={id} className={classNames.buttonContainer}>
          <button
            className={classNames.button}
            onClick={() => action((prev) => !prev)}
            disabled={disabled}
          >
            {icon}
          </button>
          <DropdownMenu
            menuItems={menu}
            classNames={classNames.dropdown}
            isOpenMenu={isOpen}
            setIsOpenMenu={action}
          />
        </div>
      ))}
    </div>
  );
}

export default MenuButtons;
MenuButtons.propTypes = {
  // An object representing CSS class names to be applied to the component elements.
  classNames: PropTypes.shape({}),
  // An object containing the items to be displayed in the menu of the component.
  menuItems: PropTypes.shape({}),
  // An object containing the URLs or names of icons to be used within the component, specifically for the plus and dots buttons.
  icons: PropTypes.shape({
    // The icon to represent an addition or expansion action
    plus: PropTypes.node,
    // The icon to represent a menu or more options action
    dots: PropTypes.node,
  }),
};
