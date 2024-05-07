import React from 'react';

function Navigation({
  totalPageCount = 3,
  nodeLeft = <span>Left</span>,
  nodeRight = <span>Right</span>,
  handleClickLeft = () => {},
  handleClickRight = () => {},
  classes = { left: '', right: '', container: '' },
}) {
  return (
    <>
      {totalPageCount > 1 && (
        <div className={classes.container}>
          <button className={classes.left} onClick={handleClickLeft}>
            {nodeLeft}
          </button>
          <button className={classes.right} onClick={handleClickRight}>
            {nodeRight}
          </button>
        </div>
      )}
    </>
  );
}

export default Navigation;
