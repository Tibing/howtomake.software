---
article: true
unlisted: true
title: Don't follow Angular best practices!
description: 'No description yet'
date: '2020-05-02T06:13:25Z'
author: 'Nikita Poltoratsky'
keyword: 'angular, rxjs, ngrx'
cover: /assets/blog/why-reducer-is-reducer/cover.png
---

Nowadays more and more developers learn Angular and use it properly with best practices in mind.
But we shouldn't. All those so-called best practices require to learn something new and to add additional
code in your projects. Moreover, using the best practices we're risking to create a good code base and
make your teammates happy! 🌈 Stop being a gray mass! Break the rules! Stop using best practices!

## At this article, you'll learn:

- [Why you shouldn't split your app into modules and components]()
- [How lazy load will hurt your app's performance]()
- [That typescript is not your friend]()
- [Why separation of concerns is not for you]()
- [That testing is evil]()
- [Track by sucks]()
- [Angular CDK for weak developers]()

<hr>

## Why you shouldn't split your app into modules and components

Well, regarding [Angular style guide](https://angular.io/guide/styleguide#application-structure-and-ngmodules)
you ought to split your applications into components and modules. Let's discuss them separately. First of all components:

### Components

Angular provides us with the way to aggregate view logic into Components. Components are just pieces of your application views.
Angular team wants us to split our logic into many many components. But __for what?__

As I see it, the main idea is to split your logic into multiple files. It's intended to help you search for the required faster!
But does it really help? Do you really think splitting your application codebase into multiple components will help you?

I don't think so! In reality, when you're splitting your app into multiple components you're making it harder to locate your code!
If all the code of your app is living at the single file, it's quite easy to find what you need. But if you're starting to split
this single file, you're moving the code into other files. And what's now? How to find an appropriate part of the code now?
Should I look at the each file at the repository or what?

I'm dead sure, the easiest way to is just stop doing that. Just stop creating new components. Easy as that, you'll make the life
of your teammates easier.

### Modules

## How lazy load will hurt your app's performance

## Typescript is not your friend

## Why separation of concerrns is not for you

## Testing is evil

## Trackby sucks

## Angular CDK Doesn't worth your attention
