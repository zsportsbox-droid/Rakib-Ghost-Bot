const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const GHOST = fs.readJsonSync(path.join(__dirname, "../../ghostConfig.json"));
const HF_TOKEN = process.env.HF_TOKEN || "";

module.exports = {
  config: {
    name: "hfanime", aliases: ["animeart", "animeimg"],
    version: "1.0", author: "Rakib Islam", countDown: 20, role: 0,
    shortDescription: "Anime style image বানাও", longDescription: "HuggingFace Anything-v3 দিয়ে anime style image generate করো",
    category: "ai", guide: "{pn} [prompt]",
  },
  onStart: async function ({ api, event, message, args }) {
    if (!args[0]) return message.reply(`Usage: .hfanime cute anime girl with pink hair\n\n👻 Ghost Bot — ${GHOST.ownerName}`);
    const prompt = `anime style, ${args.join(" ")}, highly detailed, 4k`;
    message.reply(`🎌 Anime art বানাচ্ছি...\n✨ "${prompt.slice(0, 60)}"`);
    try {
      const res = await axios.post("https://api-inference.huggingface.co/models/Linaqruf/anything-v3-better-vae",
        { inputs: prompt },
        { headers: { Authorization: `Bearer ${HF_TOKEN}`, "Content-Type": "application/json" }, responseType: "arraybuffer", timeout: 60000 }
      );
      const tmpPath = path.join(__dirname, "cache", `anime_${Date.now()}.png`);
      fs.ensureDirSync(path.dirname(tmpPath));
      fs.writeFileSync(tmpPath, Buffer.from(res.data));
      await api.sendMessage({ body: `🎌 𝗔𝗻𝗶𝗺𝗲 𝗔𝗿𝘁 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱!\n\n✨ Prompt: "${args.join(" ")}"\n\n━━━━━━━━━━━━━━━━━━\n👻 Ghost Bot — ${GHOST.ownerName}`, attachment: fs.createReadStream(tmpPath) }, event.threadID, () => fs.unlinkSync(tmpPath));
    } catch (e) { message.reply(`❌ Error: ${e.message}\n\n👻 Ghost Bot`); }
  }
};
