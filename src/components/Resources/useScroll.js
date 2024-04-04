import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function useScroll({
  toolName,
  isLoading,
  idPrefix,
  startScrollVerse,
  startHighlightIds,
  scrollTopOffset,
}) {
  const [currentScrollVerse, setCurrentScrollVerse] = useState(startScrollVerse);
  const [highlightIds, setHighlightIds] = useState(startHighlightIds);

  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById(idPrefix + currentScrollVerse);
      const container = document.getElementById('container_' + toolName);
      if (element && container) {
        container.scrollBy({
          top:
            element.getBoundingClientRect().top -
            container.getBoundingClientRect().top -
            scrollTopOffset,
        });
      }
    }, 100);
  }, [currentScrollVerse, isLoading]);

  const handleSaveScroll = (verse, id) => {
    if (id) {
      setHighlightIds((prev) => ({ ...prev, [toolName]: 'id' + id }));
    }
    setCurrentScrollVerse(verse);
  };

  return {
    highlightId: highlightIds[toolName],
    currentScrollVerse,
    handleSaveScroll,
  };
}

useScroll.propTypes = {
  // The name of the tool using this hook.
  toolName: PropTypes.string,
  // Indicates whether the content is still loading or not.
  isLoading: PropTypes.bool,
  // A string to prefix the verse id when looking up the scroll target.
  idPrefix: PropTypes.string.isRequired,
  // The verse to initially scroll to.
  startScrollVerse: PropTypes.string,
  // Object with tool names and their corresponding highlight ids.
  startHighlightIds: PropTypes.object,
  // The number of pixels to offset the scroll from the top of the container.
  scrollTopOffset: PropTypes.number,
};

useScroll.defaultProps = {
  toolName: 'default',
  isLoading: false,
  idPrefix: 'id',
  startScrollVerse: '1',
  startHighlightIds: {},
  scrollTopOffset: 20,
};
export default useScroll;
