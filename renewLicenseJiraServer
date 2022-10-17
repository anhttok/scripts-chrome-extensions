function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2]);
}

var originServer = "";

var getOriginServer = () => {
	let originServer = getParameterByName("originServer");
	if (!originServer) {
		originServer = window.localStorage.getItem("originServer");
	}
	if (!originServer) {
		originServer = window.location.origin;	
	}
	if (originServer !== window.location.origin) {
		window.localStorage.setItem("originServer", originServer);
	}
	return originServer;
}

var getServerId = () => {
  if (window.location.origin !== originServer) {
  	return;
  }
  if (window.location.pathname !== "/secure/admin/ViewSystemInfo.jspa") {
    window.location.href = `${originServer}/secure/admin/ViewSystemInfo.jspa?renew=${getParameterByName("renew")}`;
  } 
  serverId = Array.from(document.querySelectorAll("#jirainfo tr")).find(ele => ele.textContent.includes("Server ID")).querySelector(".cell-type-value").textContent;
  const renew = getParameterByName("renew");
  window.location.href = `https://my.atlassian.com/license/evaluation?renew=${renew}&serverId=${serverId}&originServer=${originServer}`
}

var createLicense = () => {
	if (!window.location.href.includes("https://my.atlassian.com/license/evaluation")) {
  	return;
	}
	let serverId = getParameterByName("serverId");
	let renew = getParameterByName("renew");
	if (serverId) {
		window.localStorage.setItem("serverId", serverId);
		window.localStorage.setItem("renew", renew);
	}
	serverId = window.localStorage.getItem("serverId");
	renew = window.localStorage.getItem("renew");
	if (document.querySelector("#product-select").value === "") {
		if (renew === "jira") {
			document.querySelector("#product-select").value = 'Jira Software'
		}
		if (renew === "service") {
			document.querySelector("#product-select").value = 'Jira Service Management'
		}
		
		document.querySelector("#product-select").dispatchEvent(new Event('change'));
	}
	
	if (renew === 'jira' && document.querySelector("label[for='jira-software.data-center']")) {
		document.querySelector("label[for='jira-software.data-center']").click()
	}
	if (renew === "service" && document.querySelector("label[for='jira-servicedesk.data-center']")) {
		document.querySelector("label[for='jira-servicedesk.data-center']").click()
	}
	if (document.querySelector("#serverid")) {
		document.querySelector("#serverid").value = serverId;
		document.querySelector("#generate-license").click();
	}
}

const getLicense = () => {
	if (!window.location.href.includes("https://my.atlassian.com/products/index?sen=")) {
  		return;
	}
	const licenseId = getParameterByName("sen");
	const renew = window.localStorage.getItem("renew");
	const licenseValue = document.querySelector(`#licensebox_${licenseId}`).value;
	window.localStorage.removeItem("renew");
	window.location.href = `${originServer}/plugins/servlet/applications/versions-licenses?renew=${renew}&license=${licenseValue}`;
}

const applyLicense = () => {
	const license = getParameterByName("license");
	const renew = getParameterByName("renew");
	let applicationKey = ''
	if (renew == "jira") {
		applicationKey = "jira-software";
		
	}
	if (renew ==="service") {
		applicationKey = "jira-servicedesk";
	}
	
	document.querySelector(`div[data-application-key="${applicationKey}"] a.update-license-key`).click();
		if (document.querySelector(`div[data-application-key="${applicationKey}"] textarea.license-update-textarea`).value === license) {
			window.location.href = window.location.origin + window.location.pathname
			return;
		}
		document.querySelector(`div[data-application-key="${applicationKey}"] textarea.license-update-textarea`).value = license;
		document.querySelector(`div[data-application-key="${applicationKey}"] input.license-update-submit`).removeAttribute("disabled");
		document.querySelector(`div[data-application-key="${applicationKey}"] input.license-update-submit`).click();
	
}

setTimeout(function() {
	const hasRenewParam =  !!getParameterByName("renew");
	const hasRenewLocalStorage = window.localStorage.getItem("renew");
	const hasLicenseParam = getParameterByName("license");
	console.log(hasRenewParam, hasRenewLocalStorage)
	if (!hasRenewParam && !hasRenewLocalStorage) {
		return;
	}
	originServer = getOriginServer();
	if (hasLicenseParam) {
		applyLicense();
		return;
	}
	getServerId();
	createLicense();
	getLicense();
}, 1000);
