# Get Start Guide
## Dependencies
To start development QuantumLab, you need to install the following dependencies:
- [Go 1.20](https://go.dev/doc/install)
- [Docker](https://docs.docker.com/get-docker/)

## Step 1: Clone the repository
Clone the repository to your local machine:
```sh
git clone https://github.com/Project-Quantum-Workspace/QuantumLab.git
```

## Step 2: Create `.env` file
Create a `.env` file in the root project directory. You can copy the example file `.env.example` and replace the example values with your own values.
```sh
cp .env.example .env
```
Example `.env` file:
```sh
APP_ENV = development # App environment
DB_HOST = db # Database connection host name
DB_PORT = 5432 # Database connection port
DB_USER = quantumlab # Database connection username
DB_PASS = quantumlab # Database connection password
DB_NAME = quantumlab # Database name
RESULT_DB_NAME = results # Result database name
ACCESS_JWT_SECRET = your_secret # JWT secret for access token
REFRESH_JWT_SECRET = another_secret # JWT secret for refresh token
ACCESS_JWT_EXPIRY_HOUR = 2
REFRESH_JWT_EXPIRY_HOUR = 168
EMAIL_SERVICE_HOST = smtp.gmail.com
EMAIL_SERVICE_PORT = 587
EMAIL_SERVICE_ADDRESS = example@gmail.com # The email address designated for email service
EMAIL_SERVICE_SECRET = your_secret # The secret for the email address
SUPERSET_URL = http://localhost:8088 # URL of deployed Superset
OAUTH_CLIENT_ID = superset # Client ID registered for the OAuth server
OAUTH_CLIENT_SECRET = a3Ty8F6B995HBz82Mm7gF453KkRF73eL # Client secret for OAuth
OAUTH_CLIENT_DOMAIN = http://localhost:8088 # Your deployed Superset URL
```

## Step 3: Build the docker containers from source
**Notice**: Frontend building can take a long time in the initial build. If you don't want to wait for the build process, you can pull the image from Docker Hub which is built by pipeline, just simply change docker-compose.yml file to use the image `projectquantumlab/quantumlab:dev` instead of building the image yourself.

Make sure you are in the root project directory and have proper `.env` file in the directory. Then, run the following command to build the docker containers:
```sh
docker build -t quantumlab-dev:dev .
```
## Step 4: Configure superset and Database
Configure superset env variables in `script/docker/.env-non-dev` file. If you want to adjust superset config, you can add it in `script/docker/pythonpath_dev`, remember to add any dependencies you use in 'script/docker/requirements-local.txt' file.
Then, you can configure database init script in `script/docker/docker-entrypoint-initdb.d/examples-init.sh` file. If you want to add any database init script.

Example `script/docker/.env-non-dev` file:
```sh
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
COMPOSE_PROJECT_NAME=superset

# database configurations (do not modify)
DATABASE_DB=superset
DATABASE_HOST=db
DATABASE_PASSWORD=superset
DATABASE_USER=superset
DATABASE_PORT=5432
DATABASE_DIALECT=postgresql

EXAMPLES_DB=examples
EXAMPLES_HOST=db
EXAMPLES_USER=examples
EXAMPLES_PASSWORD=examples
EXAMPLES_PORT=5432

# database engine specific environment variables
# change the below if you prefer another database engine
POSTGRES_DB=superset
POSTGRES_USER=superset
POSTGRES_PASSWORD=superset
#MYSQL_DATABASE=superset
#MYSQL_USER=superset
#MYSQL_PASSWORD=superset
#MYSQL_RANDOM_ROOT_PASSWORD=yes

# Add the mapped in /app/pythonpath_docker which allows devs to override stuff
PYTHONPATH=/app/pythonpath:/app/docker/pythonpath_dev
REDIS_HOST=redis
REDIS_PORT=6379

SUPERSET_ENV=production
SUPERSET_LOAD_EXAMPLES=yes
SUPERSET_SECRET_KEY=TEST_NON_DEV_SECRET
CYPRESS_CONFIG=false
SUPERSET_PORT=8088
MAPBOX_API_KEY=''

# QuantumLab related
QUANTUMLAB_USER=quantumlab
QUANTUMLAB_PASSWORD=quantumlab
QUANTUMLAB_DB=quantumlab
RESULT_DB=results
# QuantumLab OAuth Config
OAUTH_API_BASE_URL=http://localhost:8080/api/oauth
OAUTH_CLIENT_ID=superset
OAUTH_CLIENT_SECRET=a3Ty8F6B995HBz82Mm7gF453KkRF73eL
OAUTH_PROVIDER_NAME=QuantumLab
SESSION_COOKIE_NAME=superset_session
SESSION_COOKIE_DOMAIN=localhost
```
## Step 5: Run the project using docker-compose
Make sure you are in the root project directory. If you are using Unix-based os, please run following command to grant execute permission to shell scripts :
```sh
chmod +x -R script/docker
```
 Then, run the following command to start the project:
```sh
docker-compose up
```
Please wait 1 min for the database to initialize, then you can access services in this project:
- Quantumlab running at http://localhost:8080
- Superset running at http://localhost:8088
- Swagger running at http://localhost:8080/swagger/index.html
- Postgres running at localhost:5432
