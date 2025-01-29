chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "updateURL",
    title: "Sin galletas",
    contexts: ["link"]
  });
});

// Escuchar cuando el usuario haga clic en la opción
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "updateURL") {
    let newURL = updateURL(info.linkUrl);
    chrome.tabs.create({ url: newURL });
  }
});

// Función para modificar la URL
function updateURL(url) {
  if (url.includes("watch")) {
    return url.replace(/youtube/, "yout-ube");
  }
  return url;
}