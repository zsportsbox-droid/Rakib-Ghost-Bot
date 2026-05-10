/**
 * @GHOST_UNIVERSAL_SYSTEM
 * @FEATURE: Universal Reply + Admin Only + Invisible Mention
 * @AUTHOR: RAKIB ISLAM
 */

module.exports = {
  config: {
    name: "fulltag",
    version: "7.0",
    author: "Rakib Islam",
    countDown: 0,
    role: 2, // 🛡️ Sudhu Admin-ra trigger korte parbe
    category: "system",
    shortDescription: { en: "Invisible mention on any text reply (Admin Only)" }
  },

  onChat: async function ({ api, event }) {
    // ১. Basic Checks: Message body thakte hobe ebong seta bot-er command hote parbe na
    if (!event.body || event.body.startsWith(".")) {
      return; 
    }

    const invisibleChar = "\u200B"; // Ghost mention-er jonno invisible character

    // ২. Reply logic: Check korche eta karo message-e reply ki na
    if (event.type === "message_reply") {
      
      // ৩. Admin Check: Jini reply diyechen tini admin ki na seta check kora
      // Role 2 thaklei nichey kora logic execute hobe
      if (this.config.role === 2) { 
        
        // Target ID: Jar message-e reply deya hoyeche
        const targetID = event.messageReply.senderID;
        
        // Sender ID: Jini reply diyechen
        const senderID = event.senderID;

        // Admin jodi nijei nijer message-e reply dey, tobe logic kaj korbe na (Optional protection)
        if (senderID === targetID) return;

        try {
          // ৪. Message pathano hocche (Apnar lekha text + invisible mention)
          await api.sendMessage({
            body: event.body + invisibleChar,
            mentions: [{
              tag: invisibleChar, 
              id: targetID
            }]
          }, event.threadID, event.messageID);
          
          // Saphollyo bojhate chotto ekti reaction
          await api.setMessageReaction("👻", event.messageID, () => {}, true);
          
        } catch (e) {
          console.log("Ghost Universal Error: ", e);
        }
      }
    }
  }
};
