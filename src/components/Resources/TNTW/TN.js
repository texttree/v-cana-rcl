import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TNList from './TNList';
import TNContent from './TNContent';

function TN({
  tnotes,
  isLoading,
  toolId,
  startHighlightIds,
  startScrollVerse,
  scrollTopOffset,
  classes,
  nodeLoading,
  nodeContentBack,
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
              setItem={setNote}
              notes={tnotes}
              toolId={toolId}
              isLoading={isLoading || tnotes}
              startHighlightIds={startHighlightIds}
              startScrollVerse={startScrollVerse}
              scrollTopOffset={scrollTopOffset}
              classes={classes.list}
            />
          )}
        </div>
      )}
    </>
  );
}
TNList.propTypes = {
  // Object containing translation notes
  tnotes: PropTypes.object,
  // Boolean to indicate if the component is in a loading state
  isLoading: PropTypes.bool,
  // The tool id
  toolId: PropTypes.string,
  // Object containing ids to highlight
  startHighlightIds: PropTypes.object,
  // The verse to start scrolling to
  startScrollVerse: PropTypes.string,
  // The offset for scrolling to the top
  scrollTopOffset: PropTypes.number,
  // Styles for different parts of the component
  classes: PropTypes.shape,
  // The element to display when loading
  nodeLoading: PropTypes.element,
  // The element to display as the content back button
  nodeContentBack: PropTypes.element,
};
TNList.defaultProps = {
  tnotes: {},
  isLoading: false,
  toolId: 'tn',
  startHighlightIds: {},
  startScrollVerse: '0',
  scrollTopOffset: 20,
  classes: { main: '', content: '', list: '' },
  nodeLoading: <span>Loading...</span>,
  nodeContentBack: <span>←</span>,
};
export default TN;
