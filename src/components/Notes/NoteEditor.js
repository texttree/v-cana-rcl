import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redactor, TreeView, ContextMenu } from '@texttree/notepad-rcl';
import { convertNotesToTree } from './helper';

function NoteEditor({
  activeNote,
  setActiveNote,
  notes,
  selectedNodeId,
  handleDragDrop,
  setCurrentNodeProps,
  currentNodeProps,
  handleRenameNode,
  saveNote,
  handleRemoveNode,
  icons,
  noteId,
  setNoteId,
  menuItems,
  classes,
  isSearch,
  handleBack,
  placeholderRedactor,
  emptyTitle,
}) {
  const [notesTreeview, setNotesTreeview] = useState(notes);
  const [term, setTerm] = useState('');
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [contextMenuEvent, setContextMenuEvent] = useState(null);

  useEffect(() => {
    const newNotes = convertNotesToTree(notes);
    setNotesTreeview(newNotes);
  }, [notes]);
  const changeNode = () => {
    const currentNote = notes.find((el) => el.id === hoveredNodeId);
    setActiveNote(currentNote);
  };
  const handleContextMenu = (event) => {
    setIsShowMenu(true);
    setContextMenuEvent({ event });
  };

  return (
    <div className={classes.container}>
      {!activeNote || !Object.keys(activeNote)?.length ? (
        <>
          {isSearch && (
            <div className={classes.search.container}>
              <input
                className={classes.search.input}
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder={'Search'}
              />
              {term && (
                <div className={classes.search.close} onClick={() => setTerm('')}>
                  {icons.close}
                </div>
              )}
            </div>
          )}
          <TreeView
            term={term}
            selection={noteId}
            handleDeleteNode={handleRemoveNode}
            classes={classes.treeView}
            data={notesTreeview}
            setSelectedNodeId={setNoteId}
            selectedNodeId={selectedNodeId}
            treeWidth={'w-full'}
            icons={icons}
            handleOnClick={changeNode}
            handleContextMenu={handleContextMenu}
            hoveredNodeId={hoveredNodeId}
            setHoveredNodeId={setHoveredNodeId}
            getCurrentNodeProps={setCurrentNodeProps}
            handleRenameNode={handleRenameNode}
            handleDragDrop={handleDragDrop}
            openByDefault={false}
          />
          <ContextMenu
            setIsVisible={setIsShowMenu}
            isVisible={isShowMenu}
            nodeProps={currentNodeProps}
            menuItems={menuItems.contextMenu}
            clickMenuEvent={contextMenuEvent}
            classes={{
              menuItem: menuItems.item.className,
              menuContainer: menuItems.container.className,
              emptyMenu: 'p-2.5 cursor-pointer text-gray-300',
            }}
          />
        </>
      ) : (
        <>
          <div
            className={classes.back}
            onClick={() => {
              saveNote();
              setActiveNote(null);
              setIsShowMenu(false);
              handleBack();
            }}
          >
            {icons.left}
          </div>
          <Redactor
            classes={classes.redactor}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
            placeholder={placeholderRedactor}
            emptyTitle={emptyTitle}
            isSelectableTitle
          />
        </>
      )}
    </div>
  );
}

NoteEditor.defaultProps = {
  activeNote: null,
  setActiveNote: () => {},
  notes: [],
  selectedNodeId: null,
  handleDragDrop: () => {},
  setCurrentNodeProps: () => {},
  currentNodeProps: {},
  // handleRenameNode: () => {},
  saveNote: () => {},
  handleRemoveNode: () => {},
  icons: {},
  noteId: null,
  setNoteId: () => {},
  menuItems: {},
  isSearch: false,
  handleBack: () => {},
  classes: {},
  placeholderRedactor: 'Text new note',
  emptyTitle: 'Empty title',
};

NoteEditor.propTypes = {
  // The active note object.
  activeNote: PropTypes.object,
  // Function to set the active note.
  setActiveNote: PropTypes.func,
  // Array of notes.
  notes: PropTypes.array,
  // The ID of the selected node.
  selectedNodeId: PropTypes.number,
  // Function to handle drag and drop events.
  handleDragDrop: PropTypes.func,
  // Function to set the current node properties.
  setCurrentNodeProps: PropTypes.func,
  // The current node's properties object.
  currentNodeProps: PropTypes.object,
  // Function to handle renaming a node.
  handleRenameNode: PropTypes.func,
  // Function to save a note.
  saveNote: PropTypes.func,
  // Function to handle removing a node.
  handleRemoveNode: PropTypes.func,
  // Object containing icons.
  icons: PropTypes.object,
  // The ID of the note.
  noteId: PropTypes.string,
  // Function to set the note ID.
  setNoteId: PropTypes.func,
  // Array of menu items.
  menuItems: PropTypes.object,
  classes: PropTypes.shape({
    redactor: PropTypes.shape({
      title: PropTypes.string,
      redactor: PropTypes.string,
    }),
    treeView: PropTypes.shape({
      nodeWrapper: PropTypes.string,
      nodeTextBlock: PropTypes.string,
    }),
    search: PropTypes.shape({
      input: PropTypes.string,
      container: PropTypes.string,
    }),
  }),
  // Placeholder text for the redactor input.
  placeholderRedactor: PropTypes.string,
  // Text to display when the title is empty.
  emptyTitle: PropTypes.string,
  // Indicates if the component is in search mode.
  isSearch: PropTypes.bool,
  // Function to handle navigating back.
  handleBack: PropTypes.func,
};

export default NoteEditor;
