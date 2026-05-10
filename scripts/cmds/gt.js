/**
 * @GHOST_UNIVERSAL_V8
 * @FEATURE: Universal Reply + Admin Check Fix + Invisible Mention
 * @AUTHOR: RAKIB ISLAM
 */

module.exports = {
  config: {
    name: "gt",
    version: "8.0",
    author: "Rakib Islam",
    countDown: 0,
    role: 2, // 🛡️ Admin Only config (Optional for listing)
    category: "system",
    shortDescription: { en: "Ghost mention on any reply (Admin Only)" }
  },

  onChat: async function ({ api, event, usersData }) {
    if (!event.body) return;

    // ১. Command Protection: Message jodi dot (.) diye shuru hoy tobe logic bondho thakbe
    if (event.body.startsWith(".")) return;

    const invisibleChar = "\u200B";

    // ২. Reply & Admin Check: 
    // Check kora hocche eta reply ki na ebong sender admin ki na
    if (event.type === "message_reply") {
      
      // Amader manually admin role check korte hobe usersData theke
      const userData = await usersData.get(event.senderID);
      if (userData.role !== 2) return; 

      const targetID = event.messageReply.senderID;
      if (event.senderID === targetID) return;

      try {
        await api.sendMessage({
          body: event.body + invisibleChar,
          mentions: [{
            tag: invisibleChar, 
            id: targetID
          }]
        }, event.threadID, event.messageID);
        
        // Success Reaction
        await api.setMessageReaction("👻", event.messageID, () => {}, true);
        
      } catch (e) {
        console.log("GM Error: ", e);
      }
    }
  }
};
