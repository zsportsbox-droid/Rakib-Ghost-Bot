module.exports = {
  config: {
    name: "pairv3",
    version: "2.0",
    author: "Rakib Islam",
    aliases: ["starpair", "cosmicpair"],
    countDown: 10,
    role: 0,
    shortDescription: "Cosmic star pair — zodiac romantic match",
    longDescription: "Finds your cosmic romantic partner based on zodiac compatibility with animated card",
    category: "romantic",
    guide: { en: "{pn} — Cosmic zodiac pair from group" }
  },

  onStart: async function ({ message, event, usersData, threadsData }) {
    try {
      const threadInfo = await threadsData.get(event.threadID);
      const members = (threadInfo?.members || []).filter(m => m.userID !== event.senderID);
      if (!members.length) return message.reply("🌌 No cosmic match found in this group!");

      const partner = members[Math.floor(Math.random() * members.length)];
      const myData = await usersData.get(event.senderID);
      const partnerData = await usersData.get(partner.userID);

      const myName = myData?.name || "You";
      const partnerName = partnerData?.name || "Partner";

      const zodiacs = ["♈ Aries", "♉ Taurus", "♊ Gemini", "♋ Cancer", "♌ Leo", "♍ Virgo", "♎ Libra", "♏ Scorpio", "♐ Sagittarius", "♑ Capricorn", "♒ Aquarius", "♓ Pisces"];
      const myZ = zodiacs[Math.floor(Math.random() * zodiacs.length)];
      const partnerZ = zodiacs[Math.floor(Math.random() * zodiacs.length)];
      const score = Math.floor(Math.random() * 26) + 75;

      const loveQuotes = [
        "Stars aligned just for you two 🌟",
        "The universe wrote your love story 🌌",
        "Two stars born to shine together ✨",
        "Cosmic forces pulled you close 💫"
      ];
      const quote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];

      const msg = `🌌 ᴄᴏꜱᴍɪᴄ ʀᴏᴍᴀɴᴄᴇ ᴘᴀɪʀ 🌌\n${"✦".repeat(20)}\n\n🌟 ${myName}\n   Zodiac: ${myZ}\n\n💞 ── Universe Connects ──\n\n🌟 ${partnerName}\n   Zodiac: ${partnerZ}\n\n${"✦".repeat(20)}\n🔭 Cosmic Score: ${score}%\n${"⭐".repeat(Math.floor(score / 10))}\n\n💌 "${quote}"`;

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
