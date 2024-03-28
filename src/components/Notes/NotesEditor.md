NotesEditor allows work with the user's notes.
In V-cana app it is PersonalNotes and TeamNotes.

### Default example

```jsx
import React, { useState, useEffect } from 'react';
import { notes, icons, classes } from '../../../mocks/notesEditor.js';
import {
  generateUniqueId,
  exportNotes,
  importNotes,
  NotesEditor,
  MenuButtons,
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
  const bulkNode = (note) => {
    const newNotes = [...databaseNotes];
    newNotes.push(note);
    setDatabaseNotes(newNotes);
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
        action: () => importNotes({ id: 1, deleted_at: null }, bulkNode, databaseNotes),
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
      console.log('save');
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
