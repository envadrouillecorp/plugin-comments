/*
 * jgallery.comments.js
 * Copyright (c) 2013 Baptiste Lepers
 * Released under MIT License
 */
var JComments = {
   changeLang:function(action) {
      if(jGallery.lang == 'fr') {
         config.tr['Comments'] = 'Commentaires';
      }
   },

   want:function(action) {
      JComments.showComments(action);
      return false;
   },

   showComments:function(action) {
      if(action == '' || action.match(/^search/)) {
         $('#disqus_thread').css('display', 'none');
         return;
      }
      $('#disqus_thread').css('display', 'block');
      if($('#content').css('paddingLeft')) {
         $('#discuss_container').css('marginLeft', $('#content').css('paddingLeft'));
      }

      if(!window.DISQUS || !DISQUS.reset) {
         setTimeout(function() { JComments.showComments(action); } , 100);
         return;
      }

      DISQUS.reset({
         reload: true,
         config: function () {  
            this.page.identifier = escape(jGallery.currentPage);
            this.page.url = window.location.href.replace('#', '#!');
         }
      });
   },

   oldSwitchTheme:null,

   init:function() {
      var langcb = $('<div class="customtranslate"/>').bind('languagechangeevt', function() {
         JComments.changeLang();
      });
      JComments.changeLang();
      $('body').append(langcb);

      JComments.oldSwitchTheme = jGallery.switchTheme;
      jGallery.switchTheme = function(t, bg, fg) {
         $('#disqus_thread').css('display', 'none');
         JComments.oldSwitchTheme(t, bg, fg);
      };

      var disqus_shortname = config.disqus_id; 
      var disqus_identifier = jGallery.currentPage;
      $('#wrapper').append($('<div id="discuss_container"><div id="disqus_thread" style="color:black; padding:10px; margin:auto;width:800px; background: none repeat scroll 0 0 rgba(254, 254, 254, 0.99); border: 1px solid rgba(255, 255, 255, 0.9); box-shadow: 0 2px 16px #999, 0 0 1px #000000, 0 0 1px #000000; margin-bottom:50px;"></div></div>'));
      (function() {
         var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
         dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
         (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
      })();

      jGallery.plugins.push(JComments);
   }
};
config.pluginsInstances.push(JComments);

