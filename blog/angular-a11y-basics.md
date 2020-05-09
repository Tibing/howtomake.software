---
article: true
unlisted: true
title: Angular a11y basics
description: '11 tips on how to make your apps more accessible'
date: '2020-02-20T06:13:25Z'
author: 'Nikita Poltoratsky'
keyword: 'angular, rxjs, ngrx'
cover: "https://res.cloudinary.com/practicaldev/image/fetch/s--bS6335O6--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/5mvjp58jvl0z0afmbigl.png"
---

<link rel="canonical" href="https://dev.to/nikpoltoratsky/angular-a11y-11-tips-on-how-to-make-your-apps-more-accessible-400h">

Nowadays approximately 15% of people have some kind of disability that doesn't allow them to use web applications in a common way - keyboard, mouse, touchscreen. That's where accessibility comes on to the stage.

> Accessibility is the practice of making your websites usable by as many people as possible. We traditionally think of this as being about people with disabilities, but the practice of making sites accessible also benefits other groups such as those using mobile devices, or those with slow network connections. You might also think of accessibility as treating everyone the same, and giving them equal opportunities, no matter what their ability or circumstances. (source: [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility))

I prefer thinking about accessibility as about help for future me. While developing accessibility features, I'm always asking myself a question: "what may happen to me in the future?". What if I broke my arm or something else happen to me? Will I be able to use an application without a mouse? Without the keyboard? With the screen reader?

Accessibility is not only for people with disabilities it's also about future you, about your old parents, who aren't able to interact with the web in a common way just because they're old.

