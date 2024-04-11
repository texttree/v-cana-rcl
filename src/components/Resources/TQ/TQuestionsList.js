import React from 'react';
import PropTypes from 'prop-types';
import useScroll from '../useScroll';
import TQuestion from './TQuestion';
function TQuestionsList({
  questionObjects,
  toolId,
  isLoading,
  startHighlightIds,
  startScrollVerse,
  scrollTopOffset,
  classes,
  handleClick,
  nodeOpen,
}) {
  const idVersePrefix = 'id' + toolId;
  const { highlightId, handleSaveScroll } = useScroll({
    toolId,
    isLoading,
    idVersePrefix,
    startHighlightIds,
    startScrollVerse,
    scrollTopOffset,
  });

  return (
    <>
      {questionObjects &&
        Object.keys(questionObjects)?.map((verseNumber) => {
          return (
            <div
              key={verseNumber}
              className={classes.verseWrapper}
              id={idVersePrefix + verseNumber}
            >
              <div className={classes.verseNumber}>{verseNumber}</div>
              <div className={classes.verseBlock}>
                <ul>
                  {questionObjects[verseNumber]?.map((questionObject) => {
                    return (
                      <li
                        key={questionObject.id}
                        id={idVersePrefix + questionObject.id}
                        onClick={() => {
                          handleSaveScroll(verseNumber, questionObject.id);
                          handleClick(questionObject);
                        }}
                        className={`${classes.questionWrapper} ${
                          highlightId === 'id' + questionObject.ID
                            ? classes.currentQuestion
                            : ''
                        }`}
                      >
                        <TQuestion
                          questionObject={questionObject}
                          highlightId={highlightId}
                          nodeOpen={nodeOpen}
                          classes={classes.question}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
    </>
  );
}

TQuestionsList.propTypes = {
  // Objects of questions
  questionObjects: PropTypes.object,
  // The tool id
  toolId: PropTypes.string,
  // Boolean to indicate if the component is in a loading state
  isLoading: PropTypes.bool,
  // The offset for scrolling to the top
  scrollTopOffset: PropTypes.number,
  // Object of ids to highlight
  startHighlightIds: PropTypes.object,
  // The verse to start scrolling to
  startScrollVerse: PropTypes.string,
  // Styles for different parts of the component
  classes: PropTypes.shape({
    verseWrapper: PropTypes.string, // Styles for the verse wrapper
    verseNumber: PropTypes.string, // Styles for the verse number
    verseBlock: PropTypes.string, // Styles for the verse block
    currentQuestion: PropTypes.string, // Styles for the current question
    questionWrapper: PropTypes.string, // Styles for the question wrapper,
    question: PropTypes.string, // Styles for the question
  }),
  // Function to handle click events
  handleClick: PropTypes.func,
  // Element to display when node is down
  nodeOpen: PropTypes.element,
};

TQuestionsList.defaultProps = {
  setItem: () => {},
  notes: {},
  toolId: 'tn',
  isLoading: false,
  scrollTopOffset: 20,
  startHighlightIds: {},
  startScrollVerse: '1',
  classes: {},
  handleClick: () => {},
  nodeOpen: <span>Open</span>,
};
export default TQuestionsList;
