"use strict";

import { VendingMachine } from "../lib/vendingmachine";
import { Can, Choice, ContainerManager } from "../lib/can";
import { Chipknip } from "../lib/chip";

describe("Vendingmachine", function () {
  let machine : VendingMachine;
  
  beforeEach(function() {
    machine = new VendingMachine();
  });

  it("choiceless_machine_delivers_nothing", function () {
    expect(machine.deliver).toBeDefined();
    expect(machine.deliver(Choice.cola)).toEqual(Can.none);
    expect(machine.deliver(Choice.fanta)).toEqual(Can.none);
  });

  it("delivers_can_of_choice", function () {
    machine.configure(Choice.cola, Can.cola, 10);
    machine.configure(Choice.fanta, Can.fanta, 10);
    machine.configure(Choice.sprite, Can.sprite, 10);
    machine.deliver(Choice.cola);
    expect(Can.cola).toEqual(machine.deliver(Choice.cola));
    expect(Can.fanta).toEqual(machine.deliver(Choice.fanta));
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
  });


  it("delivers_nothing_when_making_invalid_choice()", function() {
    machine.configure(Choice.cola, Can.cola, 10);
    machine.configure(Choice.fanta, Can.fanta, 10);
    machine.configure(Choice.sprite, Can.sprite, 10);
    expect(Can.none).toEqual(machine.deliver(Choice.beer));
  });

  it("delivers_nothing_when_not_paid()", function () {
    machine.configure(Choice.fanta, Can.fanta, 10, 2);
    machine.configure(Choice.sprite, Can.sprite, 10, 1);

    expect(machine.deliver(Choice.fanta)).toEqual(Can.none);
  });

  it("delivers_fanta_when_paid", function () {
    machine.configure(Choice.sprite, Can.sprite, 10, 1);
    machine.configure(Choice.fanta, Can.fanta, 10, 2);

    machine.set_value(2);
    expect(machine.deliver(Choice.fanta)).toEqual(Can.fanta);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.none);
  });

  it("delivers sprite when paid", function () {
    machine.configure(Choice.sprite, Can.sprite, 10, 1);
    machine.configure(Choice.fanta, Can.fanta, 10, 2);

    machine.set_value(2);
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(Can.none).toEqual(machine.deliver(Choice.sprite));
  });

  it("adds payments", function () {
    machine.configure(Choice.sprite, Can.sprite, 10, 1);
    machine.configure(Choice.fanta, Can.fanta, 10, 2);

    machine.set_value(1);
    machine.set_value(1);
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(Can.none).toEqual(machine.deliver(Choice.sprite));
  });

  it("returns change", function () {
    machine.configure(Choice.sprite, Can.sprite, 10, 1);
    machine.set_value(2);
    expect(2).toEqual(machine.get_change());
    expect(0).toEqual(machine.get_change());
  });

  it("stock", function () {
    machine.configure(Choice.sprite, Can.sprite, 1, 0);
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(Can.none).toEqual(machine.deliver(Choice.sprite));
  });

  it("adds stock", function () {
    machine.configure(Choice.sprite, Can.sprite, 1, 0);
    machine.configure(Choice.sprite, Can.sprite, 1, 0);
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(Can.none).toEqual(machine.deliver(Choice.sprite));
  });

  it("checkout_chip_if_chipknip_inserted", function () {
    machine.configure(Choice.sprite, Can.sprite, 1, 1);
    var chip = new Chipknip(10);
    machine.insert_chip(chip);
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(9).toEqual(chip.getCredits());
  });
  
  it("defect on chipknip credits property. Does not reduce value", function () {
    machine.configure(Choice.sprite, Can.sprite, 1, 1);
    var chip = new Chipknip(5);
    machine.insert_chip(chip);
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(4).toEqual(chip.getCredits());
  });

  it("checkout_chip_empty", function () {
    machine.configure(Choice.sprite, Can.sprite, 1, 1);
    var chip = new Chipknip(0);
    machine.insert_chip(chip);
    expect(Can.none).toEqual(machine.deliver(Choice.sprite));
    expect(0).toEqual(chip._credits);
  });
});
