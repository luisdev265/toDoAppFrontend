import { sessionManager } from "./sessionManager";

/**
 * Handles managers creation
  */
export class factoryManagers {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    createSessionManager () {
        return new sessionManager(this.token);
    }

}