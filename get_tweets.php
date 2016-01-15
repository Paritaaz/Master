<?php

require_once('twitter_proxy.php');

// Twitter OAuth Config options
$oauth_access_token = '	4762025496-0lZ9U1JlS5mk6K4yuLewQoScWeLfeKjxd0eEGM7';
$oauth_access_token_secret = 'Dr7cSk28LEbo0qj3DVqeCxH3o2aDepcjTELqiIZn2iHWG';
$consumer_key = 'a81IxgGNDWlbpxRsUUTa3RjHB';
$consumer_secret = 'fymc3BFIeLLNIMcnRvVEY1417ckr9s2Kw3ke90KZehzkmPqRA1';
$user_id = 'http://pnnapp.azurewebsites.net/';
$screen_name = 'parallax';
$count = 5;

$twitter_url = 'statuses/user_timeline.json';
$twitter_url .= '?user_id=' . $user_id;
$twitter_url .= '&screen_name=' . $screen_name;
$twitter_url .= '&count=' . $count;

// Create a Twitter Proxy object from our twitter_proxy.php class
$twitter_proxy = new TwitterProxy(
	$oauth_access_token,			// 'Access token' on https://apps.twitter.com
	$oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
	$consumer_key,					// 'API key' on https://apps.twitter.com
	$consumer_secret,				// 'API secret' on https://apps.twitter.com
	$user_id,						// User id (http://gettwitterid.com/)
	$screen_name,					// Twitter handle
	$count							// The number of tweets to pull out
);

// Invoke the get method to retrieve results via a cURL request
$tweets = $twitter_proxy->get($twitter_url);

echo $tweets;

?>