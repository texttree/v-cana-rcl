### Default example

```jsx
import React, { useState, useEffect } from 'react';
import { icons } from '../../../mocks/notesEditor.js';

import MenuButtons from './MenuButtons';

const menuItems = {
  menu: [
    {
      id: 'export',
      buttonContent: (
        <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
          {icons.exportIcon} {'Export'}
        </span>
      ),
      action: () => {},
    },
    {
      id: 'import',
      buttonContent: (
        <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
          {icons.importIcon} {'Import'}
        </span>
      ),
      action: () => {},
    },
    {
      id: 'remove',
      buttonContent: (
        <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
          {icons.removeIcon} {'RemoveAll'}
        </span>
      ),
      action: () => {},
    },
    {
      id: 'adding_note',
      buttonContent: (
        <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
          {icons.file} {'New note'}
        </span>
      ),
      action: () => {},
    },
    {
      id: 'adding_folder',
      buttonContent: (
        <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
          {icons.closeFolder} {'New folder'}
        </span>
      ),
      action: () => {},
    },
  ],
  container: {
    className: 'absolute border rounded z-[100] whitespace-nowrap bg-white shadow',
  },
  item: {
    className: 'cursor-pointer',
  },
};

const dropMenuItems = {
  dots: menuItems.menu.filter((menuItem) =>
    ['adding_note', 'adding_folder'].includes(menuItem.id)
  ),
  plus: menuItems.menu.filter((menuItem) => ['export', 'import'].includes(menuItem.id)),
};
const dropMenuClassNames = { container: menuItems.container, item: menuItems.item };

function Component() {
  return (
    <MenuButtons
      classNames={{
        dropdown: dropMenuClassNames,
        button: 'bg-gray-500 p-2 rounded-lg text-white',
        container: 'flex gap-2 relative',
        buttonContainer: 'relative',
      }}
      menuItems={dropMenuItems}
      icons={icons}
    />
  );
}
<Component />;
```
