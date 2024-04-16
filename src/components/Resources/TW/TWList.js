import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import useScroll from '../useScroll';

function TWList({
  setWord,
  words,
  toolId,
  isLoading,
  scrollTopOffset,
  startHighlightIds,
  currentScrollVerse,
  setCurrentScrollVerse,
  classes,
  handleClick,
  idContainerScroll,
  filter,
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
    if (words) {
      setVerses(Object.entries(words));
    }
  }, [words]);
  return (
    <>
      {verses.map(([verseNumber, words], index) => {
        return (
          <div
            key={index}
            className={classes.verseWrapper}
            id={idVersePrefix + verseNumber}
          >
            <div className={classes.verseNumber}>{verseNumber}</div>
            <div className={classes.verseBlock}>
              <ul>
                {words?.map((word, index) => {
                  let itemFilter;
                  switch (filter) {
                    case 'disabled':
                      itemFilter = false;
                      break;
                    case 'verse':
                      itemFilter = word.isRepeatedInVerse;
                      break;
                    case 'book':
                      itemFilter = word.isRepeatedInBook;
                      break;
                    default:
                      break;
                  }
                  return (
                    <li
                      key={word.id}
                      id={idVersePrefix + word.id}
                      className={`${classes.word} ${
                        highlightId === 'id' + word.id ? classes.currentNote : ''
                      } ${itemFilter ? classes.filtered : ''}`}
                      onClick={() => {
                        handleSaveScroll(parseInt(verseNumber), word.id);
                        setWord({ text: word.text, title: word.title });
                        handleClick(word);
                      }}
                    >
                      <ReactMarkdown>{word.title}</ReactMarkdown>
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

TWList.propTypes = {
  // The verse to start scrolling to
  currentScrollVerse: PropTypes.string,
  // Function to set the current verse
  setCurrentScrollVerse: PropTypes.func,
  // Function to set the item
  setWord: PropTypes.func,
  // Object containing words
  words: PropTypes.object,
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
    currentNote: PropTypes.string, // Styles for the current word
    word: PropTypes.string, // Styles for the note
    filtered: PropTypes.string, // Styles for the filtered word
  }),
  // Function to handle click events
  handleClick: PropTypes.func,
  // The id of the container
  idContainerScroll: PropTypes.string,
  // The filter for the list
  filter: PropTypes.string,
};

TWList.defaultProps = {
  currentScrollVerse: '0',
  setCurrentScrollVerse: () => {},
  words: {},
  toolId: 'tn',
  isLoading: false,
  scrollTopOffset: 20,
  startHighlightIds: {},
  classes: {},
  handleClick: () => {},
  idContainerScroll: 'container-tn',
  filter: 'disabled',
};

export default TWList;
