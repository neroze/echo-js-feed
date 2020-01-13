const Feed = require('rss-to-json');
const figlet = require('figlet');
const clear = require('clear')
const terminalLink = require('terminal-link');
const Spinner = require('cli-spinner').Spinner;
const chalk = require('chalk');
const axios = require('axios')

const package = require('./package.json')

const AFeed = (title, link) => {
    return chalk.green(terminalLink(title, link))
}

const Progress = () => {
    var spinner = new Spinner('Fetching... %s');
    spinner.setSpinnerString('|/-\\');
    spinner.start();

    return spinner;
}

const PrintFeed = (feeds) => {
    for (feed of feeds) {
        console.log(`# ${AFeed(feed.title, feed.link)}`)
        console.log(chalk.cyan(`       -- ${feed.link}`))
    }
}

figlet('EchoJS', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    clear()
    console.log(data)
    const p1 = Progress()
    Feed.load('http://www.echojs.com/rss', function(err, rss = []) {
        p1.stop()

        axios.get('https://cdn.jsdelivr.net/npm/echo-js-feed/package.json')
        .then(response => {
            console.log('\n');
            console.log(chalk.red(`Local version: ${package.version} vs Latest version: ${response.data.version}`))
            if (package.version !== response.data.version) {
                console.log(chalk.bgRed(`New Version: ${response.data.version}, available please update module.`));
            }
        })
        .then(() => {
            if (rss.items) {
                PrintFeed(rss.items)
            }
        })
        .catch(error => {
            console.log(error);
        });

        
    });
    
});
