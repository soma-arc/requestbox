const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNewPostNortification = functions.database.ref('/posts/{postId}/details')
    .onCreate(event => {
        const original = event.data.val();
        const uppercase = original.toUpperCase();
        console.log('new post!')

        // Get the list of device notification tokens.
        const getDeviceTokensPromise = admin.database().ref('/tokens').once('value');

        return Promise.all([getDeviceTokensPromise]).then(results => {
            const tokensSnapshot = results[0];

            // Check if there are any device tokens.
            if (!tokensSnapshot.hasChildren()) {
                return console.log('There are no notification tokens to send to.');
            }
            console.log('There are', tokensSnapshot.numChildren(), 'tokens to send notifications to.');

            // Notification details.
            const payload = {
                notification: {
                    title: 'You have a new follower!',
                    body: 'is now following you.',
                }
            };

            // Listing all tokens.
            const tokens = Object.keys(tokensSnapshot.val());

            // Send notifications to all tokens.
            return admin.messaging().sendToDevice(tokens, payload).then(response => {
                // For each message check if there was an error.
                const tokensToRemove = [];
                response.results.forEach((result, index) => {
                    const error = result.error;
                    if (error) {
                        console.error('Failure sending notification to', tokens[index], error);
                        // Cleanup the tokens who are not registered anymore.
                        if (error.code === 'messaging/invalid-registration-token' ||
                            error.code === 'messaging/registration-token-not-registered') {
                            tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
                        }
                    }
                });
                return Promise.all(tokensToRemove);
            });
        });
    });
