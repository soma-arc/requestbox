const firebase = require('firebase/app');

export default class Request {
    /**
     *
     * @param {String} id
     * @param {String} authorId
     * @param {String} title
     * @param {String} location
     * @param {String} format
     * @param {[String]} dateOfExperiment
     * @param {String} dateOfDeadline
     * @param {String} time
     * @param {Number} num
     * @param {String} requirements
     * @param {String} rewards
     * @param {String} abstract
     * @param {String} contact
     * @param {String} details
     */
    constructor(id, authorId, title, location, format, dateOfExperiment, dateOfDeadline, time, num,
                requirements, rewards, abstract, contact, details) {
        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.location = location;
        this.format = format;
        this.dateOfExperiment = dateOfExperiment;
        this.time = time;
        this.num = num;
        this.requirements = requirements;
        this.dateOfDeadline = dateOfDeadline;
        this.rewards = rewards;
        this.abstract = abstract
        this.contact = contact
        this.details = details;
    }

    static CreateFromDBData(obj) {
        console.log(obj.details.replace('//n', '<br>'));
        return new Request(obj.id, obj.authorId, obj.title,
                           obj.location, obj.format, obj.dateOfExperiment,
                           obj.dateOfDeadline, obj.time, obj.num, obj.requirements,
                           obj.rewards, obj.abstract, obj.contact, obj.details);
    }

    /**
     *
     * @param {String} authorId
     * @param {String} title
     * @param {String} location
     * @param {String} format
     * @param {[String]} [dateOfExperiment]
     * @param {String} dateOfDeadline
     * @param {String} time
     * @param {Number} num
     * @param {String} requirements
     * @param {String} rewards
     * @param {String} abstract
     * @param {String} contact
     * @param {String} details
     * @return {Request}
     */
    static AddToDatabase (authorId, title, location, format, dateOfExperiment, dateOfDeadline, time, num,
                          requirements, rewards, abstract, contact, details) {
        const newPostKey = firebase.database().ref().child('posts').push().key;
        const postData = {
            id: newPostKey,
            authorId: authorId,
            title: title,
            location: location,
            format: format,
            dateOfExperiment: dateOfExperiment,
            dateOfDeadline: dateOfDeadline,
            time: time,
            num: num,
            requirements: requirements,
            rewards: rewards,
            abstract: abstract,
            contact: contact,
            details: details
        }
        firebase.database().ref(`/posts/${newPostKey}`).update(postData);
    }
}
