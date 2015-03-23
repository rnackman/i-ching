'use-strict'
$(document).ready(function(){
  addCoinListeners();
  addBeginListener();
})

function addCoinListeners(){
  $("[id*='coin']").click(function(){
    var coin = this;
    tossCoin(coin);
  });
}

function addBeginListener(){
  $('#begin').click(function(){
    $('#begin').attr('disabled', 'disabled');
    $('#coin1').removeAttr('disabled');
    $('#coin1').removeClass('btn btn-default');
    $('#coin1').addClass('btn btn-success');
  });
}

function tossCoin(coin){
  var current_coin_id = $(coin).attr("id");
  if (current_coin_id.length === 5){
    var current_coin_num = Number(current_coin_id.slice(-1));
  } else {
    var current_coin_num = Number(current_coin_id.slice(-2));
  }
  var next_coin = "#coin"+ (current_coin_num + 1);

  var result = Math.floor(Math.random() * (4 - 2) + 2);
  $(coin).html(result);

  $(coin).attr('disabled','disabled');
  $(coin).removeClass('btn btn-success');
  $(coin).addClass('btn btn-warning');
  $(next_coin).removeAttr('disabled');
  $(next_coin).removeClass('btn btn-default');
  $(next_coin).addClass('btn btn-success');

  if (current_coin_num % 3 === 0) {
    var line_num = (current_coin_num / 3);
    revealLine(line_num);
  }  
}

function revealLine(line_num){
  var third_coin = "#coin"+(line_num * 3);
  var second_coin = "#coin"+(line_num * 3 - 1);
  var first_coin = "#coin"+(line_num * 3 - 2);
  var total = (Number($(first_coin).html()) + Number($(second_coin).html()) + Number($(third_coin).html()));
  if (total === 9 || total === 7) {
    $("#line"+line_num).html("--------------");
  } else if (total === 8 || total === 6) {
    $("#line"+line_num).html("------&nbsp;&nbsp;&nbsp;------");
  }
}