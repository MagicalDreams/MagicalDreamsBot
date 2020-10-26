'use_strict'

const {Client, RichEmbed, reaction, user, message, member, guildMember, serverNewMember, guildMemberAdd, roles, role, guilds} = require('discord.js')
const E = require('events');
const request = require('request');
const cheerio = require('cheerio');
const async = require('async');
const separateReqPool = {maxSockets: 15};
require('events').EventEmitter.defaultMaxListeners = 25
const bot = new Client();
const ms = require("ms");
const fs = require('fs');
let tweets={},apiurls=[],N=[];
var score = 161;

const ytdl = require("ytdl-core");
const opusscript = require("opusscript");
const ffmpeg = require("ffmpeg-static");


var servers = {};
var connection = {};



bot.login(process.env.token);

const PREFIX = 'md!'

const ping = require('minecraft-server-util')







//bot.login(process.env.token);
//bot.login(token)

bot.on('ready' , (oldMessage, newMessage) =>{
    console.log('MDBot is Online!');

    bot.user.setActivity('md!help', {type: 'Watching'})
    
    
    const guild = bot.guilds.get("365007577060212736");
    
   let Manager = guild.roles.find("name", "Manager");
let Coord = guild.roles.find("name", "Coordinator");
let Dev = guild.roles.find("name", "Developer");
let CM = guild.roles.find("name", "Cast Member");
let IN = guild.roles.find("name", "Intern");

    
})



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
///////////////////////////  CONFIGURE TWITTER HANDLERS /////////////////////////////////////////////////////
var THandlers=[
    {
        name:'TwitterWeb',
        url:"https://https://twitter.com/MagicalDreamDev",
        webhook:"https://discordapp.com/api/webhooks/717587493943509064/u_0tBCJYCKrR9Ki9tJ52q7SFI-30-k9GYNyfubeY05m1p2Ff9KFN0vE42ii9wGTPOW9g",
        avatar_url:"https://twitter.com/MagicalDreamDev/photo",
        keywords:"[STATUS]",
    }
];
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ADD TWEETS
THandlers.forEach((th,i) => {
    tweets[th.url] = [];
    apiurls.push(th.url);
});
//DISCORD WEBHOOK
const sendDiscordMessage = (pl) => {
    const {content,turl} = pl;
    const {name,webhook,avatar_url} = THandlers.filter((d,i) => d.url === turl)[0];
    request.post(webhook).form({username:name,avatar_url:avatar_url,content:content});
}
console.log('Twitter => Discord program is running');
//MONITOR
setInterval(() => {
    async.map(apiurls, function(item, callback){
        request({url: item, pool: separateReqPool}, function (error, response, body) {
            try {
                const $ = cheerio.load(body);
                var turl = "https://twitter.com" + response.req.path;
                if(!tweets[turl].length){
                    //FIRST LOAD
                    for(let i=0;i<$('div.js-tweet-text-container p').length;i++){
                        tweets[turl].push($('div.js-tweet-text-container p').eq(i).text());
                    }
                }
                else{
                    //EVERY OTHER TIME
                    for(let i=0;i<$('div.js-tweet-text-container p').length;i++){
                        const s_tweet = $('div.js-tweet-text-container p').eq(i).text();
                        //CHECK IF TWEET IS NEWS
                        if(tweets[turl].indexOf(s_tweet) === -1){
                            tweets[turl].push(s_tweet);
                            const th_kw = THandlers.filter((d,i) => d.url === turl)[0].keywords.split(',');
                            const th_name = THandlers.filter((d,i) => d.url === turl)[0].name; 
                            let nFlag=false;
                            th_kw.forEach((kw,j) => {
                                if(kw === '*'){
                                    nFlag=true;
                                }
                                else{
                                   if(s_tweet.indexOf(kw) != -1){
                                        nFlag=true;
                                    }
                                }
                            });
                            if(nFlag){
                               sendDiscordMessage({content:s_tweet,turl:turl});
                            }
                        }
                    }
                }           
                 
            } catch (e) {
                  console.log('Error =>' + e);
            }
        });
    }, function(err, results){
            //console.log(results);
    });
},1000);//RUNS EVERY 1 SECONDS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/







