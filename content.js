
chrome.runtime.sendMessage({topic: 'isCouchAddress'});

const colorMap = {
  prod: '#CC0000',
  rc: '#ffbb33',
  stage: '#00C851',
  dev: '#aa66cc',
  local: '#33b5e5',
  demo: '#00695c'
}

const createBanner = (env) => {
  const banner = document.createElement('div')
  const text = document.createElement('p')
  text.style.fontSize = '3vh'
  text.style.textAlign = 'center'
  text.innerText = env.toUpperCase()
  banner.appendChild(text)
  return banner
}

const styleBanner = (element, env) => {
  element.style.height = '4vh'
  element.style.backgroundColor = colorMap[env]
  element.style.color = 'white'
  element.style.display = 'flex'
  element.style.alignItems = 'center'
  element.style.justifyContent = 'center'
}

const stylePage = () => {
  const page = document.querySelector('#app-container')
  page.style.height = '96vh'
}

const addBanner = (env) => {
  const banner = createBanner(env)
  styleBanner(banner, env)
  stylePage()
  document.body.prepend(banner)
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    const { topic, env } = request
    if (topic === "currentEnv") {
      addBanner(env)
      document.title = env.toUpperCase()
    }
  }
);
