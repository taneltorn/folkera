# --- Stage 1: Build the Node.js app ---
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

COPY ./src/resources ./dist/resources

# --- Stage 2: Build Python environment and install CoverHunterFolkERA ---
FROM python:3.12-slim AS python-deps

# Install only what's needed to clone and install Python packages
RUN apt-get update && \
    apt-get install -y git && \
    apt-get clean

# Clone CoverHunterFolkERA
WORKDIR /opt/folkera
RUN git clone https://github.com/taneltorn/CoverHunterFolkERA.git

# Create venv and install Python dependencies
RUN python3 -m venv /opt/folkera/CoverHunterFolkERA/.venv && \
    /opt/folkera/CoverHunterFolkERA/.venv/bin/pip install --upgrade pip && \
    /opt/folkera/CoverHunterFolkERA/.venv/bin/pip install -r /opt/folkera/CoverHunterFolkERA/requirements.txt

# --- Stage 3: Final runtime image ---
FROM node:20

# Install only what is required at runtime
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean

WORKDIR /app

# Copy Node.js build output
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Copy CoverHunterFolkERA (with .venv) from python-deps stage
COPY --from=python-deps /opt/folkera/CoverHunterFolkERA /opt/folkera/CoverHunterFolkERA

# Expose port and run the app
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
