import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function DropdownMenu({ menuItems, classNames, isOpenMenu, setIsOpenMenu }) {
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpenMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpenMenu]);
  return (
    menuItems && (
      <div
        className={`${classNames.container.className} top-14 right-0 ${
          !isOpenMenu ? 'hidden' : ''
        }`}
        ref={menuRef}
      >
        {menuItems.map((menuItem) => (
          <div
            key={menuItem.id}
            className={classNames.item.className}
            onClick={() => {
              menuItem.action();
              setIsOpenMenu(false);
            }}
          >
            {menuItem.buttonContent}
          </div>
        ))}
      </div>
    )
  );
}
export default DropdownMenu;

DropdownMenu.defaultProps = {
  menuItems: [],
  classNames: {
    container: {},
    item: {},
  },
  isOpenMenu: false,
  setIsOpenMenu: () => {},
};
DropdownMenu.propTypes = {
  /**
   * An array of menu item objects with id, buttonContent and action properties.
   * Each object represents a single menu item.
   */
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      // Unique identifier for the menu item
      id: PropTypes.string.isRequired,
      // Content to be rendered in the menu item
      buttonContent: PropTypes.node.isRequired,
      // Action to be performed when the menu item is clicked
      action: PropTypes.func.isRequired,
    })
  ),
  // Object with container and item properties, each with a className string
  classNames: PropTypes.shape({
    // CSS className for the container
    container: PropTypes.shape({ className: PropTypes.string.isRequired }).isRequired,
    // CSS className for the menu item
    item: PropTypes.shape({ className: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
  // Determines if the menu is open
  isOpenMenu: PropTypes.bool.isRequired,
  // Function to set the isOpenMenu state
};
