chrome.commands.onCommand.addListener(function (command) {
  if (command === "open_chatgpt") {
    chrome.tabs.create({ url: "https://chat.openai.com/" });
  } else if (command === "focus_new_prompt") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "focusTextArea" });
    });
  } else if (command === "copy_latest_response") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "copyResponse" });
    });
  }
});
