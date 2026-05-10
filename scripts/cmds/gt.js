/**
 * @GHOST_MENTION_V10
 * @FEATURE: Universal Reply + Admin Only + Framework Compatibility
 * @AUTHOR: RAKIB ISLAM
 */

module.exports = {
  config: {
    name: "gt",
    version: "10.0",
    author: "Rakib Islam",
    countDown: 0,
    role: 2, // 🛡️ Admin Only
    category: "system",
    shortDescription: { en: "Ghost mention on any reply (Admin Only)" }
  },

  onStart: async function ({ message }) {
    return message.reply("🛡️ Ghost Mention System Active. Karo message-e reply diye kisu likhun (Admin Only).");
  },

  onChat: async function ({ api, event, usersData }) {
    if (!event.body || event.body.startsWith(".")) return;

    const invisibleChar = "\u200B";

    // ১. Check korche eta message reply ki na
    if (event.type === "message_reply") {
      try {
        // ২. Admin Check (Manually using usersData)
        const senderID = event.senderID;
        const userData = await usersData.get(senderID);
        
        // Jodi role 2 na hoy, tobe kichui korbe na
        if (userData.role !== 2) return;

        const targetID = event.messageReply.senderID;
        
        // Nijer message-e reply dile mention hobe na
        if (senderID === targetID) return;

        // ৩. Final Message Sending
        await api.sendMessage({
          body: event.body + invisibleChar,
          mentions: [{
            tag: invisibleChar, 
            id: targetID
          }]
        }, event.threadID, event.messageID);
        
        // ৪. Chotto reaction success confirm korar jonno
        await api.setMessageReaction("👻", event.messageID, () => {}, true);
        
      } catch (e) {
        // Console-e error check korar jonno
        console.error("GM Error:", e);
      }
    }
  }
};
