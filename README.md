# Techybingo / Bingoscouts

## File hierarchy
App.vue -> ./src/components/Board.vue -> ./WinCond.vue

```
./public
	squares.txt - The labels for each square. One label per line
./src
	generateBoard.php - creates a new randomized list for the next week, so everyone has the same squares
	./assets
		bingo.js - Where the bingo'ing happens (generate the board, check for wins, etc)
		bingodate.js - Where all date-related code lives
		default.js - Has all the squares and their default settings, and also preps them for the board (adds the free space, randomizes them, grabs the first 25 items)
		functions.js - Misc functions
		progress.js - Updates the browser's localStorage with the user's progress (ex. checked squares, bingo status)
	./components
		Board.vue - The gameboard itself
		Info.vue - The "info" slideout drawer
		WinCond.vue - Brings up the "win condition" images
```

## Adding new squares

Add them to ./public/squares.txt (one per line). Commit and push to main as usual. They'll be available for use the next week.

### Best Practices

To avoid duplication:

- Keep everything alphabetized
- Maintain consistent phrasing.
	- Ex. `Said or heard "Good morning" to everyone` instead of `You/Someone else says "Good morning" to everyone`
