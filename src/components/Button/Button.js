import React from 'react';
import { truncateText } from '../../utils/helper';
import PropTypes from 'prop-types';

function Button({ text, onClick }) {
  return (
    <div
      style={{
        cursor: 'pointer',
        background: '#174cc8',
        color: 'white',
        display: 'inline-block',
        padding: '10px',
        borderRadius: '5px',
      }}
      onClick={onClick}
    >
      {truncateText(text, 12)}
    </div>
  );
}

Button.defaultProps = {
  text: 'Test',
};

Button.propTypes = {
  /** Title */
  text: PropTypes.string,
  /** Event by clicking on the button. */
  onClick: PropTypes.func,
};

export default Button;
