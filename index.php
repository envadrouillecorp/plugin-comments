<?php
/*
 * Copyright (c) 2013 Baptiste Lepers
 * Released under MIT License
 *
 * Feedback - Entry point
 */

class Pages_Comments_Index {
   public static $description = "Comment Plugin";
   public static $isOptional = true;
   public static $showOnMenu = false;

   public static function setupAutoload() {
      AutoLoader::$autoload_path[] = "./pages/comments/php/";
   }

   static public function getOptions() {
      return array(
         array('id' => 'disqus_id', 'type' => 'text', 'cat' => 'Comment Plugin', 'default' => '', 'export' => true),
      );
   }

   static public function getUserScripts() {
      return array('./admin/pages/comments/scripts/jgallery.comments.js');
   }

   static public function mainAction() {
   }
};



