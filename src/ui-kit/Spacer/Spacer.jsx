
import classes from "./Spacer.module.scss";

/**
 * Props:
 * - mode: 'vertical' | 'horizontal'
 */
function Spacer ({
  mode = 'vertical'
}) {
  
  const modeClass = classes[mode === 'horizontal'
    ? 'Spacer--horizontal'
    : 'Spacer--vertical'
  ]; 

  return (
    <div className={modeClass}></div>
  ); 
}

export default Spacer;