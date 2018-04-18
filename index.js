//TAIGA

const discord = require('discord.js')
const bot = new discord.Client();
const tjson = "taiga.json"
const config = require("./config.json");
const yt = require('ytdl-core');

var fs = require("fs");
var jsont = lerjson(tjson);
var fortunes = [
    "**sim**",
    "**não**",
    "**talvez**",
    "**não sei**",
    "**pergunta la no posto ipiranga**"
];

var servers = {};

bot.on('ready', () => {
    console.log(`A taiga e linda (^-^)  ${bot.users.size} Usuarios, ${bot.guilds.size} Servidores`);
    console.log(`Prefix = ${config.prefix}`);
    console.log(jsont.log)
    bot.user.setPresence({ status: 'online', game: { name: 'Toradora!', type: 'watching' } });
});

function lerjson(ajson){
	var cont = fs.readFileSync(ajson);
	return JSON.parse(cont);
}

function gravarjson(dados, ajson){
    fs.writeFileSync(ajson, JSON.stringify(dados));
}

bot.on("guildCreate", guild => {
  console.log(`Entrei no servidor : ${guild.name} (id: ${guild.id}). tem ${guild.memberCount} membros!`);
  client.user.setActivity(`Em ${bot.guilds.size} servidores!`);
});

bot.on("guildDelete", guild => {
  console.log(`Eu fui removida do servidor : ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Em ${bot.guilds.size} servidores!`);
});

bot.on("message" , message => {
  if (message.content === "<@435256210414108672> prefix") {
    var embed = new discord.RichEmbed()
      .setDescription(`Prefixo atual: **${config.prefix}**`)
      .setColor(jsont.cor);
    message.channel.send(embed);
  }
})


bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;
  
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    if(command === "ping") {
        var embed = new discord.RichEmbed()
        .setDescription(":ping_pong: | Ping : " + bot.ping + "ms")
        .setColor(jsont.cor)
        message.channel.send(embed);
      console.log(`Comando : "ping" usado`)
    }

    if(command === "info") {
        var embed = new discord.RichEmbed()
        .setTitle(jsont.tituloi)
        .addField("•Dono:", jsont.dono, true )
        .addField("•Versão:", jsont.versao, true )
        .addField("•Ping:", "" + bot.ping + "", true)
        .addField("•Prefixo:", `${config.prefix}`, true)
        .setThumbnail(jsont.avatar)
        .setColor(jsont.cor)
        message.channel.send(embed);
      console.log(`Comando "info" usado`)
    }

    if(command === "avatar") {
        let member = message.mentions.members.first() ? message.mentions.members.first().user : message.author;
        let avatarURL = member.avatarURL;
        var embed = new discord.RichEmbed() 
        .setTitle("Link Direto")
        .setURL(avatarURL)
        .setImage(avatarURL)
        .setColor(jsont.cor);
        message.channel.send(embed);
      console.log(`Comando "avatar" usado`)
    }

    if(command === "8ball") {
        if (args[1]) var embed = new discord.RichEmbed()
        .setDescription(fortunes[Math.floor(Math.random() * fortunes.length)])
        .setColor(jsont.cor)
        message.channel.send(embed);
    console.log(`Comando "8ball" usado`)
    }

    if(command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 
        var embed = new discord.RichEmbed()
        .setDescription(sayMessage)
        .setColor(jsont.cor)
      message.channel.send(embed);
    console.log(`comando "say" usado. Mensagem: ${sayMessage}`)
    
      }

      if(command === "kick") {

        if(!message.member.roles.some(r=>[jsont.cargo].includes(r.name)) )
          return message.reply("Verifique se voce tem o cargo **Taiga-Chan**");
        
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member)
          return message.reply("Por Favor mencione um membro");
        if(!member.kickable) 
          return message.reply("Não consegui kickar o membro ele tem um cargo maior que o meu ou não tenho essa permissão");
        
    
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "Por Favor defina uma razão";
        
        await member.kick(reason)
          .catch(error => message.reply(`Desculpe ${message.author} Eu não consegui kickar o membro porque : ${error}`));
          var embed = new discord.RichEmbed()
          .setDescription(`**${member.user.tag} foi kickado por ${message.author.tag}**`)
          .setColor(jsont.cor);
        message.channel.send(embed);
      console.log(`Comando "kick" usado`)
      }

      if(command === "ban") {
        if(!message.member.roles.some(r=>[jsont.cargo].includes(r.name)) )
          return message.reply("Verifique se voce tem o cargo **Taiga-Chan**");
        
        let member = message.mentions.members.first();
        if(!member)
          return message.reply("Por Favor mencione um membro");
        if(!member.bannable) 
          return message.reply("Não consegui kickar o membro ele tem um cargo maior que o meu ou não tenho essa permissão");
    
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "Por Favor defina uma razão";
        
        await member.ban(reason)
          .catch(error => message.reply(`Desculpe ${message.author} Eu não consegui banir porque : ${error}`));
          var embed = new discord.RichEmbed()
          .setDescription(`**${member.user.tag} foi banido por ${message.author.tag}**`)
          .setColor(jsont.cor);
        message.channel.send(embed);
      console.log(`Comando "ban" usado`)
      }

    if(command === "stats") {
      var embed = new discord.RichEmbed()
        .setDescription(`**Estou em  ${bot.guilds.size} servidores com ${bot.users.size} usuarios**`)
        .setColor(jsont.cor)
      message.channel.send(embed);
    console.log(`Comando "stats" usado`)
    }

    if(command === "entrar") {
      if (message.member.voiceChannel){
      const channel = message.member.voiceChannel;
        channel.join();
        var embed = new discord.RichEmbed()
        .setDescription("**Entrando no canal de voz** :white_check_mark:")
        .setColor(jsont.cor)
      message.channel.send(embed)
    console.log(`comando "entrar" usado`)
    }
    else if (!message.member.voiceChannel){
      var embed = new discord.RichEmbed()
      .setDescription("**você precisa estar em um canal de voz primeiro!**")
      .setColor(jsont.cor)
    message.channel.send(embed)}
  }

    if(command === "sair") {
      if (message.member.voiceChannel){
        const channel = message.member.voiceChannel;
        channel.leave();
        var embed = new discord.RichEmbed()
        .setDescription("**Saindo do canal de voz**")
        .setColor(jsont.cor)
      message.channel.send(embed)
    console.log(`Comando "sair" usado`)
    }
    else if (!message.member.voiceChannel){
      var embed = new discord.RichEmbed()
        .setDescription("**Você precisa estar em um canal de voz primeiro!**")
        .setColor(jsont.cor)
      message.channel.send(embed)
    }
  }

  if(command === "tocar") {
    const voiceChannel = message.member.voiceChannel;
        if (args === ""){
            message.reply('i need a link to play a youtube video');
            console.log('message didnt send');
        }
        else {
            if (message.content.includes("http://") || message.content.includes("https://")) {
                if (message.content.includes("youtube") || message.content.includes("youtu.be")) {

                   var embed = new discord.RichEmbed()
                   .setDescription(":white_check_mark: **Conectado**")
                   .setColor(jsont.cor)
                  message.channel.send(embed)
                    voiceChannel.join()
                    .then(connection => {
                        const args = message.content.split(" ").slice(1);
                        let stream = yt(args.join(" "));
                        yt.getInfo(args.join(" "), function(err, info) {
                            const title = info.title
                            var embed = new discord.RichEmbed()
                            .setDescription(`Tocando agora \**${title}\**`)
                            .setColor(jsont.cor)
                          message.channel.send(embed)
                        })
                        const dispatcher = connection.playStream(stream, {audioonly: true});
                    })
                } else {
                  var embed = new discord.RichEmbed()
                  .setDescription("Por favor defina um link")
                  .setColor(jsont.cor)
                message.channel.send(embed)
                }
            } else {
              var embed = new discord.RichEmbed()
              .setDescription("Por favor defina um link")
              .setColor(jsont.cor)
            message.channel.send(embed)
            }
        }
      console.log(`Comando "play" usado`)
    }
  
});
    


bot.login(jsont.token);