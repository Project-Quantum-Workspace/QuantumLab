# QuantumLab

# Table of Contents

1. [About This Project](#about-this-project)
2. [Built With](#built-with)
3. [Project Structure](#project-structure)
4. [Getting Started with Backend](#getting-started-with-backend)
    - [Prerequisite](#prerequisite)
    - [Install Dependencies](#install-dependencies)
    - [Configure `.env` File](#configure-env-file)
    - [Run Server Program](#run-server-program)
    - [Swagger](#api-documentation-swagger)
5. [System Users](#system-users)
    - [System Roles](#system-roles)
    - [Initialise Root Administrator](#initialise-root-administrator)
    - [Invite Researchers](#invite-researchers)
6. [Frontend Development](#frontend-development)
7. [Developer's Guide](#developers-guide)
    - [Pipeline Migration](#pipeline-migration)
8. [License](#license)

<!-- ABOUT THE PROJECT -->

## About This Project

QuantumLab is an open-source quantum computing platform aiming to enhance researchers' experience by gathering the access to quantum computing resources from multiple providers. In addition, QuantumLab provides customisable analysis and visualisation tool based on [Apache-Superset](https://superset.apache.org/docs/intro) for quantum circuit execution results.

<!-- BUILT WITH -->

## Built With

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)
![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)

<!-- PROJECT STRUCTURE -->

## Project Structure

```sh
QuantumLab
├─ api                  # Backend API endpoints
├─ bootstrap            # Env bootstrap
├─ cluster              # Kubernetes cluster
├─ cmd                  # Backend entrypoint
├─ docs                 # Documents
├─ internal             # Backend internal utils
├─ model                # Backend data model
├─ repository           # Backend data repository
├─ usecase              # Backend usscase (Business logic)
├─ website              # Frontend code
├─ DOCKERFILE           # Dockerfile for building docker image
├─ go.mod
├─ go.sum
├─ LICENSE
├─ README.md
```

<!-- GETTING STARTED WITH BACKEND-->

## Getting Started with Backend

### Prerequisite

Make sure you properly installed **Go 1.20** on your OS. Refer to the [Go official documentation](https://go.dev/doc/install) for more details.

### Install dependencies

Note: Make sure you execute all following commands from the root project directory.

```
go get ./...
```

### Configure `.env` file

Several environment variables need to be set up before developing this repository. An example `.env` file is provided ([.env.example](.env.example)), and you may need to replace these example values environment variables. The `.env` file must be put in the root project directory for development.

### Run server program

```
go run cmd/main.go
```

### API Documentation Swagger

Install swag CLI:

```
go install github.com/swaggo/swag/cmd/swag@latest
```

Create or update swagger API documentation:

```
swag init -g ./cmd/main.go ./docs --pd true
```

You can visit the API documentation after starting up the server: http://localhost:8080/swagger/index.html#/

<!-- SYSTEM USERS -->

## System Users

### System roles

By default, the system has the following three different roles:

| id  | name               |
| --- | ------------------ |
| 0   | Root Administrator |
| 1   | Administrator      |
| 2   | Researcher         |

### Initialise Root Administrator

Navigate to the following page to initialise the Root Administrator if the system has not had any user yet:
http://localhost:8000/admin/adminInitialization.

### Invite researchers

Login as an Administrator, hit this link (http://localhost:8000/admin/users) and click on the "Invite New" button to invite new users with the Researcher role. The login credential will be sent to the email address entered.

![Invite new user](docs/screenshots/user_invite.png)

## Frontend Development

For the frontend development, please refer to the [website/README.md](website/README.md)

## Developer's Guide
### Getting Start to run the whole project
- [Get Start Guide](docs/Get-start.md)


### Pipeline Migration

If you need to migrate and establish your own development pipeline, please refer to the following document:

-   [CI/CD Pipeline Spec and Migration Guide](https://confluence.cis.unimelb.edu.au:8443/display/SWEN900172023QZ/Development+Environment+Deployment+Pipeline)

<!-- LICENSE -->

## License

Distributed under the MIT License. See [LICENSE.txt](LICENSE.txt) for more information.
