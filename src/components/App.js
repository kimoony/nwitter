import React, { useEffect, useState } from 'react'
import AppRouter from 'components/Router';
import { authService } from "fBase";



function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    })
  }, [])

  const refreshUser = () => {
    setUserObj(authService.currentUser)
  }

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "초기화중..."
      )}
    </>
  );
}

export default App;
