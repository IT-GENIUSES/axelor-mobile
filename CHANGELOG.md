---
title: 7.2.0
tags: Changelog
---

## [7.2.4] (2024-01-09)

This version features a new apk management system, with build types that differentiate between apks available on Github and applications published on the store.

### @axelor/aos-mobile-hr

#### Features

- Expense : improve expense line types display on details view

### @axelor/aos-mobile-helpdesk

#### Fixes

- DurationFormInput : fix NPE on null value
- Separate store attributes on ticket list screen to avoid refresh issue

### @axelor/aos-mobile-crm

#### Fixes

- Prevent dispatch on undefined values

### @axelor/aos-mobile-manufacturing

#### Fixes

- Consumed products: refresh issue on tracking numebr update
- Manufacturing orders : check manageWorkshop config before filtering on user default stock location

### @axelor/aos-mobile-stock

#### Features

- StockCorrection : improve buttons display

#### Removed

- Remove unused component CarrierCard

### @axelor/aos-mobile-ui

#### Fixes

- AutoCompleteSearch : make input readonly when an item is selected
- ScrollList : avoid page reset when more is loading

#### Features

- ToggleSwitch : improve style to match uses

### @axelor/aos-mobile-core

#### Fixes

- Permissions : block access to the application if user cannot be fetched

## [7.2.3] (2023-12-15)

### @axelor/aos-mobile-hr

#### Features

- ExpenseLine : add new header action to toggle selection mode
- Expense: add possibility to delete a line from a draft expense
- Expense: add possibility to create a new line from a draft expense

#### Fixes

- KilometricAllowParamSearchBar : refresh issue
- Expense : reverse order of list view

### @axelor/aos-mobile-manufacturing

#### Fixes

- improve display of ManufacturingOrderCard and OperationOrderCard

### @axelor/aos-mobile-stock

#### Fixes

- Inventory : refresh issue on api error
- Inventory : update list after inventory update
- Inventory : update line list after line update
- StockCorrection : error message when going on menu entry with incorrect status value.

### @axelor/aos-mobile-ui

#### Features

- add new component ToggleButton

#### Fixes

- Storybook : improve components stories with icon display
- Outside click : concurrency issue
- ScrollList : reset page number when list is loading
- SelectionContainer : display issue when label is null

### @axelor/aos-mobile-core

#### Features

- Header actions: add customComponent prop
- Form : manage js formula of studio fields

#### Fixes

- Session : invalid url error appears when typing
- Session : hide close pop-up icon when user is logining

## [7.2.2] (2023-12-01)

### @axelor/aos-mobile-hr

#### Features

- ExpenseLine :
  - improve sorting on list view (by descending dates)
  - add cities and distance on kilometric cards
  -
- Expense :
  - hide mode toggle when user is not a manager
  - add label for groundForRefusal on details view
  - add icon on send button on details view

#### Fixes

- KilometricAllowParamSearchBar : refresh issue
- Add missing exports
- Refresh issue on expense line list after update
- DistanceInput : refresh issue

### @axelor/aos-mobile-helpdesk

#### Fixes

- Select by default hight priorities tickets

### @axelor/aos-mobile-manufacturing

#### Fixes

- PlanningView : NPE when clicking on OperationOrderCard

### @axelor/aos-mobile-ui

This version adds new unit test for ui components.

#### Features

- Add new component DoubleIcon
- Utils : add string helper to capitalize first letter

#### Fixes

- Storybook : manage FontAwesome icons
- AutoCompleteSearch : SelectionContainer display issue
- ObjectCard : manage hideIf props even with customComponent

### @axelor/aos-mobile-core

#### Fixes

- Session : invalid url error stay on all pop-up even on saved sessions
- Calendar : today date color display

## [7.2.1] (2023-11-17)

### @axelor/aos-mobile-stock

#### Changes

- Adapt screens to low resolution to match Zebra devices

#### Fixes

- ProductStockLocationCard : remove arrow as card is not clickable

### @axelor/aos-mobile-core

#### Fixes

- Set version of react-native-date-picker to 4.2.14 to fix iOS build
- FormView : manage zIndex issue on iOS and manage flexDirection in collapsible panel

#### Changes

- FormView : rename isCollaspible prop in Panel to isCollapsible

### @axelor/aos-mobile-ui

This version adds new unit test for ui components.

#### Fixes

- Increment : fix type error

## [7.2.0] (2023-11-10)

This version adds the management of the technical documentation. All the documentation is available in the docs folcer at the project root and will be updated with each technical change. The documentation can be found [here](https://docs.axelor.com/) for more details.

### New package : @axelor/aos-mobile-hr

This package is compatible with AOS Human ressources module from version 7.2.0
It enables user to manage Expenses through the mobile application. You can create general expense with a justification or kilometric expense and then links a number of expenses to a existing or new expense report. You can also send, validate or refuse expense reports.

### @axelor/aos-mobile-helpdesk

#### Features

- Add pull to refresh management on all screens

#### Changes

- Simplify card with ObjectCard component
- Simplify form view with generator
- UserSearchBar has been moved to core package

### @axelor/aos-mobile-crm

#### Features

- Display partner fields on PlanningEventCard
- Add header action to save person on user's phone on all details views
- Add pull to refresh management on all screens
- Contact : Add linked clients/prospects on details view
- Prospect/Client : display last opportunity
- Add links to Google and LinkedIn on details views
- Add management of creation and edition of events

#### Changes

- Simplify card with ObjectCard component
- Simplify form views with generator

### @axelor/aos-mobile-manufacturing

#### Features

- Apply digit management with useDigitFormat
- Add dates on MO cards and details view
- Add pull to refresh management on all screens
- Add planned durations on operation order details

#### Changes

- Simplify card with ObjectCard component

### @axelor/aos-mobile-stock

#### Features

- StockCorrection : add comment field
- Apply digit management with useDigitFormat

#### Changes

- Simplify card with ObjectCard component

### @axelor/aos-mobile-core

#### Features

- Add form generator system
- Add management of custom fields created with AOS Studio with the FormView
- Add pull to refresh on user screen
- Add fields parser middleware to avoid dotted fields
- Improvement object fields management to avoid dotted fields
- Add AnomalyBubble and AnomalyList components for check management
- Add useIsFocused hook
- Add UserSearchBar component

### @axelor/aos-mobile-ui

#### Features

- Button : improve design and add icon management
- Add new component Alert
- CircleButton : improve design and add management of square buttons

#### Changes

- Remove IconButton component which should be replaced by Button component.
- Remove Pop-up components which should be replaced by Alert component.

[7.2.4]: https://github.com/axelor/axelor-mobile/compare/7.2.3...7.2.4
[7.2.3]: https://github.com/axelor/axelor-mobile/compare/7.2.2...7.2.3
[7.2.2]: https://github.com/axelor/axelor-mobile/compare/7.2.1...7.2.2
[7.2.1]: https://github.com/axelor/axelor-mobile/compare/7.2.0...7.2.1
[7.2.0]: https://github.com/axelor/axelor-mobile/compare/7.1.2...7.2.0
