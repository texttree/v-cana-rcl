### Question

```jsx
import React from 'react';
import { TQuestion } from '@texttree/v-cana-rcl';
import { tq } from '../../../../mocks/resources/parsed/tq.js';
function Component() {
  return (
    <div className="h-24 overflow-y-auto white">
      <TQuestion
        questionObject={tq[1][0]}
        classes={{
          button: 'flex questions-center w-full p-2 text-left gap-2 justify-between',
          content: 'w-fit py-4 text-th-text-primary ml-2',
        }}
      />
    </div>
  );
}
<Component />;
```
