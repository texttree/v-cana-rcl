import React from 'react';
import PropTypes from 'prop-types';
import Verse from './Verse';
import useScroll from '../useScroll';

function Bible({
  verseObjects,
  isLoading,
  isDraft,
  classes,
  toolId,
  startHighlightIds,
  currentScrollVerse,
  setCurrentScrollVerse,
  hiddenVerses,
  nodeLoading,
  idContainerScroll,
}) {
  const { handleSaveScroll } = useScroll({
    toolId,
    idVersePrefix: toolId,
    isLoading,
    startHighlightIds,
    setCurrentScrollVerse,
    currentScrollVerse,
    scrollTopOffset: 100,
  });

  return (
    <>
      {isLoading ? (
        <>{nodeLoading}</>
      ) : (
        verseObjects?.map((verseObject) => (
          <Verse
            key={verseObject.verse}
            verseObject={verseObject}
            currentScrollVerse={currentScrollVerse}
            classes={classes}
            toolId={toolId}
            handleSaveScroll={handleSaveScroll}
            isDraft={isDraft}
            hiddenVerses={hiddenVerses}
          />
        ))
      )}
    </>
  );
}
Bible.propTypes = {
  // An object containing the verse and text of the verse
  currentScrollVerse: PropTypes.number,
  // Function to set the current verse
  setCurrentScrollVerse: PropTypes.func,
  // An array of objects representing verses with verse and text properties
  verseObjects: PropTypes.array,
  // A boolean indicating if the content is still loading
  isLoading: PropTypes.bool,
  // A boolean indicating if the text is a draft
  isDraft: PropTypes.bool,
  // An object containing CSS classes for the component
  classes: PropTypes.object,
  // A string representing the name of the tool using this component
  toolId: PropTypes.string,
  // An object containing tool names and their corresponding highlight ids
  startHighlightIds: PropTypes.object,
  // An array of strings representing hidden verses
  hiddenVerses: PropTypes.array,
  // A React node to render when the content is still loading
  nodeLoading: PropTypes.node,

  idContainerScroll: PropTypes.string,
};

Bible.defaultProps = {
  currentScrollVerse: 0,
  setCurrentScrollVerse: () => {},
  verseObjects: [],
  isLoading: false,
  isDraft: false,
  classes: {},
  toolId: 'default',
  startHighlightIds: {},
  hiddenVerses: [],
  nodeLoading: <div>Loading...</div>,
  idContainerScroll: 'container-scroll',
};
export default Bible;
