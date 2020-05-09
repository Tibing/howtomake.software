---
article: true
title: 'Dealing with Github spambots'
description: 'Learn how to deal with Github spambots'
date: '2019-07-10T06:13:25Z'
author: 'Nikita Poltoratsky'
keyword: 'github, opensource, security'
cover: "https://res.cloudinary.com/practicaldev/image/fetch/s--krw2cq-p--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/i3hlskvymvi322kbur8g.jpg"
---

A few hours a while I was sleeping like a baby. But my sleep was interrupted with constant rings and vibration of my phone. Ok, I have **3000+** new emails here. What's going on? Oh, these are notifications about issues on one of the repositories I own on GitHub - [ngx-admin](https://github.com/akveo/ngx-admin).

<link rel="canonical" href="https://dev.to/nikpoltoratsky/how-to-deal-with-github-spambots-5e6n">

Somebody decided that it's a good idea to create a **3000+** spam issues with advertising in Chinese in our repository. Awesome start of the day.

![Ngx-Admin issues](https://i.ibb.co/yQDvbLq/Screen-Shot-2019-07-10-at-11-28-52-AM.png)

In that article, I'm going to tell you how to deal with spam in your GitHub repository if you accidentally came to the attention of intruders.

# GitHub built-in protection

If you're a repository admin, then in repository settings you'll be able to find **Interaction Limits** section:

![Interaction Limits Section](https://i.ibb.co/FwBhdGr/Screen-Shot-2019-07-10-at-11-41-45-AM.png)

In that section, you can configure *temporary interaction limits* for your repository:

- Limit to existing users
- Limit to prior contributors
- Limit to repository collaborators

Let's discuss them one by one.

## Limit to existing users

*Limit to existing users* option allows you to disable interaction with the repository for users that were created recently.

In my case, we had a lot of different users that were created a few hours ago. And based on their names I think it was somehow automatically generated users. That's why enabling that option stopped spamming and disturbing me. Also as all the people who watch our repository **~1000**.

## Limit to prior contributors

In that case, we could disable interaction with the repository for those of user who never committed to the repository's master branch. That option is unacceptable since we still need to allow our community to report bugs and help us with their pull requests.

## Limit to repository collaborators

*Limit to repository collaborators* option just disables interaction with the repository for users who are not collaborators in that repository (push access wasn't granted for them). That option is unacceptable for the open source project too, because we need to allow our community to interact with the repository.

## What should I do as a result?

Apparently, the best solution to cool-down spambots is to enable *Limit to existing users* option, which will disable interaction with the repository for recently registered users.

But all these options can be enabled only for 24 hours. And it's a point, we can't disable interaction for recently registered users forever. That's why we'll have to enable it manually each time somebody decides to create a few advertising issues in our repositories.

Ok, we've disabled interaction with the repository for those spambots, but we still have **3000+** rubbish issues in the repository. How to deal with them? We have the following options here:

- Close all that **3000+** issues
- Delete all that **3000+** issues

## Close them all

Closing issues is unacceptable in that case owing to we'll trigger the same amount of emails for all repository's watchers again 😳 - awful.

## Delete them all

Deleting the issue is not triggering any email notifications, so, it could be done silengthly. But here we have a problem: issues can be deleted one by one only through the GitHub web client, we can't do bulk remove for all marked issues. And even more, GitHub REST API doesn't provide an appropriate endpoint for issues removal.

That's why it seems that the only way here, for now, is to ask a GitHub support for help and then, they will remove all the inappropriate​ issues.

# Conclusion

First of all, thank for reading this. Maybe, I was a little bit too emotional but I don't think it's should be like that. I don't really understand the people who do that. Instead of working on improvements to our free and open source tools we have to waste time dealing with these spam issues.

Hopefully, our experience will help you with your issues.
