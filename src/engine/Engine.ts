import { EventEmitter } from 'events'

/*
    Card game engine instance.
    State machine for a single card game.
    Extends EventEmitter for game updates

    TODO: Need to create random module that takes a seed for reproducibility
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