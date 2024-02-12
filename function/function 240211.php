<?php
/**
 * Neve functions.php file
 *
 * Author:          Andrei Baicus <andrei@themeisle.com>
 * Created on:      17/08/2018
 *
 * @package Neve
 */

define( 'NEVE_VERSION', '3.6.4' );
define( 'NEVE_INC_DIR', trailingslashit( get_template_directory() ) . 'inc/' );
define( 'NEVE_ASSETS_URL', trailingslashit( get_template_directory_uri() ) . 'assets/' );
define( 'NEVE_MAIN_DIR', get_template_directory() . '/' );
define( 'NEVE_BASENAME', basename( NEVE_MAIN_DIR ) );
define( 'NEVE_PLUGINS_DIR', plugin_dir_path( dirname( __DIR__ ) ) . 'plugins/' );
global $wpdb;

if ( ! defined( 'NEVE_DEBUG' ) ) {
	define( 'NEVE_DEBUG', false );
}
define( 'NEVE_NEW_DYNAMIC_STYLE', true );
/**
 * Buffer which holds errors during theme inititalization.
 *
 * @var WP_Error $_neve_bootstrap_errors
 */
global $_neve_bootstrap_errors;

$_neve_bootstrap_errors = new WP_Error();

if ( version_compare( PHP_VERSION, '7.0' ) < 0 ) {
	$_neve_bootstrap_errors->add(
		'minimum_php_version',
		sprintf(
		/* translators: %s message to upgrade PHP to the latest version */
			__( "Hey, we've noticed that you're running an outdated version of PHP which is no longer supported. Make sure your site is fast and secure, by %1\$s. Neve's minimal requirement is PHP%2\$s.", 'neve' ),
			sprintf(
			/* translators: %s message to upgrade PHP to the latest version */
				'<a href="https://wordpress.org/support/upgrade-php/">%s</a>',
				__( 'upgrading PHP to the latest version', 'neve' )
			),
			'7.0'
		)
	);
}
/**
 * A list of files to check for existance before bootstraping.
 *
 * @var array Files to check for existance.
 */

$_files_to_check = defined( 'NEVE_IGNORE_SOURCE_CHECK' ) ? [] : [
	NEVE_MAIN_DIR . 'vendor/autoload.php',
	NEVE_MAIN_DIR . 'style-main-new.css',
	NEVE_MAIN_DIR . 'assets/js/build/modern/frontend.js',
	NEVE_MAIN_DIR . 'assets/apps/dashboard/build/dashboard.js',
	NEVE_MAIN_DIR . 'assets/apps/customizer-controls/build/controls.js',
];
foreach ( $_files_to_check as $_file_to_check ) {
	if ( ! is_file( $_file_to_check ) ) {
		$_neve_bootstrap_errors->add(
			'build_missing',
			sprintf(
			/* translators: %s: commands to run the theme */
				__( 'You appear to be running the Neve theme from source code. Please finish installation by running %s.', 'neve' ), // phpcs:ignore WordPress.Security.EscapeOutput
				'<code>composer install --no-dev &amp;&amp; yarn install --frozen-lockfile &amp;&amp; yarn run build</code>'
			)
		);
		break;
	}
}
/**
 * Adds notice bootstraping errors.
 *
 * @internal
 * @global WP_Error $_neve_bootstrap_errors
 */
