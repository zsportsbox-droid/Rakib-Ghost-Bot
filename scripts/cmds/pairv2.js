const axios = require("axios");

module.exports = {
  config: {
    name: "pairv2",
    version: "2.0",
    author: "Rakib Islam",
    aliases: ["soulmatch", "soulpair"],
    countDown: 10,
    role: 0,
    shortDescription: "Soul match pair with gender detection",
    longDescription: "Detects gender and finds your soul match in group with romantic animated card",
    category: "romantic",
    guide: { en: "{pn} — Finds your soul match with gender detection" }
  },

  onStart: async function ({ message, event, usersData, threadsData }) {
    try {
      const threadInfo = await threadsData.get(event.threadID);
      const members = (threadInfo?.members || []).filter(m => m.userID !== event.senderID);
      if (!members.length) return message.reply("💔 No members to pair with!");

      const partner = members[Math.floor(Math.random() * members.length)];
      const myData = await usersData.get(event.senderID);
      const partnerData = await usersData.get(partner.userID);

      const myName = myData?.name || "You";
      const partnerName = partnerData?.name || "Partner";

      // Gender detection based on name patterns
      const femaleKeywords = ["a", "i", "na", "ra", "ya", "la", "ma", "sha", "isha", "ana", "uma", "ela"];
      const detectGender = (name) => {
        const n = name.toLowerCase();
        if (femaleKeywords.some(k => n.endsWith(k))) return "♀️ Female";
        return "♂️ Male";
      };

      const myGender = detectGender(myName);
      const partnerGender = detectGender(partnerName);

      const compatibility = Math.floor(Math.random() * 21) + 80;
      const traits = ["loyal", "caring", "funny", "smart", "kind", "romantic", "passionate"];
      const myTrait = traits[Math.floor(Math.random() * traits.length)];
      const partnerTrait = traits[Math.floor(Math.random() * traits.length)];

      const msg = `🌹 ꜱᴏᴜʟ ᴍᴀᴛᴄʜ ʀᴇᴠᴇᴀʟᴇᴅ 🌹\n${"═".repeat(28)}\n\n👤 ${myName} (${myGender})\n   🌟 Trait: ${myTrait}\n\n💞 ─────── vs ───────\n\n👤 ${partnerName} (${partnerGender})\n   🌟 Trait: ${partnerTrait}\n\n${"═".repeat(28)}\n💘 Compatibility: ${compatibility}%\n${"💗".repeat(Math.floor(compatibility / 10))}\n\n✨ "Souls recognize each other by their energy"`;

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
