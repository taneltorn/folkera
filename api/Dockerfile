   # --- Stage 1: Build the Node.js app ---
   FROM node:20 AS build
   
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   COPY ./src/resources ./dist/resources
   
   # --- Stage 2: Build Python env and clone CoverHunter ---
   FROM python:3.12-slim AS python-deps
   
   RUN apt-get update && \
       apt-get install -y git && \
       apt-get clean
   
   WORKDIR /app
   RUN git clone https://github.com/taneltorn/CoverHunterFolkERA.git
   
   RUN python3 -m venv /app/CoverHunterFolkERA/.venv && \
       /app/CoverHunterFolkERA/.venv/bin/pip install --upgrade pip && \
       /app/CoverHunterFolkERA/.venv/bin/pip install -r /app/CoverHunterFolkERA/requirements.txt
   
   # --- Stage 3: Final runtime image ---
   FROM python:3.12-slim
   
   # Install Node.js and FFmpeg
   RUN apt-get update && \
       apt-get install -y curl ffmpeg && \
       curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
       apt-get install -y nodejs && \
       apt-get clean
   
   WORKDIR /app
   
   # Copy Node.js app
   COPY --from=build /app/dist ./dist
   COPY --from=build /app/node_modules ./node_modules
   COPY --from=build /app/package.json ./package.json
   
   # Copy CoverHunter with venv
   COPY --from=python-deps /app/CoverHunterFolkERA /app/CoverHunterFolkERA
   
   EXPOSE 3000
   CMD ["node", "dist/app.js"]

#FROM node:20 as build
#
#WORKDIR /app
#
#COPY package*.json ./
#RUN npm install
#
#COPY . .
#RUN npm run build
#COPY ./src/resources ./dist/resources
#
#FROM node:20
#
#RUN apt-get update && apt-get install -y ffmpeg && apt-get clean
#
#WORKDIR /app
#
#COPY --from=build /app/dist ./dist
#COPY --from=build /app/node_modules ./node_modules
#COPY --from=build /app/package.json ./package.json
#
#EXPOSE 3000
#CMD ["node", "dist/app.js"]
