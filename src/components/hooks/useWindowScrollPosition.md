### If you need to set the database name, you can use the dBNameRegistration method

```jsx
import React from 'react';
import { useWindowScrollPosition } from '@texttree/template-rcl';

const position = useWindowScrollPosition();

<>{JSON.stringify(position, null, 2)}</>;
```
