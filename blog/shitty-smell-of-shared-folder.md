---
article: true
unlisted: true
title: Shitty smell of shared folder 💩
description: Learn why the shared folders are a bad practice
date: "2020-11-17T19:11:25Z"
author: "Nikita Poltoratsky"
keyword: "angular, rxjs, ngrx, architecture"
cover: /assets/blog/shitty-smell-of-shared-folder/cover.jpg
---

I don't want to beat around the bushes, so, I'll just say it. If you have shared or common or utils or helpers or "any other folder with freakingly common names" that means your code smells 💩.

## Where's the problem?

It might be you have no problem for now. While there only a few files in your shared folder. But as the project grows, so does the shared folder 😅.

And in a few months you're ending up like this:

![shared folder weight](/assets/blog/shitty-smell-of-shared-folder/shared-folder.png)

Because any time you need to create a new file/function/class/whatever you need to think about where to put it. However, thinking is hard, that's why we quite often decide to put it in the shared folder and move it somewhere else later, or not... And it stays at the same place forever...

Finally, we have a project where a good few of the code leaves in the shared folder. Nobody can understand where to seak for specific files. Nobody can add new features. Nobody can support the project.

## How to solve the problem? General Advice

Check where some specific functionality is used in the project. Does it really ought to be shared? Does it really used in multiple places across the app?

![where put the code](/assets/blog/shitty-smell-of-shared-folder/where-put-code.png)

If the code is used locally in one place or in a few places but they're not widely spread across the project, then it's a good idea to put it locally, near the usage place.

If the code is used globally in multiple places in different parts of the project, then it's a good idea to put it in the separate feature library and include it everywhere you need it.

Don't be afraid to put it there. For sure, it's possible that right now your code will be used in one place only, but later you'll have to use it somewhere else. In that case, just put it locally, near the place of usage. When you'll have to use it somewhere else, just **refactor** the code. Don't be afraid of refactoring. It's a good practice 😅

## Let me show you a few examples

I want to introduce a few examples to support my statements. Let's see...

### Password validator at register form

For instance, you have an auth in your app. You need to add a specific validator that will compare **password** and **confirm password** at the registration form.

You build that validator and now you need to put it somewhere... I would suggest putting it near the register form. Not at the shared folder! Because this validator is used only in one place and will never be reused. But if so, you'll be able to refactor your code and put it somewhere else.

### Datepicker for each form in-app

Let's assume you have an app with 17 forms in it. Each module of the app contains multiple forms and each form requires the **datepicker**! You build that datepicker and now you need to put it somewhere... I would suggest creating a UI Kit library and put it there. Then, include this library everywhere you need it and use your amazing datepicker.

## Recap

As a recap, I would say - "think". Don't leave the structure of the app as-is. You ought to structure the app properly to allow your teammates and future you to search through the code base easily. And remember, the golden rule is:

> If the code is used locally in one place or in a few places but they're not widely spread across the project, then it's a good idea to put it locally, near the usage place.
>
> If the code is used globally in multiple places in different parts of the project, then it's a good idea to put it in the separate feature library and include it everywhere you need it.
