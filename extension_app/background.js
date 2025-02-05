chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openNewTab",
    title: "Abrir pestaña sin galletas",
    contexts: ["link"]
  });
  
  chrome.contextMenus.create({
    id: "updateTab",
    title: "Recargar sin galletas",
    contexts: ["page"]
  });
  
});

// Escuchar cuando el usuario haga clic en la opción
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let newURL, newTab

  if (info.menuItemId === "openNewTab") {
    newURL = createURL(info.linkUrl);
    chrome.tabs.create({ url: newURL }, (newTab));    // Abre una pestaña con el link modificado
  }

  else if (info.menuItemId === "updateTab") {
    newURL = createURL(tab.url);
    chrome.tabs.update(tab.id, { url: newURL }); // Recarga la misma pestaña con la URL modificada
    refresh(tab.id);
  }


});

function createURL(url) {
  if (url.includes("watch")) {
    return url.replace(/youtube/, "yout-ube");
  }
  return url;
}

// Función para recargar la pestaña después de 1 segundo
function refresh(tabId) {
  setTimeout(() => {
    chrome.tabs.reload(tabId);
  }, 1000);
}