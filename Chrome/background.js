chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  // Setup code here
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "open_chatgpt") {
    chrome.tabs.query({ url: "https://chat.openai.com/*" }, function (tabs) {
      if (tabs.length > 0) {
        // If a ChatGPT tab is found, focus on the first one
        chrome.tabs.update(tabs[0].id, { active: true });
        // Optionally, you can also bring the window to the foreground
        chrome.windows.update(tabs[0].windowId, { focused: true });
      } else {
        // If no ChatGPT tab is found, create a new one
        chrome.tabs.create({ url: "https://chat.openai.com/" });
      }
    });
  } else if (command === "focus_new_prompt") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "focusTextArea" });
    });
  } else if (command === "copy_latest_answer") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "copyLatest" });
    });
  } else if (command === "edit_latest_prompt") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "editLatest" });
    });
  } else if (command === "switch-to-chatgpt") {
    chrome.tabs.query({}, (tabs) => {
      for (let tab of tabs) {
        // Assuming the URL of the ChatGPT tab contains "chat.openai.com"
        if (tab.url && tab.url.includes("chat.openai.com")) {
          chrome.tabs.update(tab.id, { active: true, highlighted: true });
          break;
        }
      }
    });
  }
});
