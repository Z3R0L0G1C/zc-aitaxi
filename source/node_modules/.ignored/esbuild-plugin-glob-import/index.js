
import path from 'node:path'
import glob from 'fast-glob'

const filter = /\*/
const namespace = 'plugin-glob-imports'

export default function (opts) {
  opts ??= {}

  opts.camelCase ??= true
  opts.entryPoint ??= 'index.js'
  opts.entryPointMatch ??= arr => arr[arr.length - 1] === opts.entryPoint

  return {
    name: namespace,
    setup (build) {
      build.onResolve({ filter }, resolve)
      build.onLoad({ filter, namespace }, args => load(args, opts))
    }
  }
}

function camelCase (filename) {
  return filename
    .replace(/\.[^.]+$/, '') // removes extension
    .replace(/[-_](\w)/g, (match, letter) => letter.toUpperCase())
}

function resolve (args) {
  const resolvePaths = []
  const loadpath = path.join(args.resolveDir, args.path)

  let files = glob.sync(loadpath)
  files = files.length === 0 ? [loadpath] : files

  for (let i = 0; i < files.length; i++) {
    resolvePaths.push(path.relative(args.resolveDir, files[i]))
  }

  return {
    namespace,
    path: args.path,
    pluginData: {
      resolveDir: args.resolveDir,
      resolvePaths
    }
  }
}

function load (args, opts) {
  const pluginData = args.pluginData
  const paths = pluginData.resolvePaths

  const data = []
  const obj = {}

  for (let i = 0; i < paths.length; i++) {
    const filepath = paths[i]
    const arr = filepath.split('/')
    const name = '_module' + i

    arr.shift()

    if (opts.entryPointMatch?.(arr)) {
      arr.pop()
    }

    let prev = obj

    for (let i = 0; i < arr.length; i++) {
      let key = arr[i]

      if (typeof prev === 'string') {
        continue
      }

      if (opts.camelCase) {
        key = camelCase(key)
      }

      if (i === arr.length - 1) {
        data.push(`import ${prev[key] = name} from './${filepath}'`)
        continue
      }

      prev = prev[key] ??= {}
    }
  }

  let output = JSON.stringify(obj)
  output = output.replace(/"_module\d+"/g, match => match.slice(1, -1))

  return {
    resolveDir: pluginData.resolveDir,
    contents: data.join('\n') + '\nexport default ' + output
  }
}
