### NotesEditor allows work with the user's notes.

### Minimal demo

```jsx
import React, { useState, useEffect } from 'react';
import { simpleNotes, icons } from '../../../mocks/notesEditor.js';
import { NotesEditor } from '@texttree/v-cana-rcl';

function Component() {
  const [currentNodeProps, setCurrentNodeProps] = useState(null);
  const [databaseNotes, setDatabaseNotes] = useState(simpleNotes);
  const [activeNote, setActiveNote] = useState();
  const [noteId, setNoteId] = useState();

  const handleSaveNote = () => {
    const index = databaseNotes.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      const updatedNotes = [...databaseNotes];
      updatedNotes[index] = activeNote;
      setDatabaseNotes(updatedNotes);
    }
  };

  useEffect(() => {
    if (!activeNote) return;
    const index = databaseNotes.findIndex((note) => note.id === activeNote.id);
    if (index !== -1) {
      const updatedNotes = [...databaseNotes];
      updatedNotes[index] = activeNote;
      setDatabaseNotes(updatedNotes);
    }
  }, [activeNote]);

  return (
    <NotesEditor
      notes={databaseNotes}
      setActiveNote={setActiveNote}
      activeNote={activeNote}
      setCurrentNodeProps={setCurrentNodeProps}
      currentNodeProps={currentNodeProps}
      icons={icons}
      handleSaveNote={handleSaveNote}
    />
  );
}
<Component />;
```

### Drag & drop demo

```jsx
import React, { useState } from 'react';
import { notes, icons } from '../../../mocks/notesEditor.js';
import { NotesEditor } from '@texttree/v-cana-rcl';

function Component() {
  const [currentNodeProps, setCurrentNodeProps] = useState(null);
  const [databaseNotes, setDatabaseNotes] = useState(notes);
  const [activeNote, setActiveNote] = useState();
  const [noteId, setNoteId] = useState();
  const handleDragDrop = ({ dragIds, parentId, index }) => {
    moveNode({ dragIds, parentId, index });
  };
  const moveNode = ({ dragIds, parentId, index }) => {
    const draggedNode = databaseNotes.find((node) => node.id === dragIds[0]);
    if (!draggedNode || index < 0) {
      return;
    }
    const newSorting = index;
    const oldSorting = draggedNode.sorting;
    const newParentId = parentId;
    const oldParentId = draggedNode.parent_id;
    const filtered = databaseNotes.filter((note) => note.id !== dragIds[0]);
    if (parentId === oldParentId) {
      if (newSorting === oldSorting || index < 0) {
        return;
      }
      const sorted = filtered.map((note) => {
        const isIncreasing = newSorting > oldSorting;
        const isInRange = isIncreasing
          ? note.sorting < newSorting &&
            note.sorting > oldSorting &&
            note.parent_id === parentId
          : note.sorting >= newSorting &&
            note.sorting < oldSorting &&
            note.parent_id === parentId;
        draggedNode.sorting = isIncreasing ? index - 1 : index;
        return isInRange
          ? { ...note, sorting: isIncreasing ? note.sorting - 1 : note.sorting + 1 }
          : note;
      });
      setDatabaseNotes(sorted.concat(draggedNode));
    } else {
      draggedNode.parent_id = parentId;
      draggedNode.sorting = index;
      const sorted = filtered.map((note) => {
        if (note.parent_id === oldParentId && note.sorting > oldSorting) {
          return { ...note, sorting: note.sorting - 1 };
        } else if (note.parent_id === newParentId && note.sorting >= newSorting) {
          return { ...note, sorting: note.sorting + 1 };
        }
        return note;
      });
      setDatabaseNotes(sorted.concat(draggedNode));
    }
  };
  const handleSaveNote = () => {
    const index = databaseNotes.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      const updatedNotes = [...databaseNotes];
      updatedNotes[index] = activeNote;
      setDatabaseNotes(updatedNotes);
    }
  };
  return (
    <NotesEditor
      notes={databaseNotes}
      handleDragDrop={handleDragDrop}
      setActiveNote={setActiveNote}
      activeNote={activeNote}
      setCurrentNodeProps={setCurrentNodeProps}
      currentNodeProps={currentNodeProps}
      icons={icons}
      handleSaveNote={handleSaveNote}
    />
  );
}
<Component />;
```

### Manage data

