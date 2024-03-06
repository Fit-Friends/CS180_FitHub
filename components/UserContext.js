import React from 'react';

// Initialize a context with empty/default values
const UserContext = React.createContext({
  user: { userId: null, email: null },
  setUser: () => {}
});

export default UserContext;