class User {
    constructor() {
        this.isSubscribed = false;
        this.isTrialist = false;
    }

    /**
     * Setter for multiple user properties at once.
     *
     * @param {Object} [userProperties={}] - An object containing user status flags.
     * @param {boolean} [userProperties.isSubscribed=false] - Subscription status.
     * @param {boolean} [userProperties.isTrialist=false] - Trial status.
     * @param {boolean} [userProperties.isRegistered=false] - Registration status.
     */
    setUser(userProperties) {
        this.isSubscribed = userProperties?.isSubscribed || false;
        this.isTrialist = userProperties?.isTrialist || false;
        this.isRegistered = userProperties?.isRegistered || false;
    }

    /**
    * Get the access level for users who are not subscribed.
    *
    * @returns {'trialist' | 'registered' | 'anonymous'} The access level string.
    */
    getNonSubscribersAccessLevel() {
        this.isTrialist
            ? 'trialist'
            : this.isRegistered
                ? 'registered'
                : 'anonymous';
    }

    /**
    * Getter for subscription status.
    *
    * @returns {boolean} True if the user is subscribed, otherwise false.
    */
    isSubscribed() {
        return this.isSubscribed;
    }

}

export default User;