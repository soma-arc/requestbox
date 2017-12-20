const firebase = require('firebase/app');

export default class Request {
    /**
     *
     * @param {String} id
     * @param {String} authorId
     * @param {String} title
     * @param {String} location
     * @param {String} dateOfExperiment
     * @param {String} dateOfDeadline
     * @param {String} time
     * @param {String} requirements
     * @param {String} rewards
     * @param {String} abstract
     * @param {String} details
     */
    constructor(id, authorId, title, location, dateOfExperiment, dateOfDeadline, time,
                requirements, rewards, abstract, details) {
        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.location = location;
        this.dateOfExperiment = dateOfExperiment;
        this.time = time;
        this.requirements = requirements;
        this.dateOfDeadline = dateOfDeadline;
        this.rewards = rewards;
        this.abstract = abstract
        this.details = details;
    }

    static CreateFromDBData(obj) {
        return new Request(obj.id, obj.authorId, obj.title, obj.location, obj.dateOfExperiment,
                           obj.dateOfDeadline, obj.time, obj.requirements,
                           obj.rewards, obj.abstract, obj.details);
    }

    /**
     *
     * @param {String} authorId
     * @param {String} title
     * @param {String} location
     * @param {String} dateOfExperiment
     * @param {String} dateOfDeadline
     * @param {String} time
     * @param {String} requirements
     * @param {String} rewards
     * @param {String} abstract
     * @param {String} details
     * @return {Request}
     */
    static AddToDatabase (authorId, title, location, dateOfExperiment, dateOfDeadline, time,
                          requirements, rewards, abstract, details) {
        const newPostKey = firebase.database().ref().child('posts').push().key;
        const postData = {
            id: newPostKey,
            authorId: authorId,
            title: title,
            location: location,
            dateOfExperiment: dateOfExperiment,
            dateOfDeadline: dateOfDeadline,
            time: time,
            requirements: requirements,
            rewards: rewards,
            abstract: abstract,
            details: details
        }
        firebase.database().ref(`/posts/${newPostKey}`).update(postData);
    }
}
