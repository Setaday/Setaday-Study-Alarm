const { Client, GatewayIntentBits } = require("discord.js");
const cron = require("node-cron");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const getTime = () => {
  const now = new Date();
  return `${now.getFullYear()}.${
    now.getMonth() + 1
  }.${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
};

client.once("ready", () => {
  console.log("이정우 분신 1호 재부팅");

  const sendMessage = async () => {
    try {
      const channel = await client.channels.fetch(process.env.CHANNEL_ID);

      if (channel) {
        await channel.send("아름아 도윤아 공부하자~~~!!");
        console.log(`${getTime()} 공부시키기 성공했어요`);
      }
    } catch (error) {
      console.error(`${getTime()} 공부시키기 실패했어요: `, error);
    }
  };

  cron.schedule("0 22 * * *", sendMessage, {
    scheduled: true,
    timezone: "Asia/Seoul",
  });

  cron.schedule("0 23 * * *", sendMessage, {
    scheduled: true,
    timezone: "Asia/Seoul",
  });
});

client.login(process.env.BOT_TOKEN);
