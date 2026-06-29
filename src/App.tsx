import { useReducer } from 'react';
import Dashboard from './components/Dashboard';
import dashboardContext from './context/dashboardContext';
import dispatchContext from './context/dispatchContext';
import { initialCases } from './data/data';
import { reducer } from './reducer';

function App() {
  const [state, dispatch] = useReducer(reducer, initialCases);
  return (
    <dispatchContext.Provider value={dispatch}>
      <dashboardContext.Provider value={state}>
        <Dashboard />
      </dashboardContext.Provider>
    </dispatchContext.Provider>
  );
}

export default App;
