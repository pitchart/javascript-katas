# Trivia

## Key Topics

- When to refactor and when to rewrite, and how to do that safely.
- How to **resolve the central conflict of legacy code**: I need tests to refactor safely, but I need to refactor to write tests effectively.
- How to have some of the safety of tests even before you can write tests.
- Techniques that make it easier to see where exactly to break things apart right now and then to do that **systematically and with less risk**.
- Architecture and design principles that allow you to **make progress while you’re building your understanding of the code** you need to change.
- Slow down the pace at which you write new legacy code.
- Planning the delivery of new features while you rescue legacy code.
- Dealing with the increased emotional intensity of working with legacy code.

## Activities
Work on a diabolical-but-fun code base (available in at least 30 programming languages).
Practise microcommitting, a key technique to changing difficult code safely.
Apply the lessons from the training code base to your project. (Available only in private engagements.)
Practise a handful of refactoring and testing exercises that **develop the most essential legacy code rescue skills and disciplines**.

## Preparation
Participants need the following to attend this course.

- A working software development environment in your preferred programming language, including a personal version control system, such as git.
- Something to write with, and something to write on (index cards or sticky notes and a notebook).

## Golden Master
*We can’t write reasonable unit tests without refactorings first. But we don’t want to refactor without tests at all.*

But we can test the application as a whole. Gain control over all external input sources (RNGs, system time, keyboard input and so on). Then save all outputs produced (console output, emails sent, files changed etc). This is our Golden Master.

Now we can change the code and compare if it still yields the same results as before.