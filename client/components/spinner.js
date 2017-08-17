import React from 'react';
import classnames from 'classnames';

export default function Spinner(props) {
  const classNames = classnames(
    Object.assign({}, props.classNames || {}, {
      spinner : true
    })
  );

  return (
    <div id={props.id} className={classNames}>
      spinner goes here...
    </div>
  )
}