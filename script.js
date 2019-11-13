/*
 * jQuery v1.9.1 included
 */

$(document).ready(function() {

  // social share popups
  $(".share a").click(function(e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  });

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var $commentContainerTextarea = $(".comment-container textarea"),
    $commentContainerFormControls = $(".comment-form-controls, .comment-ccs");

  $commentContainerTextarea.one("focus", function() {
    $commentContainerFormControls.show();
  });

  if ($commentContainerTextarea.val() !== "") {
    $commentContainerFormControls.show();
  }

  // Expand Request comment form when Add to conversation is clicked
  var $showRequestCommentContainerTrigger = $(".request-container .comment-container .comment-show-container"),
    $requestCommentFields = $(".request-container .comment-container .comment-fields"),
    $requestCommentSubmit = $(".request-container .comment-container .request-submit-comment");

  $showRequestCommentContainerTrigger.on("click", function() {
    $showRequestCommentContainerTrigger.hide();
    $requestCommentFields.show();
    $requestCommentSubmit.show();
    $commentContainerTextarea.focus();
  });

  // Mark as solved button
  var $requestMarkAsSolvedButton = $(".request-container .mark-as-solved:not([data-disabled])"),
    $requestMarkAsSolvedCheckbox = $(".request-container .comment-container input[type=checkbox]"),
    $requestCommentSubmitButton = $(".request-container .comment-container input[type=submit]");

  $requestMarkAsSolvedButton.on("click", function () {
    $requestMarkAsSolvedCheckbox.attr("checked", true);
    $requestCommentSubmitButton.prop("disabled", true);
    $(this).attr("data-disabled", true).closest("form").submit();
  });

  // Change Mark as solved text according to whether comment is filled
  var $requestCommentTextarea = $(".request-container .comment-container textarea");

  $requestCommentTextarea.on("keyup", function() {
    if ($requestCommentTextarea.val() !== "") {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-and-submit-translation"));
      $requestCommentSubmitButton.prop("disabled", false);
    } else {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-translation"));
      $requestCommentSubmitButton.prop("disabled", true);
    }
  });

  // Disable submit button if textarea is empty
  if ($requestCommentTextarea.val() === "") {
    $requestCommentSubmitButton.prop("disabled", true);
  }

  // Submit requests filter form in the request list page
  $("#request-status-select, #request-organization-select")
    .on("change", function() {
      search();
    });

  // Submit requests filter form in the request list page
  $("#quick-search").on("keypress", function(e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $("#quick-search").val(),
      status: $("#request-status-select").val(),
      organization_id: $("#request-organization-select").val()
    });
  }

  $(".header .icon-menu").on("click", function(e) {
    e.stopPropagation();
    var menu = document.getElementById("user-nav");
    var isExpanded = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", !isExpanded);
  });

  if ($("#user-nav").children().length === 0) {
    $(".header .icon-menu").hide();
  }

  // Submit organization form in the request page
  $("#request-organization select").on("change", function() {
    this.form.submit();
  });

  // Toggles expanded aria to collapsible elements
  $(".collapsible-nav, .collapsible-sidebar").on("click", function(e) {
    e.stopPropagation();
    var isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
  });
});

