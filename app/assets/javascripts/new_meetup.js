$(function(){
  var users = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('first_name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: 'http://localhost:3000/users.json',
    remote: 'http://localhost:3000/users.json'
  });
   
  users.initialize();
   
  $('.typeahead').typeahead(null, {
    name: 'users',
    displayKey: function(user){
      return user.first_name + " " + user.surname;
    },
    source: users.ttAdapter(),
    templates: {
        empty: [
          '<div class="empty-message">',
          'unable to find any User that match the current query',
          '</div>'
        ].join('\n'),
        suggestion: Handlebars.compile('<p>{{first_name}} {{surname}}</p>')
      }
  });

  $('.add_fields').click(function(event){
    time = new Date().getTime();
    regexp = new RegExp($(this).data('id'), 'g');
    $(this).before($(this).data('fields').replace(regexp, time));
    event.preventDefault();
  });

  $('form').on('click', '.destroy_invite', function(event){
    $(this).prev('input[type=hidden]').val(1);
    $(this).closest('fieldset').hide();
    event.preventDefault();
  });

  $('form').on('change', 'select', function(event){
    console.log("AYAYAY!");
    event.preventDefault();
  });


});