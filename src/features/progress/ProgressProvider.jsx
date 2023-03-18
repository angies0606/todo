import {useProgress} from './useProgress';
import {ProgressContext} from "./progress.context";
import Progress from "./Progress";

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