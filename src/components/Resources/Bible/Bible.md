### Bible

### Base example

```jsx
import React from 'react';
import { Bible } from '@texttree/v-cana-rcl';
import { literal } from '../../../../mocks/resources/parsed/literal.js';
function Component() {
  return (
    <div className="h-64 overflow-y-scroll white">
      <Bible
        verseObjects={literal[1]}
        classes={{
          verse: 'flex gap-2',
        }}
      />
    </div>
  );
}
<Component />;
```

### Scroll to current verse and highliting

```jsx
import React from 'react';
import { Bible } from '@texttree/v-cana-rcl';
import { literal } from '../../../../mocks/resources/parsed/literal.js';
function Component() {
  return (
    <div className="h-64 overflow-y-scroll" id="container_simplified">
      <Bible
        verseObjects={literal[1]}
        classes={{
          verse: 'flex',
          numVerse: 'mr-2',
          currentVerse: 'bg-gray-300 p-2 rounded-md',
        }}
        toolId="simplified"
      />
    </div>
  );
}
<Component />;
```

### Draft mode with with hiding verses

```jsx
import React from 'react';
import { Bible } from '@texttree/v-cana-rcl';
import { literal } from '../../../../mocks/resources/parsed/literal.js';
function Component() {
  return (
    <Bible
      verseObjects={literal[1]}
      classes={{
        verse: 'flex ml-2',
        hideVerse: 'bg-gray-300 text-gray-300 select-none rounded-md',
        numVerse: 'mr-2',
      }}
      hiddenVerses={['4', '10']}
      isDraft
    />
  );
}
<Component />;
```
