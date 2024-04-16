import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Markdown from '../../Markdown/Markdown';
import useScroll from '../useScroll';

function TNList({
  setNote,
  notes,
  toolId,
  isLoading,
  scrollTopOffset,
  startHighlightIds,
  currentScrollVerse,
  setCurrentScrollVerse,
  classes,
  handleClick,
  idContainerScroll,
}) {
  const [verses, setVerses] = useState([]);
  const idVersePrefix = 'id' + toolId;
  const { highlightId, handleSaveScroll } = useScroll({
    toolId,
    isLoading,
    idVersePrefix,
    startHighlightIds,
    currentScrollVerse,
    setCurrentScrollVerse,
    scrollTopOffset,
    idContainerScroll,
  });

  useEffect(() => {
    if (notes) {
      setVerses(Object.entries(notes));
    }
  }, [notes]);
  return (
    <>
      {verses.map(([verseNumber, notes], index) => {
        return (
          <div
            key={index}
            className={classes.verseWrapper}
            id={idVersePrefix + verseNumber}
          >
            <div className={classes.verseNumber}>{verseNumber}</div>
            <div className={classes.verseBlock}>
              <ul>
                {notes?.map((note) => {
                  return (
                    <li
                      key={note.ID}
                      id={idVersePrefix + note.ID}
                      className={`${classes.note} ${
                        highlightId === 'id' + note.ID ? classes.currentNote : ''
                      }`}
                      onClick={() => {
                        handleSaveScroll(parseInt(verseNumber), note.ID);
                        setNote({ text: note.Note, title: note.Quote });
                        handleClick(note);
                      }}
                    >
                      <Markdown>{note.Quote}</Markdown>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
}

TNList.propTypes = {
  // The verse to start scrolling to
  currentScrollVerse: PropTypes.string,
  // Function to set the current verse
  setCurrentScrollVerse: PropTypes.func,
  // Function to set the item
  setNote: PropTypes.func,
  // Object containing notes
  notes: PropTypes.object,
  // The tool id
  toolId: PropTypes.string,
  // Boolean to indicate if the component is in a loading state
  isLoading: PropTypes.bool,
  // The offset for scrolling to the top
  scrollTopOffset: PropTypes.number,
  // Object of ids to highlight
  startHighlightIds: PropTypes.object,
  // Styles for different parts of the component
  classes: PropTypes.shape({
    container: PropTypes.string, // Styles for the container
    verseWrapper: PropTypes.string, // Styles for the verse wrapper
    verseNumber: PropTypes.string, // Styles for the verse number
    verseBlock: PropTypes.string, // Styles for the verse block
    currentNote: PropTypes.string, // Styles for the current note
    note: PropTypes.string, // Styles for the note
  }),
  // Function to handle click events
  handleClick: PropTypes.func,
  // The id of the container
  idContainerScroll: PropTypes.string,
};

TNList.defaultProps = {
  currentScrollVerse: '0',
  setCurrentScrollVerse: () => {},
  notes: {},
  toolId: 'tn',
  isLoading: false,
  scrollTopOffset: 20,
  startHighlightIds: {},
  classes: {},
  handleClick: () => {},
  idContainerScroll: 'container-tn',
};

export default TNList;
