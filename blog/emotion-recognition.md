---
article: true
unlisted: true
title: Emotion Recognition
description: Learn how to analyze user's emotions in your Angular app
date: "2020-11-30T19:11:25Z"
author: "Nikita Poltoratsky"
keyword: "angular, rxjs, ngrx, face-api.js, ai, recognition, emotion"
cover: /assets/blog/emotion-recognition/cover.png
component: 'emotion-recognition'
---

Creating and promoting Angular applications always a hard job. Understanding whether users like your app or not is even harder.

But what if I tell you, that you can track users' emotions and understand what do they think about your app.

The idea is the following - create a plugin that will use the camera on the user's device and analyzes the user's emotions in the realtime.
But the users don't want to send their faces to our servers, that's why we have to make it in runtime at the browser.
Then, send only the user's reactions to our analytics, not their faces.
After that, we'll be able to juxtapose the user's reaction with the analytics and understand what exactly the user likes or dislikes.

If you still reading, I think you're intrigued.
So, let's get our hands dirty.

---

## Setup

First of all, create a new Angular project:

```bash
ng new emotion-recognition
```

Then, we need to install the lib for face recognition.
I prefer using `face-api.js`.
We'll use it to detect faces and recognize emotions.

```bash
npm i face-api.js
```

You can find its [documentation here](https://github.com/justadudewhohacks/face-api.js){:target="blank"}

When everything is installed, let's go build our face recognition system!

## Setup video

We have to test the system somehow. That's why I would prefer to start with creating a component that'll show the video on the screen. It'll allow us to see what the app sees.

To do so, let's add a `video` tag:

```html
<video #video width="600" height="450"></video>
```

The `video` tag will display what the camera sees.
So, we need to load a video stream from the camera to the `video` tag.

```typescript
export class AppComponent {

  @ViewChild('video') videoEl: ElementRef;

  async install(): void {
    const video = this.videoEl.nativeElement;

    // Request access to the camera and assign the videostream to the `video` el
    video.srcObject = await navigator
      .mediaDevices
      .getUserMedia({ video: true });

    // Start the video
    video.play();
  }
}
```

In the snippet above we're requesting the user's permission for the camera with the `navigator.mediaDevices.getUserMedia({ video: true })`. When the user grants access to the camera at the browser's prompt it'll return a promise with the video stream inside.

At this stage, you ought to see a video element on the screen. When the app loads, it has to request access to the camera. And when access is granted you ought to see your face on the screen 🥳.

## Setup face-api.js

Now we have everything to start working with face recognition!
So, let's load a library:

```typescript
import { nets } from 'face-api.js';

export class AppComponent {

  async install(): void {

    // Loading AI models to perform face recognition in the browser
    await nets.ssdMobilenetv1.loadFromUri('/assets/emotion-recognition');

    // Loading AI models to perform emotion recognition in the browser
    await nets.faceExpressionNet.loadFromUri('/assets/emotion-recognition');
  }
}
```

The code above will load the required AI model in the browser and will allow you to do emotions recognition.
But to make it work, you need to add emotion recognition models to your assets: '/assets/emotion-recognition'.
You can find them at the [face-api.js repository](https://github.com/justadudewhohacks/face-api.js/tree/master/weights).

Great, at this stage everything is loaded, let's start recognition 👇

## Face recognition

Let's create a function that'll perform face recognition:

```typescript
import { detectSingleFace, SsdMobilenetv1Options } from 'face-api.js';

export class AppComponent {

  private async recognizeEmotions(video: HTMLVideoElement): void {

    const recognitionResult = await detectSingleFace(video, new SsdMobilenetv1Options())
      .withFaceExpressions()
      .run();

    const expression = recognitionResult.expressions.asSortedArray()[0].expression;
  }
}
```

Whoa, not many lines but tons of interesting stuff is above. Let's figure it out!

First of all, we're using `detectSingleFace` to run face recognition.
We're passing `video` and `new SsdMobilenetv1Options()` inside.
The library will read the current picture at the `video` and wll try to find a face on it using `SsdMobilenetv1O` AI model.

In the next line, we're asking it to recognize facial expressions also. And finally, retrieving the most likely expression. Here's the list of the possible emotions:

- neutral
- happy
- sad
- angry
- fearful
- disgusted
- surprised

The variable `expression` will contain one of the strings from the list above.

Now we can recognize the emotion of the person using his camera - that's great! But it'll be done once. While we need to do that periodically. The best solution is to `requestAnimationFrame` API to schedule recognition between rerenders.

## Scheduling recognition

To do so, we're just starting recognition at the installation phase:

```typescript
export class AppComponent {
  async install(): void {
    const video = this.videoEl.nativeElement;

    this.recognizeEmotions(video);
  }
}
```

And inside the `recognizeEmotions` function we have to request animation frame and schedule another recognition:

```typescript
export class AppComponent {
  async install(): void {
    const video = this.videoEl.nativeElement;

    this.recognizeEmotions(video);
  }

  private async recognizeEmotions(video: HTMLVideoElement): void {
    requestAnimationFrame(() => this.recognizeEmotions(video));
  }
}
```

Using that technique will allow us to recognize peoples' emotions constantly with great performance! 😅

Here's the listing of the full code:

```typescript
export class AppComponent {
  async install(): void {
    const video = this.videoEl.nativeElement;

    // Request access to the camera and assign the videostream to the `video` el
    video.srcObject = await navigator
      .mediaDevices
      .getUserMedia({ video: true });

    // Start the video
    video.play();

    // Loading AI models to perform face recognition in the browser
    await nets.ssdMobilenetv1.loadFromUri('/assets/emotion-recognition');

    // Loading AI models to perform emotion recognition in the browser
    await nets.faceExpressionNet.loadFromUri('/assets/emotion-recognition');

    this.recognizeEmotions(video);
  }

  private async recognizeEmotions(video: HTMLVideoElement): void {

    // Recognize emotions
    const recognitionResult = await detectSingleFace(video, new SsdMobilenetv1Options())
      .withFaceExpressions()
      .run();

    // Get the most likely emotion
    const expression = recognitionResult.expressions.asSortedArray()[0].expression;

    requestAnimationFrame(() => this.recognizeEmotions(video));
  }
}
```

---

## Final words

Greate! You did it! You learned how to recognize people's emotions in the browser.

At the top of the page, you can find a working example of an idea.
Also, [here's the full source code](https://github.com/Tibing/howtomake.software/tree/master/projects/emotion-control/src/lib){:target="blank"}.

The last step is to send recognized emotions to the analytics platform like **google analytics** or **amplitude**.
Then, you'll be able to juxtapose this data with other analytical info and understand what your users like.

Right now it'll be impossible to implement this idea since everyone cares about his security and doesn't trust websites.
If you have any thoughts on how to do face recognition completely securely and how to make users trust the website, please, let me know 😅.

I'm waiting for your comments about the idea! Please, [reach me on Twitter](https://twitter.com/NikPoltoratsky).

## Resources

- [Reach me on Twitter](https://twitter.com/NikPoltoratsky){:target="blank"}
- [Full source code of the example above](https://github.com/Tibing/howtomake.software/tree/master/projects/emotion-control/src/lib){:target="blank"}.
- [Face-api.js docs](https://github.com/justadudewhohacks/face-api.js){:target="blank"}


