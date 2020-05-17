'use strict';

const keys = require('./keys.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const time = 10000;

client.on('message', message => {
    const channel = client.channels.cache.get('711698649847038066');
    if (message.content[0] === '!') {

        let msg = message.content.substring(1);
        if (msg === 'ping') {
          message.reply('Pong!');
        } else if (msg === 'workout') {
            channel.send('Workout started');
        } else if (msg === 'start') {

            channel.send('Timer started for ' + time/1000 + ' seconds');
            
            // let sent;
            // // Send message & Store reference to the message
            // sent = message.channel.send(time/1000);
            
            recursiveTimer(channel, time, 1000);
        }
        console.log('\'' + msg + '\' entered and did not crash');
    }

});

function recursiveTimer(channel, time, interval) {
    if (time <= 0) return;

    setTimeout(() => {
        // Edit msg 20 seconds later
        channel.send(time);
    }, interval);

    recursiveTimer(channel, time-=interval, interval);
}

client.login(keys.token);