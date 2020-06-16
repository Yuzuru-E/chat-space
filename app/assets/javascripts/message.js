$(function(){
  function buildHTML(message){
    if (message.image) {
      let html =
        `<div class="Chat-main__message">
            <div class="Chat-main__message-user">
            ${message.user_name}
          </div>
          <div class="Chat-main__message-timestamp">
            ${message.created_at}
          </div>
        </div>
        <div class="Chat-main__message-content">
          <p class="message-content">
            ${message.content}
          </p>
          <img class="Message__image" src="${message.image}">
        </div>`
      return html;
    } else {
      let html =
      `<div class="Chat-main__message">
          <div class="Chat-main__message-user">
            ${message.user_name}
          </div>
          <div class="Chat-main__message-timestamp">
            ${message.created_at}
          </div>
        </div>
        <div class="Chat-main__message-content">
          <p class="message-content">
            ${message.content}
          </p>
        </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Chat-main__message-list').append(html);
      $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.Form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.Form__submit').prop('disabled', false);
    })
  });
});