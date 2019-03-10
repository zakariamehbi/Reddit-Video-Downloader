const ffmpeg = require("fluent-ffmpeg");
const proc = new ffmpeg();
const urlRegex = require("url-regex");
const fetch = require("node-fetch");

// Video with no sound
// const url = "https://www.reddit.com/r/oddlysatisfying/comments/akckwr/smooshing_kinetic_sand/";

// Video with no sound
const url = "https://www.reddit.com/r/xboxone/comments/ak7flf/the_best_part_of_anthem_demo_is_flying/";

proc.setFfmpegPath(`C:\\FFmpeg\\bin\\ffmpeg.exe`);

fetch(url)
  .then(res => {
    return res.text();
  })
  .then(body => {
    const urls = body.match(urlRegex());
    const mediaUrls = urls.filter(url => url.includes("v.redd.it"));
    let mediaUrl = mediaUrls[0].split("https://v.redd.it/")[1];
    mediaId = mediaUrl.split("/")[0];

    console.log("urls", urls);
    console.log("mediaId", mediaId);

    proc.addInput(`https://v.redd.it/${mediaId}/DASH_1_2_M`)
      .addInput(`https://v.redd.it/${mediaId}/audio`)
      .output(`./download/${mediaId}.mp4`)
      .on("progress", function(progress) {
        console.log(
          "Processing: " + Math.round(progress.percent) + "% done"
        );
      })
      .on("error", err => {
        console.log("Error: " + err);
      })
      .on("end", () => {
        console.log("Done");
      })
      .run();
  });

