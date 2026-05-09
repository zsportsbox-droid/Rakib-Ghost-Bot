const Jimp = require("jimp");
const fs = require("fs-extra");
const path = require("path");

// আপনার দেওয়া সরাসরি PNG লোগো লিঙ্ক (ট্রান্সপারেন্ট ব্যাকগ্রাউন্ড সহ)
const ACS_LOGO_URL = "https://i.ibb.co/V04ZgMWf/20260502-080850.png";

module.exports = {
  config: {
    name: "acs",
    aliases: ["acs", "mahi", "acs-rakib"],
    version: "7.0",
    author: "Rakib Islam",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Add ACS logo to large dark green side covers" },
    category: "image",
    guide: { en: "Reply to a photo with {p}acs" }
  },

  onStart: async function ({ message, event, api }) {
    let imageUrl;

    if (event.type === "message_reply") {
      const att = event.messageReply?.attachments?.[0];
      if (att?.type === "photo") imageUrl = att.url;
    } else if (event.attachments?.[0]?.type === "photo") {
      imageUrl = event.attachments[0].url;
    }

    if (!imageUrl) return message.reply("⚠️ দয়া করে একটি ছবিতে রিপ্লাই দিন।");

    await message.reaction("⏳", event.messageID);

    try {
      const cacheDir = path.join(__dirname, "cache");
      await fs.ensureDir(cacheDir);
      const tempPath = path.join(cacheDir, `acs_v7_${Date.now()}.png`);

      // ১. মূল ছবি এবং লোগো লোড করা
      const [image, logo] = await Promise.all([
        Jimp.read(imageUrl),
        Jimp.read(ACS_LOGO_URL)
      ]);

      // ২. কভারের মাপ নির্ধারণ (২৫% সাইড কভার যাতে এটি বড় দেখায়)
      const sideCoverWidth = Math.floor(image.getWidth() * 0.25);
      const newWidth = image.getWidth() + (sideCoverWidth * 2);
      const newHeight = image.getHeight();

      // ৩. ডার্ক গ্রিন কভার তৈরি করা
      const background = new Jimp(newWidth, newHeight, "#013220");

      // ৪. মাঝখানে মূল ছবি বসানো (ডার্ক গ্রিন কভারের ওপর)
      background.composite(image, sideCoverWidth, 0);

      // ৫. লোগো রিসাইজ করা (কভারের প্রস্থের ৮০%)
      const logoScale = Math.floor(sideCoverWidth * 0.80);
      logo.resize(logoScale, Jimp.AUTO);

      // ৬. লোগোটি শুধুমাত্র বাম ডার্ক গ্রিন কভারের ওপর বসানো
      // লোগোটি বাম কভারের মাঝখানে এবং ছবির ওপর থেকে সামান্য দূরে থাকবে
      const xPos = Math.floor((sideCoverWidth - logoScale) / 2); // বাম বর্ডারের একদম মাঝখানে
      const yPos = 30; // ওপর থেকে সামান্য দূরে
      background.composite(logo, Math.max(10, xPos), yPos, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacitySource: 1.0
      });

      // ৭. আউটপুট সেভ এবং সেন্ড করা
      await background.writeAsync(tempPath);

      await message.reply({
        body: "✅ ACS Legend Home Edition Generated!",
        attachment: fs.createReadStream(tempPath)
      });

      await message.reaction("🔥", event.messageID);
      setTimeout(() => fs.existsSync(tempPath) && fs.unlinkSync(tempPath), 15000);

    } catch (error) {
      console.error(error);
      return message.reply("❌ Error: " + error.message);
    }
  }
};
      
