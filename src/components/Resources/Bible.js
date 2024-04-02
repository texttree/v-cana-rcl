import React from 'react';
import PropTypes from 'prop-types';
import Verse from './Verse';
import { useScroll } from './useScroll';

function Bible({
  verseObjects = [],
  isLoading = false,
  isDraft = false,
  classes = {},
  toolName = 'default',
  startHighlightIds = {},
  startScrollVerse = '1',
  hiddenVerses = [],
  nodeLoading = <div>Loading...</div>,
}) {
  const { handleSaveScroll, currentScrollVerse } = useScroll({
    toolName,
    idPrefix: toolName,
    isLoading,
    startHighlightIds,
    startScrollVerse,
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
            toolName={toolName}
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
  // An array of objects representing verses with verse and text properties
  verseObjects: PropTypes.array,
  // A boolean indicating if the content is still loading
  isLoading: PropTypes.bool,
  // A boolean indicating if the text is a draft
  isDraft: PropTypes.bool,
  // An object containing CSS classes for the component
  classes: PropTypes.object,
  // A string representing the name of the tool using this component
  toolName: PropTypes.string,
  // An object containing tool names and their corresponding highlight ids
  startHighlightIds: PropTypes.object,
  // A string representing the verse to initially scroll to
  startScrollVerse: PropTypes.string,
  // An array of strings representing hidden verses
  hiddenVerses: PropTypes.array,
  // A React node to render when the content is still loading
  nodeLoading: PropTypes.node,
};

Bible.defaultProps = {
  verseObjects: [],
  isLoading: false,
  isDraft: false,
  classes: {},
  toolName: 'default',
  startHighlightIds: {},
  startScrollVerse: '1',
  hiddenVerses: [],
  nodeLoading: <div>Loading...</div>,
};
export default Bible;
