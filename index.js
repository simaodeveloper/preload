;(function (window, document, $) {
    'use strict';

    var Preload = (function() {

        function preloadImages(selector, callback) {
            $(selector).each(function (index , img) {
                var imageObj  = new Image();
                var $img      = $(img);
                var $parent   = $img.parents($img.attr('data-lazy-parent'));

                imageObj.onload = function() {
                    $img.removeAttr('data-src');
                    $img.attr('src', imageObj.src);
                    $img.attr('data-lazy-success', true);
                    callback(img, $parent.get(0));
                };

                var startImage = $parent.offset().top;
                var endImage = startImage + $parent.innerHeight();

                var startVisibleArea = $(window).scrollTop();
                var endVisibleAreaEnd = startVisibleArea + $(window).innerHeight();
                var percentsVisible = (startImage * 100 / endVisibleAreaEnd);

                if (startImage < endVisibleAreaEnd) {
                    imageObj.src = $img.attr('data-src');
                }
            });
        }

        return {
            images: preloadImages
        };
    })();

    window.Preload = Preload;

})(window, document, jQuery);

