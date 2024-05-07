import React from 'react';

function Alphabet({
  alphabet,
  classes = {
    container: 'flex flex-wrap bg-blue-300 rounded-md p-1',
    letter: 'py-1 px-3 rounded-md cursor-pointer hover:bg-gray-200',
    showAll: 'py-1 px-3 rounded-md cursor-pointer hover:bg-gray-200',
  },
  nodeShowAll = <span>ShowAll</span>,
  handleClickLetter = () => {},
  handleClickShowAll = () => {},
}) {
  const uniqueAlphabet = [...new Set(alphabet)];

  return (
    <div className={classes.container}>
      {uniqueAlphabet &&
        uniqueAlphabet
          .sort((a, b) => a.localeCompare(b))
          .map((letter, index) => (
            <div
              key={`${letter}_${index}`}
              className={classes.letter}
              onClick={() => handleClickLetter(letter)}
            >
              {letter}
            </div>
          ))}
      <button className={classes.showAll} onClick={handleClickShowAll}>
        {nodeShowAll}
      </button>
    </div>
  );
}

export default Alphabet;
