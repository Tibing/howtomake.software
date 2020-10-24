---
article: true
unlisted: true
title: Agile Angular modules configuration with Dependency Injection
description: blog description
date: "2020-10-24T19:11:25Z"
author: "Nikita Poltoratsky"
keyword: "angular, rxjs, ngrx"
cover: /assets/blog/agile-angular-module-with-dependency-injection/cover.jpg
---

If you already built a few Angular applications it might be you already spotted how it may be tricky to build easily configurable modules.

I mean, if you're building a reusable module it might be you need to configure it somehow. And if this module contains different entities (multiple components, services, directives, and pipes) it will be hard to configure them separately. It would be better to configure the whole module in one place. 

For example, let's take a look at the Angular material dialog.

The angular material dialog contains multiple entities - components and services. And it provides us with the single point of configuration - `MAT_DIALOG_DEFAULT_OPTIONS` is the Dependency Injection (DI) token that allows us to configure all the material dialogs at the application at one place.

In this article, I'll be talking about how to configure Angular components and services using the Dependency Injection concept.

## Table of contents:

1. [How we use DI most of all](/blog/agile-angular-module-with-dependency-injection#how-we-use-di-most-of-all)
2. [Putting data in the DI](/blog/agile-angular-module-with-dependency-injection#putting-data-in-the-di)
3. [Building configurable modules](/blog/agile-angular-module-with-dependency-injection#building-configurable-modules)
4. [Why it might be not a good idea?](/blog/agile-angular-module-with-dependency-injection#why-its-not-a-good-idea)

---

## How we use DI most of all

The main idea of DI is to provide dependencies for different entities - components, services, modules, and so on.
The most frequent usage of DI in Angular is to inject services into components.

In that case, you're creating a service:

```typescript
@Injectable()
export class MyService {}
```

And then, you're using it in component, easy as that:

```typescript
@Component()
export class MyComponent {

  constructor(private service: MyService) {}
}
```

Even though this is the most popular way to use DI we have other ways to use it. Let's explore how to use DI for system configuration.
We're going to learn about system configuration but first things first, so, let's start with **Injection Tokens** 🥳.

## Putting data in the DI

Injection Tokens is the Angular concept that allows you to **put** something in the DI system. For instance, you want to provide a configuration object for your app.
First of all, we need to create it:

```typescript
const CONFIG = new InjectionToken('This is a configuration object');
```

And then, we need to provide it:

```typescript
@NgModule({
  providers: [
    { provide: CONFIG, useValue: { foo: 'bar' } },
  ]
})
export class AppModule {}
```

Finally, you can use it:

```typescript
@Component()
export class MyComponent {
  
  constructor(@Inject(CONFIG) private config) {
    console.log(config.foo); // will be 'bar'
  }
}
```

Injection tokens allow us to **put** some data inside the DI container and then consume it everywhere. Using injection tokens we can build agile configuration systems for our applications. Let's do that! 🌈

## Building configurable modules

Let's assume we have to build a component, for instance - dialog component. It will have tons of configuration options:

```typescript 
export interface MatDialogConfig<D> {
  viewContainerRef?: ViewContainerRef;
  id?: string;
  role?: DialogRole = 'dialog';
  panelClass?: string | string[] = '';
  hasBackdrop?: boolean = true;
  backdropClass?: string | string[] = '';
  disableClose?: boolean = false;
  width?: string = '';
  height?: string = '';
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string = '80vw';
  maxHeight?: number | string;
  position?: DialogPosition;
  data?: D | null = null;
  direction?: Direction;
  ariaDescribedBy?: string | null = null;
  ariaLabelledBy?: string | null = null;
  ariaLabel?: string | null = null;
  autoFocus?: boolean = true;
  restoreFocus?: boolean = true;
  scrollStrategy?: ScrollStrategy;
  closeOnNavigation?: boolean = true;
  componentFactoryResolver?: ComponentFactoryResolver;
}
```

Lot's of configurations here 🙃. And it's impossible to copy/paste it each time when you're using the dialog in your application. 
Looks like it would be awesome to install global configuration first of all and then just overwrite at the place when we're using the dialog.
How to do that? Frankly speaking, quite easy:

First of all, we're creating an injection token that'll allow us to provide configuration for our dialog component:

```typescript
const DIALOG_CONFIG = new InjectionToken('This is a configuration object for our dialog component');
```

Then, in any place where we need it, we're just using it:

```typescript
@Component()
export class DialogComponent {
  
  constructor(@Inject(DIALOG_CONFIG) private config) {}
}

@Injectable()
export class DialogService {

  constructor(@Inject(DIALOG_CONFIG) private config) {}
}
```

You can use it anywhere you need it. When we're using dialog we're providing configuration at the root level:

```typescript
@NgModule({
  providers: [
    { provide: DIALOG_CONFIG, useValue: {...} },
  ]
})
export class AppModule {}
```

And then, all the instances of the **dialog** will share the same configuration out of the box.

Looks cool, right? 🥳 Until it's not.

## Why it's not a good idea?

It's an implicit approach. In fact, the problem is that if you're providing configuration somewhere in another place rather than in place when you're using it'll be hard to understand by the reader of the code.

Don't overuse that approach. It'll help you configuring applications but overusing that idea will lead to hell. 😭

## Recap

So, as you can see here, Dependency Injection is a powerful concept that can be used not only for services injection but also for configurations injection. In fact, it has many many more usages but we'll take a look at the in other articles.
