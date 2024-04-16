### TQuestionsList

```jsx
import React, { useState } from 'react';
import { TQuestions } from '@texttree/v-cana-rcl';
import { tq } from '../../../../mocks/resources/parsed/tq.js';
import { icons } from '../../../../mocks/notesEditor.js';
function Component() {
  const [currentScrollVerse, setCurrentScrollVerse] = useState('1');
  return (
    <div className="h-64 overflow-y-auto white" id="container_tquestions">
      <TQuestions
        questionObjects={tq}
        toolId="tquestions"
        nodeOpen={icons.arrowDown}
        classes={{
          verseNumber: 'p-1',
          verseWrapper: 'flex gap-2 items-start',
          question: {
            button: 'flex p-1 gap-2 items-center',
            highlightButton: 'bg-gray-200 rounded-md',
          },
        }}
        idContainerScroll="container_tquestions"
        currentScrollVerse={currentScrollVerse}
        setCurrentScrollVerse={setCurrentScrollVerse}
        scrollTopOffset={50}
      />
    </div>
  );
}
<Component />;
```
