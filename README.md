# Admissions Hub

> Agile group project to rework an admissions hub to track incoming students into the Galvanize program.

## Table of Contents

- [General Information](#general-information)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Screenshots](#screenshots)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Current Status](#current-status)
- [Room For Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)

## General Information

This project is the culmination of months of hard work growing our skills within the Galvanize course. We came together as a team to rework an existing project from a previous cohort in order to meet the demands of a client.

- Project Manager: Chris Stewart (pri), Rane Gray (alt)
- UI Manager: Rane Gray (pri), Daniel Purdy (alt)
- Architecture Manager: Joe Goralczyk (pri), Jordan Carlson (alt)

Working together as an Agile group, we worked hard to redesign this application visually and functionally per our client's needs. We've reworked the authentication system that correctly stores hashed passwords in the database and keeps the user logged in, a dashboard with an interactive table element that allows for tracking prospective stuents, and an interview page that implements a usable coding space to collaborate between admissions personnel and students.

- Components each member worked on.
  - Chris - testing, authentication
  - Rane - UI redesign, authentication
  - Jordan - refactor code editor, refactoring alert messages
  - Joe - Authentication-login routing, testing, minor fixes
  - Daniel - Interview space design

## Technologies Used

- HTML5, CSS3, JavaScript, express.js, node.js,
- React, react-router, react-auth,
- Bootstrap, jest,
- Docker, PostgreSQL, Git, NPM,
- Visual Studio Code, Github Projects,
- Discord, Slack, Zoom

## Features

- Login Authentication with hashed passwords stored in the database
- Tracking for currently logged in user, ability to modify account
- Central hub to view and manage all incoming students and cohorts/classes
- Code Editor to knowledge test incoming students to verify they have basic JS understanding.

## Screenshot(s)

### Login

![Login](/documentation/images/mcsp-20/login.png)
![Create_Account](/documentation/images/mcsp-20/create_account.png)

### Dashboard

![Dashboard](/documentation/images/mcsp-20/dashboard.png)

### Interview

![Interview](/documentation/images/mcsp-20/interview.png)

## Setup

- Fork and clone this repository
- From the root directory of the cloned repository
  - npm install
  - npm install --prefix api
  - npm install --prefix client
  - docker compose up --build
- Point your browser to
  - [http://localhost:5173](http://localhost:5173/login)

[Project Demonstration](deployment_link_will_go_here_when_complete)

## Usage

- Click on Create Account! button
- Type in all your info and provide a valid password
- Click Submit
- Type in your email and password and Click Login to explore the dashboard

## Current Status

> Sprint 1 of 2 Complete

## Room For Improvement

- Ideas:
  - A "student-facing" side of the application for students to manage their status
- Todo:
  - deployment

## Acknowledgements

- Inspired By:
  - Our instructors, all of our hard work, and the hard work of previous cohorts
- Based On:
  - Galvanize Inc. Admissions Hub assignment
- Contributors:
  - Chris Stewart, Rane Gray, Jordan Carlson, Daniel Purdy, Joe Goralczyk





<!-- Previous Cohort's ReadMe file: -->
<!-- # Admissions Hub

> Agile group project to create an admissions hub to track incoming students into the Galvanize program.

## Table of Contents

- [General Information](#general-information)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Screenshots](#screenshots)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Current Status](#current-status)
- [Room For Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)
- [License](#license)

## General Information

This project is the culmination of months of hard work growing our skills within the Galvanize course. We came together as a team, each member picking a position that would challenge him/her as decision makers, project co-owners, and developers.

- Project Manager: Sydney Moreaux (pri), Kari Tinsley (alt)
- UI Manager: Javaney Thomas (pri), FortunJoseph Binghay (alt)
- Architecture Manager: Cedrick Roseberry (pri), Melvin Richardson (alt)

Working together as an Agile group, we faced many issues bringing this project to completion managing various libraries, testing requirements, and client needs. Together we've build an authentication system that allows each component to keep track of the current logged on user, a dashboard that allows for keeping track of every student that applies to the program, and an interview page to allow for testing fundamental knowledge before final approval into the program.

- Components each member worked on.
  - Cedrick - Database creation and seeding
  - FortunJoseph - Modals on Dashboard Hub
  - Javaney - Authentication, Coding Challenge
  - Kari - Dashboard Hub
  - Melvin - Express routes, Route testing
  - Sydney - Coding Challenge side bar

## Technologies Used

- HTML5, CSS3, JavaScript, express.js, node.js,
- React, react-router, react-auth,
- Bootstrap, jest,
- Docker, PostgreSQL, Git, NPM,
- Visual Studio Code, Trello, render.com,
- Discord, Slack, Zoom

## Features

- Login Authentication with hashed and salted passwords stored in the database
- Tracking for currently logged in user, ability to modify account
- Central hub to view and manage all incoming students and cohorts/classes
- Code Editor to knowledge test incoming students to verify they have basic JS understanding.

## Screenshot(s)

### ERD

> ![ERD](/documentation/images/ERD.png)

### Component Tree

> ![Component_Tree](/documentation/images/Component_Tree.png)

### Login

![Login](/documentation/images/Login.png)
![Create_Account](/documentation/images/Create_Account.png)

## Setup

- Fork and clone this repository
- From the root directory of the cloned repository
  - npm install
  - npm install --prefix api
  - npm install --prefix client
  - docker compose up --build
- Point your browser to
  - [http://localhost:3000](http://localhost:3000)

[Project Demonstration](https://admissions-hub-client.onrender.com/)

## Usage

- Click on Create Account! button
- Type in all your info and provide a valid password
- Click Submit
- Type in your email and password and Click Login

## Current Status

> Handed off to the next cohort

## Room For Improvement

- Ideas:
  - More colors to enhance a mostly white color palette
  - Adjust user state to keep user logged in after browser window refresh
  -
- Todo:
  - Store and retrieve code in the database to allow the interviewer to pick from a number of different coding challenges
  - Run coding challenge from server instead of client
  - Add charts to help visualize whole cohort data

## Acknowledgements

- Inspired By:
  - Our instructors, all of our hard work, and the hard work of previous cohorts
- Based On:
  - Galvanize Inc. Admissions Hub assignment
- Contributors:
  - Cedrick Roseberry, FortunJoseph Binghay, Javaney Thomas, Kari Tinsley, Melvin Richardson, Sydney Moreaux

## Contacts

- [Cedrick Roseberry](mailto:)
- [FortunJoseph Binghay](mailto:)
- [Javaney Thomas](mailto:)
- [Kari Tinsley](mailto:)
- [Melvin Richardson](mailto:amoramas1984@gmail.com)
- [Sydney Moreaux](mailto:)

## License

> MIT

---

---

# Full-Stack React Example

This repo contains an example of a full-stack application with an express backend, a React frontend, and a postgres database. It's designed to be a starting point for a blue ocean project, or a reference for those wanting to get testing, CI, or docker working in their respective projects.

## Development Setup

The app can be started with two steps:

1. `cp .env.example .env` - Copy over required environment variables.
1. `npm install; npm install --prefix=api; npm install --prefix=client` - Install all dependencies.
1. `docker-compose up` - Run Project.

> **NOTE**: After installing a new npm dependency, you have to run `docker-compose up --build` to install the new dependencies on the container.

## npm Scripts

**`root`**

- `lint` - Checks code for style issues.
- `test` - Runs `test:client` and `test:api`.
- `ci` - Runs `lint` and `test`.
- `test:client` - Runs frontend tests.
- `test:api` - Runs backend tests.

**`/client`**

- `dev` - Hosts your assets (executed by docker-compose).
- `build` - Builds your assets for production.
- `test` - Runs tests.

**`/server`**

- `dev` - Runs the server in watch mode (executed by docker-compose).
- `start` - Starts the production server.
- `test` - Runs tests.

## Tech used

- [`vite`](https://vitejs.dev/) - Module bundler, transpiler and dev server.
- [`vitest`](https://vitest.dev/) - Test runner.
- [`prettier`](https://prettier.io/) - Code formatter/checker.
- [`react-testing-library`](https://testing-library.com/docs/react-testing-library/api/) - React component test helper.
- [`msw`](https://testing-library.com/docs/react-testing-library/api/) - Request mocking library for writing frontend tests.
- [`supertest`](https://github.com/ladjs/supertest) - HTTP request simulator for backend testing.
- [`docker`](https://www.docker.com/) - Containerization framework for dev and deployment.

## Useful Docker Commands

- `docker exec <container_name_or_id> <command>` - Runs command in the context of a container.
- `docker inspect <container_name_or_id>` - Displays info (including IP address) of a container running in docker. -->