### TNList

```jsx
import React from 'react';
import { TNList } from '@texttree/v-cana-rcl';
import { tnotes } from '../../../../mocks/resources/parsed/tn.js';
function Component() {
  return (
    <div className="h-64 overflow-y-auto white">
      <TNList
        notes={tnotes}
        classes={{
          verseWrapper: 'flex gap-4 border-b-2 border-gray-500 cursor-pointer',
        }}
        handleClick={(note) => alert(JSON.stringify(note))}
      />
    </div>
  );
}
<Component />;
```

### Scroll example

```jsx
import React from 'react';
import { TNList } from '@texttree/v-cana-rcl';
import { tnotes } from '../../../../mocks/resources/parsed/tn.js';
function Component() {
  return (
    <div className="h-64 overflow-y-auto" id="container_tnlist">
      <TNList
        notes={tnotes}
        classes={{
          verseWrapper: 'flex gap-4 border-b-2 border-gray-500',
          currentNote: 'bg-blue-300 rounded-md',
          note: 'p-1',
        }}
        toolId="tnlist"
        startHighlightIds={{ tnlist: 'idtn97' }}
      />
    </div>
  );
}
<Component />;
```
