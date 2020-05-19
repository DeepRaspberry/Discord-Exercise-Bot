'use strict';

const keys = require('./keys.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

let time = [60000];

client.on('message', message => {
    const channel = client.channels.cache.get('711698649847038066');
    if (message.content[0] === '!') {

        let msg = message.content.substring(1).split(' ');
        if (msg[0] === 'ping') {
          message.reply('Pong!');
        } else if (msg[0] === 'workout') {
            channel.send('Workout started');
        } else if (msg[0] === 'start') {
            if (msg.length > 1) {
                if (msg[1] === 'list') {
                    for (let i = 2; i < msg.length; i++) {
                        if (!isNaN(msg[i])) {
                            time[i - 2] = parseInt(msg[i]) * 1000;
                        }
                    }
                } else if (!isNaN(msg[1])) {
                    time[0] = parseInt(msg[1]) * 1000;
                }
            }

            for (let i = 0; i < time.length; i++) {
                channel.send('Timer started for ' + time[i]/1000 + ' seconds'); 

                setTimeout(() => {
                    channel.send('<@&712363798631022615>, Time\'s up!');
                }, time[i]);
            }
        }
        console.log('\'' + msg + '\' entered and did not crash');
    }

});

// UTC Hardcode
// function recursiveTimer(channel, time, interval) {
//     if (time <= 0) return;

//     setTimeout(() => {
//         // Edit msg 20 seconds later
//         channel.send(time);
//     }, interval);

//     recursiveTimer(channel, time-=interval, interval);
// }

client.login(keys.token);