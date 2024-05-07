### NotesEditor allows work with the user's notes.

### Minimal demo

```jsx
import React, { useState } from 'react';

function Component() {
  const stepConfig = {
    title: 'First step',
    config: [
      {
        size: 2,
        tools: [
          {
            name: 'literal',
            config: {},
          },
          {
            name: 'simplified',
            config: {},
          },
          {
            name: 'info',
            config: {},
          },
        ],
      },
      {
        size: 2,
        tools: [
          {
            name: 'tNotes',
            config: {},
          },
          {
            name: 'tWords',
            config: {},
          },
        ],
      },
      {
        size: 2,
        tools: [
          {
            name: 'personalNotes',
            config: {},
          },
          {
            name: 'teamNotes',
            config: {},
          },
          {
            name: 'dictionary',
            config: {},
          },
        ],
      },
    ],
  };

  return <Workspace stepConfig={stepConfig} />;
}
<Component />;
```
