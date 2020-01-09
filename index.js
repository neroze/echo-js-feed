var Feed = require('rss-to-json');
var figlet = require('figlet');
var clear = require('clear')
const terminalLink = require('terminal-link');
var Spinner = require('cli-spinner').Spinner;
const chalk = require('chalk');

const AFeed = (title, link) => {
    return chalk.green(terminalLink(title, link))
}

const Progress = () => {
    var spinner = new Spinner('Fetching... %s');
    spinner.setSpinnerString('|/-\\');
    spinner.start();

    return spinner;
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
        console.log(typeof rss.items)
        if (rss.items) {
            for (feed of rss.items) {
                console.log(`# ${AFeed(feed.title, feed.link)}`)
                console.log(chalk.cyan(`       -- ${feed.link}`))
            }
        }
        
    });
    
});
