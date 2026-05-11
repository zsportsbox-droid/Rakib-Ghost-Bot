const os = require("os");
const axios = require("axios");

module.exports = {
  config: {
    name: "cpanel",
    version: "3.0",
    author: "Rakib Islam",
    aliases: ["controlpanel", "panel"],
    countDown: 10,
    role: 2,
    shortDescription: "Ghost Bot Control Panel (Admin)",
    longDescription: "Full animated control panel showing bot system stats, uptime, memory, CPU with GIF",
    category: "admin",
    guide: { en: "{pn} — Opens Ghost Bot Control Panel" }
  },

  onStart: async function ({ message }) {
    const upSec = Math.floor(process.uptime());
    const h = Math.floor(upSec / 3600);
    const m = Math.floor((upSec % 3600) / 60);
    const s = upSec % 60;
    const upStr = `${h}h ${m}m ${s}s`;

    const usedMem = Math.round((os.totalmem() - os.freemem()) / 1024 / 1024);
    const totalMem = Math.round(os.totalmem() / 1024 / 1024);
    const memPct = Math.round((usedMem / totalMem) * 100);
    const cpuLoad = os.loadavg()[0].toFixed(2);

    const memBar = "█".repeat(Math.floor(memPct / 10)) + "░".repeat(10 - Math.floor(memPct / 10));
    const cpuPct = Math.min(Math.round(parseFloat(cpuLoad) * 10), 100);
    const cpuBar = "█".repeat(Math.floor(cpuPct / 10)) + "░".repeat(10 - Math.floor(cpuPct / 10));

    const body = `🖥️ ɢʜᴏꜱᴛ ʙᴏᴛ ᴄᴏɴᴛʀᴏʟ ᴘᴀɴᴇʟ 🖥️\n${"═".repeat(30)}\n\n⏱️ Uptime    : ${upStr}\n🔧 Node.js  : ${process.version}\n🖥️ Platform  : ${os.type()}\n\n💾 Memory Usage:\n   [${memBar}] ${memPct}%\n   ${usedMem}MB / ${totalMem}MB\n\n⚡ CPU Load:\n   [${cpuBar}] ${cpuPct}%\n   Load Avg: ${cpuLoad}\n\n🌡️ Temp Dirs : ${os.tmpdir()}\n🏠 Home      : ${os.homedir()}\n\n${"═".repeat(30)}\n👻 Ghost Bot — Control Panel v3.0`;

    const gif = "https://media.tenor.com/A5RJ0VFVLMQAAAAC/cyber-hacker.gif";
    try {
      const res = await axios.get(gif, { responseType: "arraybuffer", timeout: 8000 });
      const { PassThrough } = require("stream");
      const s = new PassThrough(); s.end(Buffer.from(res.data));
      message.reply({ body, attachment: s });
    } catch { message.reply(body); }
  }
};
