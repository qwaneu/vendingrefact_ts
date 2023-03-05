"use strict"

enum Can {
    none = "none",
    cola = "cola",
    fanta = "fanta",
    sprite = "sprite"
}

enum Choice {
    none = "none",
    cola = "cola",
    fanta = "fanta",
    sprite = "sprite",
    beer = "beer"
}

class ContainerManager {
    constructor(public cns: any = {}) { }

    manage_contains(k: Choice) {
        return this.cns[k] !== undefined;
    }

    manage_get(k: Choice) {
        return this.cns[k];
    }

    manage_put(k: Choice, v: Can) {
        this.cns[k] = v;
    }
};

class CanContainer {
    private type: Can = Can.none;
    private price: number = 0;
    private amount: number = 0;

    getType(): Can {
        return this.type;
    }
    setType(tp: Can) {
        this.type = tp;
    }

    getPrice(): number {
        return this.price;
    };

    setPrice(p: number) {
        this.price = p;
    }

    getAmount(): number {
        return this.amount;
    };

    setAmount(amnt: number) {
        this.amount = amnt;
    }

}

export { Can, Choice, CanContainer, ContainerManager }
