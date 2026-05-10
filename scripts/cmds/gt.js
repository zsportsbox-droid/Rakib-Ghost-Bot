/**
 * @GHOST_TAG_PRO_V13
 * @DESIGN: MINIMAL & POWERFUL
 * @AUTHOR: RAKIB ISLAM
 */

module.exports = {
  config: {
    name: "gt",
    version: "13.0",
    author: "Rakib Islam",
    countDown: 0,
    role: 2, // Admin Only
    category: "system",
    shortDescription: { en: "Invisible mention on any reply" }
  },

  onStart: async function ({ message }) {
    return message.reply("⚡ Ghost System Active! Jekono message-e reply diye kisu likhun.");
  },

  onChat: async function ({ api, event, usersData }) {
    // ১. Basic Filters: Message thakte hobe, reply hote hobe, ebong command prefix thaka cholbe na
    if (!event.body || event.type !== "message_reply" || event.body.startsWith(".")) return;

    try {
      // ২. Admin Validation (Direct check)
      const senderID = event.senderID;
      const userData = await usersData.get(senderID);
      
      if (userData && userData.role === 2) {
        const targetID = event.messageReply.senderID;
        if (senderID === targetID) return;

        const invisibleChar = "\u200B";

        // ৩. Invisible Mention execution
        await api.sendMessage({
          body: event.body + invisibleChar,
          mentions: [{
            tag: invisibleChar, 
            id: targetID
          }]
        }, event.threadID, event.messageID);

        // Success indicator
        await api.setMessageReaction("👻", event.messageID, () => {}, true);
      }
    } catch (e) {
      console.error("GT Pro Error:", e);
    }
  }
};
