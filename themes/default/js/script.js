jQuery(function(a){"use strict";function e(e,t){t.addClass("loading"),a.ajax({url:t.attr("href"),data:{ajax:!0}}).done(function(a){e.html(a),t.removeClass("loading")})}function t(a,e){e.toggleClass("open"),e.hasClass("open")?(a.removeClass("collapse").addClass("collapsed"),e.attr("aria-expanded","true"),e.children(".linkText").replaceWith('<span class="linkText">Collapse section</span>')):(a.removeClass("collapsed").addClass("collapse"),e.attr("aria-expanded","false"),e.children(".linkText").replaceWith('<span class="linkText">Expand section</span>'))}function n(){a(".sitemap").on("click",".button",function(){var n=a(this),l=a(n.attr("data-target"));return 0===l.html().length&&e(l,n),t(l,n),!1})}function l(){n()}l()});
//# sourceMappingURL=script.js.map
