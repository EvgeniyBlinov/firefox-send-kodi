// This function must be called in a visible page, such as a browserAction popup
// or a content script. Calling it in a background page has no effect!
function send2kodi(v, text) {
    const requestURL = 'http://' + v.host + ':' + v.port + '/jsonrpc';
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type','application/json');
    requestHeaders.append('Authorization', 'Basic ' + btoa(v.user + ':' + v.pass));

    const driveRequest = new Request(requestURL, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "Input.SendText",
            "params": {
                "text": text,
                "done": false
            },
            "id": 1
        })
    });

    return fetch(driveRequest);
}
