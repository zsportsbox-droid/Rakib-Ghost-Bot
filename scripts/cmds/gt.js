module.exports = {
  config: {
    name: "gt",
    version: "2.0",
    author: "Rakib Islam",
    countDown: 0,
    role: 2,
    shortDescription: "Ghost invisible mention reply",
    longDescription: "Admin reply কোনো message এ → target user কে invisible mention করে message পাঠায় (👻 ghost tag)",
    category: "admin",
    guide: { en: "Reply to a message with any text (Admin only, no prefix needed)" }
  },

  onStart: async function ({ message }) {
    message.reply("👻 Ghost Tag command is active. Reply to any message as admin to invisibly mention the sender.");
  },

  onChat: async function ({ event, message, role }) {
    try {
      if (event.type !== "message_reply") return;
      if (role < 2) return;
      const text = (event.body || "").trim();
      if (!text || text.startsWith(".")) return;

      const targetID = event.messageReply && event.messageReply.senderID;
      if (!targetID) return;

      const ghostText = text + "\u200B";

      await message.reply({
        body: ghostText,
        mentions: [{
          tag: "\u200B",
          id: targetID,
          fromIndex: ghostText.length - 1
        }]
      });

      await message.react("👻");
    } catch (e) {}
  }
};
