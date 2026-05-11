const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const GHOST = fs.readJsonSync(path.join(__dirname, "../../ghostConfig.json"));
const HF_TOKEN = process.env.HF_TOKEN || "";

async function hfChat(prompt) {
  const res = await axios.post(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
    { inputs: `<s>[INST] ${prompt} [/INST]`, parameters: { max_new_tokens: 400, temperature: 0.7 } },
    { headers: { Authorization: `Bearer ${HF_TOKEN}`, "Content-Type": "application/json" }, timeout: 30000 }
  );
  const text = Array.isArray(res.data) ? res.data[0]?.generated_text : res.data?.generated_text;
  if (!text) throw new Error("No response");
  const cleaned = text.replace(/.*\[\/INST\]/s, "").trim();
  return cleaned || text.trim();
}

module.exports = {
  config: {
    name: "hfask", aliases: ["hf", "mistral"],
    version: "1.0", author: "Rakib Islam",
    countDown: 5, role: 0,
    shortDescription: "Mistral AI দিয়ে প্রশ্ন করো",
    longDescription: "HuggingFace Mistral-7B দিয়ে যেকোনো প্রশ্নের উত্তর পাও",
    category: "ai", guide: "{pn} [question]",
  },
  onStart: async function ({ message, args }) {
    if (!args[0]) return message.reply(`Usage: .hfask [question]\nExample: .hfask What is AI?\n\n👻 Ghost Bot — ${GHOST.ownerName}`);
    const q = args.join(" ");
    message.reply("🤖 Mistral AI চিন্তা করছে...");
    try {
      const ans = await hfChat(q);
      message.reply(`🤖 𝗠𝗶𝘀𝘁𝗿𝗮𝗹 𝗔𝗜\n\n❓ ${q}\n\n✅ ${ans}\n\n━━━━━━━━━━━━━━━━━━\n👻 Ghost Bot — ${GHOST.ownerName} | Ghost Net Edition`);
    } catch (e) {
      message.reply(`❌ Error: ${e.message}\n\n👻 Ghost Bot`);
    }
  }
};
