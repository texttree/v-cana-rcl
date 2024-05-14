import React from 'react';
import PropTypes from 'prop-types';
import Markdown from '../../Markdown/Markdown';
function TNContent({
  setNote = () => {},
  note = null,
  classes = {
    container: '',
    header: '',
    backButton: '',
    title: '',
    text: '',
  },
  nodeBack = <span>←</span>,
}) {
  return (
    <div className={`${classes.container} ${note ? '' : 'hidden'}`}>
      <div className={classes.header}>
        <button className={classes.backButton} onClick={() => setNote(null)}>
          {nodeBack}
        </button>
        {!['intro', 'front'].includes(note?.title) && (
          <Markdown className={classes.title}>{note?.title}</Markdown>
        )}
      </div>
      <Markdown className={`${classes.text} markdown-body`}>{note?.text}</Markdown>
    </div>
  );
}
TNContent.propTypes = {
  // Function to set the note
  setNote: PropTypes.func,
  // The note
  note: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  // Styles for different parts of the component
  classes: PropTypes.shape({
    container: PropTypes.string, // Styles for the container
    header: PropTypes.string, // Styles for the header
    backButton: PropTypes.string, // Styles for the back button
    title: PropTypes.string, // Styles for the title
    text: PropTypes.string, // Styles for the text
  }),
  // The element to be displayed as the "back" button
  nodeBack: PropTypes.element,
};

export default TNContent;
