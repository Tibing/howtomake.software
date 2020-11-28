---
article: true
unlisted: true
title: Emotion Recognition
description: Learn how to recognize people's emotions in Angular
date: "2020-10-24T19:11:25Z"
author: "Nikita Poltoratsky"
keyword: "angular, rxjs, ngrx"
cover: /assets/blog/agile-angular-module-with-dependency-injection/cover.jpg
component: 'emotion-recognition'
---

Have you ever thought is it even possible to recognize people's emotions on the image\video\using realtime camera?
It'll allow to extend our horizons and build interesting products. 
Also, why not just track users emotions to understand how do they behave when using your app.

This article is exactly about that! 🥳 Today you'll learn how to detect users emotions when they're using your app!

Let's not waste your time and get your hands dirty 😅

First of all, let's go create a new project.

Then, go install all the required libs:

```bash
npm i face-api.js
```

We'll use face-api.js to detect faces and recognize emotions. 
You can find it and its documentation here: https://github.com/justadudewhohacks/face-api.js

When everything is installed, let's go build our face recognition system!


