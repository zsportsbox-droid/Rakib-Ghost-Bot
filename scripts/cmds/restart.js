/**
 * @GHOST_NET_RESTART_ENGINE_V2
 * @DESIGN: PREMIUM NEON GHOST STYLE
 * @AUTHOR: RAKIB ISLAM
 */

const process = require('process');

module.exports = {
  config: {
    name: "restart",
    aliases: ["reboot", "rst", "refresh"],
    version: "2.0",
    author: "RAKIB ISLAM",
    countDown: 5,
    role: 2, // Admin Only
    category: "system",
    shortDescription: { en: "Premium Neon Ghost Restart" }
  },

  onStart: async function ({ message, api, event }) {
    // Stage 1: Powering Down
    const stage1 = 
      `╔══════════════════════╗\n` +
      `║   🔱 𝗚𝗛𝗢𝗦𝗧-𝗡𝗘𝗧 𝗢𝗦 🔱   ║\n` +
      `╚══════════════════════╝\n` +
      `  🧬 𝘀𝘆𝘀𝘁𝗲𝗺  › 𝘀𝗵𝘂𝘁𝘁𝗶𝗻𝗴 𝗱𝗼𝘄𝗻...\n` +
      `  🚨 𝘀𝘁𝗮𝘁𝘂𝘀  › [░░░░░░░░░░] 𝟬%\n` +
      `  🔒 𝘀𝗲𝗰𝘂𝗿𝗶𝘁𝘆 › 𝗯𝗮𝗰𝗸𝘂𝗽 𝘀𝗮𝘃𝗲𝗱`;

    const sent = await message.reply(stage1);

    // Stage 2: Purging Cache (1.2 seconds delay)
    setTimeout(async () => {
      const stage2 = 
        `╔══════════════════════╗\n` +
        `║   🔱 𝗚𝗛𝗢𝗦𝗧-𝗡𝗘𝗧 𝗢𝗦 🔱   ║\n` +
        `╚══════════════════════╝\n` +
        `  🧹 𝗽𝘂𝗿𝗴𝗶𝗻𝗴 › 𝗰𝗮𝗰𝗵𝗲 𝗳𝗶𝗹𝗲𝘀...\n` +
        `  🧪 𝘀𝘁𝗮𝘁𝘂𝘀  › [██████░░░░] 𝟲𝟬%\n` +
        `  ⚡ 𝗲𝗻𝗲𝗿𝗴𝘆  › 𝗿𝗲𝗰𝘆𝗰𝗹𝗶𝗻𝗴...`;
      await api.editMessage(stage2, sent.messageID);
    }, 1200);

    // Stage 3: Rebooting (2.5 seconds delay)
    setTimeout(async () => {
      const stage3 = 
        `╔══════════════════════╗\n` +
        `║   🔱 𝗚𝗛𝗢𝗦𝗧-𝗡𝗘𝗧 𝗢𝗦 🔱   ║\n` +
        `╚══════════════════════╝\n` +
        `  🌀 𝗿𝗲𝗯𝗼𝗼𝘁  › 𝗶𝗻𝗶𝘁𝗶𝗮𝗹𝗶𝘇𝗶𝗻𝗴...\n` +
        `  ✅ 𝘀𝘁𝗮𝘁𝘂𝘀  › [██████████] 𝟭𝟬𝟬%\n` +
        `  🌐 𝗡𝗲𝘁𝘄𝗼𝗿𝗸 › 𝗢𝗻𝗹𝗶𝗻𝗲 𝗦𝗼𝗼𝗻!\n\n` +
        `  🥀 𝗕𝘆𝗲 𝗕𝗼𝘀𝘀, 𝗕𝗲 𝗥𝗶𝗴𝗵𝘁 𝗕𝗮𝗰𝗸!`;
      
      await api.editMessage(stage3, sent.messageID);
      
      // Forceful exit bad diye clean exit chesta kora
      setTimeout(() => {
        process.exit(2); // Replit standard restart code
      }, 800);
    }, 2500);
  }
};
