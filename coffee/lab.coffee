
jQuery(document).ready ->
    $ = jQuery
    doc = $(document)

    $('.navbar-lab a').tooltip
        placement: 'bottom'
        container: 'body'

    doc.on 'click', '.sidebar-toggle a', (event) ->
        event.preventDefault()

        $('header').toggleClass 'navbar-sidebar-collapsed navbar-sidebar-expanded'
        $('.page-with-sidebar').toggleClass 'page-sidebar-collapsed page-sidebar-expanded'
        $('.sidebar-wrapper').toggleClass 'sidebar-collapsed sidebar-expanded'
        $('.sidebar-toggle i').toggleClass 'fa-angle-right fa-angle-left'

        if $('.sidebar-wrapper').hasClass 'sidebar-expanded'
            $('.sidebar-wrapper .nav-sidebar a').tooltip('destroy')
        else
            $('.sidebar-wrapper .nav-sidebar a').tooltip
                placement: 'right'
                container: 'body'
