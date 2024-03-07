import React from 'react';

const UserContext = React.createContext({
  user: { userId: null, email: null },
  setUser: () => {}
});

export default UserContext;