import Progress from './Progress';
import {ProgressContext} from './progress.context';
import {useProgress} from './useProgress';

function ProgressProvider({children}) {
  const value = useProgress();

  return (
    <>
      <ProgressContext.Provider value={value}>
        {children}
      </ProgressContext.Provider>
      {
        value.isProgress && <Progress />
      }
    </>
  )
}

export default ProgressProvider;