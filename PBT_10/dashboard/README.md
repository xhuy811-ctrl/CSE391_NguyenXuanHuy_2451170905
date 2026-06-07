# Multi-API Dashboard

This dashboard demonstrates combining multiple public APIs in parallel and rendering each result in its own widget.

APIs used:
- `https://jsonplaceholder.typicode.com/users` (Users)
- `https://randomuser.me/api/?results=5` (Random users)
- `https://dog.ceo/api/breeds/image/random/6` (Dog images)
- `https://restcountries.com/v3.1/name/vietnam` (Country info)

Key features:
- Calls multiple APIs in parallel using `Promise.allSettled()` so one failing API doesn't break others.
- Shows an overall loading indicator while fetching all.
- Each widget has its own loading and error/success state.
- `Refresh All` button to reload all widgets.
- Shows `Data loaded in X ms` after all calls settle.

Open `index.html` in a browser to try.
