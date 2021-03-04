$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            var name = $("input#name").val();
            document.location.href = "mailto:draveursy@drave.dev?subject="
        + encodeURIComponent("J'embarque avec Drave Développment")
        + "&body=" + encodeURIComponent("Bonjour, \n\nJe suis (...) \n\nJe voudrais participer à Drave Développment pour (...)\n\nAu plaisir de collaborer avec vous!\n\n"+ name);

        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
