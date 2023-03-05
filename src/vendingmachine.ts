"use strict";

import { Can, Choice, CanContainer, ContainerManager } from "./can"
import { Chipknip } from "./chip";


class VendingMachine {
  private cans : ContainerManager = new ContainerManager();
  private payment_method : number = 0;
  private chipknip : Chipknip | undefined = undefined;
  private c : number = -1;
  private price: number = 0;

  set_value(v : number) {
    this.payment_method = 1;
    if (this.c !== -1) {
      this.c += v;
    } else {
      this.c = v;
    }
  }

  insert_chip(chpknp: any) {
    // TODO
    // can't pay with chip in britain

    this.payment_method = 2;
    this.chipknip = <Chipknip>chpknp;
  }

  haz(cans: ContainerManager, choice: Choice) {
    return cans.cns[choice] !== undefined;
  }

  deliver(choice: Choice) {
    let res = Can.none;

    //
    // step 1: check if choice exists {
    //
    if (this.haz(this.cans, choice)) {
      //
      // step2 : check price
      //
      if (this.cans.manage_get(choice).price === 0) {
        res = this.cans.manage_get(choice).getType();
        // or price matches
      } else {

        switch (this.payment_method) {

        case 1: // paying with coins
          if (this.c !== -1 && this.cans.manage_get(choice).price <= this.c) {
            res = this.cans.manage_get(choice).getType();
            this.c -= this.cans.manage_get(choice).price;
          }
          break;

        case 2: // paying with chipknip -
          // TODO: if this machine is in belgium this must be an error
          // {

          if (this.chipknip!.HasValue(this.cans.manage_get(choice).price)) {
            var prc = this.cans.manage_get(choice).getPrice();
            this.chipknip!.Reduce(prc);
            res = this.cans.manage_get(choice).getType();
          }
          break;

        default:
          // TODO: Is this a valid situation?:
          // larry forgot the } else { clause
          // i added it, but i am acutally not sure as to wether this
          // is a problem
          // unknown payment
          break;
        // i think(i) nobody inserted anything
        }
      }
    } else {
      res = Can.none;
    }

    //
    // step 3: check stock
    //
    if (res !== Can.none) {
      if (this.cans.manage_get(choice).getAmount() <= 0) {
        res = Can.none;
      } else {
        this.cans.manage_get(choice).setAmount(this.cans.manage_get(choice).getAmount() - 1);
      }
    }

    // if can is set then return {
    // otherwise we need to return the none
    if (res === Can.none) {
      return Can.none;
    }

    return res;
  }

  get_change() {
    let to_return = 0;
    if (this.c > 0) {
      to_return = this.c;
      this.c = 0;
    }
    return to_return;
  }

  configure(choice: any, c: any, n: any, prc: any = undefined) {
    let can;

    if(prc === undefined) {
      this.price = 0;
    } else {
      this.price = prc;
    }
    if (this.cans.manage_contains(choice)) {
      this.cans.manage_get(choice).setAmount(this.cans.manage_get(choice).getAmount() + n);
      return;
    }
    can = new CanContainer();
    can.setType(c);
    can.setAmount(n);
    can.setPrice(this.price);
    this.cans.cns[choice] = can;
  }
}

export { VendingMachine };
