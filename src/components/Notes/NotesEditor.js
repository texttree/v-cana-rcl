import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redactor, TreeView, ContextMenu } from '@texttree/notepad-rcl';
import { convertNotesToTree } from '../../utils/helper';

const NotesEditor = ({
  activeNote,
  notes,
  currentNodeProps,
  selectedNodeId,
  handleDragDrop,
  setActiveNote,
  setCurrentNodeProps,
  handleRenameNode,
  handleSaveNote,
  handleRemoveNode,
  icons,
  setSelectedNodeId,
  menuItems,
  isSearch,
  classes,
  placeholderRedactor,
  style,
  isContextMenu,
  handleBack,
  placeholderSearch,
  emptyTitle,
}) => {
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
                placeholder={placeholderSearch}
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
            style={style}
            selection={selectedNodeId}
            handleDeleteNode={handleRemoveNode}
            classes={classes.treeView}
            data={notesTreeview}
            setSelectedNodeId={setSelectedNodeId}
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
          {isContextMenu && (
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
          )}
        </>
      ) : (
        <>
          <div
            className={classes.back}
            onClick={() => {
              handleSaveNote();
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
};
export default NotesEditor;

NotesEditor.defaultProps = {
  activeNote: null,
  notes: [],
  currentNodeProps: {},
  selectedNodeId: null,
  handleDragDrop: null,
  setActiveNote: () => {},
  setCurrentNodeProps: () => {},
  handleRenameNode: () => {},
  handleSaveNote: () => {},
  handleRemoveNode: () => {},
  icons: {},
  setSelectedNodeId: () => {},
  menuItems: {},
  isSearch: false,
  classes: {},
  placeholderRedactor: 'Text new note',
  style: {},
  isContextMenu: false,
  handleBack: () => {},
  placeholderSearch: 'Search',
  emptyTitle: 'Empty title',
};

NotesEditor.propTypes = {
  // The active note object.
  activeNote: PropTypes.object,
  // Array of notes.
  notes: PropTypes.array,
  // The current node's properties object.
  currentNodeProps: PropTypes.object,
  // The ID of the selected node.
  selectedNodeId: PropTypes.number,
  // Function to handle drag and drop events.
  handleDragDrop: PropTypes.func,
  // Function to set the active note.
  setActiveNote: PropTypes.func,
  // Function to set the current node properties.
  setCurrentNodeProps: PropTypes.func,
  // Function to handle renaming a node.
  handleRenameNode: PropTypes.func,
  // Function to save a note.
  handleSaveNote: PropTypes.func,
  // Function to handle removing a node.
  handleRemoveNode: PropTypes.func,
  // Object containing icons.
  icons: PropTypes.object,
  // The ID of the note.
  selectedNodeId: PropTypes.string,
  // Function to set the selected node ID.
  setSelectedNodeId: PropTypes.func,
  // Array of menu items.
  menuItems: PropTypes.object,
  // An object containing CSS classes for different components.
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
  // Custom styles for the component.
  style: PropTypes.object,
  // Indicates if the component is in a context menu.
  isContextMenu: PropTypes.bool,
  // Function to handle navigating back.
  handleBack: PropTypes.func,
  // Placeholder text for the search input.
  placeholderSearch: PropTypes.string,
  // Text to display when the title is empty.
  emptyTitle: PropTypes.string,
  // Indicates if the component is in search mode.
  isSearch: PropTypes.bool,
};
