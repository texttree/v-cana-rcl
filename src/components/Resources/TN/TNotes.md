### TN

```jsx
import React from 'react';
import { TNotes } from '@texttree/v-cana-rcl';
import { tnotes } from '../../../../mocks/resources/parsed/tn.js';
import { icons } from '../../../../mocks/notesEditor.js';
function Component() {
  return (
    <div className="h-64 overflow-y-scroll white">
      <TNotes
        tnotes={tnotes}
        classes={{
          list: {
            verseNumber: '',
            container:
              'divide-y divide-th-text-primary divide-dashed h-full overflow-auto',
            verseBlock: 'pl-7 flex-1',
            currentNote: 'bg-th-secondary-100',
            note: 'p-2 cursor-pointer rounded-lg hover:bg-th-secondary-100',
            verseWrapper: 'p-4 flex mx-4',
          },
        }}
        nodeContentBack={icons.left}
      />
    </div>
  );
}
<Component />;
```
