### Dependency Upgrade Instructions:

1. Run `yarn outdated` to check what all dependencies needs upgrading.
2. Use command `yarn upgrade <package-name> --latest` to upgrade dependency.
3. The dependencies need to be upgraded in batches via multiple PRs for ease of review and testing.
4. While making a major version change (`X.Y.Z` to `X+1.Y.Z`), the changelog (from the concerned library) should be added to the PR description for reviewing the breaking changes.
5. The core dependencies should preferably be upgraded first. The suggested sequence is: ([React](https://react.dev/) -> [Storybook](https://storybook.js.org/) -> [Webpack](https://webpack.js.org/) -> [Typescript](https://www.typescriptlang.org/) -> [ESLint](https://eslint.org/) -> Remaining).
6. All the dependencies related to a particular dependency should be clubbed together. For ex: `react`, `@react/types`, `react-dom`, `@types/react-dom` should be clubbed together.
7. The standalone dependencies can be clubbed together in batches of 3 or less after the core dependencies have been upgraded.
8. To upgrade all dependencies related to [Storybook](https://storybook.js.org/). Simply run `npx storybook@latest upgrade`.
9. Avoid upgrading anything that is related to [babel](https://babeljs.io/). It automatically gets upgraded to the version required while upgrading [Storybook](https://storybook.js.org/).
10. To upgrade the dependencies placed in resolutions, change the version of the dependency to the desired version manually and then simply run `yarn`.
11. Always run the following commands before raising a PR and try fixing the errors that arise (if any). If unsuccessful, raise an issue for the same.
  - `yarn`
  - `yarn lint`
  - `yarn compile`
  - `yarn build`