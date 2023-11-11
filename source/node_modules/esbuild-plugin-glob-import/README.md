
# esbuild-plugin-glob-import

Use globs to import multiple files.

## Install

```sh
$ npm i esbuild-plugin-glob-import
```

## Setup

Add the plugin to your esbuild options.

```js
import esbuild from 'esbuild'
import globImport from 'esbuild-plugin-glob-import'

esbuild.build({
  // ...
  plugins: [
    globImport()
  ]
})
```

## Options

+ `camelCase` - truthy or falsey - If truthy, this camel cases paths and filenames and removes file extensions.
+ `entryPoint` - string or falsey - Set which file in a directory is the entry point. If `entryPoint` is a string and matches a file, that module will be set on the key of the parent directory's name. If `entryPoint` is falsey all matching files will be imported and included in an object on keys of those file's names.
+ `entryPointMatch` - function or nullish - Determine which file in a directory is the entry point. This function is called for every file imported using a glob. It receives the filepath as an array. Return truthy if the path is an entry point and falsey if not.

## Example with default options

Options:

```js
const opts = {
  camelCase: true,
  entryPoint: 'index.js',
  entryPointMatch: arr => arr[arr.length - 1] === opts.entryPoint
}
```

File structure:

```
/pages
  /home
    home.css
    index.js
  /about
    /content
      summary.js
      history.js
    about.css
    index.js
  /error
    error.css
    index.js
```

Glob import statement:

```js
import pages from './pages/**/index.js'
console.log(pages)
```

Output:

```js
{
  home: function () {
    // ...
  },
  about: function () {
    // ...
  },
  error: function () {
    // ...
  }
}
```

## Alternative Example

Using the same file structure and import statement from the previous example but with different options.

Options:

```js
const opts = {
  camelCase: false,
  entryPoint: false,
  entryPointMatch: null
}
```

Output:

```js
{
  home: {
    'index.js': function () {
      // ...
    }
  },
  about: {
    'index.js': function () {
      // ...
    },
    content {
      'summary.js': function () {
        // ...
      },
      'history.js': function () {
        // ...
      }
    }
  },
  error: {
    'index.js': function () {
      // ...
    }
  }
}
```

## Prior Art

+ [esbuild](https://esbuild.github.io/)
+ [esbuild-plugin-import-glob](https://github.com/thomaschaaf/esbuild-plugin-import-glob)
+ [fast-glob](https://github.com/mrmlnc/fast-glob)
