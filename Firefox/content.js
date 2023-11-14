function simulateClick(button) {
  ["mousedown", "mouseup", "click"].forEach((eventType) => {
    button.dispatchEvent(new MouseEvent(eventType, { bubbles: true }));
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "focusTextArea") {
    // console.log("focusTextArea");
    var textarea = document.getElementById("prompt-textarea");
    if (textarea) {
      textarea.focus();
    }
  } else if (request.action === "copyLatest") {
    // console.log("copyLatest");
    // default chat gpt copy svg
    var targetInnerHTML1 =
      '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>';
    // chat gpt+ copy svg
    var targetInnerHTML2 =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" stroke-width="2"></path><path d="M9 6C9 4.34315 10.3431 3 12 3V3C13.6569 3 15 4.34315 15 6V6C15 6.55228 14.5523 7 14 7H10C9.44772 7 9 6.55228 9 6V6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path></svg>';
    var buttons = Array.from(document.querySelectorAll("button"));
    // console.log("all buttons:");
    // console.log(buttons);
    var targetButtons = Array.from(document.querySelectorAll("button")).filter(
      (button) => {
        return (
          button.innerHTML.trim() === targetInnerHTML1.trim() ||
          button.innerHTML.trim() === targetInnerHTML2.trim()
        );
      },
    );
    if (targetButtons.length > 0) {
      // console.log("found buttons:" + targetButtons.length);
      // console.log(targetButtons);
      var lastButton = targetButtons[targetButtons.length - 1];
      // console.log("Last button: " + lastButton);
      simulateClick(lastButton);
    }
  } else if (request.action === "editLatest") {
    // console.log("editLatest");
    // default chat gpt copy svg
    var targetInnerHTML1 =
      '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
    // chat gpt+ copy svg
    var targetInnerHTML2 =
      '<div class="flex items-center gap-1.5 text-xs"><svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M8.08571 16.081L15.8333 8.3335C16.9838 7.1829 16.9838 5.31742 15.8333 4.16683C14.6827 3.01624 12.8172 3.01624 11.6666 4.16683L3.91904 11.9144C3.54397 12.2894 3.33325 12.7982 3.33325 13.3286V15.6668C3.33325 16.2191 3.78097 16.6668 4.33325 16.6668H6.67149C7.20192 16.6668 7.71063 16.4561 8.08571 16.081Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.8333 5L14.9999 9.16667" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>';
    var buttons = Array.from(document.querySelectorAll("button"));
    // console.log("all buttons:");
    // console.log(buttons);
    var targetButtons = Array.from(document.querySelectorAll("button")).filter(
      (button) => {
        return (
          button.innerHTML.trim() === targetInnerHTML1.trim() ||
          button.innerHTML.trim() === targetInnerHTML2.trim()
        );
      },
    );

    if (targetButtons.length > 0) {
      // console.log("found buttons:" + targetButtons.length);
      // console.log(targetButtons);
      var lastButton = targetButtons[targetButtons.length - 1];
      // console.log("Last button: " + lastButton);
      simulateClick(lastButton);
    }

    // timeout functions are to ensure that the order is the following
    // 1. text area is found correctly
    // 2. set to the variable in the outer scope
    // 3. focus on the variable in the outer scope

    var filteredTextareas;

    setTimeout(function () {
      // default class name
      var targetClassName1 =
        "m-0 resize-none border-0 bg-transparent p-0 focus:ring-0 focus-visible:ring-0";
      // chatgpt+ class name
      var targetClassName2 =
        "m-0 resize-none border-0 bg-transparent p-0 focus:ring-0 focus-visible:ring-0";
      var allTextareas = document.getElementsByTagName("textarea");
      var textareaArray = Array.from(allTextareas);

      // console.log("all:");
      // console.log(allTextareas);

      filteredTextareas = textareaArray.filter(function (textarea) {
        // Check if the textarea contains all the classes in targetClasses
        var classListString = Array.from(textarea.classList).join(" ");
        return (
          classListString === targetClassName1 ||
          classListString === targetClassName2
        );
      });
      // console.log("filtered inside:");
      // console.log(filteredTextareas);
    }, 100);

    setTimeout(function () {
      // console.log("filtered outside:");
      // console.log(filteredTextareas);

      // Check if any textareas are found and focus on the first one
      if (filteredTextareas.length > 0) {
        filteredTextareas[0].focus();
      }
    }, 200);
  }
});