bot.on("guildMemberAdd", member => {
    
    


    member.send("Welcome to our server! ")
    member.send("Here are the rules:")
    member.send("• No spamming in chats - This includes but is not limited to, loud/obnoxious noises in voice, @mention spam, character spam, image spam, and message • Do not make fun of, or bully other park guests. - Keeping a friendly, fun environment is enjoyable for all guests! • No advertising other servers or organizations. - Do not link to other Minecraft/Discord servers. - Do not link YouTube or Twitch channels. - Do not link any social media platforms (Twitter, Instagram, Facebook, etc). This excludes the official MagicalDreams platforms and/or any of our partners. • Sharing of personal information (like passwords) or doxing is prohibited. ")
    member.send("• Don't post NSFW/offensive/harmful content. • Use the appropriate channels and abide by their descriptions. • Please avoid using offensive or vulgar language, we maintain a family-friendly network • Do not ping staff members or executives constantly or for no reason")
    member.send("• Respect all staff member decisions, although if you feel like a staff member is abusing their power - contact a Manager. • If a post or rule is in question, contact a Cast Member and they will make the final judgement. • Be respectful to one another and do not cause drama. • Breaking these rules could result in a kick, ban, or mute. Follow these rules and have fun!!")
        .catch(console.error);
        
            const JoinEmbed = new RichEmbed()
            .setColor('RANDOM')
            .setTitle('Magical Dreams: Verify')
            .addField('After you have read all of this, react to this message!')
            member.send(JoinEmbed)

            
    
    
});

bot.on("messageReactionAdd", async (reaction, user) => {
    // If a message gains a reaction and it is uncached, fetch and cache the message.
    // You should account for any errors while fetching, it could return API errors if the resource is missing.
    if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.
    if (reaction.partial) await reaction.fetch();
    
    if (user.bot) return; // If the user was a bot, return.
    if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
    if (reaction.message.guild.id !== "708395721782722581") return; // Use this if your bot was only for one server/private server.
    
    if (reaction.message.channel.id === "756614228605009961") { // This is a #self-roles channel.
      if (reaction.emoji.name === "white_check_mark") {
         reaction.message.guild.members.cache.get(user.id).roles.add("756612432830398606") // Minecraft role.
         reaction.message.guild.members.cache.get(user.id).roles.remove("756625090917171245")
        }
      
    }
  })






bot.on('message', msg=>{

    let args = msg.content.substring(PREFIX.length).split(' ')
    
        const guild = bot.guilds.get("365007577060212736");
    
   let Manager = guild.roles.find("name", "Manager");
let Coord = guild.roles.find("name", "Coordinator");
let Dev = guild.roles.find("name", "Developer");
let CM = guild.roles.find("name", "Cast Member");
let IN = guild.roles.find("name", "Intern");


    switch (args[0]) {
        case 'mute':


            msg.delete();
        
            var person  = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[1]));
            if(!person) return  msg.reply("I CANT FIND THE USER " + person)
 
            let mainrole = msg.guild.roles.find(role => role.name === "{Verified}");
            let role = msg.guild.roles.find(role => role.name === "Muted");
           
 
            if(!role) return msg.reply("Couldn't find the mute role.")
 
 
            let time = args[2];
            if(!time){
                return msg.reply("You didnt specify a time!");
            }
 
            person.removeRole(mainrole.id)
            person.addRole(role.id);
 
 
            msg.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
 
            setTimeout(function(){
                
                person.addRole(mainrole.id)
                person.removeRole(role.id);
                console.log(role.id)
                msg.channel.send(`@${person.user.tag} has been unmuted.`)
            }, ms(time));
 
 
    
        break;
    }

