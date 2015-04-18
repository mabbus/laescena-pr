<?php

/**
 * @file
 * template.php
 */

function check_user_agent ( $type = NULL ) {
    $user_agent = strtolower ( $_SERVER['HTTP_USER_AGENT'] );
    if ( $type == 'bot' ) {
        // matches popular bots
        if ( preg_match ( "/googlebot|adsbot|yahooseeker|yahoobot|msnbot|watchmouse|pingdom\.com|feedfetcher-google/", $user_agent ) ) {
            return true;
            // watchmouse|pingdom\.com are "uptime services"
        }
    } else if ( $type == 'browser' ) {
        // matches core browser types
        if ( preg_match ( "/mozilla\/|opera\//", $user_agent ) ) {
            return true;
        }
    } else if ( $type == 'mobile' ) {
        // matches popular mobile devices that have small screens and/or touch inputs
        // mobile devices have regional trends; some of these will have varying popularity in Europe, Asia, and America
        // detailed demographics are unknown, and South America, the Pacific Islands, and Africa trends might not be represented, here
        if ( preg_match ( "/phone|iphone|itouch|ipod|symbian|android|htc_|htc-|palmos|blackberry|opera mini|iemobile|windows ce|nokia|fennec|hiptop|kindle|mot |mot-|webos\/|samsung|sonyericsson|^sie-|nintendo/", $user_agent ) ) {
            // these are the most common
            return true;
        } else if ( preg_match ( "/mobile|pda;|avantgo|eudoraweb|minimo|netfront|brew|teleca|lg;|lge |wap;| wap /", $user_agent ) ) {
            // these are less common, and might not be worth checking
            return true;
        }
    }
    return false;
}

function umbrella_js_alter(&$js) {
  $bootstrap_js_path = drupal_get_path('theme', 'bootstrap') . '/js/bootstrap.js';
  unset($js[$bootstrap_js_path]);  

  $isotope_js_path = drupal_get_path('module', 'views_isotope') . '/views_isotope.js';
  if (isset($js[$isotope_js_path])) {    
      unset($js[$isotope_js_path]);
      drupal_add_js(drupal_get_path('theme', 'umbrella') . '/js/views_isotope.js');
  }   
}

function umbrella_menu_tree__primary(&$variables) {
 return '<ul class="nav navbar-nav navbar-right">' . $variables['tree'] . '</ul>';
}
function umbrella_theme() {
  return array(
    'contact_site_form1' => array(
    'render element' => 'form',
    'template' => 'contact-site-form',
    'path' => drupal_get_path('theme', 'umbrella').'/templates/block',
    ),
  );
}

function umbrella_preprocess(&$variables) {
    $variables['userAgent'] = explode(".",$_SERVER["SERVER_NAME"]);
    $variables['isMobile'] = check_user_agent('mobile');
}

function umbrella_preprocess_page(&$variables) {
    if($_GET['q'] == 'homepage_two'){
        if(isset($variables['primary_nav']['324'])){
            unset($variables['primary_nav']['324']);
        }
    }
    $theme_path = drupal_get_path('theme', 'umbrella');
    drupal_add_js('jQuery.extend(Drupal.settings, { "pathToTheme": "' . $theme_path . '" });', 'inline');
    $alias_parts = explode('/', drupal_get_path_alias()); 
    if(count($alias_parts)){
        if ( in_array($alias_parts[0], array('homepage_one','homepage_two'))) {
            $variables['theme_hook_suggestions'][] = 'page__front';
            drupal_add_js('http://maps.google.com/maps/api/js?sensor=false');
            drupal_add_js(drupal_get_path('theme','umbrella').'/js/gmap3.min.js');
        } 
    }
}

function umbrella_form_alter(&$form, &$form_state, $form_id) {
  if ($form_id == 'contact_site_form') {
    $form['name']['#title_display'] = 'invisible';
    $form['mail']['#title_display'] = 'invisible';
    $form['subject']['#title_display'] = 'invisible';
    $form['message']['#title_display'] = 'invisible';
    $form['name']['#attributes']["placeholder"] = $form['name']['#title'];
    $form['mail']['#attributes']["placeholder"] = $form['mail']['#title'];
    $form['subject']['#attributes']["placeholder"] = $form['subject']['#title'];
    $form['message']['#attributes']["placeholder"] = $form['message']['#title'];
    $form['actions']['submit']['#value'] = '<i class="fa fa-envelope-o"></i>';
    $form['actions']['submit']['#attributes']["class"] = array('submit_contact');
    $form['message']['#resizable'] = false ;
    $form['#attributes']["class"] = array('contact');
    if(isset($form['copy'])){
      unset($form['copy']);
    }
  }
  if($form_id == 'comment_node_blog_form'){ //print_r($form);die;
    $form['comment_body'][LANGUAGE_NONE][0]['#format'] = 'plain_text';
    $form['comment_body'][LANGUAGE_NONE][0]['#resizable'] = false ;
    $form['actions']['submit']['#value'] = '<i class="fa fa-envelope-o"></i>';
    $form['actions']['submit']['#attributes']["class"] = array('buton b_asset buton-2 buton-mini button-hover');
  }
}
function get_class_menu(){
  $class = 'navbar-fixed-top';
  if($_GET['q'] == 'homepage_two'){
    $class = 'navbar-static-top';
  }
  return $class;
}
function umbrella_css_alter(&$css) {
  $style_path = drupal_get_path('theme', 'umbrella') . '/css/style.css';
  $style_path2 = drupal_get_path('theme', 'umbrella') . '/css/style2.css';
  if($_GET['q'] == 'homepage_two'){
    if(isset($css[$style_path])){
      $css[$style_path2] = $css[$style_path];
      $css[$style_path2]['data'] = $style_path2;
      unset($css[$style_path]);
    }
  }
}

function umbrella_preprocess_node(&$variables) {
    $variables['elements']['#node']->referencing_entity->field_url['und'][0]['value'] = '<a href="' . $variables['referencing_entity']->field_url['und'][0]['value'] . '" target="_blank">' . $variables['referencing_entity']->field_url['und'][0]['value'] . '</a>';
    $variables['elements']['#node']->referencing_entity->field_url['und'][0]['safe_value'] = '<a href="' . $variables['referencing_entity']->field_url['und'][0]['safe_value'] . '" target="_blank">' . $variables['referencing_entity']->field_url['und'][0]['safe_value'] . '</a>';
}

function block_render($module, $block_id) {
    $block = block_load($module, $block_id);
    $block_content = _block_render_blocks(array($block));
    $build = _block_get_renderable_array($block_content);
    $block_rendered = drupal_render($build);
    return $block_rendered;
}