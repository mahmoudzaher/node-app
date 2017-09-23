var socket = io();
var clickable= true;
socket.on('connect', function() {
  console.log('Connected to server');
    // jQuery("#table1").empty();
  socket.emit('listenerone',"userconnected");
});

socket.on('weblisten',function(anymsg, dats){
  jQuery('#table1').append('<tr><td>'+anymsg+
  '</td><td>'+dats+'</td><td><button id="buttont" key=index >x</button></td></tr>');
});
jQuery('#form1').on('submit',function(e){
  e.preventDefault();
});

jQuery('#inid').change(function(e){
  var files=e.target.files[0];
  var x = files.name;
  var y = files.lastModified;
  var date = new Date(y);
  var year= date.getFullYear();
  var month= date.getMonth() + 1;
  var day= date.getDate();
  var dateee= year + '/' + month + '/' + day;
  var type =x.split('.').pop();
  console.log(type);
  console.log(files);
  if (type==="zip") {
    clickable = true;
    socket.emit('uploadit',files,x,dateee,function(){});

  }
  else {
        alert("plz select zip file");
        clickable = false;
  }
})
jQuery('#hht').on('click',function(e){
  if(clickable){
    var b = $('input[type=file]').val().split('\\').pop();
    socket.emit('upfile',b,function(){});
  }

});
$('#table1').on('click', '#buttont', function(){
  var a = $(this).closest('tr').find('td:nth-child(1)').text();
    socket.emit('deleteit',a,function(){});
    var row=$(this).closest('tr');
     row.remove();
});
