import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function useScroll({
  toolId,
  isLoading,
  idVersePrefix,
  idContainerScroll,
  startHighlightIds,
  scrollTopOffset,
  currentScrollVerse,
  setCurrentScrollVerse,
}) {
  const [highlightIds, setHighlightIds] = useState(startHighlightIds);
  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById(idVersePrefix + currentScrollVerse);
      const container = document.getElementById(idContainerScroll);
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
      setHighlightIds((prev) => ({ ...prev, [toolId]: 'id' + id }));
    }
    setCurrentScrollVerse(verse);
  };
  return {
    highlightId: highlightIds[toolId],
    handleSaveScroll,
  };
}

useScroll.propTypes = {
  // The current verse being scrolled to.
  currentScrollVerse: PropTypes.number,
  // Function to set the current verse.
  setCurrentScrollVerse: PropTypes.func,
  // The name of the tool using this hook.
  toolId: PropTypes.string,
  // Indicates whether the content is still loading or not.
  isLoading: PropTypes.bool,
  // A string to prefix the verse id when looking up the scroll target.
  idVersePrefix: PropTypes.string.isRequired,
  // The id of the container to scroll to.
  idContainerScroll: PropTypes.string,

  // Object with tool names and their corresponding highlight ids.
  startHighlightIds: PropTypes.object,
  // The number of pixels to offset the scroll from the top of the container.
  scrollTopOffset: PropTypes.number,
};

useScroll.defaultProps = {
  currentScrollVerse: 0,
  setCurrentScrollVerse: () => {},
  toolId: 'toolId',
  isLoading: false,
  idVersePrefix: 'id',
  idContainerScroll: 'container-scroll',
  startHighlightIds: {},
  scrollTopOffset: 20,
};
export default useScroll;