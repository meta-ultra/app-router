const { isAbsolute, join, sep } = require("node:path")
const { writeFileSync } = require("node:fs")
const cac = require('cac')
const { debounce } = require("lodash");
const { watch } = require("chokidar"); // https://github.com/paulmillr/chokidar
const { format } = require("prettier"); // https://prettier.io/docs/en/api.html
const { getMetaRoutes, generateRouter } = require("./core/index.js");

const cli = cac('app-router')

cli.help()
cli.version('1.0.0')

cli.option('--hash', 'Use hash instead of history API', {
  default: false,
})
cli.option('--basename [basename]', 'The URL basename', {
  default: '/',
})
cli.option('--watch, -w', 'Enable watch mode', {
  default: false,
})
cli.option('--watch-aggregate-timeout', 'Add a delay(ms) before rebuilding once the first file added or removed', {
  default: 300,
})
cli.option('--source, -s [folder]', 'The app folder path', {
  default: './src/app',
})
cli.option('--output, -o [file]', 'The router file path', {
  default: './src/router.tsx',
})

const parsed = cli.parse()
if (!parsed.options.h && !parsed.options.v) {
  const sourcePath = isAbsolute(cli.options.source) ? cli.options.source : join(process.cwd(), cli.options.source)
  const outputPath = isAbsolute(cli.options.output) ? cli.options.output : join(process.cwd(), cli.options.output)

  const main = async () => {
    const segs = outputPath.split(sep);
    segs.pop();
    const routes = getMetaRoutes(segs.join(sep), sourcePath);
    const output = generateRouter(cli.options.hash, cli.options.basename, routes);
    writeFileSync(outputPath, await format(output, { parser: 'babel' }));

    console.log('App Router config has been done.');
    if (cli.options.watch) {
      console.log('app-router is running.');
    }
  };

  if (cli.options.watch) {
    const handleChange = debounce(main, Number(cli.options.watchAggregateTimeout) || 300)
    watch(sourcePath).on('add', handleChange)
    watch(sourcePath).on('addDir', handleChange)
    watch(sourcePath).on('unlink', handleChange)
    watch(sourcePath).on('unlinkDir', handleChange)
  } else {
    main()
  }
}
