import React from "react";
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { UserProvider } from './contexts/UserContext'

const App: React.FC = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;