/*
    if (msg.
    .roles((role) => role.name === 'Nitro Boosters')){
        msg.member.roles.add(715394475869863996); //MD Server
        msg.member.roles.add(721976858006126632); //Testing Server
    }else{
        return;
    }
*/
    

    
    
    switch(args[0]){
        case 'play':
            
                    msg.channel.send('✅ Okay, Adding song to queue! 👍')

         score = score+1;

            function play(connection, msg){

            var server = servers[msg.guild.id];

            server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioandvideo"}));
                
                score = score+1;

            server.queue.shift();

            server.dispatcher.on("end", function(){
                if(server.queue[0]){
                    play(connection, msg);
                }else{
                    connection.disconnect();
                }
            })

            }

          if(!args[1]){
            msg.channel.send("❌, You need to provide a link!")
            return;
          }

            if(!msg.member.voiceChannel){
            msg.channel.send('❌, You must be in a channel to play the bot!')
            return;
            }



            if(!servers[msg.guild.id]) servers[msg.guild.id] = {
             queue: []
            }


         var server = servers[msg.guild.id]; 

         server.queue.push(args[1]);

         if(!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(connection){
            play(connection, msg);
          })

        
        break;


        case 'skip':

            var server = servers[msg.guild.id]; 

            if(server.dispatcher) server.dispatcher.end();
            msg.channel.send('⏩, Skipping the song!');

            score = score+1;

        break;

        case 'stop':
            var server = servers[msg.guild.id]; 

            if(msg.guild.voiceConnection){
                for(var i = server.queue.length - 1; i>=0; i--){
                    server.queue.splice(i, 1);
                }

                server.dispatcher.end();
                msg.channel.send('🛑, Ending the queue leaving the voice channel!')
                console.log('stopped the queue');
            }

            if(msg.guild.connection) msg.guild.voiceConnection.disconnect();

        break;
    }

    switch(args[0]){
        case "poll":
            const pollembed = new RichEmbed()
            .setColor(0xFFC300)
            .setTitle("Initiate Poll")
            .addField('md!poll', ' to initiate a simple yes or no poll');

            if(!args[1]){
                msg.reply(pollembed)
            }

            let msgArgs = args.slice(1).join(' ');

            msg.reply(msgArgs).then(messageReaction =>{
                messageReaction.react("👍");
                messageReaction.react("👎");
            })

        break;
    }
    
    
    
    
    
   
    
    
    
    
    
     switch (args[0]) {
    case 'restart':    
        
    msg.delete(1000);
        msg.reply('Ok Restarting Now...');
        bot.destroy();
          bot.login(process.env.token);  
       
   
    }

     switch (args[0]) {
    case 'shutdown': 
        msg.reply('Ok Stopping Now...');
        bot.destroy();
      
    }
 
    
    
    
    
    
    
    
    
    
    
    
    
 
    switch(args[0]){
        case 'server':


     //       if(!args[1]) return message.channel.send('You must type a minecraft server ip')
        //    if(!args[2]) return message.channel.send('You must type a minecraft server port')
 
            ping('magicaldreams.us', 25565, (error, resonse) =>{
                if(error) throw error

                const serverEmbed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle('Server Status')
                .addField('Server IP', "magicaldreams.us")
                .addField('Server Version', "1.15.2")
                .addField('Online Players', "Server Temporary Closed")
               // .addField('Online players', resonse.onlinePlayers)
              //  .addField('Max Players', resonse.maxPlayers)
                .addField('Server Updates', "• EKR opening: `Delayed`")
               msg.reply(serverEmbed)

               score = score+1;

               console.log(score)

            })
        break
 
    }

    switch(args[0]){
        case 'help':

            const helpEmbed = new RichEmbed()
            .setColor(0xF0FF00)
            .setTitle('Magical Dreams: Help')
            .addField('Server Status', "md!server")
            .addField('Create A Poll', 'md!poll')
            .addField('Music', 'md!play (with yt link), md!skip , md!stop     ----Join #Music to listen----')
            .addField('Managers', "managers")
            .addField('Apply for Staff', "app , apply , application")
            .addField('md!server ip', 'ip,  server ip')
            .addField('Staff Commands', 'md!admin')
            .addField('About MDBot', 'md!about')
            .addField("People Bio's",'md!chums, md!kindal, md!nono , md!kara, md!bode , md!ben, md!65')

           msg.channel.send(helpEmbed)
           score = score+1;

           console.log(score)
    }

    switch(args[0]){
        case 'about':
           score = score+1;

           const aboutEmbed = new RichEmbed()
            .setColor("RANDOM")
            .setTitle('Magical Dreams: About')
            .addField('Current Build Version', "v1.7.2")
            .addField('Current Score Since Build', score)
            .addField('Author', "nono(developer_nono)")
            .addField('Website', 'https://github.com/nolant108')

           msg.reply(aboutEmbed)
           console.log(score)
    }


    switch(args[0]){
        case 'admin':

            if(!msg.member.roles.find(r => r.name === "Tod")){
                        score = score+1;
                console.log(score)
                const adminEmbed = new RichEmbed()
                .setColor(0x2AFF00)
                .setTitle('Magical Dreams: Admin Settings')
                .addField('Current Build Version3', "hello")
            }else{

                score = score+1;
                console.log(score)

                msg.reply('YOU DO NOT HAVE PERMISSIONS').then(msg => msg.delete(10000))
            }
    
              break;
    }

    switch(args[0]){
        case 'nono':
           score = score+1;

           const nonoEmbed = new RichEmbed()           
            .setColor(0x2AFF00)
            .setTitle('Magical Dreams: NONO(developer_nono)')
            .addField('⬇️ Coding Memes ⬇️', 'OOOOOOOOOF...')
            .addField('When you write 10 lines of code without searching on stackoverflow or google', '(╯°□°）╯︵ ┻━┻')
            .addField('Me: Clicks "Compile"*', 'My $2000 labtop: Jet engine roar(sound)')
            .addField('Confidence Level of a Programmer', '- I can’t fix this - Crisis of confidence - Questions career - Questions life - Oh it was a type')
            .addField('Android Dev Page','https://play.google.com/store/apps/dev?id=5577325587016618086')

           msg.reply(nonoEmbed)
           console.log(score)
    }

    switch(args[0]){
        case 'kindal':
           score = score+1;

           const kindalEmbed = new RichEmbed()
            .setColor(0x2AFF00)
            .setTitle('Magical Dreams(Former Staff): MakingMiners')
            .addField('Bio', 'We keep moving forward, opening new doors, and doing new things, because were curious and curiosity keeps leading us down new paths. Oh and by the way.. I’m Kindal tehe')
            .addField('I say...', 'Useless')


           msg.reply(kindalEmbed)
           console.log(score)
    }

    
    switch(args[0]){
        case 'chums':
           score = score+1;

           const chumsEmbed = new RichEmbed()            .setColor(0x2AFF00)
            .setTitle('Magical Dreams: chums122')
            .addField('Yoda says', 'Only Just Begun, The meme war has')
            .addField('Did you ever hear the Tragedy of Darth Plagueis the wise?'
            , ' I thought not. Its not a story the Jedi would tell you. Its a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life... He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful... the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Its ironic he could save others from death, but not himself.')


           msg.reply(chumsEmbed)
           console.log(score)
    }


