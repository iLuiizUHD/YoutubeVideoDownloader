import YouTubeDownload from "ytdl-core";
import fs from "fs-extra";
import { google } from "googleapis";

export default async (method, query) => {
  const API = process.env.API_KEY;
  const youtube = google.youtube({
    version: "v3",
    auth: API,
  });
};