```jsx
import React, { useState } from 'react';
import { notes, icons } from '../../../mocks/notesEditor.js';
import { generateUniqueId } from '../../utils/helper.js';

import { NotesEditor } from '@texttree/v-cana-rcl';

function Component() {
  const [currentNodeProps, setCurrentNodeProps] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [databaseNotes, setDatabaseNotes] = useState(notes);
  const [activeNote, setActiveNote] = useState();
  const [noteId, setNoteId] = useState();

  const handleSaveNote = () => {
    const index = databaseNotes.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      const updatedNotes = [...databaseNotes];
      updatedNotes[index] = activeNote;
      setDatabaseNotes(updatedNotes);
    }
  };
  const addNode = (isFolder = false) => {
    const id = generateUniqueId([]);
    const title = isFolder ? 'New folder' : 'New note';
    const data = {
      blocks: [],
      version: '2.29.1',
    };
    const insertData = {
      id,
      user_id: 1,
      title,
      is_folder: isFolder,
      parent_id: null,
    };
    const newDataBaseNotes = [...databaseNotes];
    newDataBaseNotes.push(insertData);
    setDatabaseNotes(newDataBaseNotes);
  };
  const removeNode = (id) => {
    const newNotes = [...databaseNotes];
    setDatabaseNotes(newNotes.filter((note) => note.id !== id));
  };
  return (
    <>
      <NotesEditor
        notes={databaseNotes}
        setActiveNote={setActiveNote}
        activeNote={activeNote}
        setCurrentNodeProps={setCurrentNodeProps}
        currentNodeProps={currentNodeProps}
        icons={icons}
        handleSaveNote={handleSaveNote}
        selectedNodeId={noteId}
        setSelectedNodeId={setNoteId}
        style={{
          nodeWrapper: {
            hoveredColor: '#D5D5D5',
            selectedColor: '#bdbdbd',
          },
        }}
      />
      <button className="p-2 bg-gray-300 rounded-lg mr-2" onClick={() => addNode()}>
        Add note
      </button>
      <button className="p-2 bg-gray-300 rounded-lg mr-2" onClick={() => addNode(true)}>
        Add folder
      </button>
      <button className="p-2 bg-gray-300 rounded-lg" onClick={() => removeNode(noteId)}>
        Delete selected node
      </button>
    </>
  );
}
<Component />;
```

### Search

```jsx
import React, { useState } from 'react';
import { simpleNotes, icons, classes } from '../../../mocks/notesEditor.js';
import { NotesEditor } from '@texttree/v-cana-rcl';

function Component() {
  const [currentNodeProps, setCurrentNodeProps] = useState(null);
  const [databaseNotes, setDatabaseNotes] = useState(simpleNotes);
  const [activeNote, setActiveNote] = useState();
  const [noteId, setNoteId] = useState();

  const handleSaveNote = () => {
    const index = databaseNotes.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      const updatedNotes = [...databaseNotes];
      updatedNotes[index] = activeNote;
      setDatabaseNotes(updatedNotes);
    }
  };

  return (
    <NotesEditor
      notes={databaseNotes}
      setActiveNote={setActiveNote}
      activeNote={activeNote}
      setCurrentNodeProps={setCurrentNodeProps}
      currentNodeProps={currentNodeProps}
      icons={icons}
      handleSaveNote={handleSaveNote}
      classes={classes}
      isSearch
    />
  );
}
<Component />;
```

### Context Menu

