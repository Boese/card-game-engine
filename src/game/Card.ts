
/*
    class Card: A card can hold the value of anything:
        ie: King of Hearts, Ace of Spaces, Super Dog with attributes, etc...
        The only thing the child class needs to implement is a comparator
*/
export abstract class Card<T> {

    protected identifier: T;

    Card(identifier: T) {
        this.identifier = identifier;
    }

    /*
        return -1 for lhs < rhs
        return 0 for lhs == rhs
        return 1 for lhs > rhs
    */
    public abstract Compare(lhs: Card<T>, rhs: Card<T>) : number;
}