function _neve_bootstrap_errors() {
	global $_neve_bootstrap_errors;
	printf( '<div class="notice notice-error"><p>%1$s</p></div>', $_neve_bootstrap_errors->get_error_message() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

if ( $_neve_bootstrap_errors->has_errors() ) {
	/**
	 * Add notice for PHP upgrade.
	 */
	add_filter( 'template_include', '__return_null', 99 );
	switch_theme( WP_DEFAULT_THEME );
	unset( $_GET['activated'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	add_action( 'admin_notices', '_neve_bootstrap_errors' );

	return;
}

/**
 * Themeisle SDK filter.
 *
 * @param array $products products array.
 *
 * @return array
 */
function neve_filter_sdk( $products ) {
	$products[] = get_template_directory() . '/style.css';

	return $products;
}

add_filter( 'themeisle_sdk_products', 'neve_filter_sdk' );
add_filter(
	'themeisle_sdk_compatibilities/' . NEVE_BASENAME,
	function ( $compatibilities ) {

		$compatibilities['NevePro'] = [
			'basefile'  => defined( 'NEVE_PRO_BASEFILE' ) ? NEVE_PRO_BASEFILE : '',
			'required'  => '2.3',
			'tested_up' => '2.6',
		];

		return $compatibilities;
	}
);
require_once 'globals/migrations.php';
require_once 'globals/utilities.php';
require_once 'globals/hooks.php';
require_once 'globals/sanitize-functions.php';
require_once 'globals/midtrans-php-master/Midtrans.php';
require_once get_template_directory() . '/start.php';

// Set your Merchant Server Key
\Midtrans\Config::$serverKey = 'SB-Mid-server-1ONdyFAZJHUrjvhtzYMRWGfI';

/**
 * If the new widget editor is available,
 * we re-assign the widgets to hfg_footer
 */
if ( neve_is_new_widget_editor() ) {
	/**
	 * Re-assign the widgets to hfg_footer
	 *
	 * @param array  $section_args The section arguments.
	 * @param string $section_id The section ID.
	 * @param string $sidebar_id The sidebar ID.
	 *
	 * @return mixed
	 */
	function neve_customizer_custom_widget_areas( $section_args, $section_id, $sidebar_id ) {
		if ( strpos( $section_id, 'widgets-footer' ) ) {
			$section_args['panel'] = 'hfg_footer';
		}

		return $section_args;
	}

	add_filter( 'customizer_widgets_section_args', 'neve_customizer_custom_widget_areas', 10, 3 );
}

require_once get_template_directory() . '/header-footer-grid/loader.php';

add_filter(
	'neve_welcome_metadata',
	function() {
		return [
			'is_enabled' => ! defined( 'NEVE_PRO_VERSION' ),
			'pro_name'   => 'Neve Pro Addon',
			'logo'       => get_template_directory_uri() . '/assets/img/dashboard/logo.svg',
			'cta_link'   => tsdk_utmify( 'https://themeisle.com/themes/neve/upgrade/?discount=LOYALUSER582&dvalue=50', 'neve-welcome', 'notice' ),
		];
	}
);

// Custom Using WordPress REST API
add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'login', array( 
        'methods' => 'POST', 'callback' => 'login' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'getUsers', array( 
        'methods' => 'GET', 'callback' => 'getUsers' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'getContents', array( 
        'methods' => 'GET', 'callback' => 'getContents' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'getContentsbyId', array( 
        'methods' => 'POST', 'callback' => 'getContentsbyId' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'getContentsbyName', array( 
        'methods' => 'POST', 'callback' => 'getContentsbyName' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'getContentbyData', array( 
        'methods' => 'POST', 'callback' => 'getContentbyData' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'searchContentsbyData', array( 
        'methods' => 'POST', 'callback' => 'searchContentsbyData' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'createContent', array( 
        'methods' => 'POST', 'callback' => 'createContent' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'updateContent', array( 
        'methods' => 'POST', 'callback' => 'updateContent' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'getFireUserSummary', array( 
        'methods' => 'GET', 'callback' => 'getFireUserSummary' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'getFireUsers', array( 
        'methods' => 'POST', 'callback' => 'getFireUsers' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'getFireUsersLimit', array( 
        'methods' => 'POST', 'callback' => 'getFireUsersLimit' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'searchFireUsersLimit', array( 
        'methods' => 'POST', 'callback' => 'searchFireUsersLimit' ));});
            
add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'getFireUsersbyId', array( 
        'methods' => 'POST', 'callback' => 'getFireUsersbyId' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'getFireUsersbyEmail', array( 
        'methods' => 'POST', 'callback' => 'getFireUsersbyEmail' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'getFireUsersLogin', array( 
        'methods' => 'POST', 'callback' => 'getFireUsersLogin' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'createFireUser', array( 
        'methods' => 'POST', 'callback' => 'createFireUser' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'updateFireUser', array( 
        'methods' => 'POST', 'callback' => 'updateFireUser' ));});

add_action( 'rest_api_init', function() {
    register_rest_route( 'api', 'charge', array( 
        'methods' => 'POST', 'callback' => 'charge' ));});

add_action( 'rest_api_init', function () {
    register_rest_route( 'api', 'feedback/(?P<id>[a-z,0-9,!_-]*)', array( 
        'methods' => 'GET', 'callback' => 'feedback' ));});
        
add_action( 'rest_api_init', function () {
    register_rest_route( 'api', 'getTransactionStatus', array( 
        'methods' => 'POST', 'callback' => 'getTransactionStatus' ));});

add_action( 'rest_api_init', function() { 
    register_rest_route( 'api', 'updateTransaction', array( 
        'methods' => 'POST', 'callback' => 'updateTransaction' ));});

// function updateTransaction(WP_REST_Request $request){
//     $arr_request = json_decode( $request->get_body() );

// 	$data_db = array(
// 	    'order_id' => $arr_request->order_id,
// 	    'fire_user_id' => $arr_request->metadata->fire_user_id,
// 	    'gross_amount' => $arr_request->gross_amount,
// 	    'payment_type' => $arr_request->payment_type,
// 	    'transaction_time' => $arr_request->transaction_time,
// 	    'transaction_status' => $arr_request->transaction_status,
// 	    'expiry_time' => $arr_request->expiry_time
// 	    );

// 	$where = array(
// 	    'transaction_id' => $arr_request->transaction_id,
// 	    );

//     global $wpdb;
//     $data = $wpdb->update( "wpadc1hh_transactions", $data_db, $where );

//     if ($data)  return [ 'status' => 'success', 'data' => $data];
//     else return [ 'status' => 'failed', 'data' => $data];
// };

function login( WP_REST_Request $request ){
    $arr_request = json_decode( $request->get_body() );
    if ( ! empty($arr_request->email) && ! empty($arr_request->password) ) {
        // this  returns  the user ID and other info from the email.
        $user = get_user_by( 'email', $arr_request-> email );
        
        if ( ! $user ) {
            return [
                'status' => 'error',
                'message' => 'Wrong email address.',
                ];
        }
        
        // check the user's login with their password
        if ( ! wp_check_password( $arr_request->password, $user->user_pass, $user->ID ) ) {
            // if the password is incorrect for the specified user.
            return [
                'status' => 'error',
                'message' => 'Wrong password.',
            ];
        }
        
        return [
            'status' => 'success',
            'message' => 'User credential are correct.',
        ];
    } else {
        return [
            'status' => 'error',
            'message' => 'Email and password are required.',
        ];
    }
};

function charge(WP_REST_Request $request){
    // // $a = 'abcs';
    // // return 'https://medsmanual.com/wp-json/api/feedback/'.$a;
    
    // $arr_request = json_decode( $request->get_body() );
    // $item_details = [];
    
    // foreach ($arr_request->item_details as $key => $items){
    //     $item_details[$key]['id'] = $items->id;
    //     $item_details[$key]['price'] = $items->price;
    //     $item_details[$key]['quantity'] = $items->quantity;
    //     $item_details[$key]['name'] = $items->name;
    // }
    
    // $params = array(
    //     'payment_type' => $arr_request->payment_type,
    //     'transaction_details' => array(
    //         'order_id' => $arr_request->transaction_details->order_id,
    //         'gross_amount' => $arr_request->transaction_details->gross_amount
    //     ),
    //     'item_details' => $item_details,
    //     'customer_details' => array(
    //         'first_name' => $arr_request->customer_details->first_name,
    //         'last_name' => $arr_request->customer_details->last_name,
    //         'email' => $arr_request->customer_details->email,
    //         'phone' => $arr_request->customer_details->phone
    //     ),
    //     'gopay' => array(
    //         'enable_callback' => true,                // optional
    //         'callback_url' => 'https://medsmanual.com/wp-json/api/feedback/'   // optional
    //     )
    // );
    // // return $params;

    // try {
    //     $response = \Midtrans\CoreApi::charge($params);
        
    //     // nanti dipindah saat notif settlement, saat ini masih status pending
    //     // create transactions
    // 	$transaction_data = array(
    // 	    'transaction_id' => $response->transaction_id,
    // 	    'order_id' => $response->order_id,
    // 	    'fire_user_id' => $arr_request->metadata->fire_user_id,
    // 	    'gross_amount' => $response->gross_amount,
    // 	    'payment_type' => $response->payment_type,
    // 	    'transaction_time' => $response->transaction_time,
    // 	    'transaction_status' => $response->transaction_status,
    // 	    'expiry_time' => $response->expiry_time
    // 	    );
    	
    // 	$datenowopsi = date( 'Y-m-d H:i:s', current_time('timestamp', 0));
    // 	$date = (new DateTime('now', wp_timezone()))->modify('+3 month');
    //     // $date->modify('+3 month');
    //     // return $date->format('Y-m-d H:i:s');
    //     // create subscriptions
    // 	$subscription_data = array(
    // 	    'transaction_id' => $response->transaction_id,
    // 	    'order_id' => $response->order_id,
    // 	    'fire_user_id' => $arr_request->metadata->fire_user_id,
    // 	    'valid_start' => wp_date('Y-m-d H:i:s'),
    // 	    'valid_until' => $date->format('Y-m-d H:i:s')
    // 	    );
    
    //     global $wpdb;
    //     $trans = $wpdb->insert( "wpadc1hh_transactions", $transaction_data);
    //     $subs = $wpdb->insert( "wpadc1hh_subscriptions", $subscription_data);
        
    //     // if ($data)  return [ 'status' => 'success', 'data' => $data];
    //     // else return [ 'status' => 'failed', 'data' => $data];

    //     return $response;
    // }
    // catch(Exception $e) {
    //     return array(
    //         'status_code' => '500');
    // }
};

function feedback( $data ) {
    return $data['id'];
    $posts = get_posts( array(
        'author' => $data['id'],
        ));
    
    if ( empty( $posts ) ) {
        return new WP_Error( 'no_author', 'Invalid author', array( 'status' => 404 ) );
    }
    
    return $posts[0]->post_title;
}

function getTransactionStatus(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );
    
    try{
        $status = \Midtrans\Transaction::status($arr_request->transaction_id);
        return $status;
    }
    catch(Exception $e) {
        return array(
            'status_code' => '500');
    }
};

function getUsers(){
    global $wpdb;
    $data = $wpdb->get_results( "SELECT * FROM $wpdb->users ORDER BY ID" );
    
    if (count($data) > 0)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => []];
};

function getContents(){
    global $wpdb;
    $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_contents ORDER BY content_id" );

    if (count($data) > 0)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => []];
};

function getContentsbyId(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );
    if (! $arr_request->content_id) return [ 'status' => 'failed', 'message' => 'BUG: miss param content_id'];
    
    global $wpdb;
    $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_contents where content_id = $arr_request->content_id" );

    if (count($data) > 0)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => []];
};

function getContentsbyName(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );
    if (! $arr_request->parent_name) return [ 'status' => 'failed', 'message' => 'BUG: miss param parent_name'];
    
    global $wpdb;
    $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_contents where parent_name = '$arr_request->parent_name'" );
    
    if (count($data) > 0)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => []];
};

function getContentbyData(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );
    if (! $arr_request->data) return [ 'status' => 'failed', 'message' => 'BUG: miss param data'];
    
    global $wpdb;
    $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_contents where data = '$arr_request->data'" );
    
    if (count($data) > 0)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => []];
};

function searchContentsbyData(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );
    if (! $arr_request->data) return [ 'status' => 'failed', 'message' => 'BUG: miss param data'];
    
    global $wpdb;
    $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_contents where data like '%$arr_request->data%'" );
    
    if (count($data) > 0)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => []];
};

function createContent(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );

	$data_db = array(
	    'parent_name' => $arr_request->parent_name,
	    'urut' => $arr_request->urut,
	    'type' => $arr_request->type,
	    'data' => $arr_request->data,
	    'title' => $arr_request->title,
	    'title_alias' => $arr_request->title_alias,
	    'image' => $arr_request->image,
	    );

    global $wpdb;
    $data = $wpdb->insert( "wpadc1hh_contents", $data_db);
    
    if ($data)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => $data];
};

function updateContent(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );

	$data_db = array(
	    'parent_name' => $arr_request->parent_name,
	    'urut' => $arr_request->urut,
	    'type' => $arr_request->type,
	    'data' => $arr_request->data,
	    'title' => $arr_request->title,
	    'title_alias' => $arr_request->title_alias,
	    'image' => $arr_request->image,
	    );

	$where = array(
	    'content_id' => $arr_request->content_id,
	    );

    global $wpdb;
    $data = $wpdb->update( "wpadc1hh_contents", $data_db, $where );

    if ($data)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => $data];
};

