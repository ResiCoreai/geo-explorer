import { ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { hasAuthParams, useAuth } from 'react-oidc-context';
import { Provider } from 'react-redux';

import { store } from '@ncsa/geo-explorer/store';

import { Explore } from './explore';

import './index.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans',
  },
});

export function GeoExplorer() {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  useEffect(() => {
    // the `return` is important - addAccessTokenExpiring() returns a cleanup function
    return auth.events.addAccessTokenExpiring(() => {
      if (
        confirm(
          "You're about to be signed out due to inactivity. Press continue to stay signed in.",
        )
      ) {
        auth.signinSilent();
      }
    });
  }, [auth.events, auth.signinSilent]);

  // automatically sign-in
  useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !hasTriedSignin
    ) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

  // This is necessary for GeoServer Web administration interface
  useEffect(() => {
    document.cookie = `Authorization=${auth.user?.access_token}`;
  }, [auth.user?.access_token]);

  if (auth.isLoading) {
    return <div>Signing you in/out...</div>;
  }

  if (!auth.isAuthenticated) {
    return <div>Unable to log in</div>;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Explore />
      </ThemeProvider>
    </Provider>
  );
}
