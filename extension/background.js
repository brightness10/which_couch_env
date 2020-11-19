const getEnv = (url) => url.includes('localhost') ? 'prod' : url.split('.')[1]

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

