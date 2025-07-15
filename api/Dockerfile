FROM node:20

# Install Python and ffmpeg
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv ffmpeg && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Node dependencies
COPY package*.json ./
RUN npm install

# Copy app code 
COPY . .

# Build Node app
RUN npm run build

# OPTIONAL: Create and install Python virtualenv
WORKDIR /opt/folkera/CoverHunterMPS
COPY CoverHunterMPS/requirements.txt ./
RUN python3 -m venv .venv && \
    .venv/bin/pip install --upgrade pip && \
    .venv/bin/pip install -r requirements.txt

# Back to node app run dir
WORKDIR /app

EXPOSE 3000

CMD ["node", "dist/app.js"]

#FROM node:20 as build
#
#WORKDIR /app
#
#COPY package*.json ./
#
#RUN npm install
#
#COPY . .
#
#RUN npm run build
#
#COPY ./src/resources ./dist/resources
#
#FROM node:20
#
#WORKDIR /app
#
#COPY --from=build /app/dist ./dist
#COPY --from=build /app/node_modules ./node_modules
#COPY --from=build /app/package.json ./package.json
#
#
#EXPOSE 3000
#
#CMD ["node", "dist/app.js"]
