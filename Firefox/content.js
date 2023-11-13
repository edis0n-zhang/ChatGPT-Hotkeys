function simulateClick(button) {
  ["mousedown", "mouseup", "click"].forEach((eventType) => {
    button.dispatchEvent(new MouseEvent(eventType, { bubbles: true }));
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "focusTextArea") {
    console.log("focusTextArea");
    var textarea = document.getElementById("prompt-textarea");
    if (textarea) {
      textarea.focus();
    }
  } else if (request.action === "copyLatest") {
    console.log("copyLatest");
    // default chat gpt copy svg
    var targetInnerHTML1 =
      '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>';
    // chat gpt+ copy svg
    var targetInnerHTML2 =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" stroke-width="2"></path><path d="M9 6C9 4.34315 10.3431 3 12 3V3C13.6569 3 15 4.34315 15 6V6C15 6.55228 14.5523 7 14 7H10C9.44772 7 9 6.55228 9 6V6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path></svg>';
    var buttons = Array.from(document.querySelectorAll("button"));
    console.log("all buttons:");
    console.log(buttons);
    var targetButtons = Array.from(document.querySelectorAll("button")).filter(
      (button) => {
        return (
          button.innerHTML.trim() === targetInnerHTML1.trim() ||
          button.innerHTML.trim() === targetInnerHTML2.trim()
        );
      },
    );
    if (targetButtons.length > 0) {
      console.log("found buttons:" + targetButtons.length);
      console.log(targetButtons);
      var lastButton = targetButtons[targetButtons.length - 1];
      console.log("Last button: " + lastButton);
      simulateClick(lastButton);
    }
  }
});
