import { Telegraf, Markup } from "telegraf";
import { generateHTML } from "../utils/htmlTemplate.js";
import { sendEmail } from "../utils/email.js";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    "🎬 *Movie & Series Post Generator*\nSend Movie / Series Name",
    { parse_mode: "Markdown" }
  );
});

bot.on("text", async (ctx) => {
  const query = ctx.message.text;

  try {
    const search = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_KEY}&query=${query}`
    );
    const data = await search.json();
    const result = data.results[0];

    if (!result) return ctx.reply("❌ No results found.");

    const tmdbId = result.id;
    const type = result.media_type; // movie | tv

    if (type === "tv") {
      ctx.session = { tvId: tmdbId, step: "season" };
      return ctx.reply("📌 Enter Season Number:");
    }

    if (type === "movie") {
      ctx.reply("⏳ Generating...");
      const html = await generateHTML(tmdbId, "movie");

      return ctx.reply("📝 *HTML generated*", {
        parse_mode: "Markdown",
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback("📋 Copy HTML", `copy|${tmdbId}|movie`)],
          [Markup.button.callback("📩 Post to Blogger", `post|${tmdbId}|movie`)]
        ])
      }).then(() => ctx.reply(html));
    }
  } catch (err) {
    console.log(err);
    ctx.reply("❌ Something went wrong");
  }
});

bot.hears(/^\d+$/, async (ctx) => {
  if (ctx.session?.step === "season") {
    ctx.session.season = ctx.message.text;
    ctx.session.step = "episode";
    return ctx.reply("🎬 Enter Episode Number:");
  }

  if (ctx.session?.step === "episode") {
    const episode = ctx.message.text;
    const season = ctx.session.season;
    const tmdbId = ctx.session.tvId;

    ctx.session = null;
    ctx.reply("⏳ Generating...");

    const html = await generateHTML(tmdbId, "tv", season, episode);

    return ctx.reply("📝 *HTML Ready*", {
      parse_mode: "Markdown",
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.callback("📋 Copy HTML", `copy|${tmdbId}|tv|${season}|${episode}`)],
        [Markup.button.callback("📩 Post to Blogger", `post|${tmdbId}|tv|${season}|${episode}`)]
      ])
    }).then(() => ctx.reply(html));
  }
});

bot.action(/^post/, async (ctx) => {
  const [_, tmdbId, type, season, episode] = ctx.callbackQuery.data.split("|");

  const html = await generateHTML(tmdbId, type, season, episode);
  await sendEmail(html);

  ctx.reply("📩 Posted to Blogger Successfully");
});

export default async function handler(req, res) {
  try { await bot.handleUpdate(req.body); }
  catch (e) { console.log(e); }
  res.end("ok");
}