const axios = require("axios");

module.exports = {
  config: {
    name: "pairv1",
    version: "2.0",
    author: "Rakib Islam",
    aliases: ["lovepair", "gpair"],
    countDown: 10,
    role: 0,
    shortDescription: "Ghost romantic pair (random in group)",
    longDescription: "Randomly finds your romantic soulmate in the group with a beautiful animated love card",
    category: "romantic",
    guide: { en: "{pn} — Random pair from group members" }
  },

  onStart: async function ({ message, event, usersData, threadsData }) {
    try {
      const threadInfo = await threadsData.get(event.threadID);
      const members = threadInfo?.members || [];
      const others = members.filter(m => m.userID !== event.senderID);
      if (others.length === 0) return message.reply("❤️ এই গ্রুপে pair করার মতো কেউ নেই!");

      const partner = others[Math.floor(Math.random() * others.length)];
      const myData = await usersData.get(event.senderID);
      const partnerData = await usersData.get(partner.userID);

      const myName = myData?.name || "Unknown";
      const partnerName = partnerData?.name || "Unknown";
      const score = Math.floor(Math.random() * 31) + 70;

      const gifs = [
        "https://media.tenor.com/images/5e7b5fa46dea3f0a5e9b23e6b76e6c0a/tenor.gif",
        "https://media.tenor.com/images/a560e1ab7cdb1e3b01e0c67b41e7c3d7/tenor.gif",
        "https://media.tenor.com/images/8f8a3f5e9c2a5b6a3f1e2d3c4b5a6f7e/tenor.gif"
      ];
      const gif = gifs[Math.floor(Math.random() * gifs.length)];

      const hearts = ["💕", "💖", "💗", "💓", "💘", "❤️‍🔥", "🥰", "😍"];
      const h = hearts[Math.floor(Math.random() * hearts.length)];

      const msg = `${h} ʀᴏᴍᴀɴᴛɪᴄ ᴘᴀɪʀ ᴄᴀʀᴅ ${h}\n━━━━━━━━━━━━━━━━\n\n💑 ${myName}\n     ${h} + ${h}\n💑 ${partnerName}\n\n💯 Love Score: ${score}%\n${"❤️".repeat(Math.floor(score / 10))}\n\n━━━━━━━━━━━━━━━━\n💌 "Two hearts, one soul — made for each other"`;

      await message.reply({
        body: msg,
        mentions: [
          { tag: myName, id: event.senderID, fromIndex: msg.indexOf(myName) },
          { tag: partnerName, id: partner.userID, fromIndex: msg.lastIndexOf(partnerName) }
        ]
      });
    } catch (e) {
      message.reply("❌ Error: " + e.message);
    }
  }
};
