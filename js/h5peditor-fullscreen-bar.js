/* global H5PEditor */
H5PEditor.FullscreenBar = (function ($) {
    function FullscreenBar($mainForm, library) {
        const title = H5PEditor.libraryCache[library]
            ? H5PEditor.libraryCache[library].title
            : library;
        const iconId = library.split(' ')[0].split('.')[1].toLowerCase();

        let isInFullscreen = false;
        let exitSemiFullscreen;

        $mainForm.addClass('h5peditor-form-manager');

        // Add fullscreen bar
        const $bar = ns.$('<div/>', {
            class: 'h5peditor-form-manager-head'
        });

        const $breadcrumb = ns.$('<div/>', {
            class: 'h5peditor-form-manager-breadcrumb',
            appendTo: $bar
        });

        const $title = ns.$('<div/>', {
            class: 'h5peditor-form-manager-title ' + iconId,
            text: title,
            appendTo: $breadcrumb
        });

        const fullscreenButton = createButton(
            'fullscreen',
            '',
            function () {
                if (isInFullscreen) {
                    // Trigger semi-fullscreen exit
                    exitSemiFullscreen();
                } else {
                    // Trigger semi-fullscreen enter
                    exitSemiFullscreen = H5PEditor.semiFullscreen(
                        $mainForm,
                        function () {
                            fullscreenButton.setAttribute(
                                'aria-label',
                                H5PEditor.t('core', 'exitFullscreenButtonLabel')
                            );
                            isInFullscreen = true;
                        },
                        function () {
                            fullscreenButton.setAttribute(
                                'aria-label',
                                H5PEditor.t(
                                    'core',
                                    'enterFullscreenButtonLabel'
                                )
                            );
                            isInFullscreen = false;
                        }
                    );
                }
            },
            H5PEditor.t('core', 'enterFullscreenButtonLabel')
        );

        // Create 'Proceed to save' button
        const proceedButton = createButton(
            'proceed',
            H5PEditor.t('core', 'proceedButtonLabel'),
            function () {
                exitSemiFullscreen();
            }
        );

        $bar.append(proceedButton);
        $bar.append(fullscreenButton);
        $mainForm.prepend($bar);
    }

    /**
     * Helper for creating buttons.
     *
     * @private
     * @param {string} id
     * @param {string} text
     * @param {function} clickHandler
     * @param {string} ariaLabel
     * @return {Element}
     */
    const createButton = function (id, text, clickHandler, ariaLabel) {
        if (ariaLabel === undefined) {
            ariaLabel = text;
        }
    };

    return FullscreenBar;
})(ns.jQuery);
