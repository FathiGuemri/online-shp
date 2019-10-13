$(() => {
    length = +$('.length').val()
    for (let i = 0; i <= length; i++) {
      let status = $('.status-' + i)
        if (status.data('status') == 'P') {
            status.css('background', '#ffc107')
        } else if (status.data('status') == 'S') {
            status.css('background', '#00c851')
        } else if (status.data('status') == 'C') {
            status.css('background', '#2bbbad')
        }
    }
    
})