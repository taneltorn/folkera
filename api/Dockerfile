# --- Stage 1: Build the Node.js app ---
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

COPY ./src/resources ./dist/resources

# --- Stage 2: Final image with Python and FFmpeg ---
FROM python:3.12-slim

# Install system dependencies
RUN apt-get update && \
    apt-get install -y ffmpeg git && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy the Node.js build artifacts
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Copy CoverHunter code to /opt
COPY --from=build /app /opt/folkera/CoverHunterFolkERA

# Create and activate venv, then install Python dependencies
RUN python3 -m venv /opt/folkera/CoverHunterFolkERA/.venv && \
    /opt/folkera/CoverHunterFolkERA/.venv/bin/pip install --upgrade pip && \
    /opt/folkera/CoverHunterFolkERA/.venv/bin/pip install -r /opt/folkera/CoverHunterFolkERA/requirements.txt

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
