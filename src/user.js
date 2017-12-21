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
     * @returns {Promise}
     */
    signOut() {
        return firebase.auth().signOut();
    }

    /**
     *
     * @param {String} email
     * @param {Strint} password
     * @returns {Promise}
     */
    static SignInWithEmailAndPassword(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    /**
     *
     * @param {String} email
     * @param {String} password
     * @returns {Promise}
     */
    static RegisterWithEmailAndPassword(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    /**
     *
     * @return {Promise}
     */
    static SignInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider);
    }

    static get EMPTY_USER() {
        return new User();
    }
}
