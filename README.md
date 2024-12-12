# Techybingo / Bingoscouts

**File hierarchy**
App.vue -> ./src/components/Board.vue

```
./src
	./assets
		bingo.js - Where the bingo'ing happens (generate the board, check for wins, etc)
		bingodate.js - Where all date-related code lives
		canvas.js - Generates the "win condition" images under the board
		default.js - Has all the squares and their default settings, and also preps them for the board (adds the free space, randomizes them, grabs the first 25 items)
		functions.js - Misc functions
		progress.js - Updates the browser's localStorage with the user's progress (ex. checked squares, bingo status)
```
