import * as cheerio from "cheerio";

export function parseContent(html: string) {
  const $ = cheerio.load(html);

  return {
    title: $("title").text(),
    headings: $("h1, h2, h3")
      .map((_, el) => $(el).text())
      .get(),
    buttons: $("button")
      .map((_, el) => $(el).text())
      .get(),
    forms: $("form")
      .map((_, el) => $(el).attr("action"))
      .get(),
    mainTextSnippet: $("body").text().slice(0, 2000),
  };
}