/*** PROPELLERHEAD STYLES START HERE ***/
$(document).ready(function() {
    'use strict';

    // Nag message
    var gIsShowingNagMessage = false;
    var gIsShowingCookieMessage = false;

    // A reusable function to close header menu dropdowns
    function closeHeaderMenus() {
        // Here are all the dropdown menus which should be closed
        $('#header-hamburger-toggle')
            .add('.main-menu-dropdown-products .dropdown-toggle')
            .add('.main-menu-dropdown-user .dropdown-toggle')
            .add('.reason-nav-inner .toggle-reason-nav')
            .add('.js-header-search').removeClass('hover');
    }

    function handleDropDownClick(target, isProducts, callback) {
        var isActive = target.hasClass('hover') ? true : false;
        $(document).trigger('ph-close-header-menus');
        if (!isActive) {
            target.addClass('hover');
        }
        // Important for mobile - 
        // If products is clicked make sure main nav items also stay open
        if (isProducts) {
            $('#header-hamburger-toggle').addClass('hover');
        }
        if (typeof callback === 'function') { callback(); }
    }

    // Enable hamburger menu by setting some classes on click/hover.
    $(document).on('click.header-js', '#header-hamburger-toggle', function(e) {
        e.preventDefault();
        handleDropDownClick($(this));
        // The expanded menu does not redraw properly on iOS when made visible
        // with CSS. The "solution" for now is to force redraw it by setting a
        // scale value on the transform property which is one of the cheap ways.
        // See http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
        $('#main-nav-items').css({
            '-webkit-transform': 'scale(1)',
            'transform': 'scale(1)'
        });
        e.stopPropagation();
    });

    // Same thing for dropdown toggles, but they don't need forced redraw.
    $(document).on('click.header-js', '.main-menu-dropdown-products .dropdown-toggle', function(e) {
        e.preventDefault();
        handleDropDownClick($(this), true);
        e.stopPropagation();
    });

    // User dropdown
    $(document).on('click.header-js', '.main-menu-dropdown-user .dropdown-toggle', function(e) {
        e.preventDefault();
        handleDropDownClick($(this));
        e.stopPropagation();
    });

    // Header search dropdown: medium screens only
    $(document).on('click.header-js', '.js-header-search', function(e) {
        e.preventDefault();
        handleDropDownClick($(this), false, function() {
            // Focus on input when search drops down
            $('#main-search-input').focus();
        });
        e.stopPropagation();
    });

    // Reason nav dropdown menu: mobile screens only 
    $(document).on('click.header-js', '.reason-nav-inner .toggle-reason-nav', function(e) {
        e.preventDefault();
        handleDropDownClick($(this));
        e.stopPropagation();
    });

    // TODO: Do not dare touch too much header styling at the moment, will make
    // this a proper submit button after release.
    $(document).on('click.header-js', '#main-search-submit', function() {
        var $mainSearchForm = $('#main-search-form');
        var $mainSearchInput = $('#main-search-input');
        var value = $mainSearchInput.val();
        if (value.length > 0) {
            $mainSearchForm.submit();
        }
    });

    // Close header dropdowns when user clicks outside of them
    // except if user clicks on another header nav item
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.ph-header').length && 
            !$(e.target).closest('reason-nav-wrapper').length) {
            $(document).trigger('ph-close-header-menus');
            e.stopPropagation();
        }
    });

    $(document).on('ph-close-header-menus', function() {
        closeHeaderMenus();
    });
  
    closeHeaderMenus();

    window.Propellerhead = window.Propellerhead || {};
    window.Propellerhead.closeHeaderMenus = closeHeaderMenus;
});

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function showMenu() {
  $('#navDropdownAccount').show()
}

function showLoginButtons() {
  $('#signupButton').show();
  $('#loginButton').show();
}

$(document).ready(function() {
  if (getCookie('ph_zd_loggedin')) {
    showMenu();
  } else {
    showLoginButtons();
  }

  function hideContactSupportButtononReasonCompact() {
    if ($("li[title='Reason Compact']")[0]) {
      $("a[title='Contact Support']").hide();
      $('#article-comments').show();
    }
  }
  
  function maybeShowForumButton() {
    console.log('determining if forum should be shown');
    if ($('h1')[0] && $('h1')[0].innerHTML === 'Mobile Apps') {
      $('#forum-knapp').show()
    }
  }
  
  maybeShowForumButton();
  hideContactSupportButtononReasonCompact();
  
});

$(document).ready(function() {
    'use strict';
  
    $('#cookie-message').hide();

    // Header search dropdown: medium screens only
    // Handled with bootstrap collapse
    // Focus on input when search drops down
    $(document).on('click.header-js', '.js-header-search .header-search-icon', function(e) {
        $('#main-search-input').focus();
    });

    // TODO: Do not dare touch too much header styling at the moment, will make
    // this a proper submit button after release.
    $(document).on('click.header-js', '#main-search-submit', function() {
        var $mainSearchForm = $('#main-search-form');
        var $mainSearchInput = $('#main-search-input');
        var value = $mainSearchInput.val();
        if (value.length > 0) {
            $mainSearchForm.submit();
        }
    });
  
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:283710,hjsv:5};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
});