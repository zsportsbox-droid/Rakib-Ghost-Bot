const os = require("os");
const axios = require("axios");

module.exports = {
  config: {
    name: "cpuinfo",
    version: "2.0",
    author: "Rakib Islam",
    aliases: ["cpu", "processor"],
    countDown: 5,
    role: 0,
    shortDescription: "CPU info & load average with animated GIF",
    longDescription: "Shows CPU model, cores, speed, and load average with animated GIF display",
    category: "utility",
    guide: { en: "{pn}" }
  },

  onStart: async function ({ message }) {
    const cpus = os.cpus();
    const model = (cpus[0]?.model || "Unknown").substring(0, 35);
    const speed = cpus[0]?.speed || 0;
    const cores = cpus.length;
    const load = os.loadavg();
    const loadPct = Math.min(Math.round(load[0] * 10), 100);
    const bar = "█".repeat(Math.floor(loadPct / 10)) + "░".repeat(10 - Math.floor(loadPct / 10));

    const body = `⚙️ ᴄᴘᴜ ɪɴꜰᴏ & ꜱᴛᴀᴛᴜꜱ ⚙️\n${"▬".repeat(28)}\n\n🖥️ Processor:\n   Model : ${model}\n   Cores : ${cores} vCPUs\n   Speed : ${speed} MHz\n   Arch  : ${os.arch()}\n\n📊 Load Average:\n   [${bar}] ${loadPct}%\n   1min  : ${load[0].toFixed(2)}\n   5min  : ${load[1].toFixed(2)}\n   15min : ${load[2].toFixed(2)}\n\n🌡️ OS Platform : ${os.platform()}\n🔧 OS Release  : ${os.release()}\n\n${"▬".repeat(28)}\n👻 Ghost Bot — CPU Monitor`;

    const gif = "https://media.tenor.com/M4UYdtYjnNsAAAAC/neon-glitch.gif";
    try {
      const res = await axios.get(gif, { responseType: "arraybuffer", timeout: 8000 });
      const { PassThrough } = require("stream");
      const s = new PassThrough(); s.end(Buffer.from(res.data));
      message.reply({ body, attachment: s });
    } catch { message.reply(body); }
  }
};
