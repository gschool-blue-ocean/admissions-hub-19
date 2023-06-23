# Admissions Hub

Agile group project to rework an ***admissions hub***  to track incoming students into the Galvanize program.

## Table of Contents

- [General Information 📄](#general-information)
  - [Technologies Used 💿](#technologies-used)
  - [Features ☑️](#features)
  - [Architecture 🏛️](#architecture)
  - [Project Screenshots 📸 ](#progress-screenshots-🧱)
      - [Inhereted project state 🧰](#project-at-the-time-we-took-it-over)
      - [Sprint 1 Completeion ⏳](#sprint-1-completion)
      - [Sprint 2 Completeion 🏁](#sprint-2-completion-🏁)
  - [Setup ⚙️](#setup)
  - [Usage ✍️](#usage)
  - [Current Status 🟥🟨🟩](#current-status)
- [Room For Improvement ](#room-for-improvement)
- [Acknowledgements 🙏](#acknowledgements)
___

![GitHub](https://img.shields.io/github/last-commit/gschool-blue-ocean/admissions-hub-20/main)

___
## General Information

This project is the culmination of months of **🚀 hard work 🚀** growing our skills within the Galvanize course. We came together as a team to rework an existing project from a previous cohort in order to meet the demands of a client.

-  👨🏻‍✈️ 📝 Project Manager: Chris Stewart (pri), Rane Gray (alt)
-  👨🏻‍🎨 🖼️ UI Manager: Rane Gray (pri), Daniel Purdy (alt)
-  👷🏻‍♂️ 🏗️ Architecture Manager: Joe Goralczyk (pri), Jordan Carlson (alt)

Working together as an Agile group, we worked hard to redesign this application visually and functionally per our client's needs. We refactored authentication to add protected routes and JSON Web Tokens (JWT) along with hashed password storage, a dashboard with an interactive table element that allows for tracking prospective stuents, and an interview page that implements a usable coding space to collaborate between admissions personnel and students.

- Components each member worked on.
  - Chris - testing, authentication
  - Rane - UI redesign, authentication
  - Jordan - refactor code editor, refactoring alert messages
  - Joe - Authentication-login routing, testing, minor fixes
  - Daniel - Interview space design
___
___
## Technologies Used


![Coding Languages](https://img.shields.io/github/languages/count/gschool-blue-ocean/admissions-hub-20?label=Coding%20Languages&style=plastic)

 [![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![HTML](https://img.shields.io/badge/-HTML-E34F26?style=flat&logo=html5&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![CSS](https://img.shields.io/badge/-CSS-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
  [![React Router](https://img.shields.io/badge/-React_Router-red?style=flat&logo=reactrouter&logoColor=black)](https://reactrouter.com/en/main)
  [![React-Auth](https://img.shields.io/badge/-React_Auth-red?style=flat&logo=npm&logoColor=black)](https://www.npmjs.com/package/react-auth-kit)
  [![Jest](https://img.shields.io/badge/-Jest-purple?style=flat&logo=jest&logoColor=black)](https://jestjs.io/)
  [![Bootstrap](https://img.shields.io/badge/-Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
  [![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=F6DC40)](https://vitejs.dev/)
  
  [![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=Node.js&logoColor=black)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
  [![Supabase](https://img.shields.io/badge/-Supabase-3FCF8E?style=flat&logo=supabase&logoColor=black)](https://supabase.com/)
  [![Code Sandbox](https://img.shields.io/badge/Code%20Sandbox-Live%20code%20editor-blue?style=plastic&logo=codesandbox)](https://codesandbox.io/?from-app=1)
  [![JSON Web Tokens](https://img.shields.io/badge/JSON%20Web%20Tokens-blue?style=plastic&logo=jsonwebtokens)](https://jwt.io/)


  [![Git](https://img.shields.io/badge/-Git-F05032?style=flat&logo=git&logoColor=black)](https://git-scm.com/)
  [![Npm](https://img.shields.io/badge/-Npm-CB3837?style=flat&logo=npm&logoColor=white)](https://npmjs.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
  [![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-2CA5E0?style=flat&logo=visualstudiocode&logoColor=white)](https://www.docker.com/)

  [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/)
  [![GitHub Actions](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=githubactions&logoColor=white)](https://github.com/features/actions) 
  [![Slack](https://img.shields.io/badge/-Slack-4A154B?style=flat&logo=slack&logoColor=white)](https://slack.com/)
  [![Discord](https://img.shields.io/badge/-Discord-5865F2?style=flat&logo=discord&logoColor=white)](https://discord.com/)

___
___

## Features

- [x] Login Authentication with hashed passwords stored in the database
- [x] Tracking for currently logged in user, ability to modify account
- [x] Central hub to view and manage all incoming students and cohorts/classes
- [x] Code Editor to knowledge-test incoming students to verify they have basic JS understanding.
___

## Architecture

### UPDATE ME AFTER SECOND SPRINT.
___
___

## Progress Screenshots 🧱

### Project at the time we took it over
#### Login
![Login](/documentation/images/mcsp-19/mcsp-19_login.png)
#### Dashboard
![Create_Account](/documentation/images/mcsp-19/mcsp-19_Edit_Profile.png)
#### Interview
![Interview](/documentation/images/mcsp-19/mcsp-19_Interview.png)

### Sprint 1 Completion

#### Login

![Login](/documentation/images/mcsp-20/login.png)
![Create_Account](/documentation/images/mcsp-20/create_account.png)
___

#### Dashboard

![Dashboard](/documentation/images/mcsp-20/dashboard.png)
___

#### Interview

![Interview](/documentation/images/mcsp-20/interview.png)

## | Sprint 2 Completion 🏁
#### Login
#### Dashboard
#### Interview
___
___
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
___
___

## Usage

- Click on Create Account! button
- Type in all your info and provide a valid password
- Click Submit
- Type in your email and password and Click Login to explore the dashboard
___
___

## Current Status

>![](https://img.shields.io/date/1686056400?label=%F0%9F%8F%83%F0%9F%8F%BB%E2%80%8D%E2%99%82%EF%B8%8FSprint%201%20Start%3A)
>
> ![](https://img.shields.io/date/1686957602?color=success&label=%F0%9F%8F%83%F0%9F%8F%BB%E2%80%8D%E2%99%82%EF%B8%8FSprint%201%20Complete%3A) 
>
> ![](https://img.shields.io/date/1687269600?color=orange&label=%F0%9F%8F%83%F0%9F%8F%BB%E2%80%8D%E2%99%82%EF%B8%8FSprint%202%20Start%3A)
>
> ![](https://img.shields.io/date/1687899600?color=success&label=%F0%9F%8F%83%F0%9F%8F%BB%E2%80%8D%E2%99%82%EF%B8%8FSprint%202%20Complete%3A)

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


|            |            | Contributors           |            |            |
|-----------------------|-----------------------|-----------------------|-----------------------|-----------------------|
| <a href="https://www.linkedin.com/in/imchrisstew/"><img src="https://media.licdn.com/dms/image/D5635AQHt01juJ9QveQ/profile-framedphoto-shrink_800_800/0/1680328466357?e=1687572000&v=beta&t=1QwnCzayaahfA6uWIAjai9syFfFI8TGGlK2ivtvDOSc" alt="Chris Stewart" style="border-radius: 50%; max-width: 200px; max-height: 200px; width: 100%; height: auto;"></a>         | <a href="https://www.linkedin.com/in/ranegray/"><img src="https://media.licdn.com/dms/image/D4E35AQGE-Bem81uMyQ/profile-framedphoto-shrink_800_800/0/1681827900706?e=1687568400&v=beta&t=J56aDqT3EliqrAdrLj7g4A3osIDz8cZZsw2krp0Uypo" alt="Rane Gray" style="border-radius: 50%; max-width: 200px; max-height: 200px; width: 100%; height: auto;"></a>             | <a href="https://www.linkedin.com/in/jordan-carlson99/"><img src="https://media.licdn.com/dms/image/D4E35AQGrrjb8pGAl3g/profile-framedphoto-shrink_800_800/0/1683735122928?e=1687572000&v=beta&t=TTc61zFA-2YfhUTQWnyQsiZjS6fbPGp3SIECW8Q5dGk" alt="Jordan Carlson" style="border-radius: 50%; max-width: 200px; max-height: 200px; width: 100%; height: auto;"></a>    | <a href="https://www.linkedin.com/in/daniel-purdy/"><img src="https://media.licdn.com/dms/image/D5635AQE9CIe_lzJ8lw/profile-framedphoto-shrink_800_800/0/1680780979021?e=1687572000&v=beta&t=c-kiJdHPWilfRJppwe0QNuKdO_AP0Viob1bOlfXMHF8" alt="Daniel Purdy" style="border-radius: 50%; max-width: 200px; max-height: 200px; width: 100%; height: auto;"></a>         | <a href="https://www.linkedin.com/in/joegoralczyk/"><img src="https://media.licdn.com/dms/image/D5635AQFcbr2AdRSDyQ/profile-framedphoto-shrink_800_800/0/1684099622257?e=1687572000&v=beta&t=27HbEewIKl9uqqhpl5TQb-3GHjLAHcPVEo0kv_sTraA" alt="Joe Goralczy" style="border-radius: 50%; max-width: 200px; max-height: 200px; width: 100%; height: auto;"></a>         |
| Chris Stewart         | Rane Gray             | Jordan Carlson        | Daniel Purdy          | Joe Goralczyk          |
