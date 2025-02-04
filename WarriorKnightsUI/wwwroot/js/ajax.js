WKLIB.ajax = (function ($) {
    function ajaxCall(url, data) {
        $.ajax({
            url: url,
            data: data
         }).done(function() {
            alert('Added'); 
         });
        
    }

    return {
        ajaxCall: ajaxCall
    };
}) (jQuery);