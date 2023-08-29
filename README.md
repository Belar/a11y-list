# a11y-list

An accessible, dynamic list example.

### Intended behaviour:

- On an item deletion, the item is being soft deleted with a refocus and its content being swapped to context info, "Deleted". Navigation decision is left with a user, after the context dummy is abandoned (navigation away) the item is being deleted permanently.
- On a deletion of the last item, permanent deletion is executed, and focus switches to a list-wide context info, "List is empty".

#### Alternative options:

- On an item deletion, focus could be switched to a different item on the list, e.g. previous, next, whichever ["preserves meaning and operability"](https://www.w3.org/TR/WCAG21/#focus-order).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
