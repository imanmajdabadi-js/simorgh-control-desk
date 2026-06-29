import { useContext } from 'react';
import dashboardContext from '../context/dashboardContext';

export function useDashboard() {
  const dashboard = useContext(dashboardContext);

  return dashboard;
}
