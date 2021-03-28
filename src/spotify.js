//https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
//BQDwV8dpBFQGh8onzoZkGgrxpZZ3LbXTD48sfxgbuEHgwBC1qUG7mxlrsKvk7le7dbZ2D1pIBjAhOheqHJBt_S3_41gG4WFaleJfXm2vcobnzGXga9RlxDf17x7F2bxawoxPT8RB1ReXQiEe4oHU_WXBBa1rdSal1NanfaeGg2IkfvnVQgrAq_o

export const authEndpoint = 
"https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "0fcf4b2a0c294d7e94bcfbfbf829c6e4";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
    return window.location.hash.substring(1).split('&').reduce((initial, item) => {
        let parts = item.split('=')
        initial[parts[0]] = decodeURIComponent(parts[1])

        return initial
    }, {})
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
    )}&response_type=token&show_dialog=true`;