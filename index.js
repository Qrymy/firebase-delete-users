/**
 * NOTE: ini ./serviceAccount.json
 */

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const init = async () => {
  try {
    let length;

    do {
      const { users } = await admin.auth().listUsers();
      const uids = users.map(({ uid }) => uid);
      length = uids.length;

      await admin.auth().deleteUsers(uids);
    } while (length > 0);
  } catch (e) {
    console.log(e);
  }
};

init();
