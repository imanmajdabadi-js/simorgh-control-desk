import { createContext } from 'react';

function dispatch(action: unknown) {}
const dispatchContext = createContext(dispatch);

export default dispatchContext;
