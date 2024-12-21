<?php

define('FILE', './public/squares.txt');

$list = array_map('trim', file(FILE));

shuffle($list);
$list = array_slice($list, 0, 24);

$sunday__next = date('Ymd',strtotime('next Sunday'));

// Get last week's squares
$sunday__prev = date('Ymd',strtotime('2 weeks ago Sunday'));

file_put_contents(txt($sunday__next), implode("\n", $list));

if (file_exists(txt($sunday__prev)) !== false) {
	unlink(txt($sunday__prev));
}

function txt($date) {
	$dir = dirname(FILE);

	return $dir. '/ready/' .$date. '.txt';
}
