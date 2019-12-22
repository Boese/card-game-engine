import { StandardCard, StandardCardType, StandardCardValue, StandardCardContainer } from '../../src/game/StandardCard'
import { Deck } from '../../src/game/Deck'

import 'mocha'
import chai = require('chai')
import sinon = require('sinon')
import sinonChai = require('sinon-chai')
chai.use(sinonChai)

describe('Deck', () => {
    let deck: Deck<StandardCardContainer>;
    const card: StandardCard = new StandardCard({type: StandardCardType.Hearts, val: StandardCardValue.Ace});
    
    beforeEach(() => {
        deck = new Deck();
    })

    it('should have no elements', () => {
        chai.expect(deck.Size()).equal(0);
    })
    it('should have 1 element', () => {
        deck.Add(card);
        chai.expect(deck.Size()).equal(1);
    })
    it('should have 3 elements', () => {
        deck.Add(card);
        deck.Add(card);
        deck.Add(card);
        chai.expect(deck.Size()).equal(3);
    })
    it('should be sorted', () => {
        let card1: StandardCard = new StandardCard({type: StandardCardType.Hearts, val: StandardCardValue.Two});
        let card2: StandardCard = new StandardCard({type: StandardCardType.Hearts, val: StandardCardValue.Three});
        let card3: StandardCard = new StandardCard({type: StandardCardType.Hearts, val: StandardCardValue.Four});
        deck.Add(card3);
        deck.Add(card2);
        deck.Add(card1);
        chai.expect(deck.GetOrder()).deep.equal([0,1,2]);

        deck.Sort();
        chai.expect(deck.GetOrder()).deep.equal([2,1,0]);
    })
    it('should be empty after Clear()', () => {
        deck.Add(card);
        deck.Add(card);
        deck.Add(card);
        deck.Clear()
        chai.expect(deck.Size()).equal(0);
    })
})