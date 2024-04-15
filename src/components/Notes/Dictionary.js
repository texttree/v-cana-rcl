import { ListOfNotes, Redactor } from '@texttree/notepad-rcl/dist/components';
import React from 'react';

function Dictionary({
  words = [],
  setWordId,
  isRtl,
  nodeButtonDelete = <span>Delete</span>,
  activeWord,
  setActiveWord,
  removeWord,
  isShowDelBtn,
  classes = {},
  nomatchesNode = <span>No matches</span>,
  handleClickBack = () => {},
  placeholderRedactor = 'Text new word',
  readOnly = false,
  icons = { left: <span>Back</span> },
}) {
  return (
    <>
      {!activeWord ? (
        <>
          {words.length ? (
            <div className={classes.container}>
              <ListOfNotes
                notes={words}
                removeNote={(e) => {
                  removeWord(e);
                }}
                setNoteId={setWordId}
                classes={classes.wordlist}
                isShowDelBtn={isShowDelBtn}
                delBtnChildren={nodeButtonDelete}
                isRtl={isRtl}
              />
            </div>
          ) : (
            <>{nomatchesNode}</>
          )}
        </>
      ) : (
        <>
          <button
            className={classes.buttonBack}
            onClick={() => {
              handleClickBack();
            }}
          >
            {icons.left}
          </button>
          <Redactor
            classes={classes.redactor}
            activeNote={activeWord}
            setActiveNote={setActiveWord}
            readOnly={readOnly}
            placeholder={placeholderRedactor}
            isSelectableTitle
            isRtl={isRtl}
          />
        </>
      )}
    </>
  );
}

export default Dictionary;
