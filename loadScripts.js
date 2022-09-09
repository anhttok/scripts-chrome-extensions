const loadScripts = async () => {
  const utils = {
    sleep: async (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    retryAsync: async (callback) => {
      const stepTime = 100;
      const maxTime = 5000;
      let totalTime = 0;
      let result = await callback();
      console.log("result", result);
      while (result === "RETRY" && totalTime <= maxTime) {
        result = await callback();
        totalTime += stepTime;
        await utils.sleep(20);
      }
      return result;
    },
    loadLibUrl: async (url, options) => {
      //url is URL of external file, implementationCode is the code
      //to be called from the file, location is the location to
      //insert the <script> element
      let { location, implementationCode, awaitRetryReady } = options || {};
      if (!location) {
        location = document.body;
      }
      var scriptTag = document.createElement("script");
      scriptTag.src = url;
      if (implementationCode) {
        scriptTag.onload = implementationCode;
        scriptTag.onreadystatechange = implementationCode;
      }
      location.appendChild(scriptTag);
      if (awaitRetryReady) {
        await utils.retryAsync(awaitRetryReady);
      }
    },
  };
  await utils.loadLibUrl(
    "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
    {
      awaitRetryReady: () => {
        console.log("check", typeof axios);
        if (typeof axios === "undefined") {
          return "RETRY";
        }
        console.log("check ok", typeof axios);
        return true;
      },
    },
  );
  console.log("axios");
  const result = await window.axios({
    method: "get",
    url: "https://raw.githubusercontent.com/anhttok/scripts-chrome-extensions/main/index.js",
    withCredentials: false,
    headers: {
      "User-Agent": "PostmanRuntime/7.29.2",
    },
  });
  console.log(result.data);
  eval(result.data);
};

setTimeout(function () {
  loadScripts();
}, 100);
