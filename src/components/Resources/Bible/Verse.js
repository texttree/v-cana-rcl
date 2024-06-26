import React from 'react';
import PropTypes from 'prop-types';

import ReactMarkdown from 'react-markdown';
function Verse({
  verseObject,
  currentScrollVerse = '0',
  classes = {},
  isDraft = false,
  hiddenVerses = [],
  handleSaveScroll = () => {},
  toolId = 'default',
}) {
  const { verse, text } = verseObject;
  const hiddenCurrent = hiddenVerses.includes(verse);
  const verseClassName = `${
    'id' + currentScrollVerse === 'id' + verse ? classes.currentVerse : ''
  } ${classes.verse}`;
  return (
    <div
      id={toolId + verse}
      className={verseClassName}
      onClick={() => {
        handleSaveScroll(String(verse));
      }}
    >
      <div className={classes.numVerse}>{parseInt(verse)}</div>
      {isDraft && hiddenCurrent ? (
        <div className={classes.hideVerse}>{text}</div>
      ) : (
        <ReactMarkdown>{text}</ReactMarkdown>
      )}
    </div>
  );
}

Verse.propTypes = {
  // The object representing a verse, with `verse` and `text` properties.
  verseObject: PropTypes.shape({
    verse: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  // The currently scrolled verse.
  currentScrollVerse: PropTypes.string,
  // CSS classes for the component.
  classes: PropTypes.object,
  // The name of the tool using this component.
  toolId: PropTypes.string,
  // The function to handle save scroll event.
  handleSaveScroll: PropTypes.func,
  // Indicates whether the text is a draft.
  isDraft: PropTypes.bool,
  // An array of hidden verses.
  hiddenVerses: PropTypes.arrayOf(PropTypes.string),
};

export default Verse;
