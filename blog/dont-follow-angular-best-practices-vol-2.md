---
article: true
unlisted: true
title: Don't follow Angular best practices! Vol 2
description: 'No description yet'
date: '2020-05-02T06:13:25Z'
author: 'Nikita Poltoratsky'
keyword: 'angular, rxjs, ngrx'
cover: /assets/blog/why-reducer-is-reducer/cover.png
---

Put logic in templates - why not to put logic in templates if we can? Readability? No, it’s not for us.
You don’t need codestyle/tslint/codelyzer - similar code at all application parts? No, we don’t need it. Everyone ought to write code in their own style.
Never unsubscribe - Forget about it! 😅 Let's leave that job for the garbage collector, otherwise, why does it exist, right?
State management is not for you - save data at components props.
Don’t OnPush - then, how Angular will update your app?
Don’t use Angular CLI features - schematics/builders/budgets - boring
Pure functions? No, you don’t need it. - testability? Composability? Predictability? No, it’s not for us! Let’s make everything impure, indeed, what could go wrong?
