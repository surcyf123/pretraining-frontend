# `openpretrain.ai` [τ, τ]

It has support for:

- TypeScript ✅
- Webpack Bundling and Hot Reloading ✅
- Storybook and Loki testing ✅
- React Router DOM integration ✅
- Mantine integration with Dark and Light Themes ✅
- Linting ✅
- Prettifying & `package.json` sorting ✅
- PWA/Service Workers ✅
- Pre-commit hooks ✅
- `shx` for OS agnostic CLI ✅
- Unit testing via Jest and `ts-jest`. ✅

---

# How to run the frontend?

- Clone the repository.
- Install NodeJS from https://nodejs.org/en.
- Verify the NodeJS installation by running the command `node -v` in your terminal.
- Check the npm (Node Package Manager) version by running `npm -v` in the terminal.
- Install yarn globally using the command `npm install --global yarn` in your terminal. For more information, visit https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable.
- Confirm the installation of yarn by checking its version with the command `yarn --version`.
- Once yarn is successfully installed, navigate to the project directory in the terminal.
- Run the command `yarn` to install all the project dependencies.
- After the installation is complete, you can execute the following commands to run the app:
   - To start development: `yarn start`
   - To build: `yarn build`
      
#### Notes:

More Instructions to run/compile the code is present inside `CLI.md`.

---

# How to run the backend?

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)

- Clone the repo.
- [Install `Python 3.11`](https://www.python.org/downloads/).
- [Install `poetry` via `pipx`](https://python-poetry.org/docs/#installing-with-pipx).
- `cd` into `api` folder.
- From the terminal, run `poetry install` to install all the Python dependecies.
- [Run a local subtensor](https://github.com/unconst/pretrain-subnet?tab=readme-ov-file#mining-steps). This increases decentralization and resilience of the network.
- After the installation is complete, you can execute the following commands to run the app:
   - To start the server in `dev` mode: `poetry run start`
   - To start the server in `prod` mode: `poetry run serve`
