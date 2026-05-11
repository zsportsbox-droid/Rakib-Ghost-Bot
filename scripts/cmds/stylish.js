module.exports = {
  config: {
    name: "stylish",
    version: "2.0",
    author: "Rakib Islam",
    aliases: ["nickname", "ffname", "stylename", "namestyle"],
    countDown: 5,
    role: 0,
    shortDescription: "Stylish name generator (Free Fire style)",
    longDescription: "Generate stylish/fancy names with special Unicode fonts — perfect for Free Fire, PUBG, gaming profiles.",
    category: "fun",
    guide: {
      en: "{pn} <your name>\nExample: {pn} Rakib"
    }
  },

  onStart: async function ({ message, args, event }) {
    if (!args[0]) return message.reply("📝 আপনার নাম দিন!\nExample: .stylish Rakib");

    const name = args.join(" ");

    const fonts = {
      "𝕲𝖔𝖙𝖍𝖎𝖈": (s) => s.split("").map(c => {
        const g = "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟";
        const i = c.toUpperCase().charCodeAt(0) - 65;
        const j = c.toLowerCase().charCodeAt(0) - 97;
        if (c.match(/[A-Z]/)) return g[i] || c;
        if (c.match(/[a-z]/)) return g[26 + j] || c;
        return c;
      }).join(""),

      "𝓒𝓾𝓻𝓼𝓲𝓿𝓮": (s) => s.split("").map(c => {
        const cu = "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃";
        const i = c.toUpperCase().charCodeAt(0) - 65;
        const j = c.toLowerCase().charCodeAt(0) - 97;
        if (c.match(/[A-Z]/)) return cu[i] || c;
        if (c.match(/[a-z]/)) return cu[26 + j] || c;
        return c;
      }).join(""),

      "𝔻𝕠𝕦𝕓𝕝𝕖": (s) => s.split("").map(c => {
        const db = "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫";
        const i = c.toUpperCase().charCodeAt(0) - 65;
        const j = c.toLowerCase().charCodeAt(0) - 97;
        if (c.match(/[A-Z]/)) return db[i] || c;
        if (c.match(/[a-z]/)) return db[26 + j] || c;
        return c;
      }).join(""),

      "Ⓑⓤⓑⓑⓛⓔ": (s) => s.split("").map(c => {
        const bu = "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ";
        const i = c.toUpperCase().charCodeAt(0) - 65;
        const j = c.toLowerCase().charCodeAt(0) - 97;
        if (c.match(/[A-Z]/)) return bu[i] || c;
        if (c.match(/[a-z]/)) return bu[26 + j] || c;
        return c;
      }).join(""),

      "S̶t̶r̶i̶k̶e̶": (s) => s.split("").map(c => c + "\u0336").join(""),

      "Ｗｉｄｅ": (s) => s.split("").map(c => {
        const code = c.charCodeAt(0);
        if (code >= 33 && code <= 126) return String.fromCharCode(code + 65248);
        return c;
      }).join(""),

      "🅱🅻🅾🅲🅺": (s) => s.split("").map(c => {
        const bl = "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉";
        const i = c.toUpperCase().charCodeAt(0) - 65;
        if (c.match(/[A-Za-z]/)) return bl[i] || c;
        return c;
      }).join(""),

      "ꜰɪʀᴇ": (s) => s.split("").map(c => {
        const sm = "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘQʀꜱᴛᴜᴠᴡxʏᴢ";
        const i = c.toLowerCase().charCodeAt(0) - 97;
        if (c.match(/[A-Za-z]/)) return sm[i] || c;
        return c;
      }).join("")
    };

    const decorators = [
      (s) => `꧁༺${s}༻꧂`,
      (s) => `『${s}』`,
      (s) => `★彡${s}彡★`,
      (s) => `•͙✧${s}✧•͙`,
      (s) => `⚔️${s}⚔️`,
      (s) => `🔥${s}🔥`,
      (s) => `〖${s}〗`,
      (s) => `⟪${s}⟫`,
    ];

    let response = `🎮 ʜᴇʀᴇ ᴀʀᴇ ʏᴏᴜʀ ꜱᴛʏʟɪꜱʜ ɴᴀᴍᴇꜱ ꜰᴏʀ "${name}"\n`;
    response += "━━━━━━━━━━━━━━━━━━━\n";

    let i = 0;
    for (const [fontName, converter] of Object.entries(fonts)) {
      const converted = converter(name);
      const deco = decorators[i % decorators.length](converted);
      response += `\n${String(i + 1).padStart(2, "0")}. [${fontName}]\n    ${deco}\n`;
      i++;
    }

    response += "\n━━━━━━━━━━━━━━━━━━━";
    response += "\n🔰 ᴄᴏᴘʏ ᴀɴʏ ɴᴀᴍᴇ ᴀɴᴅ ᴜꜱᴇ ɪᴛ ɪɴ ꜰʀᴇᴇ ꜰɪʀᴇ, ᴘᴜʙɢ, ᴀɴʏ ɢᴀᴍᴇ!";

    message.reply(response);
  }
};
