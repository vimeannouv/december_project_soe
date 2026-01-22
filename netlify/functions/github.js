// @ts-check

import { buffer } from "stream/consumers";

const files = ["index.html", "scripts/main.js"]

export async function handler() {
    const key = process.env.GITHUB_TOKEN;
    const fileName = "index.html";
    const response = await fetch(`https://api.github.com/repos/vimeannouv/december_project_SOE/contents/${fileName}`, {
        headers: {
            Authorization: `token ${key}`,
            Accept: "application/vnd.github+json"
        }
    });
    if (!response.ok)
        return {
            statusCode: response.status,
            body: JSON.stringify({error: `failed fetching ${fileName} from github. status: ${response.status}.`})
        };

    const data = await response.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8"); // git encodes content into base64.
    //buffer stores bytes from content, tostring utf-8 interprets it properly.
    return {
        statusCode: 200,
        body: content,
        headers: {"Content-Type": "text/html"}
    }
}