---
article: true
unlisted: true
title: 'Why reducer is reducer?'
description: 'Learn why ngrx reducer is called reducer and how it is related to the JavaScript array reduce function'
date: '2020-05-02T06:13:25Z'
author: 'Nikita Poltoratsky'
keyword: 'angular, rxjs, ngrx'
cover: /assets/blog/why-reducer-is-reducer/cover.png
---

In this article, I'm introducing my mental model of modern state management.

More exactly I'm talking on how <a href="https://ngrx.io" target="_blank">ngrx</a> works, why reducer is a reducer, and how it
is related to the JavaScript's array reduce method. All the statements here will likely be true
for any state management solution using redux concepts. So, if you're using Redux, you're welcome 🤓.

## At this article we'll cover:

- [What is ngrx?](/blog/why-reducer-is-reducer#what-is-ngrx)
- [What is array reduce?](/blog/why-reducer-is-reducer#what-is-array-reduce)
- [Understanding reduce concept](/blog/why-reducer-is-reducer#understanding-reduce-the-concept)
- [So, why reducer is reducer?](/blog/why-reducer-is-reducer#so-why-reducer-is-reducer)

<hr>

## What is ngrx? 

If you have no experience with ngrx or other redux like state management solutions, I would personally recommend you to
learn about them first. I would suggest you start at the <a href="https://ngrx.io/guide/store" target="_blank">ngrx getting started guide</a>.

However, I'll still cover how it works briefly. Here is a diagram from the ngrx website:

<img src="/assets/blog/why-reducer-is-reducer/how-ngrx-works.png" loading="lazy">

ngrx operates with 5 major concepts:

**State** - represents the application state at the current moment.

For instance, if we're building a todo list application our state will contain the list of tasks:

```typescript
interface State {
  tasks: Task[];
}

interface Task {
  text: boolean;
  done: boolean;
}
```

**Action** - describes unique events that trigger state changes or side effects.

```typescript
const addTask = createAction('Add Task');
const removeTask = createAction('Remove Task');
const markTaskAsDone = createAction('Mark Task As Done');
```

**Selector** - describes how to select slice of the state to be consumed by the component.

```typescript
const getTasks = createSelector(state => state.tasks);
const getCompletedTasks = createSelector(state => state.tasks.filter(task => task.done));
```

**Reducer** - describe how your application's state will change based on actions.

```typescript
const reducer = createReducer(
  on(addTask, state => {
    // add task 
  }),
)
```

**Effect** - performs side effects, like interaction with the backend.

```typescript
saveTasks$ = createEffect(
  ofType(saveTasks),
  mergeMap(tasks => {
    // save tasks here
  }),
);
```

So, the main idea of the ngrx is that your application has a single source of truth - your state. It's an immutable object that can be changed only by the reducer. You can use parts of the state in your components selecting them using *selectors*. 

If you need to change the state, you need to fire an action. Then, your reducer ought to intercept that action and publish a new version of the state (the state is immutable and can't be changed, that's
why reducers don't change state, they just publish a new version of it).

If you need to perform some side effect, like persisting data at the backend, you're using effects that intercepts an action, performs side effect and fires new action to change the state.

With names of 4 concepts everything is clear:

- **State** - application state
- **Action** - a command to change the state or perform side effect
- **Selector** - selects part of the state
- **Effect** - performs side effect

But **reducer**'s concept always was a dark horse for me.

- Why is it called a **reducer**?
- Does it have any relation to the JavaScript's arrays reduce method?
- What was the intention to call it that way?

Now, I'll tell you answers to those questions! But before we dive into those sacred secrets, we ought to learn what is array reduce method 🚀

## What is array reduce?

So, what is the array reduce method? 

In fact, the reduce method accepts an initial state, then iterates over the array items and applies some transformations
to the accumulator based on each item. It handles items one by one. Each iteration returns a new version of the accumulator
that will be consumed by the next iteration. Here is the *gif* that explains it step by step.

<video controls autoplay>
  <source src="/assets/blog/why-reducer-is-reducer/how-reduce-works.m4v" type="video/mp4">
  Your browser does not support the video tag.
</video>

Well, pretty easy, I'm right? I think it's a time to build a *reducer* concept
based on the *reduce* method 🥳

<hr>

## Understanding reduce concept

In this section, I'm going to take an array reduce method and build a *reducer* concept based on it.
First of all, here we have an array and a *reduce* call:

```typescript
const array = [1, 2, 3, 4, 5];

const result = array.reduce((acc, item) => {
  return acc + item;
}, 0);
```

It consumes an initial value - accumulator, that is **0** and adds item to the accumulator at each iteration.
The next step is to aply an appropriate naming to it:

```typescript
const actions = [action1, action2, action3, action4, action5];
const initialStoreState = {};

const result = actions.reduce((state, action) => {
  // perform some transformation
}, initialStoreState);
```

Now it looks like a **reducer**! Am I right? We're close!
Now, let's remember how we did state transformation at the reducer - using a switch/case statement!

```typescript
const actions = [action1, action2, action3, action4, action5];
const initialStoreState = {};

const result = actions.reduce((state, action) => {
  switch (action.type) {
    case Action1:
      // apply some transformations
    case Action2:
      // apply some transformations
    case Action3:
      // apply some transformations
    case Action4:
      // apply some transformations
    case Action5:
      // apply some transformations
  }
}, initialStoreState);
```

Much better now, huh? Now, do you remember that ngrx operates with the immutable state objects? That
mean we can't just apply some transformations to the state, we also need to create a new state object each
time we do something at the reduce method:

```typescript
const actions = [action1, action2, action3, action4, action5];
const initialStoreState = {};

const result = actions.reduce((state, action) => {
  switch (action.type) {
    case Action1:
      // apply some transformations
      return newVersionOfTheState;
    case Action2:
      // apply some transformations
      return newVersionOfTheState;
    case Action3:
      // apply some transformations
      return newVersionOfTheState;
    case Action4:
      // apply some transformations
      return newVersionOfTheState;
    case Action5:
      // apply some transformations
      return newVersionOfTheState;
  }
}, initialStoreState);
```

And we're done! Looks like a common **reducer** function, right? Or not? Something is still missing here...
I mean, at the code above we're iterating over an array of items. While when we're dealing with ngrx actions, 
actions are not an array. It's a stream of events distributed over time.

What concept can help us to handle a collection of events distributed over time? 

Of course, it's **Observable**!

Frankly speaking, **Observable** is intended to be a stream of events. But for simplicity and a better understanding of
my concept let's refer to it as just a collection of items distributed over time. Like an array, but distributed over time 😅.
Hopefully, you already get my point here.

```typescript
const actions = new Subject();

// I can consume actions via subscribe
actions.subscribe(action => {

  // handle action somehow
})

// And can push new actions into the collection
actions.next(someAction);
```

Here I have a plain definition of actions collection. I can push something into that collection, also, I can consume items from that collection.

The next step is to create a state and to **reduce** it somehow.

```typescript
const state = new BehaviorSubject();

// I can consume state via subscribe
state.subscribe(state => {

  // do something with it
})

// And can push new version of the state
state.next(newState);
```

I've created a state stream above. I'm using **BehaviorSubject** here since it holds the last state inside and I can consume it whenever I want,
even if subscribe on it after a new version of the state was pushed into the stream.

```typescript
const actions = new Subject();
const state = new BehaviorSubject({count: 0});

// Listen for new actions
actions.pipe(

  // Get the latest version of the state
  withLatestFrom(state),

  // Perform actual reduce - create a new state version based on the latest state and an action
  map(([action, state]) => reducer(state, action)),

  // Publish a new version of the state
).subscribe(newState => state.next(newState));

// It's an actual reducer function!
function reducer(state, action) {
  return { count: action.count + state.count };
}

// Fire a new action
function onClick() {
  actions.next({count: Math.random()});
}
```

Above I have a very basic implementation of the ngrx store. Let's dissect it now!
 
```typescript
const actions = new Subject();
const state = new BehaviorSubject({count: 0});
```

Here I have a stream of actions, and a stream of states.

```typescript
// Listen for new actions
actions.pipe(

  // Get the latest version of the state
  withLatestFrom(state),

  // Perform actual reduce - create a new state version based on the latest state and an action
  map(([action, state]) => reducer(state, action)),

  // Publish a new version of the state
).subscribe(newState => state.next(newState));
```

Then, I'm listening for actions, getting the latest version of the state and applying a **reducer** function to the latest state and a new action.
This **reducer** function returns a new version of the state (Did you notice that our **reducer** function has exactly the same signature as it has 
in ngrx? I think we're going the right way!)

After that, we're subscribing to the stream and publishing a new version of the state to the consumers.

```typescript
// It's an actual reducer function!
function reducer(state, action) {
  return { count: action.count + state.count };
}
```

Here is a **reducer** function we built. It's a plain **reducer** function as it exists in the ngrx.

```typescript
// Fire a new action
function onClick() {
  actions.next({count: Math.random()});
}
```

And finally, we have a click handler that fires new action.

As you can see now, we went from the `array.reduce` to the ngrx store step by step. We didn't built a *real* ngrx store. We built a super simplified version
that is intended to explain my mental model only. Hopefully, you get the idea 😅 

Finally, I just want to formulate the idea.

<hr>

## So, why reducer is reducer?

**Reducer** is called **reducer** since it *reduces* a collection of events distributed over time and an application state. It does it the same way as **array.reduce** function with only one difference - 
arrays are static, while collection of events are distributed over time.
