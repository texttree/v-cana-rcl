### TNContent

```jsx
import React, { useState } from 'react';
import { TNContent } from '@texttree/v-cana-rcl';
import { tnotes } from '../../../../mocks/resources/parsed/tn.js';
import { icons } from '../../../../mocks/notesEditor.js';

function Component() {
  const tnote = {
    text: 'If your language does not use this passive form, you could express the idea in active form or in another way that is natural in your language. Alternate translation: “of the people whom God has chosen”',
    title: 'of the chosen people of God',
  };
  const [note, setNote] = useState(tnote);

  return (
    <div className="flex items-center justify-center h-64 overflow-y-auto white">
      {note ? (
        <TNContent
          note={note}
          classes={{
            title: 'font-bold',
            text: 'italic text-gray-600',
          }}
          nodeBack={icons.left}
          setNote={setNote}
        />
      ) : (
        <button
          className="h-fit bg-gray-200 p-4 rounded-md"
          onClick={() => setNote(tnote)}
        >
          Click to reopen note
        </button>
      )}
    </div>
  );
}
<Component />;
```
