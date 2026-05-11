const { execSync } = require("child_process");
const axios = require("axios");

module.exports = {
  config: {
    name: "diskinfo",
    version: "2.0",
    author: "Rakib Islam",
    aliases: ["disk", "storage", "dfinfo"],
    countDown: 10,
    role: 0,
    shortDescription: "Disk storage info with animated GIF",
    longDescription: "Shows disk usage, storage availability with animated GIF status card",
    category: "utility",
    guide: { en: "{pn}" }
  },

  onStart: async function ({ message }) {
    let diskInfo = "Not available";
    let diskPct = 50;
    try {
      const raw = execSync("df -h / 2>/dev/null || df -h .", { encoding: "utf8", timeout: 3000 });
      const lines = raw.trim().split("\n");
      if (lines[1]) {
        const parts = lines[1].split(/\s+/);
        const size = parts[1], used = parts[2], avail = parts[3], pct = parts[4];
        diskInfo = `Size: ${size} | Used: ${used} | Free: ${avail}`;
        diskPct = parseInt(pct) || 50;
      }
    } catch {}

    const bar = "█".repeat(Math.floor(diskPct / 10)) + "░".repeat(10 - Math.floor(diskPct / 10));
    const status = diskPct < 70 ? "✅ Healthy" : diskPct < 90 ? "⚠️ Getting Full" : "🔴 Almost Full!";

    const body = `💿 ᴅɪꜱᴋ ꜱᴛᴏʀᴀɢᴇ ɪɴꜰᴏ 💿\n${"═".repeat(26)}\n\n📦 Storage:\n   ${diskInfo}\n\n📊 Usage Bar:\n   [${bar}] ${diskPct}%\n   Status: ${status}\n\n📁 Bot Files:\n   Scripts  : /scripts/cmds/\n   Database : /database/\n   Cache    : /scripts/cache/\n\n${"═".repeat(26)}\n👻 Ghost Bot — Storage Monitor`;

    const gif = "https://media.tenor.com/Ck5DFa5BAFYAAAAC/ghost-anime.gif";
    try {
      const res = await axios.get(gif, { responseType: "arraybuffer", timeout: 8000 });
      const { PassThrough } = require("stream");
      const s = new PassThrough(); s.end(Buffer.from(res.data));
      message.reply({ body, attachment: s });
    } catch { message.reply(body); }
  }
};
