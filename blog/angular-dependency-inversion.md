---
article: true
unlisted: true
title: Dependency Inversion in Angular
description: Learn how to use Dependency Iversion concept to build agile Angular Applications
date: "2020-10-29T19:11:25Z"
author: "Nikita Poltoratsky"
keyword: "angular, rxjs, ngrx"
cover: /assets/blog/angular-dependency-inversion/cover.jpg
comments: "https://twitter.com/NikPoltoratsky/status/1316699591161663491"
---

Creating Angular applications is hard. Make them robust and easy to enhance even harder. One of the techniques that allows building agile Angular applications that are easy to evolve is Dependency Inversion.

Dependency inversion stands for the **I** letter at *SOLID* principles. The general principal says the following:

> In object-oriented design, the dependency inversion principle is a specific form of decoupling software modules. When following this principle, the conventional dependency relationships established from high-level, policy-setting modules to low-level, dependency modules are reversed, thus rendering high-level modules independent of the low-level module implementation details. The principle states:
>
> High-level modules should not depend on low-level modules. Both should depend on abstractions (e.g. interfaces).
> Abstractions should not depend on details. Details (concrete implementations) should depend on abstractions.
> By dictating that both high-level and low-level objects must depend on the same abstraction, this design principle inverts the way some people may think about object-oriented programming.

Blah blah blah. That was the quote from [wikipedia](https://en.wikipedia.org/wiki/Dependency_inversion_principle). Impossible to understand and apply to our software from scratch! 😅

So, let's learn how to apply dependency inversion principle in our Angular applications.

## Table of contents:

1. [How we use DI most of all](#how-we-use-di-most-of-all)
2. [Putting data in the DI](#putting-data-in-the-di)
3. [Building configurable modules](#building-configurable-modules)
4. [Using forRoot/forFeature for module configuration](#using-forrootforfeature-for-module-configuration)
5. [Why it might be not a good idea?](#why-its-not-a-good-idea)

---
