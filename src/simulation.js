export class Simulation {
    constructor(initialBalance = 10000) {
        this.state = {
            balance: initialBalance,
            positions: []
        };
        this.subscribers = new Set();
    }

    subscribe(handler) {
        this.subscribers.add(handler);
        // Immediately send current state to new subscriber
        handler({...this.state});
        return () => this.subscribers.delete(handler);
    }

    _notify() {
        for (const handler of this.subscribers) {
            handler({...this.state});
        }
    }

    buy(symbol, price, qty) {
        this.state.balance -= price * qty;
        this.state.positions.push({ symbol, price, qty });
        this._notify();
    }

    sell(symbol, price, qty) {
        const index = this.state.positions.findIndex(
            p => p.symbol === symbol && p.price === price && p.qty === qty
        );
        if (index !== -1) {
            this.state.positions.splice(index, 1);
            this.state.balance += price * qty;
            this._notify();
        }
    }
}
