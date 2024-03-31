import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const HostContext = createContext({});

function BecomeHostProvider({ children }) {
  const [hostData, setHostData] = useState({});
  
  return (
    <HostContext.Provider value={{ hostData, setHostData }}>
      {children}
    </HostContext.Provider>
  );
}

BecomeHostProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BecomeHostProvider;
