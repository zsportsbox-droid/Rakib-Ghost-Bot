const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get, child, remove } = require("firebase/database");

// ১. আপনার দেওয়া Firebase কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyANT1dGfS6iH_ztInsncqQVSguLjemBaIA",
  authDomain: "animov-d1e98.firebaseapp.com",
  databaseURL: "https://animov-d1e98-default-rtdb.firebaseio.com",
  projectId: "animov-d1e98",
  storageBucket: "animov-d1e98.firebasestorage.app",
  messagingSenderId: "921934862470",
  appId: "1:921934862470:web:88dcb0e80ac3ba32fdd907"
};

// ২. Firebase Initialize
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = {
  config: {
    name: "nsave",
    aliases: ["save", "ns"],
    version: "2.0",
    author: "Rakib",
    countDown: 3,
    role: 0,
    shortDescription: "Firebase-এ কোড বা টেক্সট সেভ করার সিস্টেম",
    category: "utility",
    guide: { 
      en: "{p}nsave [name] [text/code] - সেভ করতে\n" +
          "{p}nsave [name] - ডাটা দেখতে\n" +
          "{p}nsave list - সব লিস্ট দেখতে\n" +
          "{p}nsave del [name] - ডিলিট করতে" 
    }
  },

  onStart: async function ({ message, args, event }) {
    const action = args[0]?.toLowerCase();
    const fileName = args[1]?.toLowerCase();
    const content = args.slice(2).join(" ");
    const dbRef = ref(db, "nsave_files");

    // --- ৩. সব ফাইলের লিস্ট দেখা ---
    if (action === "list") {
      try {
        const snapshot = await get(dbRef);
        if (!snapshot.exists()) return message.reply("📭 সেভ লিস্ট এখন খালি।");
        
        let msg = "📂 **Firebase Saved Files:**\n\n";
        let i = 1;
        snapshot.forEach((childSnapshot) => {
          msg += `${i++}. ${childSnapshot.key}\n`;
        });
        return message.reply(msg);
      } catch (e) { return message.reply("❌ লিস্ট আনতে সমস্যা হয়েছে: " + e.message); }
    }

    // --- ৪. ফাইল ডিলিট করা ---
    if (action === "del" && fileName) {
      try {
        await remove(ref(db, `nsave_files/${fileName}`));
        return message.reply(`🗑️ '${fileName}' ফাইলটি সফলভাবে ডিলিট করা হয়েছে।`);
      } catch (e) { return message.reply("❌ ডিলিট করা যায়নি: " + e.message); }
    }

    // --- ৫. ফাইল সেভ করা (কোড বা টেক্সট) ---
    if (fileName && content) {
      try {
        await set(ref(db, `nsave_files/${fileName}`), {
          data: content,
          time: new Date().toLocaleString(),
          sender: event.senderID
        });
        return message.reply(`✅ '${fileName}' সাকসেসফুলি সেভ হয়েছে।`);
      } catch (e) { return message.reply("❌ সেভ করা যায়নি: " + e.message); }
    }

    // --- ৬. সেভ করা ডাটা কল করা ---
    if (action && !fileName) {
      try {
        const snapshot = await get(child(dbRef, action));
        if (!snapshot.exists()) return message.reply(`❌ '${action}' নামে কোনো ফাইল নেই।`);
        
        const result = snapshot.val().data;
        // যদি কোড হয় তবে কোড ব্লকে দেখানো
        const formattedOutput = result.includes("module.exports") || result.includes("{") 
          ? `\`\`\`javascript\n${result}\n\`\`\`` 
          : result;

        return message.reply(formattedOutput);
      } catch (e) { return message.reply("❌ ডাটা আনতে সমস্যা হয়েছে।"); }
    }

    return message.reply("⚠️ ব্যবহার পদ্ধতি:\n.nsave [নাম] [কোড/টেক্সট]\nবা ডিলিট করতে: .nsave del [নাম]");
  }
};
