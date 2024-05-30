# guidu

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat)](https://github.com/RichardLitt/standard-readme)

> Composable components for building modern web collaborative products.

TODO: Fill out this long description.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [Common pitfalls](#common-pitfalls)
- [License](#license)

## Install

```bash
git clone https://github.com/uidu-org/Guidu-native.git
cd Guidu-native
yarn install
```

## Usage

Documentation is package specific, browse guidu-native-fumadocs.vercel.app to see all the packages in action.

You can see the storybook at https://664f5b90094245c962f7ddfb-iotjcreepq.chromatic.com/


## Maintainers

[@uidu-org](https://github.com/uidu-org)
[@apuntovanini](https://github.com/apuntovanini)
[@GiacomoGiovannetti](https://github.com/GiovannettiGiacomo)
[@FlavioScimeca](https://github.com/FlavioScimeca)
[@bacco40](https://github.com/bacco40)

## Contributing

To start contributing, follow these steps:

```bash
git fetch
# Open a branch with the name of the package or feature you want to work on (eg: `feat-button`)
git checkout -b feat-button origin/main
# Start fumadocs (next)
yarn dev
# Start storybook
yarn storybook
```

Packages are located in the `packages` folder.

You can work on a specific packages. PRs including stories and tests are more likely to be merged.

```bash
# Ensure tests are passing
yarn test
```

When you are done, open a PR with the package name as title and a description of the changes.

```bash
git commit -m "feat(button): add button component"
git push origin feat-button
```

We manage versions with `@changesets/cli`. If you want a package to be published on npm, you can do so by running

```bash
# Add all files to git
git add .
# Prepare a changeset
yarn changeset
# Follow the instructions choosing patch, minor or major
git push origin feat-button
```

Release script will be run by workflow on PR merge.

## Common pitfalls

## License

MIT © 2024 uidu.org
