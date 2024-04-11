### TQuestionsList

```jsx
import React from 'react';
import { TQuestionsList } from '@texttree/v-cana-rcl';
import { tq } from '../../../../mocks/resources/parsed/tq.js';
import { icons } from '../../../../mocks/notesEditor.js';
function Component() {
  return (
    <div className="h-64 overflow-y-auto white" id="container_tquestionlist">
      <TQuestionsList
        questionObjects={tq}
        toolId="tquestionlist"
        nodeOpen={icons.arrowDown}
        classes={{
          verseNumber: 'p-1',
          verseWrapper: 'flex gap-2 items-start',
          question: {
            button: 'flex p-1 gap-2 items-center',
            highlightButton: 'bg-gray-200 rounded-md',
          },
        }}
      />
    </div>
  );
}
<Component />;
```
