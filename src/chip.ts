"use strict"

class Chipknip { 
    constructor (public _credits : number) { }
  
    HasValue(p : number) {
      return this._credits >= p;
    }
  
    Reduce(p : number) {
      this._credits = this._credits - p;
    }
  
    getCredits() {
      return this._credits;
    }

  }
export { Chipknip }