```jsx
import React, { useState } from 'react';
import { simpleNotes, icons, classes } from '../../../mocks/notesEditor.js';
import { generateUniqueId, NotesEditor } from '@texttree/v-cana-rcl';

function Component() {
  const [currentNodeProps, setCurrentNodeProps] = useState(null);
  const [databaseNotes, setDatabaseNotes] = useState(simpleNotes);
  const [activeNote, setActiveNote] = useState();
  const [noteId, setNoteId] = useState();

  const handleSaveNote = () => {
    const index = databaseNotes.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      const updatedNotes = [...databaseNotes];
      updatedNotes[index] = activeNote;
      setDatabaseNotes(updatedNotes);
    }
  };
  const menuItems = {
    contextMenu: [
      {
        id: 'adding_note',
        buttonContent: (
          <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
            {icons.file || ''} {'New note'}
          </span>
        ),
        action: () => addNode(),
      },
      {
        id: 'adding_folder',
        buttonContent: (
          <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
            {icons.closeFolder || ''} {'New folder'}
          </span>
        ),
        action: () => addNode(true),
      },
      {
        id: 'rename',
        buttonContent: (
          <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
            {icons.file || ''} {'Rename'}
          </span>
        ),
        action: () => handleRename(),
      },
      {
        id: 'delete',
        buttonContent: (
          <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
            {icons.removeIcon || ''} {'Delete'}
          </span>
        ),
        action: () => removeNode(),
      },
    ],
    container: {
      className: 'absolute border rounded z-[100] whitespace-nowrap bg-white shadow',
    },
    item: {
      className: 'cursor-pointer bg-th-secondary-100 hover:bg-th-secondary-200',
    },
  };
  const addNode = (isFolder = false) => {
    const id = generateUniqueId([]);
    const title = isFolder ? 'New folder' : 'New note';
    const data = {
      blocks: [],
      version: '2.29.1',
    };
    const insertData = {
      id,
      user_id: 1,
      title,
      is_folder: isFolder,
      parent_id: null,
    };
    const newDataBaseNotes = [...databaseNotes];
    newDataBaseNotes.push(insertData);
    setDatabaseNotes(newDataBaseNotes);
  };
  const handleRenameNode = (newTitle, id) => {
    if (!newTitle.trim()) {
      newTitle = 'Empty title';
    }
    const noteToRename = databaseNotes.find((note) => note.id === id);
    if (noteToRename) {
      noteToRename.title = newTitle;
      const filtered = databaseNotes.filter((note) => note.id !== id);
      const newAr = [...filtered, noteToRename];
      setDatabaseNotes(newAr);
    }
  };
  const handleRename = () => {
    currentNodeProps.node.edit();
  };
  const removeNode = () => {
    if (currentNodeProps) {
      const newNotes = [...databaseNotes];
      setDatabaseNotes(newNotes.filter((note) => note.id !== currentNodeProps.node.id));
    }
  };
  const handleRemoveNode = ({ ids }) => {
    if (currentNodeProps) {
      if (ids && ids.length) {
        setDatabaseNotes(databaseNotes.filter((el) => !ids.includes(el.id)));
      } else {
        setDatabaseNotes(
          databaseNotes.filter((el) => el.id !== currentNodeProps.node.id)
        );
      }
    }
  };

  return (
    <NotesEditor
      notes={databaseNotes}
      setActiveNote={setActiveNote}
      activeNote={activeNote}
      setCurrentNodeProps={setCurrentNodeProps}
      currentNodeProps={currentNodeProps}
      icons={icons}
      handleSaveNote={handleSaveNote}
      handleRenameNode={handleRenameNode}
      classes={classes}
      menuItems={menuItems}
      isContextMenu
    />
  );
}
<Component />;
```

### Basic demo

