### Base Example

```jsx
import { useState, useEffect } from 'react';
import { Dictionary } from '@texttree/v-cana-rcl';
import { words } from '../../../mocks/notesEditor.js';

function Component() {
  const [wordId, setWordId] = useState(null);
  const [activeWord, setActiveWord] = useState(null);

  useEffect(() => {
    if (!wordId || words.length === 0) {
      return;
    }
    const currentWord = words.find((el) => el.id === wordId);
    setActiveWord(currentWord);
  }, [wordId]);

  return (
    <Dictionary
      words={words}
      setWordId={setWordId}
      activeWord={activeWord}
      handleClickBack={() => {
        setActiveWord(null);
      }}
      classes={{
        wordlist: {
          item: 'flex justify-between items-start rounded-lg cursor-pointer group hover:bg-th-secondary-100',
          title: 'font-bold p-2 mr-4',
          text: 'px-2 h-10 overflow-hidden',
          delBtn: 'text-black bg-red-400 rounded-full p-1 text-sm',
        },
        redactor: {
          wrapper: '',
          title: 'bg-th-secondary-100 p-2 my-4 font-bold rounded-lg shadow-md',
          redactor:
            'p-4 my-4 pb-20 bg-th-secondary-100 overflow-hidden break-words rounded-lg shadow-md',
        },
      }}
    />
  );
}
<Component />;
```

### Manage data

```jsx
import { useState, useEffect } from 'react';
import { Dictionary } from '@texttree/v-cana-rcl';
import { words as defaultWords } from '../../../mocks/notesEditor.js';

function Component() {
  const [wordId, setWordId] = useState(null);
  const [activeWord, setActiveWord] = useState(null);
  const [words, setWords] = useState(defaultWords);

  useEffect(() => {
    if (!wordId || words.length === 0) {
      return;
    }
    const currentWord = words.find((el) => el.id === wordId);
    setActiveWord(currentWord);
  }, [wordId]);
  const removeWord = (id) => {
    setWords(words.filter((word) => word.id !== id));
  };
  const addWord = () => {
    const wordId = ('000000000' + Math.random().toString(36).substring(2)).slice(-9);
    const word = {
      id: wordId,
      title: 'New word',
      data: {
        time: 1670935589335,
        blocks: [],
        version: '2.25.0',
      },
    };
    setWords((prev) => [...prev, word]);
  };
  return (
    <>
      {!activeWord && (
        <button onClick={addWord} className="bg-gray-200 rounded-lg p-2">
          Add word
        </button>
      )}
      <Dictionary
        words={words}
        setWordId={setWordId}
        activeWord={activeWord}
        handleClickBack={() => {
          setActiveWord(null);
        }}
        isShowDelBtn
        removeWord={removeWord}
        classes={{
          wordlist: {
            item: 'flex justify-between items-start rounded-lg cursor-pointer group hover:bg-th-secondary-100',
            title: 'font-bold p-2 mr-4',
            text: 'px-2 h-10 overflow-hidden',
            delBtn: 'text-black bg-red-400 rounded-full p-1 text-sm',
          },
        }}
      />
    </>
  );
}
<Component />;
```
