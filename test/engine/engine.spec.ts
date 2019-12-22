import { Engine } from '../../src'

import 'mocha'
import chai = require('chai')
import sinon = require('sinon')
import sinonChai = require('sinon-chai')
chai.use(sinonChai)


const engine = new Engine();
engine.Start();

describe('Engine', () => {
    it('should emit Start event', () => {
        const engine = new Engine();

        let spy = sinon.spy();
        engine.on('Start', spy);
        engine.Start();
        chai.expect(spy).to.be.have.been.called;
    })
    
})