function getFireUserSummary(){
    global $wpdb;
    $data = $wpdb->get_results( "SELECT COUNT(fire_user_id) AS total FROM wpadc1hh_fire_users" );

    if ($data)  return [ 'status' => 'success', 'data' => $data, 'count' => $data];
    else return [ 'status' => 'failed', 'data' => 0];
};

function getFireUsers(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );
    global $wpdb;
    if ($arr_request->status) $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_fire_users WHERE status = '$arr_request->status' ORDER BY fire_user_id" );
    else $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_fire_users ORDER BY fire_user_id" );

    if (count($data) > 0)  return [ 'status' => 'success', 'data' => $data, 'count' => count($data)];
    else return [ 'status' => 'failed', 'data' => []];
};

function getFireUsersLimit(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );
    if (! $arr_request->limit) return [ 'status' => 'failed', 'message' => 'BUG: miss param limit'];
    if (! $arr_request->page) return [ 'status' => 'failed', 'message' => 'BUG: miss param page'];
    $offset = ($arr_request->page - 1) * $arr_request->limit;
    
    global $wpdb;
    if ($arr_request->status) $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_fire_users WHERE status = '$arr_request->status' LIMIT $arr_request->limit OFFSET $offset" );
    else $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_fire_users LIMIT $arr_request->limit OFFSET $offset" );

    if (count($data) > 0)  return [ 'status' => 'success', 'data' => $data, 'count' => count($data)];
    else return [ 'status' => 'failed', 'data' => []];
};

