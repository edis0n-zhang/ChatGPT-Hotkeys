chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "focusTextArea") {
    var textarea = document.getElementById("prompt-textarea");
    if (textarea) {
      textarea.focus();
    }
  }
});
