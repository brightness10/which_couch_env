// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.executeScript(
//       tabs[0].id,
//       {code: 'document.body.style.backgroundColor = "red";'});
// });

const getEnv = (url) => {
  const env = url.split('.')[1]
  const isNumber = Number.isInteger(Number(env))
  return isNumber ? 'prod' : env
}

const handleMessage = (request, sender, sendResponse) => {
  if (request.topic === "isCouchAddress" ) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const activeTab = tabs[0]
      const env = getEnv(activeTab.url)
      const message = {
        topic: "currentEnv",
        env
      }
      chrome.tabs.sendMessage(activeTab.id, message);
    });
  }
}

chrome.runtime.onMessage.addListener(handleMessage)