Also, there're different types of applications that require accessibility. I'm talking about government websites. For instance, the United States government has a resource that describes how to make your application accessible enough: [https://accessibility.digital.gov](https://accessibility.digital.gov/)

And my mission for today is to introduce the most basic principles on how to make your application accessible. In this article, you'll find 11 tips that will help you make your Angular application more accessible.

> Please note, that to use any of the techniques described below you should carefully go through the documentation. It’s easy to screw up accessibility when doing it without sufficient knowledge.

## Table of contents
- Use meaningful HTML
- Natural content flow
- Provide alternative content
- Think about contrast
- Don’t autofocus
- Don’t `outline: none`
- Use ARIA attributes
- Use landmarks
- Provide a unique title for each page
- Use Angular CDK
- Test for a11y

---

## Use meaningful HTML

The first and the simplest way to start with the accessibility is to start using plain old HTML for its purpose. I mean creating meaningful or semantic HTML. Since HTML elements are always used by assistive technologies for multiple purposes we ought to make sure that HTML is done right in our Angular applications. Let me explain why it is important:

- Built-in keyboard accessibility — native HTML elements always have built-in keyboard accessibility. Buttons are always focusable and clickable via keyboard, select elements are always navigable via keyboard and so on. If you’re building custom controls instead of using native HTML elements you’ll have to make them accessible by yourself.
- Good content structure with headings, paragraphs, lists, etc. — What’s the most important here is that content structure is used by the most screenreaders for navigation. For instance, most of the screenreaders build a kind of additional menu from headings on the page and allow their users to navigate to any heading at the page.
- No table layouts — Tables were created with the purpose to display structured data. However, tons of pages nowadays are using tables for layouts. This approach may lead to inappropriate behavior and unstructured reads via screenreader. By the way, some of the modern screenreaders know the difference between data tables and layout tables, however, right now we can’t completely rely on them.

I’ve mentioned only a few points above, however, we have more reasons why to use semantic HTML. To find more information, you can start at [developer.mozila.org](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML).

## Natural content flow

HTML defines how elements are rendered and organized on a web page. It determines which element comes before another one, which one sits on top of another and so on. These rules that control the flow of content is called the HTML content flow.

Looks like the content flow from left to right and from top to bottom is the most popular content flow across the web. However, in different cultures, you can notice different content flow like the right to left. And it’s very important to keep HTML content flow feel natural for the user. Especially important here to keep tab order at the page feels natural. However, user experience and natural tab order can be easily screwed up via improper usage of `flex boxes, floats, tabindex` and other HTML features.

- Reverse flex container — will mess tab order since elements positions will be different compared to the elements in the DOM.
- Floats — CSS float introduces almost the same issue as reversed flex containers. It keeps the element at its place at the DOM but moves to another place on the screen.
- tabindex — tabindex is created to modify tab order, so it’s quite easy to introduce a mess using this HTML attribute. tabindex attr accepts integer values that define an order of elements in tab order of the page. Negative values remove an element from the tab order, 0 inserts elements in the natural tab order, positive values jump the element to the front of the natural tab order. If there are multiple elements with a tabindex greater than 0, the tab order starts from the lowest value that is greater than zero and works its way up. That’s why positive values for tabindex considered an anti-pattern. You can learn more about tabindex usage here: [https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex](https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex)

As we learned above, incorrect usage of HTML and CSS can introduce unexpected tab order on the page. Keyboard users will never expect the improper tab order and it’ll be hard for them to get how to navigate through the application.

To learn more on natural tab order, please, check these articles:

- [Control focus with `tabindex`](https://web.dev/keyboard-access/)
- [Keyboard access fundamentals](https://web.dev/control-focus-with-tabindex/)

## Provide alternative content

When you’re creating non text content on the web page, please, make sure you’ve provided a text alternative for your content. Let me elaborate:

- If your website contains images, charts, maps you ought to make sure this content has text alternatives for people who use screen readers. Since screen readers can’t read your images, charts, and maps you need to provide a text that contains all information from your infographics. For that purpose typically `alt=”Description”` attribute is used on images.
- Websites with video content ought to have subtitles. Easy as that, people who can’t use speakers ought to have the ability to understand your content. And here, subtitles come on to the stage.
- Empty `alt` for decorative images `<img src=”…” alt=””>`. While I mentioned that you ought to add alternative content for your graphical content, not each image has to be marked by the `alt` attribute. If you mark your decorative images with the `alt` attribute screenreader will try to announce them, however, it’s not what we want from decorative images.

## Think about contrast

You have to be always thinking about a content contrast since this part of a11y affects almost all users of your application. If the content on the web page has low contrast with the background it’s really hard to read it even without any sight disabilities.

![Chrome color picker with conformance level errors](https://i.ibb.co/bLy7Pv2/image.png)

If you’re using google chrome, you can check a contrast of your content at the styles tab.

So, just select an HTML element, open its CSS properties and click at any color style. You may notice a new section at the bottom of the color picker that notifies you about the contrast ratio between element text and background.

At the image above, I have an issue with the contrast. Also, here you can notice two additional lines on the color palette and red signs along with A letters at the bottom. Those red signs with A letters indicate [WCAG Conformance levels](https://www.ucop.edu/electronic-accessibility/standards-and-best-practices/levels-of-conformance-a-aa-aaa.html) — a metric that indicates how accessible your website is. For the current situation with the contrast it means the following:

- If your color above the top line (**A** Conformance level) — you have a minimum level of accessibility and does not achieve broad accessibility for many situations.
- If your color between lines (**AA** Conformance level) — it’s ok. WCAG recommends you have at least **AA** Conformance level for your websites.
- If your color below the bottom line (**AAA** Conformance level) — you’re great. However, **AAA** (the highest) level of accessibility can’t be achieved for all accessibility criteria.

## Don’t autofocus

Autofocus is hard to get for screenreader users. Autofocus can dump screenreader users into your form with zero context, leaving them lost and confused on your page.

Autofocus can also confuse regular users, especially on mobile. So keep it simple, let people click into your inputs when they are ready. To learn more about autofocus issue please, refer to [this article](https://www.brucelawson.co.uk/2009/the-accessibility-of-html-5-autofocus/).

## Don’t `outline: none`

It’s a pretty common approach to add outline: none style into global application’s styles since the default browser outline is ugly and can ruin your design. However, an outline is a must for keyboard users who aren’t using the mouse for interaction with your application. The outline allows them to see what section on the page is selected right now and helps them to navigate across your application.

- So, the best approach is to keep an outline and just style it to fit application design. This is amazing since the outline is a common behavior for each website and will be easily recognized by the user.
- Another way is to style focused elements another way: background, border or whatever. When using this approach, avoid using color alone as the only visual means of determining focus, as colorblind people may not be able to distinguish the focus state from the inactive state.
- Also, if you finally decided to remove the outline in your application, you can control its behavior through JavaScript. Detect mouse users and hide outline for them, then, detect keyboard activity and show outline for them.
- Finally, there is a native approach for hiding/removing outline for the user — The `:focus-visible` pseudo-class applies while an element matches the `:focus` pseudo-class and the user-agent determines via heuristics that the focus should be made evident on the element. You can read about it deeper here: [https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)

For more information, I would suggest you refer to [this article from a11yproject](https://a11yproject.com/posts/never-remove-css-outlines/).

## Use ARIA attributes

ARIA is shorthand for [Accessible Rich Internet Applications](https://www.w3.org/WAI/standards-guidelines/aria/). ARIA is a set of attributes you can add to HTML elements that define ways to make web content and applications accessible to users who use assistive technologies. When accessibility issues cannot be managed with native HTML, ARIA can help bridge those gaps.

There are three main components used in ARIA: Roles, States, and Properties:

- Role — defines a type of user interface element. (button, menuitem, scrollbar)
- States and properties— defines a state of an element (aria-checked, aria-labelledby, aria-activedescendant).

But remember the rule:

> Use native HTML at all times, unless it’s absolutely, positively impossible to make an element accessible otherwise.

If you think something can’t be done using HTML, please, check it at [HTML Accessibility site](https://www.html5accessibility.com/).

## Use landmarks

This section is related to semantic HTML since HTML 5 introduced a number of semantic attributes that help screen reader users to perform navigation across the page. For instance, a screen reader will announce the start and end of each landmark on a page, and its web rotor will display a list of these roles/regions.

You can think about landmarks as about a set of anchors assistive technologies may navigate to. So, users may skip some sections or just go directly to a specific section of your web page.

Here is the list of the most common landmark: `article, aside, nave, main, footer, header`, etc.

However, in some specific situations (for instance, old browsers support), you need to change the behavior of the screen reader and here ARIA landmark attributes becomes handy. Landmark attributes are HTML attributes assigned to specific sections of your website. These attributes allow you to change the meaning of the specific landmark for the screen readers.

You can learn more about HTML and ARIA landmarks here: [https://www.w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html](https://www.w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html)

## Provide a unique title for each page

A unique title for each page is a must for screenreader users since it’s the first thing that is announced by the screenreader. I bet it’s a quite big issue for Angular applications since Angular applications are single-page applications. And have one common title for each page by default.

However, it can be fixed using `Title` service provided by the Angular. It allows you to set a page title through the simple API.

```typescript
export class AppComponent {
  constructor(title: Title) {
    title.setTitle('My Cool Page');
  }
}
```

## Use Angular CDK

Since we’re talking about accessibility for Angular applications it’s must mention [Angular CDK a11y](https://material.angular.io/cdk/a11y) package that allows you speed up accessibility development via providing implementations for common patterns. Let’s peek a boo on functionalities provided:

- ListKeyManager — allows you to create keyboard navigable lists seamlessly.
- Focus trap — traps a focus inside an element. Widely used for modal dialogs to trap a focus inside and not allow the user to tab out of the modal dialog.
- Live announcer — provides the easiest way to announce something for screenreader users. It’s especially important for applications that have notifications and users with screenreaders. Since screenreaders can’t tell the user about notification by default.
- Focus monitor — allows monitoring focus on an element and its descendants. It’s like listening for `focus` and `blur` events on the element, but packed into one service with the simple API and also allows you to understand *how* that element was focused — mouse, keyboard, touch or programmatically.
- Styling utilities — a few SCSS utilities invented to help you building accessible components. It includes functionalities like the ability to hide elements from the screen while keeping them available for screen readers and helping you to target high contrast color schemes in your users.

## Test for accessibility

If you decided to build an accessible application you ought to think about testing for accessibility. It’ll allow you not to miss something important while developing an app. Also, it’ll help you to deal with the regression.
There are two ways for testing a website for accessibility:

- Manual testing — manual testing is often required since we can’t get all the issues using automated testing. Here is an amazing article on how to start manual accessibility reviews: [https://developers.google.com/web/fundamentals/accessibility/how-to-review](https://developers.google.com/web/fundamentals/accessibility/how-to-review)
- Automated testing — in spite of we can’t get all the accessibility issues using automated testing we can save tons of time using it. So, please, check [Tim Deschryver article](https://medium.com/angular-in-depth/test-for-accessibility-and-help-millions-of-people-97d86f72e2c4) on accessibility testing tools overview.

---

## Conclusion

Hopefully, you already get that accessibility is a must for almost any type of web application. It improves user experience and removes barriers for almost any users and allows them to use web applications in a seamless way.

In this article, I’ve mentioned the most basic and important things you need to do to start with accessibility. Let’s make the web more accessible together!

Thank you for reading!

## Useful resource:

### Amazing Introductions for Accessibility:

- Web Accessibility Initiative — [https://www.w3.org/WAI/](https://www.w3.org/WAI/)
- The US Government guide on accessibility — [https://accessibility.digital.gov/](https://accessibility.digital.gov/)
- Developer Mozilla Network — [https://developer.mozilla.org/en-US/docs/Web/Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Guides and researches

- [https://webaim.org/](https://webaim.org/)

### How to build accessible components

- [https://www.w3.org/WAI/tutorials/page-structure/](https://www.w3.org/WAI/tutorials/page-structure/)
- [https://inclusive-components.design/](https://inclusive-components.design/)
- [https://www.w3.org/TR/wai-aria-practices-1.1/](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [https://www.smashingmagazine.com/printed-books/inclusive-components/](https://www.smashingmagazine.com/printed-books/inclusive-components/)
- A11yCast by Rob Dodson — [https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
