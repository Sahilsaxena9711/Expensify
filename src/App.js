import React from 'react';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';
import './firebase/firebase';
function App() {
  return (
    <>
      <AppRouter/>
    </>
  );
}

export default App;
