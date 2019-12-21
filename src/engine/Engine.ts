import { EventEmitter } from 'events'

/*
    Card game engine instance.
    State machine for a single card game.
    Extends EventEmitter for game updates
*/
class Engine extends EventEmitter {

    // TODO: What is needed here?
    // constructor(Players, Cards, Actions)
    constructor() {
        super();
    }

    Start() {
        this.emit('Start', {});
    }
    Terminate() {
        this.emit('Terminate', {});
    }
}

export { Engine };