function searchFireUsersLimit(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );
    if (! $arr_request->data) return [ 'status' => 'failed', 'message' => 'BUG: miss param data'];
    if (! $arr_request->limit) return [ 'status' => 'failed', 'message' => 'BUG: miss param limit'];
    if (! $arr_request->page) return [ 'status' => 'failed', 'message' => 'BUG: miss param page'];
    $offset = ($arr_request->page - 1) * $arr_request->limit;
    
    global $wpdb;
    if ($arr_request->status) $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_fire_users WHERE status = '$arr_request->status' AND (nama like '%$arr_request->data%' OR email like '%$arr_request->data%') LIMIT $arr_request->limit OFFSET $offset" );
    else $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_fire_users WHERE nama like '%$arr_request->data%' OR email like '%$arr_request->data%' LIMIT $arr_request->limit OFFSET $offset" );
    
    if (count($data) > 0)  return [ 'status' => 'success', 'data' => $data, 'count' => count($data)];
    else return [ 'status' => 'failed', 'data' => []];
};

function getFireUsersbyId(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );
    if (! $arr_request->fire_user_id) return [ 'status' => 'failed', 'message' => 'BUG: miss param fire_user_id'];
    
    global $wpdb;
    $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_fire_users where fire_user_id = $arr_request->fire_user_id" );
    
    if (count($data) > 0)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => []];
};

