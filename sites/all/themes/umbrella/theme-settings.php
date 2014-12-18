<?php
/**
 * @file
 * theme-settings.php
 *
 * Provides theme settings for umbrella themes when admin theme is not.
 *
 * 
 */

/**
 * Implements hook_form_FORM_ID_alter().
 */
function umbrella_form_system_theme_settings_alter(&$form, $form_state, $form_id = NULL) {
  // Alter theme settings form.
  $form['umbrella'] = array
    (
      '#type' => 'vertical_tabs',
      '#prefix' => '<h2><small>UMBRELLA SETTINGS</small></h2>',
      '#weight' => -8
    );
  $form['umbrella_settings'] = array
    (
      '#type' => 'fieldset',
      '#title' => 'VIDEO BACKGROUND',
      '#group' => 'umbrella'
    );
  $form['umbrella_settings']['umbrella_config']= array(
    '#type' => 'fieldset',
    '#title' => 'URL',
    '#collapsible' => TRUE, 
    '#collapsed' => FALSE,  
  );
  $form['umbrella_settings']['umbrella_config']['url_video'] = array(
    '#type' =>'textfield', 
    '#title' => t('<strong>Video backgrounds.</strong>'),
    '#default_value' => theme_get_setting('url_video')?theme_get_setting('url_video'):'',
    '#size' => 60, 
    '#maxlength' => 256, 
  );
}
