var interval = 5000;
var locked = false;

$('table.events').footable().bind({   
    footable_paging: function(e) {
        e.page > 0 ? lockTable() : unlockTable();
    }
});

$('#autoRefreshButtonGroup .active').on('click', lockTable);
$('#autoRefreshButtonGroup .inactive').on('click', unlockTable);

function lockTable() {
    locked = true;
    $('#autoRefreshButtonGroup').removeClass('active').addClass('inactive');
}

function unlockTable() {
    locked = false;
    $('#autoRefreshButtonGroup').removeClass('inactive').addClass('active');
}

(function poll() {
    if (locked) return setTimeout(poll, interval);
    $.ajax({
        url : '/plugin/dashboard/events',
        success : function(data) {
            $('table.events tbody tr').remove();
            $('table.events tbody').append(data).trigger('footable_redraw');

        }
    }).done(function() {
        setTimeout(poll, interval);
    })   
})();