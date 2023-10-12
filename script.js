const input = document.querySelector(".input");
const messages = document.querySelector(".messages");

let initial = true,
  last = false;
function message(msg, self = false, animate = true) {
  // check whether to insert a spacer
  if (initial) {
    initial = false;
    last = self;
  } else if (this.last !== self) {
    this.last = self;
    const spacer = document.createElement("div");
    spacer.classList.add("spacer");
    messages.appendChild(spacer);
  }

  // append message
  const message = document.createElement("div");
  message.classList.add("message");
  self && message.classList.add("self");
  animate && message.classList.add("animate");
  const text = document.createTextNode(msg);
  message.appendChild(text);

  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;

  this.last = self;
}

// setup some intial text
((messages) =>
  messages.map(({ text, self = false }) => {
    message(text, self, false);
  }))([
  { text: "Hello" },
  { text: "This is a chat UI with a glassmorphism effect" },
  { text: "This is an interactive demo — try sending a message!", self: true },
  {
    text:
      "Here's some very long wrapping text. This chat app is also responsive. Try resizing your browser window! This is filler text."
  },
  {
    text:
      "What are you waiting for? Go ahead, try sending a message yourself! Seriously, stop staring and send a message.",
    self: true
  }
]);

let timer = null;
input.addEventListener("keypress", (e) => {
  if (e.key !== "Enter" || !input.value.trim().length) return;
  message(input.value, true);
  input.value = "";

  // avoid multiple responses from last message
  clearTimeout(timer);

  // generate random response
  if (Math.random() > 0.3) {
    const responses = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful."
    ];
    // random response delay
    timer = setTimeout(
      () => message(responses[(Math.random() * responses.length) | 0]),
      (Math.random() * 3000) | 0
    );
  }
});

// remove weird overflow on animation
let overflown = false;
messages.addEventListener("animationend", () => {
  if (overflown) return;
  if (messages.scrollHeight > messages.clientHeight) {
    messages.style["overflow-y"] = "auto";
    overflown = true;
  }
});

window.addEventListener("resize", () => {
  if (messages.scrollHeight > messages.clientHeight) {
    messages.style["overflow-y"] = "auto";
    overflown = true;
  } else overflown = false;
});