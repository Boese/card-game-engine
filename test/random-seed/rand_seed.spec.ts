

import 'mocha'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)


describe('Random Seed', () => {

    // it('should not throw', () => {
    //     let rand_seed = require('bindings')('..\\src\\random-seed\\build\\Release\\random_seed.node');
    //     chai.assert.doesNotThrow(() => { rand_seed.srand(); });
    // })
    it('should return 1', () => {
        let rand_seed = require('bindings')('..\\src\\random-seed\\build\\Release\\random_seed.node');
        let seed1 = rand_seed.rand();
        rand_seed.srand(1); // reset
        let seed2 = rand_seed.rand();
        chai.expect(seed1).to.equal(seed2);
    })
})