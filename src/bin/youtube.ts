import YouTubeDownload from "ytdl-core";
import fs from "fs-extra";
import { google, youtube_v3 } from "googleapis";
import * as yup from "yup";

class YouTubeDownloader {
  private YouTube: youtube_v3.Youtube = null;

  constructor() {
    const API = process.env.API_KEY;
    this.YouTube = google.youtube({
      version: "v3",
      auth: API,
    });
  }

  public async ListVideos(query: string): Promise<Array<any>> {
    return [];
  }

  public async VideoQuery(): Promise<any> {}

  public async Download(link: string): Promise<any> {}
}

export default YouTubeDownloader;