function getFireUsersbyEmail(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );

    if (! $arr_request->email) return [ 'status' => 'failed', 'message' => 'BUG: miss param email'];
    
    global $wpdb;
    $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_fire_users where email = '$arr_request->email'" );
    
    if (count($data) > 0)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => []];
};

function getFireUsersLogin(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );

    if (! $arr_request->email) return [ 'status' => 'failed', 'message' => 'BUG: miss param email'];
    
    global $wpdb;
    $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_fire_users where email = '$arr_request->email'" );
    
    if (count($data) > 0) {
    	$data_db = array(
    	    'email' => $data[0]->email,
    	    'nama' => $data[0]->nama,
    	    'tglLahir' => $data[0]->tglLahir,
    	    'profesi' => $data[0]->profesi,
    	    'lampiran' => $data[0]->lampiran,
    	    'status' => $data[0]->status,
    	    'photo' => $data[0]->photo,
    	    'isAdmin' => $data[0]->isAdmin,
    	    'isSuperAdmin' => $data[0]->isSuperAdmin,
    	    'lastLogin' => wp_date('Y-m-d H:i:s')
    	    );
    
    	$where = array(
    	    'fire_user_id' => $data[0]->fire_user_id,
    	    );
    
        $wpdb->update( "wpadc1hh_fire_users", $data_db, $where );
        
        $data[0]->lastLogin = wp_date('Y-m-d H:i:s');
        return [ 'status' => 'success', 'data' => $data];
    }
    else return [ 'status' => 'failed', 'data' => []];
};

