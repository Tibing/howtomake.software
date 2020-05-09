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

Don’t split into modules/components - creating a lot of different modules and components in Angular application will become hard to read and navigate across the codebase, so, why not to keep all the code of the app inside the one component?
Don’t lazy load - it’s a pretty common technique to lazy load parts of the applications which you don’t need right now but it introduces tons of additional code and even more, it forces the browser to make more requests to the server, so, please, think twice do you really need it?
Don’t bloat your app with types - typescript provides us with the ability to create a solid type system for our apps but it’ll require a lot of additional code. And it’s even more here, a lot of people build programs using JavaScript without types, so, do we really need it?
Don’t use services, everything is a component - services in Angular are intended to hold a business logic of the app, however, services are additional entities, and using them may lead to unexpected behavior related to dependency injection, so, let’s just keep everything in the components.
Never use tests - Testing is intended to make our apps more stable and to reduce regression, however, testing requires tons of efforts, also to perform application testing we need to learn a lot of additional concepts. So, do we really need it?
No track by - track by is ngFor feature which allows you to make lists in your app work in a more efficient way nowadays browsers are really effective and don’t need additional help from us.
Don’t use Angular CDK - it provides a lot of useful features but let’s reinvent the wheel.
