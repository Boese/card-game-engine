let rand_seed = require('bindings')('..\\src\\random-seed\\build\\Release\\random_seed.node');

import 'mocha'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

const TEST_SEED=10;

describe('Random Seed', () => {

    beforeEach(() => {
        rand_seed.srand(TEST_SEED);
    })
    it('Check resetting srand ', () => {
        // Call rand() twice
        let seed1 = rand_seed.rand();
        let seed2 = rand_seed.rand();

        // Reset seed
        rand_seed.srand(TEST_SEED);

        // Call rand() twice again
        let seed3 = rand_seed.rand();
        let seed4 = rand_seed.rand();

        // Should equal
        chai.expect(seed1).to.equal(seed3);
        chai.expect(seed2).to.equal(seed4);
    })

    it('should return correct sequence for 3 elements', () => {

        // Get 3 random numbers
        let a = [rand_seed.rand(), rand_seed.rand(), rand_seed.rand()];

        // Reset srand seed
        rand_seed.srand(TEST_SEED);

        // Get 3 random numbers from rand sequence
        let sequence_buffer:ArrayBuffer = rand_seed.rsequence(3);
        let sequence_data_view: DataView = new DataView(sequence_buffer);
        let b = [
            sequence_data_view.getInt32(0, true), 
            sequence_data_view.getInt32(4, true), 
            sequence_data_view.getInt32(8, true)];

        // Check a,b,c = rand sequence
        chai.expect(a).eql(b);
    })
    
})