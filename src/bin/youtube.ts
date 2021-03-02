import YouTubeDownloadCore from "ytdl-core";
import fs from "fs-extra";
import { config } from "dotenv";
import { google, youtube_v3 } from "googleapis";
import * as yup from "yup";

config();

class YouTubeDownloader {
  private YouTube: youtube_v3.Youtube = null;
  private YouTubeVideoQuery = yup.object().shape({
    terms: yup.string().trim().required(),
  });
  private YouTubeVideoID = yup.object().shape({
    id: yup
      .string()
      .trim()
      .matches(/([A-Za-z0-9_\-]{11})/g)
      .required(),
  });

  constructor() {
    const API = process.env.API_KEY;
    this.YouTube = google.youtube({
      version: "v3",
      auth: API,
    });
  }

  public async Query(
    query: string
  ): Promise<Array<youtube_v3.Schema$SearchResult>> {
    try {
      const body = await this.YouTubeVideoQuery.validate({ terms: query });

      const { data } = await this.YouTube.search.list({
        part: ["id", "snipped"],
        q: body.terms,
      });

      return data.items;

      //
    } catch (error) {
      // Do nothing
    }
  }

  public async Video(
    video_id: string
  ): Promise<Array<youtube_v3.Schema$Video>> {
    try {
      const body = await this.YouTubeVideoID.validate({ id: video_id });

      const { data } = await this.YouTube.videos.list({
        part: ["id", "snipped"],
        id: [body.id],
        maxResults: 10,
      });

      return data.items;

      //
    } catch (error) {
      // Do nothing
    }
  }

  public async Download(link: string): Promise<any> {}
}

export default YouTubeDownloader;
