// Script for adding active class to chat items
const chatItems = document.querySelectorAll(".chat-item");
chatItems.forEach((item) => {
  item.addEventListener("click", () => {
    chatItems.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");
  });
});

// Script for sending chat messages
const sendButton = document.querySelector(".chat-input button");
const messageInput = document.querySelector(".chat-input textarea");
const messageList = document.querySelector(".chat-messages");

sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const messageItem = `
      <div class="chat-message">
        <div class="chat-message-avatar"></div>
        <div class="chat-message-content">
          <div class="chat-message-name">You</div>
          <div class="chat-message-text">${message}</div>
          <div class="chat-message-time">${timestamp}</div>
        </div>
      </div>
    `;
    messageList.insertAdjacentHTML("beforeend", messageItem);
    messageInput.value = "";
  }
});

// Script for receiving chat messages
const receiveMessage = (message, timestamp) => {
  const messageItem = `
    <div class="chat-message">
      <div class="chat-message-avatar"></div>
      <div class="chat-message-content">
        <div class="chat-message-name">User X</div>
        <div class="chat-message-text">${message}</div>
        <div class="chat-message-time">${timestamp}</div>
      </div>
    </div>
  `;
  messageList.insertAdjacentHTML("beforeend", messageItem);
};

// Example usage of receiving a chat message
receiveMessage("Hello, how are you doing?", "11:30 AM");
