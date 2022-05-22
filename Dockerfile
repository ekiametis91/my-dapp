# --- Node default image
FROM node:16-alpine as base
RUN apk add --no-cache git openssh

# --- Install node dependencies
FROM base as dependencies
WORKDIR /opt/frontend
COPY package.json ./
RUN yarn install

# --- Build artifacts
FROM base as builder
WORKDIR /opt/frontend
COPY components/ ./components
COPY config/ ./config
COPY hooks/ ./hooks
COPY pages/ ./pages
COPY public/ ./public
COPY styles/ ./styles
COPY utils/ ./utils
COPY .eslintrc.json ./
COPY additional.d.ts ./
COPY next.config.js ./
COPY tsconfig.json ./
COPY entrypoint.sh ./
COPY --from=dependencies /opt/frontend/node_modules ./node_modules
COPY --from=dependencies /opt/frontend/package.json ./package.json
COPY --from=dependencies /opt/frontend/yarn.lock ./yarn.lock
## Run build command with required dynamic variables to be replaced during runtime process.
## Note: Prepend the keyword `APP_` in the value of each variable 
RUN NEXT_PUBLIC_MAINNET=APP_NEXT_PUBLIC_MAINNET \
    NEXT_PUBLIC_TESTNET=APP_NEXT_PUBLIC_TESTNET \
    NEXT_PUBLIC_CHAIN_ID=APP_NEXT_PUBLIC_CHAIN_ID \
    NEXT_PUBLIC_MAINNET_URL=APP_NEXT_PUBLIC_MAINNET_URL \
    NEXT_PUBLIC_TESTNET_URL=APP_NEXT_PUBLIC_TESTNET_URL \
    NEXT_PUBLIC_NODE_1=APP_NEXT_PUBLIC_NODE_1 \
    NEXT_PUBLIC_NODE_2=APP_NEXT_PUBLIC_NODE_2 \
    NEXT_PUBLIC_NODE_3=APP_NEXT_PUBLIC_NODE_3 \
    NEXT_PUBLIC_UAUTH_CLIENT_ID_UNSTOPPABLE=APP_NEXT_PUBLIC_UAUTH_CLIENT_ID_UNSTOPPABLE \
    NEXT_PUBLIC_UAUTH_REDIRECT_URI_UNSTOPPABLE=APP_NEXT_PUBLIC_UAUTH_REDIRECT_URI_UNSTOPPABLE \
    NEXT_PUBLIC_UAUTH_POST_LOGOUT_REDIRECT_URI_UNSTOPPABLE=APP_NEXT_PUBLIC_UAUTH_POST_LOGOUT_REDIRECT_URI_UNSTOPPABLE \
    NEXT_PUBLIC_TRANSAK_BASE_URL=APP_NEXT_PUBLIC_TRANSAK_BASE_URL \
    NEXT_PUBLIC_TRANSAK_API_KEY=APP_NEXT_PUBLIC_TRANSAK_API_KEY \
    NEXT_PUBLIC_TRANSAK_REDIRECT_URL=APP_NEXT_PUBLIC_TRANSAK_REDIRECT_URL \
    yarn build

FROM base as runner
WORKDIR /opt/frontend
COPY --from=builder /opt/frontend/public ./public
COPY --from=builder /opt/frontend/.next ./.next
COPY --from=builder /opt/frontend/node_modules ./node_modules
COPY --from=builder /opt/frontend/package.json ./package.json
COPY --from=builder /opt/frontend/entrypoint.sh ./entrypoint.sh

EXPOSE 3000
RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT ["./entrypoint.sh"]
CMD ["yarn", "start"]