import React from 'react';
import classes from './MySelect.module.scss'

const MySelect = ({additionalClasses, options, value, onChange}) => {
  return (
    <select
      className={[additionalClasses, classes.select].join(' ')}
      value={value}
      onChange={event => onChange(event.target.value)}>
      {
        options.map(item =>
          <option
            value={item.value}
            disabled={item.disabled}
            key={item.value}>
              {item.name}
          </option>)
      }
    </select>
  );
};

export default MySelect;