switch(args[0]){
    case 'ben':
       score = score+1;

       const benEmbed = new RichEmbed()
        .setColor(0x2AFF00)
        .setTitle('Magical Dreams: Ben[OhBen]')
        .addField('Ben is...', 'an awesome ride technician and trainer')
        .addField('Ben is...', 'an awesome ride technician and trainer!!!')
        .addField('Ride breaks down...', 'coffin dance plays')

       msg.reply(benEmbed)
       console.log(score)
}

switch(args[0]){
    case '65':
       score = score+1;

       const sixfiveEmbed = new RichEmbed()    
           .setColor(0x2AFF00)
        .setTitle('Magical Dreams: 65Thomas')
        .addField('65 Thomas is...', 'out to lunch.')
        .addField('He’s always hungry...', 'so it might take a minute.')
        .addField('Unless you have a cookie....', 'Then he’ll come running.')

       msg.reply(sixfiveEmbed)
       console.log(score)
}


    switch(args[0]){
        case 'bode':
           score = score+1;

           const bodeEmbed = new RichEmbed()
            .setColor(0x2AFF00)
            .setTitle('Magical Dreams(Former Staff): Bode (Disneyland_)')
            .addField('Whomst', 'Iz Bode')
            .addField('and BTW', 'You Just got Vectored')


           msg.reply(bodeEmbed)
           console.log(score)
    }

    switch(args[0]){
        case 'kara':
           score = score+1;

           const karaEmbed = new RichEmbed()            .setColor(0x2AFF00)
            .setTitle('Magical Dreams: Kara (_Kara)')
            .addField('kara is a cool kat coordinator', 'kara is a cool kat coordinator!!!!!!!!')
            .addField('And She is...', 'A Dancing Queen')
            .addField('kara gets the', 'limo out front')
            .addField("Server Mom!!", "Kara is the server mom, lol")


           msg.reply(karaEmbed)
           console.log(score)
    }
    
      if(msg.content === 'A113'){
            score = score+10;
            msg.delete(1000)
            msg.author.send('You have overridden the systen, Go into dev mode, contact @Mzg4NzE2NDcwNzcyODI2MTEy (Hint Convert this) , DM: ||System Override A113||').then(msg => msg.delete(20000))
            msg.reply('You have 20 sec to do this then it deletes.').then(msg => msg.delete(7000))
            console.log(score)

    }

    if(msg.content === 'website'){

        msg.reply('Here is the website: https://magicaldreams.us/');
        score = score+1;

        console.log(score)
    }


    

    if(msg.content === 'website?'){

        msg.reply('Here is the website: https://magicaldreams.us/');
        score = score+1;

        console.log(score)
    }

    

    if(msg.content === 'app'){

        msg.reply('About a 2 week waiting period, here is the website: https://magicaldreams.us/apply/');
        score = score+1;

        console.log(score)
    }
    
        if(msg.content === 'apply'){

        msg.reply('About a 2 week waiting period, here is the website: https://magicaldreams.us/apply/');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'app?'){

        msg.reply('About a 2 week waiting period, here is the website: https://magicaldreams.us/apply/');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'application'){

        msg.reply('About a 2 week waiting period, here is the website: https://magicaldreams.us/apply/');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'ip'){

        msg.reply('Server ip is: magicaldreams.us');
        score = score+1;

        console.log(score)
    }

