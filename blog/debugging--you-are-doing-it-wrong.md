---
article: true
unlisted: false
title: 'Debugging - you’re doing it wrong'
description: '10 techniques to find a bug in your code'
date: '2019-07-23T06:13:25Z'
author: 'Nikita Poltoratsky'
keyword: 'angular, rxjs, ngrx'
cover: 'https://res.cloudinary.com/practicaldev/image/fetch/s--ydC-REVF--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--qKFVbp72--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/bonly95lbg5v383yj57m.png'
---

Do you remember those long, long hours spent on debugging? When you're staring at a codebase and can't figure out what exactly went wrong? You're not alone! I think all developers struggle with debugging from time to time. That's why in the article I'm going to tell you about my favorite approaches to finding bugs in the code.

<link rel="canonical" href="https://dev.to/nikpoltoratsky/debugging-you-re-doing-it-wrong-10-techniques-to-find-a-bug-in-your-code-4f41">

## Table of contents

* [Google error message](#google-error-message)
* [Console log everything](#console-log-everything)
* [Use debugger](#use-debugger)
* [Problem localization](#problem-localization)
* [Create a few tests](#create-a-few-tests)
* [Analyze logs](#analyze-logs)
* [Ask a friend](#ask-a-friend)
* [Git bisect](#git-bisect)
* [Talk to a rubber duck](#talk-to-a-rubber-duck)
* [Tambourine Dancing](#tambourine-dancing)

---

## Google error message

I'm not going to sort those tips by usefulness but **google error message** is at the first place by a reason. I think, if you can't even understand an error message from the first sight, the easiest way to solve the problem is to **google error message**.

In most of the cases, the error message you are facing was googled before by someone else. We have a lot of beautiful places like *StackOverflow* and *GitHub* issues, where people aim to help each other. That's why you can not only find the answer but also steps to avoid such error or motivation why this error occurred in the first place.  So, why not to google the error? It's the easiest way here.

---

## Console log everything

I think it's one of the most popular ways to find a bug in the codebase - add a tenth of `console.log(...)` statements across the codebase, rerun the application and try to figure out what went wrong.

I like it, and from my point of view, it's the right solution for simple issues, which are already localized to a few classes. But it's always a bad idea to start seeking with `console.log(...)`s when you have no idea what's going on here and where that creepy bug resides. Because in that case you may miss something important not logged and you'll have to add console logs and rerun application multiple times until you find the cause of failure.

---

## Use debugger

I don't think I have too much to say here. All developers know what debugger is and why to use it. Instead, I'm going to tell you about a small discussion that flared up the other day in the office with one of my teammates.

A few days ago, I was discussing different ways of debugging with one of my teammates (that's the reason why this article appeared). And I said that one of the most robust ways to find an issue is to use a debugger. Easy as that - you're setting breakpoints, then, performing some actions and going step by step through your codebase, observing how the state of the application changes. What can be more straightforward as that?

While my teammate introduced an exciting idea - when you're using the debugger, you are not training your analytical skills and critical thinking. The reason is that with debugger you're just staring at the window with variables and waiting for incorrect behavior. While when you're digging through the codebase without the debugger, you're more focused and trying to understand what's going on and learn something new each time you're seeking for a bug.

What do you think about debugger vs. manual investigations? Please, give me your ideas in the comments.

---

## Problem localization

The key idea of the **Problem localization** method is to comment/remove a code step by step until you figure out what went wrong. It works especially useful in cases when you are writing an algorithm or some business logic a pretty long time without compiling and executing the application.

In such cases, I'm always doing something wrong, and the easiest way for me is to comment code partially and try to intercept disappeared errors. Then, repeat it until all bugs will be found and revamped.

In some cases it might be a good idea to use the binary search line approach when you comment half of the code (or remove half of the files) - then check if the error is still here. If yes repeat the same with the half of this half, if now - same with the other half.

Of course, this only works in particular cases when you are able to comment/ remove code parts still keeping it working.

---

## Create a few tests

Ok, that's the crazy one, whereas it could be useful in some particular cases. From my sight, it works well when you have some algorithm that works incorrectly, and is too complex to write `console.log`'s or go through it using the debugger.
 
In that case, it might be useful to write a few tests for it. Tests could help you localize the issue in the algorithm.

After that, when the bug is localized, and you know where to search, you may use another approach to fix it finally.

---

## Analyze logs

Yep, I know you hate to analyze all those 10mb text files with logs. But quite often it could save you a few hours of debugging. Of course, logging has to be configured adequately first of all. Collected log files have to be kept during the appropriate amount of time. But if all conditions are met - you're lucky. It's like console logging, but you already have all `console.log`s on their places and can just read through actions performed on your system.

But unfortunately, quite often it's a dream... We're not always paying enough attention to logging.

---

## Ask a friend

It's pretty obvious, but we're not doing it quite often. I think all of us have more experienced teammates at the office. Otherwise, we can find an expert across the internet. Don't be afraid, ok? People are always ready to help you!

But. You need to satisfy one requirement - check all the available sources of the information before asking somebody. If you're asking for help with something easy, which is written on the second page of the documentation, then. Well. Be ready to run away!

---

## Git bisect

Git not only helps us to keep an application revisions history, but it also provides us with a few tools for debugging. One of those tools is a **git bisect** - tool for performing a binary search across your git history. It's quite useful in case you didn't work with the codebase for a while, and since your last intervention, a few hundred commits were added. And now, you encounter a bug and have no idea how and when it appeared. But you remember you didn’t have it in version `2.0.15`, for instance.

In that case **git bisect** will help you. The idea is pretty simple, you start the debugging process with `git bisect start`, then, we need to mark the current version as *bad* version because we have a bug here - `git bisect bad`. After that, we have to tell git about a *good* working version: `git bisect good 2.0.15`. On that stage, setup is done, and we can start searching.

**git bisect** selects commit in the middle of *bad-good* range and checks out on it. Then, we have to check if we have that bug in this revision? If yes - run `git bisect bad`, if no - run `git bisect good`. Then, git will choose a new commit in the original *bad-good* range, and we have to repeat the process until a commit with the bug is found.

**git bisect** is a pretty powerful tool that's why a full description will be out of the format of the article, but [here is a link with a good explanaition](https://git-scm.com/docs/git-bisect).

---

## Talk to a rubber duck

It's one of the most potent methods of understanding what's going on in the code. The main idea is that you need to find a rubber duck, put it in front of yourself and then, explain your system to it, starting from general concepts and then going line by line. [You can read more about it here](https://rubberduckdebugging.com). I like this idea and use it regularly, so, let me tell you a short story about how I used it the first time and even didn't notice it.

When I just started my career as the programmer, I was building an Android application which contained quite complex handwritten animations. I made one of those animations carefully, step by step, and everything was fine until I stuck.

I had an animation code for no more than 150 lines. And I couldn't find a problem why it wasn't working. I checked all the algorithms multiple times but still nothing. After staring at the screen for a few hours, I decided to ask a teammate for help.

I've started a detailed explanation of how that animation works, and in a minute, I found the issue! One of the methods implicitly converted `float` to `int`🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️. And It took me one minute to understand it when I tried to explain it in detail to my teammate.

That time I even didn't know that's it's a method of a rubber duck. I realized that, later. But I already understood how powerful it is.

---

## Tambourine Dancing

It's my favorite way to solve problems with the software. All you need is tambourine. You need to dance around your workstation, knocking on a tambourine. It will be a big plus if you have a tambourine with the logo of technology you're working with. For instance, I have a tambourine which helps me to solve issues with my microservices:

![Java Tambourine](https://i.ibb.co/j6mydhm/java-tambourine.jpg)

But it's utterly useless for front-end applications.

---

## Conclusion

Thank you for reading this! Hopefully, you've learned something new from the article. The last thing I want to reveal here for those of you who read the material to the end is that the most powerful way to deal with bugs and issues in the codebase is to write code without bugs. Just, ask your manager. 😅

Anyway, be focused and consistent. Do your investigation step by step and use the techniques mentioned above. And you'll resolve all your bugs efficiently.

[Follow me on Twitter to staying tuned](https://twitter.com/nikpoltoratsky) and let me know if you have any particular topics you would like to hear about!
