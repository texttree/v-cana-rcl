### Default example

```jsx
import React, { useState, useEffect } from 'react';
import { notes } from './data.js';
import { generateUniqueId, exportNotes, importNotes } from './helper.js';
import { icons } from './icons.js';

import { NoteEditor } from '@texttree/template-rcl';
import MenuButtons from './MenuButtons';
import Modal from './Modal';

const classes = {
  container: 'relative',
  back: 'flex w-fit p-1 cursor-pointer hover:opacity-70 rounded-full bg-th-secondary-100',
  redactor: {
    title: 'p-2 my-4 font-bold rounded-lg shadow-md',
    redactor: 'pb-20 pt-4 px-4 my-4 overflow-hidden break-words rounded-lg shadow-md',
  },
  treeView: {
    nodeWrapper: 'flex px-5 leading-[47px] text-lg cursor-pointer rounded-lg',
    nodeTextBlock: 'items-center truncate',
  },
  search: {
    input:
      'py-2 text-th-text-primary border-gray focus:border-gray placeholder:text-gray flex-1 px-4 w-full text-sm md:text-base rounded-lg border focus:outline-none',
    container: 'relative flex items-center mb-4',
    close: 'absolute р-6 w-6 right-1 z-10 cursor-pointer',
  },
};

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
      version: '2.27.2',
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
      newTitle = 'EmptyTitle';
    }

    const noteToRename = databaseNotes.find((note) => note.id === id);
    if (noteToRename) {
      noteToRename.title = newTitle;
      const filtered = databaseNotes.filter((note) => note.id !== id);
      const newAr = [...filtered, noteToRename];
      setDatabaseNotes(newAr);
    } else {
      console.log('Note with id ' + id + ' not found.');
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
            {icons.removeIcon || ''} {'RemoveAll'}
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
  const handleRemoveNode = ({ ids }) => {
    if (currentNodeProps) {
      currentNodeProps.tree.delete(currentNodeProps.node.id);
    }
  };
  const dropMenuClassNames = { container: menuItems.container, item: menuItems.item };

  const saveNote = () => {
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
      saveNote();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNote]);

  const removeNode = ({ ids }) => {
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
            button: 'bg-gray-500 p-2 rounded-lg',
            container: 'flex gap-2 relative',
            buttonContainer: 'relative',
          }}
          menuItems={dropMenuItems}
          icons={icons}
        />
      </div>
      <NoteEditor
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
        saveNote={saveNote}
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
