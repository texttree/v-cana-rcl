import React from 'react';
import useScroll from '../useScroll';
import Question from './Question';
function QuestionList({ data = {}, toolId, isLoading }) {
  const { highlightId, handleSaveScroll } = useScroll({
    toolId,
    isLoading,
    idVersePrefix: 'id' + toolId,
  });

  return (
    <>
      {data &&
        Object.keys(data)?.map((key) => {
          return (
            <div key={key} className="flex mx-4 p-4" id={'idtq' + key}>
              <div className="text-2xl">{key}</div>
              <div className="pl-7 w-full text-th-text-primary">
                <ul>
                  {data[key]?.map((item) => {
                    return (
                      <li
                        key={item.id}
                        id={'id' + item.id}
                        onClick={() => handleSaveScroll(key, item.id)}
                        className="py-2"
                      >
                        <Question item={item} highlightId={highlightId} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
    </>
  );
}
export default QuestionList;
