export async function handler(ev) {
    const key = process.env.GITHUB_KEY;
    const fileName = "index.html";
    const response = await fetch(`https://api.github.com/repos/vimeannouv/december_project_SOE/contents/${fileName}`, {
        headers: {
            Authorization: `Bearer ${key}`,
            Accept: "application/vnd.github+json"
        }
    });
    if (!response.ok)
        return {
            statusCode: response.status,
            body: JSON.stringify({error: `failed fetching ${fileName} from github: `})
        };

    const data = await response.json();
    const content = atob(data.content);
    return {
        statusCode: 200,
        body: content,
        headers: {"Content-Type": "text/html"}
    }
}