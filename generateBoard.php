#!/usr/bin/php
<?php

date_default_timezone_set('America/Los_Angeles');

define('FILE', './public/squares.txt');

$list = array_map('trim', file(FILE));

$today = strtotime('today');

// Setup logging

$wf_logs = './workflow_logs.txt';

if (file_exists($wf_logs) == false) {
	$wf_content = [];
}
else {
	$wf_content = explode("\n", trim(file_get_contents($wf_logs)));
}

if (count($wf_content) > 9) {
	$first = array_shift($wf_content);
}
$new_wf_content[] = date('r') . ': Ran workflow';
// End setup

// Remove old board
$new_wf_content[] = remove_board(date('Y-m-d',strtotime('3 weeks ago Sunday')), $list);

// Current Sunday
if (date('D') == 'Sun') {
	$new_wf_content[] = add_board(date('Y-m-d'), $list);
}
$new_wf_content[] = add_board(date('Y-m-d',strtotime('last Sunday')), $list);

// NEXT SUNDAY'S
// Do next week's list if it's not Sunday or Saturday
$next_sunday_filename = date('Y-m-d', strtotime('next Sunday'));
if ( (date('D') != 'Sun' && date('D') != 'Sat') || !file_exists($next_sunday_filename)) {
	$new_wf_content[] = add_board($next_sunday_filename, $list);
}
else {
	$new_wf_content[] = 'Today is '.date('D'). ' so did not do '.date('Y-m-d', strtotime('next Sunday')).'\'s list';
}

// Log stuff

$output = implode("\n", array_merge($wf_content, $new_wf_content));
echo implode("\n", $new_wf_content);

file_put_contents($wf_logs, $output);

// End logging stuff

function add_board($week, $list) {
	if (file_exists(txt($week)) === false) {
		$output = file_put_contents(txt($week), randomize($list));
		$return = '[+] Added '.preg_replace("#([0-9]{4})([0-9]{2})([0-9]{2})#", "\\1-\\2-\\3", $week).'\'s list - ' . $output . "B large\n";

		if ($output === false) {
			$return = 'Could not do file_put_contents';
		}
		return $return;
	}
	return $week. ' already exists so did not create new file';
}
function remove_board($week) {
	if (file_exists(txt($week)) !== false) {
		unlink(txt($week));
		$return = '[-] Removed '.preg_replace("#([0-9]{4})([0-9]{2})([0-9]{2})#", "\\1-\\2-\\3", $week).'\'s list' . "\n";
		return $return;
	}
	return $week. ' does not exist so nothing was deleted';
}

function txt($date) {
	return './public/ready/' .$date. '.txt';
}

function randomize($list) {
	shuffle($list);
	return implode("\n", array_slice($list, 0, 24));
}
