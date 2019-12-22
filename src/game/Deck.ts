import { Card } from './Card'

interface CardContainer<T> {
    id: number
    card: Card<T>
}

export class Deck<T> {

    private card_id : number = 0;
    private deck : Array<CardContainer<T>> = []

    Deck() {}

    Get() { return this.deck; }
    GetOrder() { return this.deck.map(m => m.id)}

    Size() { return this.deck.length; }

    Add(card: Card<T>) : number {
        let nextId = this.card_id++;
        this.deck.push({id: nextId, card: card});
        return nextId;
    }

    GetCard(id: number) : Card<T> { 
        let container = this.deck.find(m => m.id == id);
        if (!container) {
            throw new Error("Error: Card does not exist in Deck. ID: " + id);
        }
        return container.card
    }

    Remove(id: number) : void {
        let index = this.deck.findIndex(m => m.id == id);
        this.deck.splice(index, 1);
    }

    Shuffle() {
        // TODO: Shuffle Deck
    }

    Sort() {
        this.deck.sort((a, b) => a.card.Compare(b.card.Get()));
    }

    Clear() {
        this.deck = [];
    }
}