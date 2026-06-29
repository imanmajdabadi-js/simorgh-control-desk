import { useContext } from 'react';
import dispatchContext from '../context/dispatchContext';

export function useDispatch() {
  const dispatch = useContext(dispatchContext);

  return dispatch;
}
