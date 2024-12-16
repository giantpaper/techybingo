# Techybingo / Bingoscouts

## File hierarchy
App.vue -> ./src/components/Board.vue -> ./WinCond.vue

```
./public
	squares.txt - The labels for each square. One label per line
./src
	./assets
		bingo.js - Where the bingo'ing happens (generate the board, check for wins, etc)
		bingodate.js - Where all date-related code lives
		canvas.js - Legacy code, generates the "win condition" images under the board
		default.js - Has all the squares and their default settings, and also preps them for the board (adds the free space, randomizes them, grabs the first 25 items)
		functions.js - Misc functions
		progress.js - Updates the browser's localStorage with the user's progress (ex. checked squares, bingo status)
	./components
		Board.vue - The gameboard itself
		Canvas.vue - Used to generate the "win condition" images
		Info.vue - The "info" slideout drawer
		WinCond.vue - Brings up the "win condition" images, uses static images instead of a dynamically generated canvas (cuz of some weird bugs where if the computer went to sleep, the images would grow about 100x their size and become blank)
```

## Adding new squares

1. Add them to ./public/squares.txt
2. Commit and push to main
3. They'll be available for use the next week

### Best Practices

To avoid duplication:

- Keep everything alphabetized
- Maintain consistent phrasing.
	- Ex. `Said or heard "Good morning" to everyone` instead of `You/Someone else says "Good morning" to everyone`
