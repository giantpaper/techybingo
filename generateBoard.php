
<?php //#!/usr/bin/php

date_default_timezone_set('America/Los_Angeles');

class Generate {
	protected $great_list = [];
	protected $ready_list_file = './public/ready/weeklyLists.json';
	protected $great_list_file = './public/squares.txt';
	protected $ready_list = [];
	protected $previous_sunday = '';
	protected $current_sunday = '';
	protected $upcoming_sunday = '';
	protected $workflow = [
		'file' => './workflow_logs.txt',
		'heading' => '%s - RAN WORKFLOW',
		'contents' => [],
	];
	public function __construct() {
		$this->great_list = array_map('trim', file($this->great_list_file));
		$this->previous_sunday = date('Y-m-d', strtotime('2 weeks ago Sunday'));
		$this->current_sunday = date('Y-m-d', strtotime('last Sunday'));
		$this->upcoming_sunday = date('Y-m-d', strtotime('next Sunday'));
	}
	public function run() {

		// Does the previous week have a list?
		if (array_key_exists($this->previous_sunday, $this->ready_list)) {
			$this->remove($this->previous_sunday);
			$this->workflow['contents'][] = sprintf('[-] %s - Removed', $this->previous_sunday);
		}
		else {
			$this->workflow['contents'][] = sprintf('[/] %s - Non-existent so did not remove', $this->previous_sunday);
		}
		// Does this week have a list?
		if (!array_key_exists($this->current_sunday, $this->ready_list)) {
			$this->add($this->current_sunday);
			$this->workflow['contents'][] = sprintf('[+] %s - Added', $this->current_sunday);
		}
		else {
			$this->workflow['contents'][] = sprintf('[/] %s - Already exists', $this->current_sunday);
		}
		// Is it some other day than Saturday or Sunday?
		if (date('D') != 'Sat' && date('D') != 'Sun') {
			$this->add($this->upcoming_sunday);
		}
		else {
			$this->workflow['contents'][] = sprintf('[/] %s - Today is %s so did not add', $this->upcoming_sunday, date('D'));
		}

		$output = $this->save_to_file($this->ready_list);

		if ($output != false) {
			$this->workflow['contents'][] = sprintf('- %sB written to file', $output);
		}
		else {
			$this->workflow['contents'][] = '- Did Not Write To File';
		}

		$this->log($this->workflow['contents']);
	}
	private function add($key) {
		$ready_list = $this->great_list;
		shuffle($ready_list);
		$this->ready_list[$key] = array_slice($ready_list, 0, 24);
	}
	private function remove($key) {
		unset($this->ready_list[$key]);
	}
	private function save_to_file($content) {
		return file_put_contents($this->ready_list_file, json_encode($content));
	}
	private function log($content) {
		$first = array_unshift($content, sprintf($this->workflow['heading'], date('r')));
		echo implode("\n", $content);
		file_put_contents($this->workflow['file'], implode("\n", $content));
	}
}

$generate = new Generate();
$generate->run();

die();
////////////////////////////////////////

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
// Next Sundays
// Do next week's list if it's not Sunday or Saturday
if ( date('D') != 'Sun' && date('D') != 'Sat' ) {
	$new_wf_content[] = add_board(date('Y-m-d', strtotime('next Sunday')), $list);
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
