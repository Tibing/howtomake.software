---
article: true
unlisted: true
title: Agile Angular modules configuration with Dependency Injection
description: Learn how Dependency Injection can help you building agile Angular systems
date: "2020-10-24T19:11:25Z"
author: "Nikita Poltoratsky"
keyword: "angular, rxjs, ngrx"
cover: /assets/blog/agile-angular-module-with-dependency-injection/cover.jpg
comments: "https://twitter.com/NikPoltoratsky/status/1316699591161663491"
---

If you already built a few Angular applications it might be you already spotted how it may be tricky to build easily configurable modules.

I mean, if you're building a reusable module it might be you need to configure it somehow. And if this module contains different entities (multiple components, services, directives, and pipes) it will be hard to configure them separately. It would be better to configure the whole module in one place.

For example, let's take a look at the Angular material dialog.

The angular material dialog contains multiple entities - components and services. And it provides us with the single point of configuration - `MAT_DIALOG_DEFAULT_OPTIONS` is the Dependency Injection (DI) token that allows us to configure all the material dialogs at the application at one place.

In this article, I'll be talking about how to configure Angular components and services using the Dependency Injection concept.

## Table of contents:

1. [How we use DI most of all](#how-we-use-di-most-of-all)
2. [Putting data in the DI](#putting-data-in-the-di)
3. [Building configurable modules](#building-configurable-modules)
4. [Using forRoot/forFeature for module configuration](#using-forrootforfeature-for-module-configuration)
5. [Why it might be not a good idea?](#why-its-not-a-good-idea)

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
const CONFIG = new InjectionToken("This is a configuration object");
```

And then, we need to provide it:

```typescript
@NgModule({
  providers: [{ provide: CONFIG, useValue: { foo: "bar" } }],
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
  role?: DialogRole = "dialog";
  panelClass?: string | string[] = "";
  hasBackdrop?: boolean = true;
  backdropClass?: string | string[] = "";
  disableClose?: boolean = false;
  width?: string = "";
  height?: string = "";
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string = "80vw";
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
const DIALOG_CONFIG = new InjectionToken(
  "This is a configuration object for our dialog component"
);
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

However, this approach requires the user of the library to know about too many concepts. Generally, the user ought to:

- import the module
- provide configuration through the `DIALOG_CONFIG`
- import and use the required services and components

But we have a solution that helps to reduce the number of concepts the user ought to know. Let's hide `DIALOG_CONFIG` from the user but still keep the ability to provide it outside.

## Using forRoot/forFeature for module configuration

I bet you already saw and used the `forRoot` modules configuration with the `RouterModule`.

`forRoot` - is a convention that allows the authors of modules to provide a simple interface for module configuration. Let's see how to make it.

```typescript
@NgModule({
  declarations: [
    // all the components and directive are declared here
  ],
})
export class DialogModule {
  static forRoot(config): ModuleWithProviders<DialogModule> {
    return {
      ngModule: DialogModule,
      providers: [{ provide: DIALOG_CONFIG, useValue: config }],
    };
  }
}
```

Above we have a `DialogModule` that declares all the components, directives, services, and other entities.

Also, it has a static `forRoot` method that returns `ModuleWithProviders` - an object with declared `ngModule` and all the providers that ought to be declared at the root level.

> This is the reason why it's called `forRoot`. It's supposed to be called at the **root level** only. Otherwise, you might spot problems because of multiple `forRoot` calls.
>
> Instead, modules authors provide us with `forFeature` level if their modules can be reconfigured at the **feature level**.

`forRoot` method receives `config` - the configuration object that will be provided at the root level and will be available for all the entities.

Then, we're using it:

```typescript
@NgModule({
  imports: [
    // now we can do this:
    DialogModule.forRoot({}),
  ],
  providers: [
    // instead of this:
    { provide: DIALOG_CONFIG, useValue: config },
  ],
})
export class AppModule {}
```

As you can see above, this approach makes modules configuration seamless! And the user doesn't need to think about providing something, just calling the function! 😱

Looks cool, right? 🥳 Until it's not.

## Why it's not a good idea?

It's an implicit approach. The problem is that if you're providing configuration somewhere in another place rather than in place when you're using it'll be hard to understand by the reader of the code.

Let's return to the example with the dialog. So, here I have a root configuration that defines some application wide dialog configurations:

```typescript
@NgModule({
  imports: [DialogModule.forRoot({})],
})
export class AppModule {}
```

Then, in different feature modules I do the following:

```typescript
@NgModule({
  imports: [
    // Providing another `closeIcon`
    DialogModule.forFeature({ closeIcon: "flower" }),
  ],
})
export class FooFeatureModule {}

@NgModule({
  imports: [
    // Providing another `closeIcon`
    DialogModule.forFeature({ closeIcon: "bar" }),
  ],
})
export class BarFeatureModule {}
```

After that, I'm just using the dialog:

```typescript
@Component({})
export class MyComponent {
  showDialog() {
    this.dialog.show();
  }
}
```

Cool! Then, I'm returning to this code in a year and I need to check why do I have some configurations at the dialog? I'm checking the place where I'm calling and what do I see? You're right! Nothing! No configuration here. Hmm, then I have to go to my feature module and then to the root module. So, I need to check three places instead of one.

Moreover here, what if I didn't see this module before? What if I have no idea how this configuration works? In that case, it'll be pretty hard to figure out what's going on in the app and which configuration was taken into the account.

> Don't overuse that approach. It'll help you configuring applications but overusing that idea will lead to hell. 😭

## Recap

So, as you can see here, Dependency Injection is a powerful concept that can be used not only for services injection but also for configurations injection. It has many many more usages but we'll take a look at them in other articles.
