import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TWList from './TWList';
import TNContent from '../TN/TNContent';

function TWords({
  twords,
  isLoading,
  toolId,
  startHighlightIds,
  currentScrollVerse,
  setCurrentScrollVerse,
  scrollTopOffset,
  classes,
  nodeLoading,
  nodeContentBack,
  handleClickWord,
  idContainerScroll,
  filter,
}) {
  const [word, setWord] = useState(null);
  return (
    <>
      {isLoading ? (
        nodeLoading
      ) : (
        <div className={classes.main}>
          {word ? (
            <TNContent
              setNote={setWord}
              note={word}
              classes={classes.content}
              nodeBack={nodeContentBack}
            />
          ) : (
            <TWList
              setWord={setWord}
              words={twords}
              toolId={toolId}
              isLoading={isLoading}
              startHighlightIds={startHighlightIds}
              currentScrollVerse={currentScrollVerse}
              setCurrentScrollVerse={setCurrentScrollVerse}
              scrollTopOffset={scrollTopOffset}
              classes={classes.list}
              handleClick={handleClickWord}
              idContainerScroll={idContainerScroll}
              filter={filter}
            />
          )}
        </div>
      )}
    </>
  );
}
TWords.propTypes = {
  // Object containing translation words
  twords: PropTypes.object,
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
  handleClickWord: PropTypes.func,
  // The id of the container
  idContainerScroll: PropTypes.string,
  // The filter for the list
  filter: PropTypes.string,
};
TWords.defaultProps = {
  currentScrollVerse: '0',
  setCurrentScrollVerse: () => {},
  twords: {},
  isLoading: false,
  toolId: 'tn',
  startHighlightIds: {},
  scrollTopOffset: 20,
  classes: {},
  nodeLoading: <span>Loading...</span>,
  nodeContentBack: <span>←</span>,
  handleClickWord: () => {},
  idContainerScroll: 'container-tn',
  filter: 'disabled',
};
export default TWords;
