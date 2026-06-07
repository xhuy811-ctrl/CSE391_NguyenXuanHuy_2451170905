# User Directory (CRUD)

Frontend app using JSONPlaceholder API to demonstrate CRUD operations for users.

How to use:
- Open `index.html` in a browser.
- The app loads users from `https://jsonplaceholder.typicode.com/users`.
- Use `Thêm user` to open the form, fill and save — changes are reflected in the UI (JSONPlaceholder will accept POST/PUT/DELETE but not persist).
- Click `Edit` to prefill and update a user.
- Click `Delete` to remove (with confirm).
- Use the search box to filter by name or email (client-side).

Notes:
- API layer is in `api.js` (functions: `getUsers`, `getUser`, `createUser`, `updateUser`, `deleteUser`).
- UI layer is in `app.js` with `ui` object and handlers.
- Includes skeleton loader and toast messages for errors/success.
