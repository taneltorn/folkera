FROM node:20 as build

ENV NODE_OPTIONS="--max-old-space-size=3072"

ARG VITE_API_URL
ARG VITE_PUBLIC_URL
ARG VITE_CONTACT_EMAIL
ARG VITE_KIVIKE_PID_URL
ARG VITE_RECORDINGS_DIR
ARG VITE_NOTATIONS_DIR
ARG VITE_MUSICXML_DIR

RUN echo "VITE_API_URL=${VITE_API_URL}" && echo "VITE_PUBLIC_URL=${VITE_PUBLIC_URL}"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:stable-alpine as production

COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=root nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]