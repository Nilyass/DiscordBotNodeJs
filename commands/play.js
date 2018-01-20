var main = require('./../bot.js');

exports.execute = (client, message, args) => {
    var voiceChannel = message.member.voiceChannel;

    // already in voice channel (bugged)
    //if(voiceChannel.connection){
    //    main.playSong(voiceChannel.connection, message.guild.id);
    //}

    if(voiceChannel == null){
        message.channel.send("You are not in a voice channel :(");
        return;
    }if(!voiceChannel.joinable){
        message.channel.send("Not allowed to join :(");
        return;
    }if(args.length < 2){
        message.channel.send("Specify a song to play :(");
        return;
    }

    voiceChannel.join()
        .then(connection => {
            console.log("Joined voice channel: " + voiceChannel.name);
            var searchString = "";
            for(var i = 1; i < args.length; i++){
                searchString += args[i] + " ";
            }
            main.playSong(connection, message.guild.id, searchString);
        })
        .catch(console.error);
};

exports.info = {
    name: "play",
    alias: [],
    permission: "default"
};