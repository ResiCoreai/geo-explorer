import { ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { hasAuthParams, useAuth } from 'react-oidc-context';
import { Provider } from 'react-redux';
import { jsx as _jsx } from 'react/jsx-runtime';

import { Explore } from './explore';
import { store } from './store';

import './index.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans',
  },
});
export function GeoExplorer() {
  var _a;
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
    var _a;
    document.cookie = `Authorization=${(_a = auth.user) === null || _a === void 0 ? void 0 : _a.access_token}`;
  }, [(_a = auth.user) === null || _a === void 0 ? void 0 : _a.access_token]);
  if (auth.isLoading) {
    return _jsx('div', { children: 'Signing you in/out...' });
  }
  if (!auth.isAuthenticated) {
    return _jsx('div', { children: 'Unable to log in' });
  }
  return _jsx(Provider, {
    store: store,
    children: _jsx(ThemeProvider, {
      theme: theme,
      children: _jsx(Explore, {}),
    }),
  });
}
