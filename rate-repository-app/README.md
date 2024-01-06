To open the app

`npm start` or `npx expo start`

in the terminal, do `shift + i` - select desired iphone model

instead of `npm start` or `npx expo start`, can do `npm run ios` which bundles direct for ios

To get debugging working

in a separate terminal, `npx react-devtools`

check react-devtools are connected in electron app

`command + d` in the simulator - open the developer menu - do a reload, once app has been reloaded, automatic reloads should work without needing to do manual reloads

the app can be quite temperamental at compile time, if happening, try this:

1. `npm start`
2. `shift + i` - select iphone model
3. run on ios in terminal
4. hopefully compiles

## Testing

To run a certain test file in the **tests** folder, use e.g. `npm test -- form.test.js`
