### Question

```jsx
import React from 'react';
import { Question } from '@texttree/v-cana-rcl';
import { tq } from '../../../../mocks/resources/parsed/tq.js';
function Component() {
  return (
    <div className="h-24 overflow-y-auto white">
      <Question item={tq[1][0]} />
    </div>
  );
}
<Component />;
```
