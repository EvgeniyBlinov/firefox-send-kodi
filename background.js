function notifyUser(response) {
  browser.notifications.create({
    "type": "basic",
    "title": "KODI info",
    "message": `${response.result}`
  });
}

browser.contextMenus.create({
    id: "send-to-kodi",
    title: "Send to KODI",
    contexts: ["link"],
});

function logError(error) {
    console.error(`Error: ${error}`);
}

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "send-to-kodi") {
        const text = info.linkUrl;
        var variables = kodiVariables();
        send2kodi(variables, text).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw response.status;
            }
        })
        .then(notifyUser)
        .catch(logError);
    }
});
