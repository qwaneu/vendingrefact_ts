"use strict";

import { Can, Choice, CanContainer, ContainerManager } from "../lib/can";
import { Chipknip } from "../lib/chip";

describe("Can", function () {

  it("can be none", function() {
    expect(Can.none).toEqual("none");
  });
});

describe("CanContainer", function () {
  it("has type", function() {
    var container = new CanContainer();
    container.setType(Can.cola);
    expect(container.getType()).toEqual("cola");
  });


  it("has price", function() {
    var container = new CanContainer();
    container.setPrice(1);
    expect(container.getPrice()).toEqual(1);
  });


  it("has amount", function() {
    var container = new CanContainer();
    container.setAmount(10);
    expect(container.getAmount()).toEqual(10);
  });
});


describe("ContainerManager", function () {

  it("gets what it puts", function() {
    var manager = new ContainerManager();
    manager.manage_put(Choice.cola, Can.fanta);
    expect(Can.fanta).toEqual(manager.manage_get(Choice.cola));
  });

  it("has not what it does not put", function() {
    var manager = new ContainerManager();
    expect(manager.manage_contains(Choice.cola)).toBe(false);
  });


  it("has what it puts", function() {
    var manager = new ContainerManager();
    manager.manage_put(Choice.cola, Can.cola);
    expect(manager.manage_contains(Choice.cola)).toBe(true);
  });

});

describe("Chipknip", function () {

  it('has value', function () {
    var ck = new Chipknip(10);
    expect(ck.HasValue(5)).toBe(true);
  });

  it("can reduce credits", function() {
    var ck = new Chipknip(10);
    ck.Reduce(1);
    expect(ck.HasValue(9)).toBe(true);
    expect(ck.HasValue(10)).toBe(false);
    //expect(ck.credits).toEqual(9);

  });
});