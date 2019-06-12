(function ($) {
    let $doc = $(document);
    let defaults = {
        bounceDistance: 50,
        animDuration: '0.2s',
        animEasing: "cubic-bezier(0.175, 0.885, 0.420, 1.310)",
        throttle: func => func,
        throttleTime: 40, // ms
        container: $(document.body),
        semaphore: {
            isLock: () => false, // isLock method implement required
        },
    };

    let bounceAnimationEffect = ($el, px, duration, animEasing) => {
        $el.css({
            "transform": "translate3d(0, " + px + ", 0)",
            "transition": "all " + duration + " " + animEasing
        });
    };

    $.fn.bounceScroll = function (options) {
        let settings = Object.assign({}, defaults, options);
        let $container = settings.container;

        let tempAnimation = ($item, settings, direction) => {
            $item.data('bounce-in-progress', true);
            bounceAnimationEffect($container, direction * settings.bounceDistance + "px", settings.animDuration, settings.animEasing);
            $doc.one('transitionend', () => {
                bounceAnimationEffect($container, "0px", settings.animDuration, settings.animEasing);
                $doc.one('transitionend', () => $item.data('bounce-in-progress', false));
            });
        };

        let scrollHandler = (event) => {
            if (settings.semaphore.isLock()) {
                return;
            }

            let item = event.target;
            let $item = $(item);

            let posWas = $item.data('bounce-posWas') || 0;
            let inProgress = $item.data('bounce-in-progress') || false;

            if (inProgress) {
                return;
            }

            let pos = Math.ceil($item.scrollTop());
            let isDownScroll = pos > posWas;
            let itemHeight = $item.height();

            if (isDownScroll) {
                if (pos + itemHeight >= item.scrollHeight) {
                    tempAnimation($item, settings, -1);
                }
            } else if (pos <= 0) {
                tempAnimation($item, settings, 1);
            }

            $item.data('bounce-posWas', pos);
        };

        $(this).on('scroll', settings.throttle(scrollHandler, settings.throttleTime));
    }
})(window.jQuery);

