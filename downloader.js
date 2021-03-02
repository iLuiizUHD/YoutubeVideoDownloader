const ytdl = require("ytdl-core");
const fs = require("fs-extra");
const { google } = require("googleapis");
async function downloader(method, search_query) {
	const API = process.env.API_KEY;
	const youtube = google.youtube({
		version: "v3",
		auth: API,
	});
	switch (method) {
		case "video":
			let link = search_query;
			try {
				const video = await youtube.videos.list({
					part: "id,snippet",
					id: String(link.substr(link.indexOf("watch?v=") + 8)).split("&")[0],
					maxResults: 10,
				});
				return video.data.items;
			} catch (e) {
				console.log(e);
			}
			break;
		case "search":
			try {
				const search = await youtube.search.list({
					part: "id,snippet",
					q: search_query,
				});
				return search.data.items;
			} catch (e) {
				console.log(e);
			}
			break;
		case "download":
			try {
				let title = search_query[1];
				title = title.replace(/\W+/g, " ");
				var ws;
				console.log(`https://www.youtube.com/watch?v=${search_query[0]}`);
				const video = ytdl(`https://www.youtube.com/watch?v=${search_query[0]}`, {
					quality: "22",
				}).pipe((ws = fs.createWriteStream(`${process.env.USERPROFILE}/Downloads/${title}.mp4`)));
				video.on("error", async (e) => {
					console.log(e);
					return false;
				});
				video.on("finish", async () => {
					console.log("Downloaded");
				});
				return ws;
			} catch (e) {
				console.log(e);
			}
	}
}

module.exports = downloader;
