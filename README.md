# ocd-5e

Please add your description here.

## Installation

Please add your installation instructions here.

## Development

### Prerequisites

In order to build this module, recent versions of `node` and `yarn` are
required. Most likely, using `npm` also works, but only `yarn` is officially
supported. We recommend using the latest lts version of `node`. If you use `nvm`
to manage your `node` versions, you can simply run

```
nvm install
```

in the project's root directory.

You also need to install the project's dependencies. To do so, run

```
yarn install
```

### Building

You can build the project by running

```
yarn build
```

Alternatively, you can run

```
yarn build:watch
```

to watch for changes and automatically build as necessary.

### Linking the built project to Foundry VTT

In order to provide a fluent development experience, it is recommended to link
the built module to your local Foundry VTT installation's data folder. In
order to do so, first add a file called `foundryconfig.json` to the project root
with the following content:

```
{
  "dataPath": "/absolute/path/to/your/FoundryVTT"
}
```

(if you are using Windows, make sure to use `\` as a path separator instead of
`/`)

Then run

```
yarn link-project
```

On Windows, creating symlinks requires administrator privileges, so unfortunately
you need to run the above command in an administrator terminal for it to work.

## Licensing

This project is being developed under the terms of the
[LIMITED LICENSE AGREEMENT FOR MODULE DEVELOPMENT] for Foundry Virtual Tabletop.

Please add your licensing information here. Add your chosen license as
`LICENSE` file to the project root and mention it here.  If you don't know which
license to choose, take a look at [Choose an open source license].

[LIMITED LICENSE AGREEMENT FOR MODULE DEVELOPMENT]: https://foundryvtt.com/article/license/
[Choose an open source license]: https://choosealicense.com/
