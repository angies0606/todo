import AppProviders from './AppProviders'
import AppRouting from './AppRouting'

function App() {  
  return (
    <>
      <AppProviders>
        <AppRouting />
      </AppProviders>
    </>
  );
}

export default App;
