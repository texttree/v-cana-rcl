import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Disclosure } from '@headlessui/react';

function Question({
  item = { id: '', title: '', text: '' },
  highlightId = '',
  nodeDown = <span>Open</span>,
  classes = {
    button: 'flex items-center w-full p-2 text-left gap-2 justify-between',
    content: 'w-fit py-4 text-th-text-primary ml-2',
  },
}) {
  return (
    <Disclosure>
      <Disclosure.Button
        className={`${classes?.button ?? ''} ${
          highlightId === 'id' + item.id ? classes?.highlightButton ?? '' : ''
        }`}
      >
        <ReactMarkdown className={classes?.title ?? ''}>{item.title}</ReactMarkdown>
        {nodeDown}
      </Disclosure.Button>
      <Disclosure.Panel className={classes?.content ?? ''}>{item.text}</Disclosure.Panel>
    </Disclosure>
  );
}
export default Question;
