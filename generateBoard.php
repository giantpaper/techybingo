<?php

date_default_timezone_set('America/Los_Angeles');

define('FILE', './public/squares.txt');

$list = array_map('trim', file(FILE));

// Remove old board
remove_board(date('Ymd',strtotime('3 weeks ago Sunday')), $list);
// Current Sunday
add_board(date('Ymd',strtotime('last Sunday')), $list);
// Next Sundays
add_board(date('Ymd',strtotime('next Sunday')), $list);

function add_board($week, $list) {
	if (file_exists(txt($week)) === false) {
		file_put_contents(txt($week), randomize($list));
		echo 'Added '.preg_replace("#([0-9]{4})([0-9]{2})([0-9]{2})#", "\\1-\\2-\\3", $week).'\'s list<br>';
		return true;
	}
	return false;
}
function remove_board($week) {
	if (file_exists(txt($week)) !== false) {
		unlink(txt($week));
		echo 'Removed '.preg_replace("#([0-9]{4})([0-9]{2})([0-9]{2})#", "\\1-\\2-\\3", $week).'\'s list<br>';
		return true;
	}
	return false;
}

function txt($date) {
	return './public/ready/' .$date. '.txt';
}

function randomize($list) {
	shuffle($list);
	return implode("\n", array_slice($list, 0, 24));
}
