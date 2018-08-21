/*
                            __...------------._
                         ,-'                   `-.
                      ,-'                         `.
                    ,'                            ,-`.
                   ;                              `-' `.
                  ;                                 .-. \
                 ;                           .-.    `-'  \
                ;                            `-'          \
               ;                                          `.
               ;                                           :
              ;                                            |
             ;                                             ;
            ;                            ___              ;
           ;                        ,-;-','.`.__          |
       _..;                      ,-' ;`,'.`,'.--`.        |
      ///;           ,-'   `. ,-'   ;` ;`,','_.--=:      /
     |'':          ,'        :     ;` ;,;,,-'_.-._`.   ,'
     '  :         ;_.-.      `.    :' ;;;'.ee.    \|  /
      \.'    _..-'/8o. `.     :    :! ' ':8888)   || /
       ||`-''    \\88o\ :     :    :! :  :`""'    ;;/
       ||         \"88o\;     `.    \ `. `.      ;,'
       /)   ___    `."'/(--.._ `.    `.`.  `-..-' ;--.
       \(.="""""==.. `'-'     `.|      `-`-..__.-' `. `.
        |          `"==.__      )                    )  ;
        |   ||           `"=== '                   .'  .'
        /\,,||||  | |           \                .'   .'
        | |||'|' |'|'           \|             .'   _.' \
        | |\' |  |           || ||           .'    .'    \
        ' | \ ' |'  .   ``-- `| ||         .'    .'       \
          '  |  ' |  .    ``-.._ |  ;    .'    .'          `.
       _.--,;`.       .  --  ...._,'   .'    .'              `.__
     ,'  ,';   `.     .   --..__..--'.'    .'                __/_\
   ,'   ; ;     |    .   --..__.._.'     .'                ,'     `.
  /    ; :     ;     .    -.. _.'     _.'                 /         `
 /     :  `-._ |    .    _.--'     _.'                   |
/       `.    `--....--''       _.'                      |
          `._              _..-'                         |
             `-..____...-''                              |
                                                         |
                        art by mGk                       |

                        IT'S A HACK!

Even with the Chokidar option enabled and configured,
Rollup refuses to watch monorepo-wide source files.
I thus rolled my own watcher that consumes Chokidar directly
and uses  ̶h̶a̶c̶k̶s̶ magic to rebuild any changed packages
and in turn rebuilding the game's rollup bundle. Maaagiiic.

Once the game is complete, it will be moved from the Sect monorepo
to a repository of its own, thus this masterpiece is temporary.
*/

'use strict';

const child_process = require('child_process');
const path = require('path');
const chokidar = require('chokidar');
const puppeteer = require('puppeteer');
const typescript = require('typescript');
const createObservableWatcher = require('./observableWatcher');
const currentPackageMetadata = require(path.join(process.cwd(), 'package.json'));

const isRepoRoot = currentPackageMetadata.name === 'sect-monorepo';

if (!isRepoRoot) {
    throw new Error('Please run from the monorepo`s root!');
}

const createOpenedGamePage = async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });

    const page = await browser.newPage();
    const appPath = `file://${path.resolve(__dirname, '..', 'dist', 'index.html')}`;

    await page.goto(appPath);

    return page;
};

const injectRebuildingBanner = async page => {
    await page.evaluate(() => {
        const banner = document.createElement('div');

        banner.style = `
            font-family: Arial;
            font-size: 48px;
            text-align: center;
            background-color: red;
            color: white;
            font-weight: bold;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
        `;

        banner.textContent = 'Rebuilding...';

        document.body.appendChild(banner);
    });
};

const getTsArgs = () => {
    const tsConfig = require(path.join(__dirname, '..', 'tsconfig.json'));

    /* Skipping some checks to improve dev
     * build times. Full type checking will
     * occur when running the prod build. */
    const options = {
        ...tsConfig.compilerOptions,
        skipDefaultLibCheck: true,
        skipLibCheck: true,
    };

    return Object.entries(options).map(
        ([key, value]) => `--${key} ${Array.isArray(value) ? `${value.join(',')}` : value}`
    ).join(' ');
};

(async () => {
    const page = await createOpenedGamePage();

    const isValidSourcePath = path =>
        !path.includes('node_modules')
        && !path.includes('dist')
        && !path.includes('.rpt2_cache');

    console.log('Listening for monorepo source changes...');

    createObservableWatcher(chokidar.watch('packages'))
        .subscribe('change')
        .filter(isValidSourcePath)
        .log(path => `Change detected for ${path}`)
        .map(path => {
            const [, packageRoot, file] = /(packages.*)\/(src\/.*)/.exec(path);

            return {
                file,
                packageRoot,
            };
        })
        .log(({ file }) => `Compiling ${file}...`)
        .await(async () => await injectRebuildingBanner(page))
        .do(({ packageRoot, file }) => {
            if (!packageRoot.includes('js13kgames-2018')) { // imperative code in observable === 'eww', but no time to fix now
                child_process.execSync(`npm run build -- ${file} ${getTsArgs()}`, {
                    cwd: packageRoot,
                    stdio: [
                        null,
                        process.stdout,
                        process.stderr,
                    ],
                });
            }
        })
        .log(({ file }) => `Built ${file}! Rebuilding game...`)
        .do(() => {
            child_process.execSync('npm run build', {
                cwd: path.join(__dirname, '..'),
                stdio: [
                    null,
                    process.stdout,
                    process.stderr,
                ],
                env: {
                    ...process.env,
                    NODE_ENV: 'dev',
                },
            });
        })
        .log(() => `Game built!`)
        .await(async () => await page.reload());
})();
