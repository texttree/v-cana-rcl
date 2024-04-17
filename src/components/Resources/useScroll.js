import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { checkLSVal } from '../../utils/helper';

function useScroll({
  toolId,
  isLoading,
  idVersePrefix,
  idContainerScroll,
  keyLocalStorageSave,
  scrollTopOffset,
  currentScrollVerse,
  setCurrentScrollVerse,
  delayScroll,
}) {
  const [highlightIds, setHighlightIds] = useState(() => {
    return checkLSVal(keyLocalStorageSave, {}, 'object');
  });
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
    }, delayScroll);
  }, [currentScrollVerse, isLoading]);

  const handleSaveScroll = (verse, id) => {
    if (id) {
      localStorage.setItem(
        keyLocalStorageSave,
        JSON.stringify({ ...highlightIds, [toolId]: 'id' + id })
      );
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
  currentScrollVerse: PropTypes.string,
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
  // The number of pixels to offset the scroll from the top of the container.
  scrollTopOffset: PropTypes.number,
  // The number of milliseconds to delay the scroll.
  delayScroll: PropTypes.number,
  // The key used to save the highlight ids in localStorage.
  keyLocalStorageSave: PropTypes.string,
};

useScroll.defaultProps = {
  currentScrollVerse: '0',
  setCurrentScrollVerse: () => {},
  toolId: 'toolId',
  isLoading: false,
  idVersePrefix: 'id',
  idContainerScroll: 'container-scroll',
  scrollTopOffset: 20,
  delayScroll: 300,
  keyLocalStorageSave: 'highlightIds',
};
export default useScroll;
