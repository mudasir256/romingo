<p align="center">
  <a href="https://romingo.com">
    <img alt="Romingo" src="https://romingo.com/wp-content/uploads/2021/08/Copy-of-Copy-of-Romingo_yellow.svg" width="160" />
  </a>
</p>

<h1 align="center">
  Romingo's Front End Repository
</h1>

## 🚅 Quick start

1.  **Install the dependencies.**

    Navigate into your new site’s directory and install the necessary dependencies.

    ```shell
    # Navigate to the directory
    cd romingo/

    # Install the dependencies
    npm install --force

    # If you face issue regarding babel
    # remove babel from node module folders
    # install manually babel 
    npm i babel-loader@"8.1.0"
    ```

    (note: --force is required until a fix for 17.0.2 compatibility)


1.  **copy example .example-env to .env file**

    ```
      cp .example-env .env
    ```


1.  **Install and start JSON Server to set up a test backend**

    ```shell
    # Install globally
    npm install -g json-server
    json-server --watch db.json

    ```

    -Available endpoints
    /hotels - lists all hotels
    /details - gets details for a specific hotel
    /hotelImages - list of images for a certain hotel
    /rate - gets hotel rate info
    /create_reservation- example response for a successful hotel reservation
    /cancel_reservation - example response for successfully cancelling an existing reservation
    /get_reservation - example response for looking up a past hotel reservation
    /list_reservation - get a list of reservations matching a lookup
    /create_pnr - response from successfully creating a passenger name record

1.  **Open the source code and start editing!**

    Open the `romingo` directory in your code editor of choice and building your first component!

1.  **Browse your stories!**

    Run `npm run storybook` to see your component's stories at `http://localhost:6006`

## 🔎 What's inside?

A quick look at the top-level files and directories included with this template.

    .
    ├── .storybook
    ├── node_modules
    ├── public
    ├── src
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── yarn.lock
    └── README.md

1.  **`.storybook`**: This directory contains Storybook's [configuration](https://storybook.js.org/docs/react/configure/overview) files.

2.  **`node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages).

3.  **`public`**: This directory will contain the development and production build of the site.

4.  **`src`**: This directory will contain all of the code related to what you will see on your application.

5.  **`.env`**: Simple text configuration file for controlling the application's environment constants.

6.  **`.gitignore`**: This file tells git which files it should not track or maintain during the development process of your project.

7.  **`package.json`**: Standard manifest file for Node.js projects, which typically includes project specific metadata (such as the project's name, the author among other information). It's based on this file that npm will know which packages are necessary to the project.

8. **`README.md`**: A text file containing useful reference information about the project.

---

cloudbuild-dev.yaml is set to automatically deploy to dev.romingo.com when dev branch is pushed to. This is configured in GCP "Cloud Build"

cloudbuild-prod.yaml is set to automatically deploy to PRODUCTION. This is configured in GCP "Cloud Build"

---

## Upgrade to 20 Notes

1. We need to run npm i --legacy-peer-deps to install the project, a few packages such as ``

2. Add to `TSC_COMPILE_ON_ERROR=true` to `.env` file
  - This will allow for the project to compile even with TypeScript errors. There may be more in-depth configuration that we can do to block compiling with TypeScript errors in development, but not in prod (as you would expect, to leverage TS in development), but given the current state of the project, with a massive amount of tech-debt (and particularly TS errors/warnings), we don't have time to fix all of the TypeScript erros, and need to continue developing. Adding `TSC_COMPILE_ON_ERROR=true` to `.env` file allows for that.
# romingo
