'use strict';

const keys = require('./keys.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

let exercises = [];
let breakTime = {name:'break',time:5000};
let listening = false;
let setTime = 60000;

client.on('message', function(message) {
    const channel = client.channels.cache.get('711698649847038066');
    let time = [0];

    if (message.content[0] === '!') {

        let msg = message.content.substring(1).split(' ');
        if (msg[0] === 'ping') {
          message.reply('Pong!');
        } else if (msg[0] === 'workout') {
            channel.send('Workout started');
        } else if (msg[0] === 'set') {
            exercises = [];
            if (msg.length > 1) {
                msg.shift();
                let newMSG = msg.join(' ');
                newMSG = newMSG.split(',');
                console.log(newMSG);
                for (let i = 0; i < newMSG.length; i++) {
                    exercises.push(newMSG[i]);
                    exercises.push(breakTime.name);
                }
            }
        } else if (msg[0] === 'start') {
            if (msg.length > 1) {
                if (msg[1] === 'list') {
                    for (let i = 2; i < msg.length; i++) {
                        if (!isNaN(msg[i])) {
                            time[i - 2] = parseInt(msg[i]) * 1000;
                        }
                    }
                } else if (!isNaN(msg[1])) {
                    for (let i = 1; i < msg.length; i++) {
                        time.push(parseInt(msg[i]) * 1000);
                        time.push(breakTime.time);
                    }
                    time.pop();
                } else if (msg[1] === 'default') {
                    for (let i = 1; i < exercises.length; i++) {
                        time.push(parseInt(setTime));
                        time.push(breakTime.time);
                    }
                    console.log(time);
                }
            }
            timerFunc(channel,time);
        } else if (msg[0] === 'participants') {
            listening = true;
        } else if (msg[0] === 'add') {
            
        } else if (msg[0] === 'break') {
            if (msg.length > 1) {
                if (!isNaN(msg[1])) {
                    breakTime.time = msg[1]*1000;
                }
            }
        } else if (msg[0] === 'setTime') {
            if (msg.length > 1) {
                if (!isNaN(msg[1])) {
                    setTime = msg[1]*1000;
                }
            }
        }
        console.log('\'' + msg + '\' entered and did not crash');
    }

});

var timerFunc = function(channel,time) {
    let sum = 0;
    for (let i = 0; i < exercises.length; i++) {
        sum += time[i];
        setTimeout(() => {

            if (i === time.length - 1) {
                channel.send('<@&712363798631022615>, exercise done!');
            } else if (i !== 0) {

                if (i % 2 === 0)
                    channel.send('<@&712363798631022615>, next exercise is ' + exercises[i] + ' for ' + time[i+1]/1000 + ' seconds!');
                else 
                    channel.send('<@&712363798631022615>, break time for ' + time[i+1]/1000 + ' seconds!');

            } else {
                channel.send('<@&712363798631022615>, first exercise is ' + exercises[i] + ' for ' + time[i+1]/1000 + ' seconds!');
            }

        }, sum);
    }
    removeParticipants(channel);
}

var removeParticipants = function(channel) {
    listening = false;
}

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