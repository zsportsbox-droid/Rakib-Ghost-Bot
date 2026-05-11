module.exports = {
  config: {
    name: "pairv5",
    version: "2.0",
    author: "Rakib Islam",
    aliases: ["mypair", "tagpair", "mentionpair"],
    countDown: 10,
    role: 0,
    shortDescription: "Pair with mentioned/replied user",
    longDescription: "Pair specifically with the person you @mention or reply to — not random. Creates a beautiful romantic love certificate.",
    category: "romantic",
    guide: { en: "{pn} @mention — or reply to someone's message" }
  },

  onStart: async function ({ message, event, usersData }) {
    try {
      let targetID;
      let targetName;

      if (event.type === "message_reply") {
        targetID = event.messageReply?.senderID;
      } else if (Object.keys(event.mentions || {}).length > 0) {
        targetID = Object.keys(event.mentions)[0];
      }

      if (!targetID) return message.reply("💌 কাউকে @mention করুন অথবা কারো message এ reply দিন!\n\nExample: .pairv5 @name");
      if (targetID === event.senderID) return message.reply("😅 নিজের সাথে pair করা যায় না! অন্য কাউকে বেছে নিন।");

      const myData = await usersData.get(event.senderID);
      const partnerData = await usersData.get(targetID);

      const myName = myData?.name || "You";
      const partnerName = event.mentions?.[targetID] || partnerData?.name || "Partner";

      const score = Math.floor(Math.random() * 16) + 85;
      const date = new Date().toLocaleDateString("en-GB");

      const promises = [
        "Always be there for each other 💪",
        "Share every joy and sorrow 🌈",
        "Love unconditionally forever ❤️",
        "Build dreams together 🌟",
        "Never give up on each other 🔥"
      ];

      const msg = `💌 ʟᴏᴠᴇ ᴄᴇʀᴛɪꜰɪᴄᴀᴛᴇ 💌\n${"❤".repeat(18)}\n\n📜 This certifies that:\n\n💑 ${myName}\n        &\n💑 ${partnerName}\n\nare officially PAIRED!\n\n${"❤".repeat(18)}\n❤️ Love Score: ${score}%\n${"💕".repeat(Math.floor(score / 10))}\n\n📅 Date: ${date}\n\n💌 Promise:\n${promises.map(p => `  ✦ ${p}`).join("\n")}\n\n${"❤".repeat(18)}\n💘 Signed by Ghost Bot 👻`;

      await message.reply({
        body: msg,
        mentions: [
          { tag: myName, id: event.senderID, fromIndex: msg.indexOf(myName) },
          { tag: partnerName, id: targetID, fromIndex: msg.lastIndexOf(partnerName) }
        ]
      });
    } catch (e) {
      message.reply("❌ " + e.message);
    }
  }
};
