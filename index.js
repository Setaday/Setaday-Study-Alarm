const { Client, GatewayIntentBits } = require("discord.js");
const cron = require("node-cron");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const getToday = () => {
  const now = new Date();
  return `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`;
};

client.once("ready", () => {
  console.log("이정우 분신 1호 재부팅");

  cron.schedule(
    "0 22 * * *",
    async () => {
      try {
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);

        if (channel) {
          await channel.send("아름아 도윤아 공부하자~~~!!");
          console.log(`${getToday()} 공부시키기 성공했어요`);
        }
      } catch (error) {
        console.error(`${getToday()} 공부시키기 실패했어요: `, error);
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Seoul",
    }
  );
});

client.login(process.env.BOT_TOKEN);
