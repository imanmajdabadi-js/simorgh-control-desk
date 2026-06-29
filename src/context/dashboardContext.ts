import { createContext } from 'react';
import { initialCases } from '../data/data';

const dashboardContext = createContext(initialCases);

export default dashboardContext;
