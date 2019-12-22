import { Card } from '../game/Card'

export enum StandardCardType {
    None,
    Hearts,
    Diamonds,
    Spades,
    Clubs
}

export enum StandardCardValue {
    Joker = 0,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace,
}

export class StandardCardContainer {
    type: StandardCardType
    val: StandardCardValue

    public toString = () => {
        return this.type.toString() + " of " + this.val.toString();
    }
}

export class StandardCard extends Card<StandardCardContainer> {

    constructor(card: StandardCardContainer) {
        super(card);
    }
    public Compare(rhs: StandardCardContainer): number {
        return this.identifier.val - rhs.val;
    }
}