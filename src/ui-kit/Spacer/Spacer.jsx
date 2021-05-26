import React from 'react';
import classes from './Spacer.module.scss';

/**
 * Props:
 * - mode: 'vertical' | 'horizontal'
 */
export default class Spacer extends React.Component {
  static defaultProps = {
    mode: 'vertical'
  }

  render() {
    const modeClass = classes[this.props.mode === 'horizontal'
      ? 'Spacer--horizontal'
      : 'Spacer--vertical'
    ]; 
    return (
      <div className={modeClass}></div>
    ); 
  }
}