```jsx
import React, { useState, useEffect } from 'react';
import { notes, icons, classes } from '../../../mocks/notesEditor.js';
import {
  generateUniqueId,
  formationJSONToTree,
  NotesEditor,
  MenuButtons,
  parseNotesWithTopFolder,
} from '@texttree/v-cana-rcl';
import Modal from '../Modal/Modal.js';

function Component() {
  const [currentNodeProps, setCurrentNodeProps] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const allNotes = [];
  const [databaseNotes, setDatabaseNotes] = useState(notes);

  const handleDragDrop = ({ dragIds, parentId, index }) => {
    setDatabaseNotes(moveNode({ dragIds, parentId, index, databaseNotes }));
  };
  const [activeNote, setActiveNote] = useState();
  const [noteId, setNoteId] = useState();
  const moveNode = ({ dragIds, parentId, index, databaseNotes }) => {
    const draggedNode = databaseNotes.find((node) => node.id === dragIds[0]);
    if (!draggedNode || index < 0) {
      return databaseNotes;
    }
    const newSorting = index;
    const oldSorting = draggedNode.sorting;
    const newParentId = parentId;
    const oldParentId = draggedNode.parent_id;
    const filtered = databaseNotes.filter((note) => note.id !== dragIds[0]);
    if (parentId === oldParentId) {
      if (newSorting === oldSorting || index < 0) {
        return databaseNotes;
      }
      const sorted = filtered.map((note) => {
        const isIncreasing = newSorting > oldSorting;
        const isInRange = isIncreasing
          ? note.sorting < newSorting &&
            note.sorting > oldSorting &&
            note.parent_id === parentId
          : note.sorting >= newSorting &&
            note.sorting < oldSorting &&
            note.parent_id === parentId;
        if (isInRange) {
          draggedNode.sorting = isIncreasing ? index - 1 : index;
          return { ...note, sorting: isIncreasing ? note.sorting - 1 : note.sorting + 1 };
        }
        return note;
      });
      return [...sorted, draggedNode];
    } else {
      draggedNode.parent_id = parentId;
      draggedNode.sorting = index;
      const sorted = filtered.map((note) => {
        if (note.parent_id === oldParentId && note.sorting > oldSorting) {
          return { ...note, sorting: note.sorting - 1 };
        } else if (note.parent_id === newParentId && note.sorting >= newSorting) {
          return { ...note, sorting: note.sorting + 1 };
        }
        return note;
      });
      return [...sorted, draggedNode];
    }
  };
  const addNode = (isFolder = false) => {
    const id = generateUniqueId(allNotes);
    const title = isFolder ? 'New folder' : 'New note';
    const data = {
      blocks: [],
      version: '2.29.1',
    };
    const insertData = {
      id,
      user_id: 1,
      title,
      is_folder: isFolder,
      parent_id: null,
    };
    const newDataBaseNotes = [...databaseNotes];
    newDataBaseNotes.push(insertData);
    setDatabaseNotes(newDataBaseNotes);
    return id;
  };
  const handleRenameNode = (newTitle, id) => {
    if (!newTitle.trim()) {
      newTitle = 'Empty title';
    }
    const noteToRename = databaseNotes.find((note) => note.id === id);
    if (noteToRename) {
      noteToRename.title = newTitle;
      const filtered = databaseNotes.filter((note) => note.id !== id);
      const newAr = [...filtered, noteToRename];
      setDatabaseNotes(newAr);
    }
  };
  const handleRename = () => {
    currentNodeProps.node.edit();
  };
  const exportNotes = (notes) => {
    try {
      if (!notes || !notes.length) {
        throw new Error('No data');
      }
      const newNotes = [...notes];

      const transformedData = formationJSONToTree(newNotes);
      const jsonContent = JSON.stringify(
        { type: 'personal_notes', data: transformedData },
        null,
        2
      );
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const downloadLink = document.createElement('a');
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      const fileName = `personal_notes_${formattedDate}.json`;
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    } catch (error) {
      return error;
    }
  };

  const importNotes = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.addEventListener('change', async (event) => {
      try {
        const file = event.target.files[0];
        if (!file) {
          throw new Error('No File Selected');
        }
        const fileContents = await file.text();
        if (!fileContents.trim()) {
          throw new Error('Empty File Content');
        }
        const importedData = JSON.parse(fileContents);
        if (importedData.type !== 'personal_notes') {
          throw new Error('Content Error');
        }
        const parsedNotes = parseNotesWithTopFolder(importedData.data, 1, false);
        parsedNotes.forEach((note) => {
          bulkNode(note);
        });
      } catch (error) {
        console.log(error.message);
      }
    });
    fileInput.click();
  };
  const bulkNode = (note) => {
    let insertData = {
      id: note.id,
      user_id: note.user_id,
      title: note.title,
      data: note.data,
      created_at: note.created_at,
      changed_at: note.changed_at,
      deleted_at: note.deleted_at,
      is_folder: note.is_folder,
      parent_id: note.parent_id,
      sorting: note.sorting,
    };
    setDatabaseNotes((prevNotes) => [...prevNotes, insertData]);
  };
  const menuItems = {
    contextMenu: [
      {
        id: 'adding_note',
        buttonContent: (
          <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
            {icons.file || ''} {'New note'}
          </span>
        ),
        action: () => addNode(),
      },
      {
        id: 'adding_folder',
        buttonContent: (
          <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
            {icons.closeFolder || ''} {'New folder'}
          </span>
        ),
        action: () => addNode(true),
      },
      {
        id: 'rename',
        buttonContent: (
          <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
            {icons.file || ''} {'Rename'}
          </span>
        ),
        action: handleRename,
      },
      {
        id: 'delete',
        buttonContent: (
          <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
            {icons.removeIcon || ''} {'Delete'}
          </span>
        ),
        action: () => setIsOpenModal(true),
      },
    ],
    menu: [
      {
        id: 'export',
        buttonContent: (
          <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
            {icons.exportIcon || ''} {'Export'}
          </span>
        ),
        action: () => exportNotes(databaseNotes),
      },
      {
        id: 'import',
        buttonContent: (
          <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
            {icons.importIcon || ''} {'Import'}
          </span>
        ),
        action: () => importNotes(true),
      },
      {
        id: 'remove',
        buttonContent: (
          <span className="flex items-center gap-2.5 py-1 pr-7 pl-2.5">
            {icons.removeIcon || ''} {'Remove all'}
          </span>
        ),
        action: () => {
          setCurrentNodeProps(null);
          setIsOpenModal(true);
        },
      },
    ],
    container: {
      className: 'absolute border rounded z-[100] whitespace-nowrap bg-white shadow',
    },
    item: {
      className: 'cursor-pointer bg-th-secondary-100 hover:bg-th-secondary-200',
    },
  };
  const dropMenuClassNames = { container: menuItems.container, item: menuItems.item };
  const handleSaveNote = () => {
    const index = databaseNotes.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      const updatedNotes = [...databaseNotes];
      updatedNotes[index] = activeNote;
      setDatabaseNotes(updatedNotes);
    }
  };
  useEffect(() => {
    if (!activeNote || !activeNote.id) {
      return;
    }
    const timer = setTimeout(() => {
      handleSaveNote();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeNote]);
  const removeNode = () => {
    if (currentNodeProps) {
      const newNotes = [...databaseNotes];
      setDatabaseNotes(newNotes.filter((note) => note.id !== currentNodeProps.node.id));
    }
  };
  const handleRemoveNode = ({ ids }) => {
    if (currentNodeProps) {
      if (ids && ids.length) {
        setDatabaseNotes(databaseNotes.filter((el) => !ids.includes(el.id)));
      } else {
        setDatabaseNotes(
          databaseNotes.filter((el) => el.id !== currentNodeProps.node.id)
        );
      }
    }
  };
  const dropMenuItems = {
    dots: menuItems.menu,
    plus: menuItems.contextMenu.filter((menuItem) =>
      ['adding_note', 'adding_folder'].includes(menuItem.id)
    ),
  };
  const deletePhrase = () => {
    if (!currentNodeProps) {
      return 'Are you sure delete all notes?';
    } else {
      return `Are you sure delete ${currentNodeProps.node.data.name}?`;
    }
  };
  const removeAllNote = () => {
    setDatabaseNotes([]);
  };
  const handleBack = () => {
    console.log('back');
  };
  return (
    <>
      <div className="flex justify-end w-full mb-2">
        <MenuButtons
          classNames={{
            dropdown: dropMenuClassNames,
            button: 'bg-gray-500 text-white p-2 rounded-lg',
            container: 'flex gap-2 relative',
            buttonContainer: 'relative',
          }}
          menuItems={dropMenuItems}
          icons={icons}
        />
      </div>
      <NotesEditor
        notes={databaseNotes}
        handleDragDrop={handleDragDrop}
        setActiveNote={setActiveNote}
        activeNote={activeNote}
        setCurrentNodeProps={setCurrentNodeProps}
        currentNodeProps={currentNodeProps}
        handleRemoveNode={removeNode}
        handleRenameNode={handleRenameNode}
        noteId={noteId}
        setNoteId={setNoteId}
        menuItems={menuItems}
        icons={icons}
        classes={classes}
        isSearch
        handleBack={handleBack}
        handleSaveNote={handleSaveNote}
        isContextMenu
      />
      <Modal isOpen={isOpenModal} closeHandle={() => setIsOpenModal(false)}>
        <div className="flex flex-col gap-7 items-center">
          <div className="text-center text-2xl">{deletePhrase()}</div>
          <div className="flex gap-7 w-1/2 text-th-text-primary">
            <button
              className="btn-base flex-1 bg-th-secondary-10 hover:opacity-70"
              onClick={() => {
                setIsOpenModal(false);
                currentNodeProps ? removeNode() : removeAllNote();
              }}
            >
              {'Yes'}
            </button>
            <button
              className="btn-base flex-1 bg-th-secondary-10 hover:opacity-70"
              onClick={() => setIsOpenModal(false)}
            >
              {'No'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
<Component />;
```
