import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
function TNContent({ setNote, note, classes, nodeBack }) {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <button className={classes.backButton} onClick={() => setNote(null)}>
          {nodeBack}
        </button>
        {!['intro', 'front'].includes(note?.title) && (
          <ReactMarkdown className={classes.title}>{note?.title}</ReactMarkdown>
        )}
      </div>
      <ReactMarkdown className={classes.text}>{note?.text}</ReactMarkdown>
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

TNContent.defaultProps = {
  setNote: () => {},
  note: null,
  classes: {
    container: '',
    header: '',
    backButton: '',
    title: '',
    text: '',
  },
  nodeBack: <span>←</span>,
};
export default TNContent;
