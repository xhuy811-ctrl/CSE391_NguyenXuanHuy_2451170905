# Weather App

Simple frontend app that searches current weather by city using wttr.in JSON API.

How to use:
- Open `index.html` in a browser.
- Enter a city name (e.g., `Hanoi`) and click `Tìm` or press Enter.
- Loading, success, and error states are shown.
- Last 5 searches are saved in LocalStorage; click a history item to search again.

Notes:
- Uses `https://wttr.in/<City>?format=j1`.
- No build step required.
