import { User } from "oidc-client-ts";

import { OIDC_AUTHORITY, OIDC_CLIENT_ID } from "@ncsa/geo-explorer/config";

export function getUser() {
  const oidcStorage = localStorage.getItem(
    `oidc.user:${OIDC_AUTHORITY}:${OIDC_CLIENT_ID}`,
  );

  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
}
