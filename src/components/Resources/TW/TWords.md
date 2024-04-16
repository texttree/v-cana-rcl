### TW

```jsx
import React, { useState } from 'react';
import { TWords } from '@texttree/v-cana-rcl';
import { twords } from '../../../../mocks/resources/parsed/tw.js';
import { icons } from '../../../../mocks/notesEditor.js';
function Component() {
  const [currentScrollVerse, setCurrentScrollVerse] = useState('1');

  return (
    <div className="h-64 overflow-y-scroll" id="container_twords">
      <TWords
        twords={twords}
        classes={{
          main: 'relative h-full',
          content: {
            container:
              'absolute top-0 bottom-0 pr-2 bg-white overflow-auto left-0 right-0',
            header: 'sticky flex top-0 pb-4 bg-white',
            backButton:
              'w-fit h-fit p-1 mr-2.5 cursor-pointer hover:opacity-70 rounded-full bg-gray-100',
            title: 'font-bold text-xl mt-1',
          },
          list: {
            verseNumber: '',
            container:
              'divide-y divide-th-text-primary divide-dashed h-full overflow-auto',
            verseBlock: 'pl-7 flex-1',
            currentWord: 'bg-th-secondary-100',
            word: 'p-2 cursor-pointer rounded-lg hover:bg-th-secondary-100',
            verseWrapper: 'p-4 flex mx-4',
          },
        }}
        nodeContentBack={icons.left}
        handleClickWord={(word) => console.log(word)}
        currentScrollVerse={currentScrollVerse}
        setCurrentScrollVerse={setCurrentScrollVerse}
        toolId="twords"
        idContainerScroll="container_twords"
      />
    </div>
  );
}
<Component />;
```
