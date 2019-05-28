<?php
defined('BASEPATH') OR exit('No direct script access allowed');


$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

/**  
 * Users  
 */
$route['user']['POST']                       = 'User/create';
$route['login']['POST']                      = 'User/login';
$route['user']['GET']                        = 'User/get';
$route['logout']['GET']                      = 'User/logout';
$route['user/(:num)']['DELETE']              = 'User/delete/$1';