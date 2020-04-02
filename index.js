require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

var Filter = require('bad-words'),
    filter = new Filter();
const badWordList = 'fuc;penis;cock;suck;hoe;whore;slut;pussy;boob;vagina;drug;dope;mother;motha;dank;crack;meth;coke;cocaine;bastard;nigga;nigger;damn;cunt;ass;shit;retard;wanker'.split(';');
    filter.addWords(...badWordList);

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {

  // console.log(msg);
  if(msg.content.startsWith('!enroll')){
    const filteredMessage = filter.clean(msg.content.replace('!enroll ',''));
    if(/^[a-zA-Z][a-zA-Z\s]*$/.exec(filteredMessage)){
      if(msg.member.nickname===null){
        let studentFullName = msg.content.replace('!enroll ','');
        let studentRole = msg.member.guild.roles.find("name","student");
        msg.member.addRole(studentRole);
        msg.member.setNickname(msg.content.replace('!enroll ',''));
      }else{
        msg.channel.send('You have already been enrolled. Please reach out to an administrator to get your role or nickname updated.');
      }
    }else{
      msg.channel.send('Your name includes content that has been labeled as profanity. Please reach out to an administrator to update your role and nickname.');
    }
  }

  // if (msg.content === 'ping') {
  //   msg.reply('pong');
  //   msg.channel.send('pong');

  // } else if (msg.content.startsWith('!kick')) {
  //   if (msg.mentions.users.size) {
  //     const taggedUser = msg.mentions.users.first();
  //     msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
  //   } else {
  //     msg.reply('Please tag a valid user!');
  //   }
  // }
});
