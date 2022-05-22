#!/bin/sh

## Replace variables
find /opt/frontend/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_MAINNET#$NEXT_PUBLIC_MAINNET#g"
find /opt/frontend/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_TESTNET#$NEXT_PUBLIC_TESTNET#g"
find /opt/frontend/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_CHAIN_ID#$NEXT_PUBLIC_CHAIN_ID#g"
find /opt/frontend/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_MAINNET_URL#$NEXT_PUBLIC_MAINNET_URL#g"
find /opt/frontend/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_TESTNET_URL#$NEXT_PUBLIC_TESTNET_URL#g"
find /opt/frontend/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_NODE_1#$NEXT_PUBLIC_NODE_1#g"
find /opt/frontend/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_NODE_2#$NEXT_PUBLIC_NODE_2#g"
find /opt/frontend/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_NODE_3#$NEXT_PUBLIC_NODE_3#g"
find /opt/frontend/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_UAUTH_CLIENT_ID_UNSTOPPABLE#$NEXT_PUBLIC_UAUTH_CLIENT_ID_UNSTOPPABLE#g"
find /opt/frontend/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_UAUTH_REDIRECT_URI_UNSTOPPABLE#$NEXT_PUBLIC_UAUTH_REDIRECT_URI_UNSTOPPABLE#g"
find /opt/frontend/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_UAUTH_POST_LOGOUT_REDIRECT_URI_UNSTOPPABLE#$NEXT_PUBLIC_UAUTH_POST_LOGOUT_REDIRECT_URI_UNSTOPPABLE#g"
find /opt/frontend/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_TRANSAK_BASE_URL#$NEXT_PUBLIC_TRANSAK_BASE_URL#g"
find /opt/frontend/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_TRANSAK_API_KEY#$NEXT_PUBLIC_TRANSAK_API_KEY#g"
find /opt/frontend/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_TRANSAK_REDIRECT_URL#$NEXT_PUBLIC_TRANSAK_REDIRECT_URL#g"

echo "Starting React app"
exec "$@"
