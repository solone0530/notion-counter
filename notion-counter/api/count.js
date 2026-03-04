import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const databaseId = "31946be4c8ca8054956bdc70c4accd26";

  let hasMore = true;
  let startCursor = undefined;
  let total = 0;

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: startCursor,
    });

    total += response.results.length;
    hasMore = response.has_more;
    startCursor = response.next_cursor;
  }

  res.status(200).json({ count: total });
}