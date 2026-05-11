module.exports = {
  config: {
    name: "pairv4",
    version: "2.0",
    author: "Rakib Islam",
    aliases: ["royalpair", "kingqueen"],
    countDown: 10,
    role: 0,
    shortDescription: "Royal King & Queen romantic pair",
    longDescription: "Randomly crowns you with a royal partner — King & Queen romantic card with animated effects",
    category: "romantic",
    guide: { en: "{pn} — Find your Royal Partner" }
  },

  onStart: async function ({ message, event, usersData, threadsData }) {
    try {
      const threadInfo = await threadsData.get(event.threadID);
      const members = (threadInfo?.members || []).filter(m => m.userID !== event.senderID);
      if (!members.length) return message.reply("👑 No royals found in this kingdom!");

      const partner = members[Math.floor(Math.random() * members.length)];
      const myData = await usersData.get(event.senderID);
      const partnerData = await usersData.get(partner.userID);

      const myName = myData?.name || "King";
      const partnerName = partnerData?.name || "Queen";
      const royalScore = Math.floor(Math.random() * 21) + 80;

      const kingdoms = ["🏰 Kingdom of Love", "🌹 Rose Empire", "💎 Diamond Realm", "🌙 Moonlit Palace", "⚔️ Warrior's Heart"];
      const kingdom = kingdoms[Math.floor(Math.random() * kingdoms.length)];

      const vows = [
        "Forever loyal, forever yours 👑",
        "A crown means nothing without you 💎",
        "My kingdom is yours, my heart is yours 🌹",
        "Together we rule, together we love ⚔️"
      ];
      const vow = vows[Math.floor(Math.random() * vows.length)];

      const msg = `👑 ʀᴏʏᴀʟ ʟᴏᴠᴇ ᴄᴀʀᴅ 👑\n${"◆".repeat(22)}\n\n🤴 King: ${myName}\n🌹 Queen: ${partnerName}\n\n🏰 Kingdom: ${kingdom}\n\n${"◆".repeat(22)}\n💍 Royal Bond: ${royalScore}%\n${"💎".repeat(Math.floor(royalScore / 10))}\n\n✨ "${vow}"`;

      await message.reply({
        body: msg,
        mentions: [
          { tag: myName, id: event.senderID, fromIndex: msg.indexOf(myName) },
          { tag: partnerName, id: partner.userID, fromIndex: msg.lastIndexOf(partnerName) }
        ]
      });
    } catch (e) {
      message.reply("❌ " + e.message);
    }
  }
};
