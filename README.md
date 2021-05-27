Description
===========

The Refuctored Vending Machine is exercise code we have used in a number
of courses. The codebase is tiny, but difficult enough to clean up. You
can clone this repository and play around with refactorings to see if
you can make it better.

We have provided a few integration tests, that test the vending machine
from the outside.

Goals
=====
We wanted a small volume of code that is difficult enough to clean up,
so that you need to diligently find smells and apply refactorings in
small steps, but not too big to get lost in.

Practicing coding skills on a sample problem works, because you can
focus on one thing to learn, and you don't have to worry about deadlines
or other problems your production code has. It's also easier to compare
notes with others who did the same exercise - we find it insightful
to observe how others attack a problem.

We also want to let you experience the effects of having a partial safety
net. Therefore we have provided a few rough integration tests, that cover
most of the code, but not everything! So be careful.

How to use
==========

You might want to make a branch for each attempt you make, and commit
whenever the tests are green, so you can compare your progress to the
original goal, and see what line of attack works better or worse for you.

A sample commit comment might look like: 'smell: duplicate code.
refactoring: extract method'.

If you can't find small enough steps, you might also consider committing
partway through big steps, so you can choose where to go back to.

In general, if you can't come up with a small step, think harder or try to
attack smells where you can find small refactorings for. We often start
with simple rename refactorings: _rename variables_ to understand what a
piece of code does, _rename methods_ to make it more clear what a method
does, etcetera.

Steps:

1. Make a list of smells you find in the code. Put the smells you want
   to attack first on top.
2. Find appropriate refactorings and put them next to the smells. You
   may need multiple refactorings to resolve a smell.
3. Perform the refactorings for your worst smell.
4. Look at any new smells you introduced while refactoring.
5. Repeat.

We recommend that you run the provided tests often, even if they don't cover
everything. Adding new tests is also a good idea, but that may only be
possible after you've done some refactoring.

Prerequisites, testing & running
================================

First install dependencies:
```bash
npm install
```

And then run all unit tests continuously:
```bash
npm-watch test
```

Which smells and refactorings can help me?
==========================================

You can find lists of code smells and refactorings to choose from at:
- [Code smells](https://blog.codinghorror.com/code-smells/)
- [Catalog of refactorings](https://refactoring.com/catalog/)

or you can order a pack of [smells and refactoring cue
cards](http://www.qwan.eu/shop) to play with the
smells and refactorings spatially.

References
==========

- William F. Opdyke, [Refactoring OO Frameworks](http://laputan.org/pub/papers/opdyke-thesis.pdf) (1992)
- Martin Fowler, Refactoring (1999 / 2019)
- Joshua Kerievsky, [Refactoring to Patterns](https://www.industriallogic.com/xp/refactoring/) (2004)
- Wiliam C. Wake, Refactoring Workbook (2003)
- Sven Gorts, [Refactoring Thumbnails](http://web.archive.org/web/20090221213654/http://www.refactoring.be/thumbnails.html)

Authors
=======
Marc Evers, Rob Westgeest, Willem van den Ende  
© copyright QWAN - Quality Without a Name - https://www.qwan.eu
