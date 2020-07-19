---
article: true
unlisted: true
title: Draggable Table with Angular CDK
description: "Learn how to rearrange the data in the table using Angular CDK!"
date: "2020-07-19T14:14:14Z"
author: "Nikita Poltoratsky"
keyword: "angular, rxjs, ngrx, cdk, angular-cdk"
cover: "/assets/blog/draggable-table-with-angular-cdk/cover.jpg"
---

## What are we going to build?

At this article I'm going to show you how to build a table with an ability to rearrange rows in it. 👇

![Draggable table demo](/assets/blog/draggable-table-with-angular-cdk/demo.gif)

## What we need for that?

### Angular CDK

All the functionalities we need for the draggable table are bundled inside the Angular CDK package. Let's install it first of all

```bash
npm install @angular/cdk
```

When the Angular CDK is installed in your project it's a time to understand what exactly we're going to use from the package.

### Angular CDK Table Module

Since we're building a draggable **table**, the first thing we need is **table** 🙄. Angular CDK Table Module allows us building powerfull tables easily. Let's take a look at how to do that.

- First of all, we ought to import the Angular CDK Table into the `AppModule`:

```typescript
import { NgModule } from "@angular/core";
import { CdkTableModule } from "@angular/cdk/table";

@NgModule({
  imports: [CdkTableModule],
})
export class AppModule {}
```

`CdkTableModule` allows us to use basic tables primitive directives: `cdk-table`, `cdkColumnDef`, `cdk-header-cell`, `cdk-cell`, etc. How to use them to build a table, we'll discuss a bit later.

### Create Table

After that, we need to create a table itself. Let's add a plain html table and mark it as the Angular CDK Table using `cdk-table` directive:

```html
<table cdk-table></table>
```

Next, we need to configure table structure. We can do so using directives provided by the `CdkTableModule`. Let's configure each piece one by one:

#### Header row configuration

Header row can be configured using `cdk-header-row`. This directive will let `cdk-table` understand that it's a template for the header row. Then, we're adding a `cdkHeaderRowDef` directive. It receives a list of columns to be shown. We'll configure them later.

```html
<tr
  cdk-header-row
  *cdkHeaderRowDef="['position', 'name', 'weight', 'symbol']"
></tr>
```

#### Table row configuration

Table row can be configured using `cdk-row`. This directive will let `cdk-table` understand that it's a template for the table row. Then, we're adding a `cdkHeaderRowDef` directive. It receives a list of columns to be shown. We'll configure them later.

```html
<tr
  cdk-row
  *cdkRowDef="let row; columns: ['position', 'name', 'weight', 'symbol'];"
></tr>
```

#### Table cells configuration

Now, it's a time to configure table cells:

```html
<ng-container cdkColumnDef="name">
  <th cdk-header-cell *cdkHeaderCellDef>Name</th>
  <td cdk-cell *cdkCellDef="let element">{{element.name}}</td>
</ng-container>
```

The most important part here is `cdkColumnDef`. It says which column it's. As you remember, we just told Angular CDK Table that we'll have following columns in table: `['position', 'name', 'weight', 'symbol']`. Now we're using `cdkColumnDef="name"` to tell the table that're going to configure column that's called _name_. We'll have similar configurations for each column.
Well, now we created the template for cell that're in the _name_ column. But what is the content of that cells?

```html
<th cdk-header-cell *cdkHeaderCellDef>Name</th>
```

This line configures a header cell for the _name_ column. It tells the table that it's a header cell via `cdk-header-cell` directive. And marks it as a cell template with `*cdkHeaderCellDef`.

```html
<td cdk-cell *cdkCellDef="let element">{{element.name}}</td>
```

While this line configures how table row cell will look like. `cdk-cell` marks this element as a table cell. And `*cdkCellDef="let element"` directive marks it as a template and provides the link to the active row `element`.

But where we'll get that elements? Table elements are provided through the `datasource`! Let's understand what is it 🚀.