switch(args[0]){
    case 'server ip':
       score = score+1;

        msg.reply('Server ip is: magicaldreams.us');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'shamu'){

        msg.reply(':happy: :happy: :happy: :happy: :happy: :happy: :happy: :happy: :happy: :happy: :happy:(cant to cross emojis) ');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'managers'){

        msg.reply('Current Managers are: Chums122, DreamBig02, Will(OmniWill), Rei_Arch');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'who are the managers'){

        msg.reply('Current Managers are: Chums122, DreamBig02, Will(OmniWill), Rei_Arch');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'Good morning!'){

        msg.reply('Morning to you too! :)');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'morning'){

        msg.reply('Morning to you too! :) ');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'morning!'){

        msg.reply('Morning to you too! :) ');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'Morning!'){

        msg.reply('Morning to you too! :) ');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'Morning'){

        msg.reply('Morning to you too! :) ');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'im good how are you'){

        msg.reply('I am going well, thanks for asking! :)');
        score = score+1;

        console.log(score)
    }

    //----------------------swear filter-----------------------

/*
    let wordArray = msg.content.split(" ");
    console.log(wordArray);
    let filterWords = ['fuck', 'shit', 'hell', '$h!t', 'asshole', 'son of a bitch', 'bitches'];
    for(var i = 0; 1 < filterWords.length; i++) {
        msg.delete();
        msg.channel.send('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
            
    }
*/








    if(msg.content === 'fuck'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === 'Fuck'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === 'testing fucking swear filter'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === 'fuck me'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    
    if(msg.content === 'Fuck'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === 'shit'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === 'hell'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === '$h!T'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === '$h!t'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === 'asshole'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === 'son of a bitch'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }


})
