const {OAuth2Client} = require('google-auth-library');

const clientID = process.env.GOOGLE_ON_AUTH_CLIENT_ID
const client = new OAuth2Client(clientID);

async function googleVerifyAuth(token = '') {

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const {
      name,
      picture,
      email
    } = ticket.getPayload();

    return {
      name,
      img: picture,
      email
    }
  } catch (e) {
    console.log(e)
  }

}

module.exports = {
  googleVerifyAuth
}