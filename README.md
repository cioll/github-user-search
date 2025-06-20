### The subject

1. Query against Github Api: GET https://api.github.com/search/users?q={USER}.
2. Try to not add any dependency library on a freshly created
   [create react app](https://github.com/facebook/create-react-app) (Only testing libraries accepted).
3. Don't forget to check against modern ways to make HTTP requests on frontend side.
4. Manage edge cases:
    - No results
    - Github api rate limit
    - User type in quickly and going back and forth on his search
5. Add a checkbox on each card item
6. Add a checkbox for select all cards with the number of selected items
7. Add two actions depending selected items
    - Duplicate items
    - Delete items

These actions are only front-end and will be reset when the search change

## Note

I use vite because create-react-app is deprecated.

### Start project

``npm run dev``

### Start tests

``npm test``
