FROM node:20 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

COPY ./src/resources ./dist/resources

# --- Base layer for runtime ---
FROM node:20

# ---- System dependencies ----
RUN apt-get update && apt-get install -y \
    python3 python3-pip ffmpeg git \
    && rm -rf /var/lib/apt/lists/*

# ---- Optional: virtualenv setup (if you want to isolate Python packages) ----
# RUN pip3 install virtualenv && virtualenv /venv && . /venv/bin/activate

WORKDIR /app

# ---- Copy Node app ----
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# ---- Copy CoverHunter codebase into the container ----
# Option 1: if CoverHunter is cloned outside
# COPY ../CoverHunterFolkERA /coverhunter
# Option 2: clone it inside if needed
RUN git clone https://github.com/taneltorn/CoverHunterFolkERA.git /coverhunter

# ---- Install Python dependencies ----
# (Assumes requirements.txt exists in CoverHunter repo)
RUN pip3 install -r /coverhunter/requirements.txt

# ---- Optional: expose the Python binary path for logging/debug ----
ARG PYTHON_PATH
ARG COVERHUNTER_ROOT_DIR

EXPOSE 3000

CMD ["node", "dist/app.js"]

#FROM node:20
#
## Install Python and ffmpeg
#RUN apt-get update && \
#    apt-get install -y python3 python3-pip python3-venv ffmpeg && \
#    rm -rf /var/lib/apt/lists/*
#
#WORKDIR /app
#
## Install Node dependencies
#COPY package*.json ./
#RUN npm install
#
## Copy app code 
#COPY . .
#
## Build Node app
#RUN npm run build
#
## OPTIONAL: Create and install Python virtualenv
#WORKDIR /opt/folkera/CoverHunterMPS
#COPY CoverHunterMPS/requirements.txt ./
#RUN python3 -m venv .venv && \
#    .venv/bin/pip install --upgrade pip && \
#    .venv/bin/pip install -r requirements.txt
#
## Back to node app run dir
#WORKDIR /app
#
#EXPOSE 3000
#
#CMD ["node", "dist/app.js"]

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
