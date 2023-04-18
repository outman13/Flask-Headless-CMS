$(function() {
    $("#test_form").submit(function(event){
        event.preventDefault();
        $.ajax({
            url: "/collection/create",
            method: "POST",
            data: $(this).serialize(),
            success: function(data) {
                alert(data.msg);
            },
            error: function(data) {
                alert(data.responseText);
            },
        });
    });
});