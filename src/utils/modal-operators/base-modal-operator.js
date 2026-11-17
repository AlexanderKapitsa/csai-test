import pkg from 'scroll-lock';

const {
  disablePageScroll,
  enablePageScroll,
} = pkg;

const BaseModalOperator = {
  create: ({
    wrapperRef,
    contentRef,
    closeBtnRef,
  }) => {
    const Operator = {
      isOpen: false,
      hide: function() {
        if (!this.isOpen) {
          return;
        }

        this.isOpen = false;
        this.hideImpl();
      },
      show: function() {
        if (this.isOpen) {
          return;
        }

        this.isOpen = true;
        this.showImpl();
      },
      hideImpl: function() {
        enablePageScroll(contentRef);
        wrapperRef.classList.add('hidden');
      },
      showImpl: function() {
        disablePageScroll(contentRef);
        wrapperRef.classList.remove('hidden');

        let boundHandleEscapeClick;

        // Close the modal by an Escape key press
        const handleEscapeClick = function(event) {
          if (event.code.toLowerCase() !== 'escape') {
            return;
          }

          this.hide();
          document.removeEventListener('keydown', boundHandleEscapeClick);
        };

        boundHandleEscapeClick = handleEscapeClick.bind(this);

        document.addEventListener('keydown', boundHandleEscapeClick);
      },
    };

    const hideFn = () => Operator.hide();

    // 1. Close the modal by a click of a button
    closeBtnRef.addEventListener('click', hideFn);

    // 2. Close the modal by a backdrop click
    wrapperRef.addEventListener('click', (event) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      hideFn();
    });

    return Operator;

  },
};

export default BaseModalOperator;
