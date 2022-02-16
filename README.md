# CSC_478_Linktree_Clone

## Installing

Make sure you have [Node.js and NPM](https://nodejs.org) installed before working on any of this.
Once you've cloned the repository, you'll notice there are two main directories, `ui` and `api`.
For both of these directories, you'll want to run `npm install` in that directory. Below is a rough
idea of what that looks like

```bash
$ cd ui
$ npm install
$ cd ..
$ cd api
$ npm install
```

## Running

In two separate terminals (or terminal sessions) run `npm run dev` in both the `api` and `ui` directories.

```bash
$ npm run dev
```

The UI will start the front-end on `http://localhost:3000` and the API will start the backend on `http://localhost:8080`.
The API as of _this_ moment is not needed, but I set it up so that we have it ready to go, and we can test
that it's working.