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
simply refuses to watch monorepo-wide source files.
I thus rolled my own that consumes Chokidar directly
and uses  ̶h̶a̶c̶k̶s̶ magic to rebuild any changed packages
and in turn rebuilding the game's rollup bundle. Maaagic.

Once the game is complete, it will be moved from the Sect monorepo
to a repository of its own, thus this masterpiece is temporary.
*/

'use strict';

const path = require('path');
const chokidar = require('chokidar');
const child_process = require('child_process');
const createObservableWatcher = require('./observableWatcher');
const currentPackageMetadata = require(path.join(process.cwd(), 'package.json'));

const isRepoRoot = currentPackageMetadata.name === 'sect-monorepo';

if (!isRepoRoot) {
    throw new Error('Please run from the monorepo`s root!');
}

const isValidSourcePath = path =>
    !path.includes('node_modules')
    && !path.includes('js13kgames-2018')
    && !path.includes('dist');

console.log('Listening for monorepo source changes...');

createObservableWatcher(chokidar.watch('packages'))
    .subscribe('change')
    .filter(isValidSourcePath)
    .log(path => `Change detected for ${path}`)
    .map(path => /(packages.*)\/src\/.*/.exec(path)[1])
    .log(packageRoot => `Rebuilding ${packageRoot}`)
    .do(packageRoot => {
        child_process.execSync('npm run build', {
            cwd: packageRoot,
            stdio: [
                null,
                process.stdout,
                process.stderr,
            ],
        });
    })
    .log(path => `Built! ${path}. Rebuilding game...`)
    .do(() => {
        child_process.execSync('npm run build', {
            cwd: __dirname,
            stdio: [
                null,
                process.stdout,
                process.stderr,
            ],
        });
    })
    .log(() => `Game built!`);
