const firebase = require('firebase/app');

export default class User {
    constructor() {
        this.id = '';
        this.email = '';
        this.name = '';
        this.lab = '';
        this.authorized = false;
    }

    /**
     *
     * @param {String} id
     * @param {String} email
     * @param {String} name
     * @param {String} lab
     * @param {Boolean} authorized
     */
    setData(id, email, name, lab, authorized) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.lab = lab;
        this.authorized = authorized;
    }

    /**
     *
     * @param {User} userSlot
     */
    signOut(userSlot) {
        firebase.auth().signOut().then(function() {
            userSlot.setData('', '', '', '', false);
        }).catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} ... ${errorMessage}`);
        });
    }

    /**
     *
     * @param {String} email
     * @param {Strint} password
     * @param {User} userSlot
     * @returns {User}
     */
    static SignInWithEmailAndPassword(email, password, userSlot) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} ... ${errorMessage}`);
        }).then(() => {
            const user = firebase.auth().currentUser;
            firebase.database().ref(`/users/${user.uid}`).once('value').catch(function(error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`${errorCode} ... ${errorMessage}`);
                userSlot.setData(user.uid, email, '', '', true);
            }).then(function(data) {
                const d = data.val();
                userSlot.setData(user.uid, email, d.name, d.lab, true);
            });
        });
        return undefined;
    }

    /**
     *
     * @param {String} name
     * @param {String} email
     * @param {String} lab
     * @param {String} password
     * @param {User} userSlot
     * @returns {User}
     */
    static RegisterWithEmailAndPassword(name, email, lab, password, userSlot) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`${errorCode} ... ${errorMessage}`);
            }).then(() => {
                const user = firebase.auth().currentUser;
                if (user) {
                    firebase.database().ref(`users/${user.uid}`).set({
                        id: user.uid,
                        name: name,
                        lab: lab
                    });

                    userSlot.setData(user.uid, email, name, lab, true);
                }
            });
    }

    /**
     *
     * @param {User} userSlot
     */
    static SignInWithGoogle(userSlot) {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .catch(function(error) {
                const errorCode = error.code;
                const errorMessage = error.message;

                // const email = error.email;
                // const credential = error.credential;
                console.log(`${errorCode} ... ${errorMessage}`);
            }).then(function(result) {
                const user = result.user;
                console.log(user)
                userSlot.setData(user.uid, user.email, user.displayName, '', true);
            });
    }

    static get EMPTY_USER() {
        return new User();
    }
}
