module.exports = {
  config: {
    name: "ghostcurse",
    version: "2.0",
    author: "Rakib Islam",
    aliases: ["curse", "hex", "darkcurse"],
    countDown: 5,
    role: 0,
    shortDescription: "Cast a ghost curse on someone (fun)",
    longDescription: "Sends a dramatic ghost curse message targeting a mentioned/replied user — spooky fun!",
    category: "fun",
    guide: { en: "{pn} @mention or reply to curse someone" }
  },

  onStart: async function ({ message, event, usersData }) {
    let targetID;
    if (event.type === "message_reply") targetID = event.messageReply?.senderID;
    else if (Object.keys(event.mentions || {}).length) targetID = Object.keys(event.mentions)[0];

    if (!targetID) return message.reply("👻 কাউকে mention বা reply দিন curse করতে!");

    const targetData = await usersData.get(targetID);
    const myData = await usersData.get(event.senderID);
    const targetName = targetData?.name || "Target";
    const myName = myData?.name || "Caster";

    const curses = [
      ["😈 ꜱʜᴀᴅᴏᴡ ᴄᴜʀꜱᴇ", "Every wifi you connect to will lag for 3 days 📶❌", "Your memes will never get reactions 💀"],
      ["💀 ᴅᴇᴀᴛʜ ʜᴇx", "Your phone battery will always die at 1% 🔋", "All your food will taste like cardboard 🍞"],
      ["🌑 ᴅᴀʀᴋɴᴇꜱꜱ ʙɪɴᴅ", "You'll get ads on every video you watch 📺", "Your alarm won't ring when you need it most ⏰"],
      ["🩸 ʙʟᴏᴏᴅ ᴏᴀᴛʜ", "You'll always step on Lego barefoot 🧱👣", "Autocorrect will betray you at the worst moments ⌨️"],
      ["⚡ ᴠᴏɪᴅ ꜱᴇᴀʟ", "Your charger will break the day before exams 🔌💔", "You'll always send messages to the wrong person 😱"]
    ];

    const curse = curses[Math.floor(Math.random() * curses.length)];

    const msg = `👻 ɢʜᴏꜱᴛ ᴄᴜʀꜱᴇ ᴄᴀꜱᴛ 👻\n${"░".repeat(26)}\n\n🔮 ${myName} casts: ${curse[0]}\n\n🎯 Target: ${targetName}\n\n💀 Curse Effects:\n   ❌ ${curse[1]}\n   ❌ ${curse[2]}\n\n${"░".repeat(26)}\n⚠️ The curse lasts 7 days!\n👻 Only the bot owner can remove it...`;

    await message.reply({
      body: msg,
      mentions: [
        { tag: myName, id: event.senderID, fromIndex: msg.indexOf(myName) },
        { tag: targetName, id: targetID, fromIndex: msg.lastIndexOf(targetName) }
      ]
    });
    await message.react("👻");
  }
};