function createFireUser(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );

	$data_db = array(
	    'email' => $arr_request->email,
	    'nama' => $arr_request->nama,
	    'tglLahir' => $arr_request->tglLahir,
	    'profesi' => $arr_request->profesi,
	    'lampiran' => $arr_request->lampiran,
	    'photo' => $arr_request->photo,
	    'isAdmin' => $arr_request->isAdmin,
	    'isSuperAdmin' => $arr_request->isSuperAdmin,
	    'dateCreated' => wp_date('Y-m-d H:i:s'),
	    'dateModified' => wp_date('Y-m-d H:i:s'),
	    'lastLogin' => wp_date('Y-m-d H:i:s')
	    );

    global $wpdb;
    $data = $wpdb->insert( "wpadc1hh_fire_users", $data_db);

    if ($data)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => $data];
};

function updateFireUser(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );

	$data_db = array(
	    'email' => $arr_request->email,
	    'nama' => $arr_request->nama,
	    'tglLahir' => $arr_request->tglLahir,
	    'profesi' => $arr_request->profesi,
	    'lampiran' => $arr_request->lampiran,
	    'status' => $arr_request->status,
	    'photo' => $arr_request->photo,
	    'isAdmin' => $arr_request->isAdmin,
	    'isSuperAdmin' => $arr_request->isSuperAdmin,
	    'dateModified' => wp_date('Y-m-d H:i:s')
	    );

	$where = array(
	    'fire_user_id' => $arr_request->fire_user_id,
	    );

    global $wpdb;
    $data = $wpdb->update( "wpadc1hh_fire_users", $data_db, $where );

    if ($data)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => $data];
};

function getTransactions(){
    global $wpdb;
    $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_transactions ORDER BY 	transaction_time" );

    if (count($data) > 0)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => []];
};

function getTransactionbyId(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );
    if (! $arr_request->transaction_id) return [ 'status' => 'failed', 'message' => 'BUG: miss param transaction_id'];
    
    global $wpdb;
    $data = $wpdb->get_results( "SELECT * FROM wpadc1hh_transactions where transaction_id = $arr_request->transaction_id" );

    if (count($data) > 0)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => []];
};

function createTransaction(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );

	$data_db = array(
	    'transaction_id' => $arr_request->transaction_id,
	    'order_id' => $arr_request->order_id,
	    'fire_user_id' => $arr_request->metadata->fire_user_id,
	    'gross_amount' => $arr_request->gross_amount,
	    'payment_type' => $arr_request->payment_type,
	    'transaction_time' => $arr_request->transaction_time,
	    'transaction_status' => $arr_request->transaction_status,
	    'expiry_time' => $arr_request->expiry_time
	    );

    global $wpdb;
    $data = $wpdb->insert( "wpadc1hh_transactions", $data_db);
    
    if ($data)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => $data];
};

function updateTransaction(WP_REST_Request $request){
    $arr_request = json_decode( $request->get_body() );

	$data_db = array(
	    'order_id' => $arr_request->order_id,
	    'fire_user_id' => $arr_request->metadata->fire_user_id,
	    'gross_amount' => $arr_request->gross_amount,
	    'payment_type' => $arr_request->payment_type,
	    'transaction_time' => $arr_request->transaction_time,
	    'transaction_status' => $arr_request->transaction_status,
	    'expiry_time' => $arr_request->expiry_time
	    );

	$where = array(
	    'transaction_id' => $arr_request->transaction_id,
	    );

    global $wpdb;
    $data = $wpdb->update( "wpadc1hh_transactions", $data_db, $where );

    if ($data)  return [ 'status' => 'success', 'data' => $data];
    else return [ 'status' => 'failed', 'data' => $data];
};