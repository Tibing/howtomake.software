---
title: Why reducer is reducer?
publish: false
description: >-
  When web applications properly designed and coded users of assistive
  technologies can use them easily. However, we’re not always paying…
date: '2020-05-02T06:13:25Z'
author: Nikita Poltoratsky
keyword: angular, rxjs, ngrx
cover: /assets/blog/cover.png
---

# Why reducer is reducer? Model of the modern state management

In this article, I'm introducing my mental model of modern state management.

More exactly I'm talking on how [ngrx](https://ngrx.io) works, why reducer is a reducer, and how it
is related to the JavaScript's array reduce method. All the statements here will likely be true
for any state management solution using redux concepts. So, if you're using Redux, you're welcome 🤓.

## At this article we'll cover:

- [What is ngrx?](#what-is-ngrx)
- [What is array reduce?](#what-is-array-reduce)
- [Understanding reduce concept](#understanding-reduce-concept)
- [So, why reducer is reducer?](#so-why-reducer-is-reducer)

<hr>

## What is ngrx? 

If you have no experience with ngrx or other redux like state management solutions, I would personally recommend you to
learn about them first. I would suggest you start at the [ngrx getting started guide](https://ngrx.io/guide/store).

However, I'll still cover how it works briefly. Here is a diagram from the ngrx website:

![how ngrx works](/assets/blog/why-reducer-is-reducer/how-ngrx-works.png)

ngrx operates with 5 major concepts:

- **State** - represents the application state at the current moment.

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

- **Action** - describes unique events that trigger state changes or side effects.

```typescript
const addTask = createAction('Add Task');
const removeTask = createAction('Remove Task');
const markTaskAsDone = createAction('Mark Task As Done');
```

- **Selector** - describes how to select slice of the state to be consumed by the component.

```typescript
const getTasks = createSelector(state => state.tasks);
const getCompletedTasks = createSelector(state => state.tasks.filter(task => task.done));
```

- **Reducer** - describe how your application's state will change based on actions.

```typescript
const reducer = createReducer(
  on(addTask, state => {
    // add task 
  }),
)
```

- **Effect** - performs side effects, like interaction with the backend.

```typescript
saveTasks$ = createEffect(
  ofType(saveTasks),
  mergeMap(tasks => {
    // save tasks here
  }),
);
```

So, the main idea of the ngrx is that your application has a single source of truth - your state. It's an immutable object that can be changed only by the reducer. 
You can use parts of the state in your components selecting them using *selectors*. If you need to change the state, you need to fire an
action. Then, your reducer ought to intercept that action and publish a new version of the state (the state is immutable and can't be changed, that's
why reducers don't change state, they just publish a new version of it). If you need to perform some side effect, like persisting data at the backend,
you're using effects that intercepts an action, performs side effect and fires new action to change the state.

With names of 4 concepts everything is clear:

- **State** - application state
- **Action** - an intent to perform an action
- **Selector** - selects part of the state
- **Effect** - performs side effect

But **reducer**'s concept always was a dark horse for me.

- Why is it called a **reducer**?
- Does it have any relation to the JavaScript's arrays reduce method?
- What was the intention to call it that way?

Now, we'll tell you answers to those questions! But before we dive into those sacred secrets, we ought to learn what is array reduce method 🚀

## What is array reduce?

So, what is array reduce method? I hope, you already know what array reduce does.
## Understanding reduce concept
## So, why reducer is reducer?
