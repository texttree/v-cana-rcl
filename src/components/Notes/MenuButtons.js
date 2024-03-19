import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';

function MenuButtons({ classNames, menuItems = {}, icons = { plus: '', dots: '' } }) {
  const [isOpenDotsMenu, setIsOpenDotsMenu] = useState(false);
  const [isOpenPlusMenu, setIsOpenPlusMenu] = useState(false);

  const buttons = [
    {
      id: 'plus',
      icon: icons.plus,
      menu: menuItems,
      action: setIsOpenPlusMenu,
      isOpen: isOpenPlusMenu,
    },
    {
      id: 'dots',
      icon: icons.dots,
      menu: menuItems,
      action: setIsOpenDotsMenu,
      isOpen: isOpenDotsMenu,
    },
  ].filter((item) => Object.keys(menuItems).includes(item.id));
  return (
    <div className={classNames.container}>
      {buttons.map((button) => (
        <div key={button.id} className={classNames.buttonContainer}>
          <button
            className={classNames.button}
            onClick={() => button.action((prev) => !prev)}
          >
            {button.icon}
          </button>
          <DropdownMenu
            menuItems={menuItems[button.id]}
            classNames={classNames.dropdown}
            isOpenMenu={button.isOpen}
            setIsOpenMenu={button.action}
          />
        </div>
      ))}
    </div>
  );
}

export default MenuButtons;
