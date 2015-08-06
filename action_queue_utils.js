'use strict';


class ActionQueue {
    constructor() {
        let actionClass = this.constructor.prototype;
        let actionClassPropertyNames = Object.getOwnPropertyNames(actionClass);

        this.constructor = actionClass.constructor;

        for(let i = 1; i < actionClassPropertyNames.length; i++) {
            let methodName = actionClassPropertyNames[i];
            actionClass[methodName] = () => console.log('hello');
        }
    }
}

export default ActionQueue;