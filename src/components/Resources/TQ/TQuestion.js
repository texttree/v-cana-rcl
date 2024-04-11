import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Disclosure } from '@headlessui/react';

function TQuestion({ questionObject, highlightId, nodeOpen, classes }) {
  return (
    <Disclosure>
      <Disclosure.Button
        className={`${classes?.button ?? ''} ${
          highlightId === 'id' + questionObject.id ? classes?.highlightButton ?? '' : ''
        }`}
      >
        <ReactMarkdown className={classes?.title ?? ''}>
          {questionObject.question}
        </ReactMarkdown>
        {nodeOpen}
      </Disclosure.Button>
      <Disclosure.Panel className={classes?.content ?? ''}>
        {questionObject.answer}
      </Disclosure.Panel>
    </Disclosure>
  );
}

TQuestion.proptypes = {
  // Object representing an item with id, question, and answer
  item: PropTypes.shape({
    id: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
  }),
  // ID to highlight
  highlightId: PropTypes.string,
  // Element to display when node is down
  nodeOpen: PropTypes.element,
  // Styles for the button and content
  classes: PropTypes.shape({
    button: PropTypes.string, // Styles for the button
    highlightButton: PropTypes.string, // Styles for the button when highlighted
    content: PropTypes.string, // Styles for the content
    title: PropTypes.string, // Styles for the title
  }),
};

TQuestion.defaultProps = {
  item: {
    id: '',
    question: '',
    answer: '',
  },
  highlightId: '',
  nodeOpen: <span>Open</span>,
  classes: {},
};

export default TQuestion;
