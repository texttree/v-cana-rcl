### TWList

```jsx
import React, { useState } from 'react';
import { TWList } from '@texttree/v-cana-rcl';
import { twords } from '../../../../mocks/resources/parsed/tw.js';
function Component() {
  const [word, setWord] = useState(null);

  return (
    <div className="h-64 overflow-y-auto">
      <TWList
        words={twords}
        classes={{
          verseWrapper: 'flex gap-4 border-b-2 border-gray-500',
          currentNote: 'bg-blue-300 rounded-md',
          note: 'p-1',
          filtered: 'text-gray-400',
        }}
        handleClick={(word) => alert(JSON.stringify(word))}
        setWord={setWord}
      />
    </div>
  );
}
<Component />;
```

### Scroll example

```jsx
import React, { useState } from 'react';
import { TWList } from '@texttree/v-cana-rcl';
import { twords } from '../../../../mocks/resources/parsed/tw.js';
function Component() {
  const [word, setWord] = useState(null);
  const [currentScrollVerse, setCurrentScrollVerse] = useState('3');

  return (
    <div className="h-64 overflow-y-auto" id="container_twlist">
      <TWList
        words={twords}
        classes={{
          verseWrapper: 'flex gap-4 border-b-2 border-gray-500',
          currentNote: 'bg-blue-300 rounded-md',
          note: 'p-1',
          filtered: 'text-gray-400',
        }}
        toolId="twlist"
        setWord={setWord}
        currentScrollVerse={currentScrollVerse}
        setCurrentScrollVerse={setCurrentScrollVerse}
        idContainerScroll="container_twlist"
        filter="book"
      />
    </div>
  );
}
<Component />;
```
