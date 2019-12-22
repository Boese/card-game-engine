import { Engine } from '../../src'

import 'mocha'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)


describe('Engine', () => {
    it('should emit Start event', () => {
        const engine = new Engine();

        let spy = sinon.spy();
        engine.on('Start', spy);
        engine.Start();
        chai.expect(spy).to.be.have.been.called;
    })
    
})