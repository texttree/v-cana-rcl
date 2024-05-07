### Scroll to current verse and highliting

```jsx
import React, { useState } from 'react';
import { Bible } from '@texttree/v-cana-rcl';
import { twords } from '../../../mocks/resources/parsed/tw.js';
function Component() {
  return <Markdown>{twords[0].text}</Markdown>;
}
<Component />;
```
