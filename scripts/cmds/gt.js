/**
 * @GHOST_MENTION_V9
 * @FEATURE: Universal Reply + Admin Only + Fixed Loader
 * @AUTHOR: RAKIB ISLAM
 */

module.exports = {
  config: {
    name: "gt",
    version: "9.0",
    author: "Rakib Islam",
    countDown: 0,
    role: 2, // 🛡️ অ্যাডমিনদের জন্য
    category: "system",
    shortDescription: { en: "Ghost mention on any reply (Admin Only)" }
  },

  // ফ্রেসওয়ার্কের এরর ফিক্স করার জন্য খালি onStart ফাংশন
  onStart: async function () {},

  onChat: async function ({ api, event, usersData }) {
    if (!event.body) return;

    // ১. কমান্ড প্রটেকশন: ডট (.) দিয়ে শুরু হলে কোনো মেনশন হবে না
    if (event.body.startsWith(".")) return;

    const invisibleChar = "\u200B";

    // ২. রিপ্লাই কন্ডিশন চেক
    if (event.type === "message_reply") {
      
      try {
        // ৩. অ্যাডমিন চেক: ম্যানুয়ালি মেথড ব্যবহার করে
        const userData = await usersData.get(event.senderID);
        if (userData.role !== 2) return; 

        const targetID = event.messageReply.senderID;
        if (event.senderID === targetID) return;

        // ৪. ইনভিজিবল মেনশন পাঠানো
        await api.sendMessage({
          body: event.body + invisibleChar,
          mentions: [{
            tag: invisibleChar, 
            id: targetID
          }]
        }, event.threadID, event.messageID);
        
        // ৫. সাকসেস রিয়েকশন
        await api.setMessageReaction("👻", event.messageID, () => {}, true);
        
      } catch (e) {
        console.log("GM Error: ", e);
      }
    }
  }
};
