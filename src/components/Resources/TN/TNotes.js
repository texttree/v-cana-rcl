import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TNList from './TNList';
import TNContent from './TNContent';

function TNotes({
  tnotes,
  isLoading,
  toolId,
  startHighlightIds,
  currentScrollVerse,
  setCurrentScrollVerse,
  scrollTopOffset,
  classes,
  nodeLoading,
  nodeContentBack,
  handleClickNote,
  idContainerScroll,
  delayScroll,
}) {
  const [note, setNote] = useState(null);
  return (
    <>
      {isLoading ? (
        nodeLoading
      ) : (
        <div className={classes.main}>
          {note ? (
            <TNContent
              setNote={setNote}
              note={note}
              classes={classes.content}
              nodeBack={nodeContentBack}
            />
          ) : (
            <TNList
              note={note}
              setNote={setNote}
              notes={tnotes}
              toolId={toolId}
              isLoading={isLoading}
              startHighlightIds={startHighlightIds}
              currentScrollVerse={currentScrollVerse}
              setCurrentScrollVerse={setCurrentScrollVerse}
              scrollTopOffset={scrollTopOffset}
              classes={classes.list}
              handleClick={handleClickNote}
              idContainerScroll={idContainerScroll}
              delayScroll={delayScroll}
            />
          )}
        </div>
      )}
    </>
  );
}
TNotes.propTypes = {
  // Object containing translation notes
  tnotes: PropTypes.object,
  // Boolean to indicate if the component is in a loading state
  isLoading: PropTypes.bool,
  // The tool id
  toolId: PropTypes.string,
  // Object containing ids to highlight
  startHighlightIds: PropTypes.object,
  // The verse to start scrolling to
  currentScrollVerse: PropTypes.string,
  // Function to set the current verse
  setCurrentScrollVerse: PropTypes.func,
  // The offset for scrolling to the top
  scrollTopOffset: PropTypes.number,
  // Styles for different parts of the component
  classes: PropTypes.shape({
    main: PropTypes.string,
    content: PropTypes.object,
    list: PropTypes.object,
  }),
  // The element to display when loading
  nodeLoading: PropTypes.element,
  // The element to display as the content back button
  nodeContentBack: PropTypes.element,
  // Function to handle item click
  handleClickNote: PropTypes.func,
  // The id of the container
  idContainerScroll: PropTypes.string,
  // The delay for the scroll
  delayScroll: PropTypes.number,
};
TNotes.defaultProps = {
  currentScrollVerse: '0',
  setCurrentScrollVerse: () => {},
  tnotes: {},
  isLoading: false,
  toolId: 'tn',
  startHighlightIds: {},
  scrollTopOffset: 20,
  classes: {},
  nodeLoading: <span>Loading...</span>,
  nodeContentBack: <span>←</span>,
  handleClickNote: () => {},
  idContainerScroll: 'container-tn',
  delayScroll: 300,
};
export default TNotes;
