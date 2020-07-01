
const Discord = require('discord.js');
const axios = require('axios');
const APIKEY = process.env.APIKEY;

module.exports = function processMessage(msg) {
    //check if thesaurus is being called
  if (msg.content.startsWith('theSaurus')) {

    let command = msg.content.trim().split(/ +/g);

    //if message contained command prefix and word to look up then initiate the main functionality
    if (command.length == 2) {

      msg.channel.send("ROAR! Let me look up that word....");

      //build api request (This one uses RapidAPI with WordsAPI)
      let apistring = `https://wordsapiv1.p.rapidapi.com/words/${command[1]}`;

      //send api request to wordsapi
      axios({
        "method": "GET",
        "url": apistring,
        "headers": {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          "x-rapidapi-key": APIKEY,
          "useQueryString": true
        }
      })
        .then((response) => {
          let data = response.data; //word results

          //iterate through word results and send an embedded message for each one
          let embedMsg;
          data.results.forEach(element => {
            embedMsg = new Discord.RichEmbed()
              .setColor('#99d8d0')
              .setTitle("ROOAAR!")
              .setDescription(`Here is a result for ${data.word}`)
              .addField("Definition", element.definition)
              .addField("Part Of Speech", element.partOfSpeech)
            if (element.synonyms) {
              embedMsg.addField("Synonyms", element.synonyms.toString());
            }
            if (element.antonyms) {
              embedMsg.addField("Antonyms", element.antonyms.toString());
            }
            if (element.examples) {
              embedMsg.addField("Examples", element.examples.toString());
            }

            msg.channel.send(embedMsg);
          });

        })
        .catch((error) => {
          console.log(error)
        })

    } else {
      //default message, details how to call correctly if the user input was incorrect
      msg.channel.send({
        embed: {
          title: "Roar!",
          color: 3447003,
          fields: [
            {
              name: "You Need To Call Me Like This",
              value: "theSaurus <word>"
            }
          ]
        }
      });
    }
  }
}