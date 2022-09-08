const sitesConfig = {
  "anhtt.loggly.com": () => {
    setInterval(() => {
        if (document.querySelector("button.run-search")) {
          document.querySelector("button.run-search").click()
        }
      }, 60000)
  },
  "youtube.com": () => {
    setInterval(() => {
    const playerContainerInner = document.querySelector('#player-container-inner')
    if (!playerContainerInner)  {
      return;
    }
    document.querySelector('#player-container-inner').style.paddingTop = `calc(var(--ytd-watch-flexy-height-ratio)/var(--ytd-watch-flexy-width-ratio) * 100% + 50px)`
    }, 3000)
  }
}


const href = window.location.href;

const currentSiteConfig = Object.keys(sitesConfig).find(site => href.includes(site));

if (currentSiteConfig) {
  sitesConfig[currentSiteConfig]()
}
