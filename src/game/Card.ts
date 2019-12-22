
/*
    class Card: A card can hold the value of anything:
        ie: King of Hearts, Ace of Spaces, Super Dog with attributes, etc...
        The only thing the child class needs to implement is a comparator
*/
export abstract class Card<T> {

    protected identifier: T;

    constructor(identifier: T) {
        this.identifier = identifier;
    }

    public Get() { return this.identifier; }

    /*
        return -1 for lhs < rhs
        return 0 for lhs == rhs
        return 1 for lhs > rhs

        TODO: Need a way to add extra information to Compare function.
        ie: Trump involved? Ace of Hearts (trump) would beat Ace of clubs
        idea: Add a second item: Compare(rhs: T, extraInfo: V)
    */
    public abstract Compare(rhs: T) : number;
}