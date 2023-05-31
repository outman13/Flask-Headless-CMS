$(function() {
    $('.left_panel_tab').on('click', function(event) {
        event.preventDefault();
        var current_tab = $(this);

        $('.left_panel_tab').removeClass('selected_tab')
        current_tab.toggleClass('selected_tab');
        openMenu($(this).attr('id'));
    });

    $('.left_panel_inner_row').on('click', function(event) {
        event.preventDefault();
        var closest_row = $(this).closest('.left_panel_menu_row')

        $('.left_panel_menu_row').removeClass('selected_row');
        closest_row.toggleClass('selected_row');
        openContent(closest_row.attr('id'));
    });

    $('#table_name_edit').on('click', function(event) {
        $('#content_name_text').css('pointer-events', 'initial');
        $('#content_name_text').focus();
    });
    
    $('#content_name_text').on('blur', function(event) {
        $('#content_name_text').css('pointer-events', 'none');
    });

    $('#content_name_text').on('input', function(event) {
        var input_length = $(this).val().length;
        if (input_length === 0){
            $('#content_name_text').css('width', $('#content_name_text').attr('placeholder').length + 'ch');
        }
        else {
            $(this).css('width', input_length + 'ch');  
        };
    });

    $('.footer_text_anchor').on('click', function(event) {
        event.preventDefault();

        toggle_pop_up();
    })
});