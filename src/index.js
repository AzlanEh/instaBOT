import dotenv from "dotenv";
import { IgApiClient } from "instagram-private-api";

dotenv.config({
  path: "./.env",
});

const ig = new IgApiClient();

const S_USER_NAME = ""; // <== write your user name
const S_USER_PASSWORD = ""; // <== write your Password

const rUserName = ""; // <==  write user name to send massage
const numberOfMessage = 10; // <==  how many times to send message
const message = ""; // <==  Type message

ig.state.generateDevice(`${S_USER_NAME}`);

(async () => {
  // Login to Instagram
  await ig.account.login(`${S_USER_NAME}`, `${S_USER_PASSWORD}`);

  // Function to send a message
  async function sendMessage(username, message) {
    const userId = await ig.user.getIdByUsername(username);

    const thread = ig.entity.directThread([userId]);
    await thread.broadcastText(message);
  }

  for (let i = 0; (i = numberOfMessage); i++) {
    await sendMessage(rUserName, message);
    await new Promise((r) => setTimeout(r, 1000));
  }
})();
