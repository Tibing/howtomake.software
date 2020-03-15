---
title: Why reducer is reducer?
publish: true
description: >-
  When web applications properly designed and coded users of assistive
  technologies can use them easily. However, we’re not always paying…
date: '2019-05-16T11:30:38.944Z'
author: Nikita Poltoratsky
keyword: angular, rxjs
---

# Don't follow rxjs best practices

![](/assets/blog/cover.png)

Nowadays more and more developers learn RxJS and write it properly with best practices in mind. But you shouldn't. All those so-called best practices require to learn something new and to add additional code in your projects.
Moreover, using the best practices you're risking to create a good code base and make your teammates happy! 🌈
Stop being a gray mass! Break the rules! Stop using best practices!

Here are my suggestions to you on how to deal with those awful best practices:

- [Don't unsubscribe](#dont-unsubscribe)
- [Subscribe inside subscribe inside subscribe inside…](#subscribe-inside-subscribe)
- [Never use pure functions](#pure-functions)
- [Always subscribe manually, don't use async pipe](#subscribe-manually)
- [Expose subjects from your services](#expose-subjects)
- [Always pass streams to child components](#pass-streams-to-children)
- [Marble diagrams? No, it's not for you](#marble-diagrams)

---

# Don't unsubscribe <a name="dont-unsubscribe"></a>

Seriously, who decided that you have to unsubscribe from observables? You don't have to do that. Let's play a game - which unsubscribe implementation of those Angular components the best?

That one with `takeUntil` operator?

```typescript
@Component({ ... })
export class MyComponent implements OnInit, OnDestroy {

  private destroyed$ = new Subject();

  ngOnInit() {
    myInfiniteStream$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => ...);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
```

Or that one with `takeWhile` operator?

```typescript
@Component({ ... })
export class MyComponent implements OnInit, OnDestroy {
  private alive = true;
  ngOnInit() {
    myInfiniteStream$
      .pipe(takeWhile(this.alive))
      .subscribe(() => ...);
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
```

Exactly! Neither! Both `takeWhile` and `takeUntil` operators are implicit and may be hard to read 🤓. The best solution is to store each subscription in a separate variable and then unsubscribe on component destroy in an explicit way:

```typescript
@Component({ ... })
export class MyComponent implements OnInit, OnDestroy {

  private subscription;

  ngOnInit() {
    this.subscription = myInfiniteStream$
      .subscribe(() => ...);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

That works especially good in cases when you have multiple subscriptions:

```typescript
Component({ ... })
export class MyComponent implements OnInit, OnDestroy {

  private subscription1;
  private subscription2;
  private subscription3;
  private subscription4;
  private subscription5;

  ngOnInit() {
    this.subscription1 = myInfiniteStream1$
      .subscribe(() => ...);
        this.subscription1 = myInfiniteStream2$
      .subscribe(() => ...);
        this.subscription1 = myInfiniteStream3$
      .subscribe(() => ...);
        this.subscription1 = myInfiniteStream4$
      .subscribe(() => ...);
        this.subscription1 = myInfiniteStream5$
      .subscribe(() => ...);
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
    this.subscription5.unsubscribe();
  }
}
```

But that solution is not perfect yet. What could be done better? How do you feel? How could we make that code more clean and readable?
Yeah, I have the answer for you! Let's remove all that ugly unsubscribe statements at all.

```typescript
@Component({ ... })
export class MyComponent implements OnInit {

  ngOnInit() {
    myInfiniteStream$
      .subscribe(() => ...);
  }
}
```

Excellent! We've removed all the redundant code and now it looks simpler and even saves us a bit of memory on our hard drives. But what will happen with `myInfiniteStream$` subscription?

Forget about it! 😅 Let's leave that job for the garbage collector, otherwise, why does it exist, right?

---

# <a name="subscribe-inside-subscribe"></a> Use subscribe inside subscribe inside subscribe inside…

Seriously, why not? Why should we use all those `switchMap`/`mergeMap` operators? How do you feel about that code? Easy to read? Do you really like your teammates so much?

```typescript
getUser().pipe(
  switchMap(user => getDetails(user)),
  switchMap(details => getPosts(details)),
  switchMap(posts => getComments(details)),
)
```

Don't you think it over neat and cute? You shouldn't write code that way! You have another choice, take a look here:

```typescript
getUser().subscribe(user => {
  getDetails(user).subscribe(details => {
    getPosts(details).subscribe(posts => {
      getComments(posts).subscribe(comments => {

        // handle all the data here
      });
    });
  });
})
```

Much better, huh?! Always write code that way if you hate your teammates and don't want to learn new RxJS operators.

Be bright!🌈 Let your team members feel a bit of nostalgia with callback hell.

---

# <a name="pure-functions"></a> Never use pure functions

Seriously, why should you use pure functions? Testability? Composability? It's hard, it would be much easier to affect the global world. Let's take a look at the example:

---

# <a name="subscribe-manually"></a> Always subscribe manually, don't use async

We've already discussed subscriptions management with `takeUntil` and `takeWhile` and agreed that these operators are from an evil one. But exist one more danger here - async pipe.

```typescript
@Component({
  template: `
    <span>{{ data$ | async }}</span>
  `,
})
export class MyComponent implements OnInit {

  data$: Observable<Data>;

  ngOnInit() {
    this.data$ = myInfiniteStream$;
  }
}
```

Do you see that? Clean, readable, easy to maintain code! Argh. It's not allowed. As for me, it would be much better to put the data in local variable and just use that variable in the template.

```typescript
@Component({
  template: `
    <span>{{ data }}</span>
  `,
})
export class MyComponent implements OnInit {
  data;

  ngOnInit() {

    myInfiniteStream$
      .subscribe(data => this.data = data);
  }
}
```

---

# <a name="expose-subjects"></a> Expose subjects from your services

There is a pretty common practice to use Observable Data Services in Angular:

```typescript
@Injectable({ providedIn: 'root' })
export class DataService {

  private data: BehaviorSubject = new BehaviorSubject('bar');

  readonly data$: Observable = this.data.asObservable();

  foo() {
    this.data$.next('foo');
  }

  bar() {
    this.data$.next('bar');
  }
}
```

Here we're exposing data stream as observable. Just to make sure it can't be changed only through a data service interface.
But it confuses people.
You want to change the data - you have to change the data.
Why write additional methods if we can change the data on the place? Let's rewrite the service to make it easier to use;

```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  public data$: BehaviorSubject = new BehaviorSubject('bar');
}
```

Yeah! Do you see that? Our data service became smaller and easier to read! Also, now we can put almost anything in our data stream! Awesome, don't you think so?🔥

---

# <a name="pass-streams-to-children"></a> Always pass streams to child components

Have you ever heard about Smart/Dump components pattern, that can help us to decouple components from each other? Also, that pattern prevents child component from triggering actions in parent components:

```typescript
@Component({
  selector: 'app-parent',
  template: `
    <app-child [data]="data$ | async"></app-child>
  `,
})
class ParentComponent implements OnInit {

  data$: Observable<Data>;

  ngOnInit() {
    this.data$ = this.http.get(...);
  }
}

@Component({
  selector: 'app-child',
})
class ChildComponent {
  @Input() data: Data;
}
```

Do you like it? Your teammates also like it. In case you want to revenge them, you need to rewrite your code in the following way:

```typescript
@Component({
  selector: 'app-parent',
  template: `
    <app-child [data$]="data$"></app-child>
  `,
})
class ParentComponent {

  data$ = this.http.get(...);
  ...
}

@Component({
  selector: 'app-child',
})
class ChildComponent implements OnInit {

  @Input() data$: Observable<Data>;

  data: Data;

  ngOnInit(){
    // Trigger data fetch only here
    this.data$.subscribe(data => this.data = data);
  }
}
```

Do you see that? We're not handling subscriptions in the parent component anymore. We're just passing subscription to the child component.
If you follow that practice your team members will cry tears of blood during debugging, believe me.

---

# <a name="marble-diagrams"></a> Marble diagrams? No, it's not for you

Do you know what are marble diagrams? No? It's good for you!

Let's assume we wrote the following function and going to test it:

```typescript
export const numTwoTimes = (obs: Observable<number>) => obs.pipe( map((x: number) => x * 2) );
```

Many of us will use marble diagrams to test the function:

```typescript
it('multiplies each number by 2', () => {
  createScheduler().run(({ cold, expectObservable }) => {
    const values = { a: 1, b: 2, c: 3, x: 2, y: 4, z: 6 }
    const numbers$ = cold('a-b-c-|', values) as Observable<number>;
    const resultDiagram = 'x-y-z-|';
    expectObservable(numTwoTimes(numbers$)).toBe(resultDiagram, values);
  });
})
```

But, who the hell wants to learn a new concept of marble diagrams? Who wants to write clean and laconic code? Let's rewrite the test in a common manner.

```typescript
it('multiplies each number by 2', done => {
  const numbers$ = interval(1000).pipe(
    take(3),
    map(n => n + 1)
  )
  // This emits: -1-2-3-|

  const numbersTwoTimes$ = numTwoTimes(numbers$)

  const results: number[] = []

  numbersTwoTimes$.subscribe(
    n => {
      results.push(n)
    },
    err => {
      done(err)
    },
    () => {
      expect(results).toEqual([ 2, 4, 6 ])
      done()
    }
  )
})
```

Yeah! It looks one hundred times better now!

---

You're a hero if you've read all the advice above. But. Well. It was a joke. 😅 I just decided to cheer you up and make your day a little bit better. Hopefully, you've liked it.

Please, never do what I said in that article. Never let your teammates cry and hate you. Always strive to be a decent and neat person. Save the world - use patterns and best practices!

[Stay tuned](https://twitter.com/NikPoltoratsky) and let me know if you have any particular Angular topics you would like to hear about!
