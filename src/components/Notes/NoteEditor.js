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
  saveNote = () => {},
  handleRemoveNode = () => {},
  icons,
  noteId,
  setNoteId,
  menuItems,
  classes,
  isSearch = false,
  handleBack,
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
            placeholder={'TextNewNote'}
            emptyTitle={'EmptyTitle'}
            isSelectableTitle
          />
        </>
      )}
    </div>
  );
}

NoteEditor.defaultProps = {
  classes: {
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
  },
};

NoteEditor.propTypes = {
  /** Event by clicking on the button. */
  onClick: PropTypes.func,
  /** Event by clicking on the button. */
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
};

export default NoteEditor;
