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
    $('#instructions').fadeOut('slow').remove();
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
  if (current_coin_num === 18) {
    determineHexagram();
  }
}

function revealLine(line_num){
  var total = totalCoins(line_num);
  if (total === 9 || total === 7) {
    $("#line"+line_num).hide().html("<img src='images/closed.jpg' style='width: 50%;'>").fadeIn('slow');
  } else if (total === 8 || total === 6) {
    $("#line"+line_num).hide().html("<img src='images/open.jpg' style='width: 50%;'>").fadeIn('slow');
  }
}

function totalCoins(line_num){
  var third_coin = "#coin"+(line_num * 3);
  var second_coin = "#coin"+(line_num * 3 - 1);
  var first_coin = "#coin"+(line_num * 3 - 2);
  return (Number($(first_coin).html()) + Number($(second_coin).html()) + Number($(third_coin).html()));
}

function determineHexagram(){
  var results = [];
  for (var i = 1; i < 7; i++){
    results.push(totalCoins(i));
  }
  var simple_results = results.map(function(e){
    if (e === 9 || e === 7){
      return 1;
    } else {
      return 0;
    }
  }).join('');
  readHexagram(111111);
}

function readHexagram(simple_results){
  var hexagrams = {
  111111: {
    title: "Ch'ien / The Creative",
    text: "The creative works sublime success,<br>Furthering through perseverance."
  },
  000000: {
    title: "K'un / The Receptive",
    text: "The receptive brings about sublime success,<br>Furthering through the perseverance of a mare.<br>If the superior person undertakes something and tries to lead,<br>they go astray;<br>But if they follow, they find guidance.<br>It is favorable to find friends in the west and south,<br>To forego friends in the east and north.<br>Quiet perseverance brings good fortune."}
  };

  $('#hexagram-text').html("<h1>"+hexagrams[simple_results]["title"]+"</h1><h3>"+hexagrams[simple_results]["text"]+"</h3>");
  
}
  // var title = "";
  // var text = "";
  // if (simple_results === 111111) {
  //   title = "Ch'ien / The Creative";
  //   text = "The creative works sublime success,<br>Furthering through perseverance.";
  // } else if (simple_results === 000000) {
  //   title = "K'un / The Receptive";
  //   text = "The receptive brings about sublime success,<br>Furthering through the perseverance of a mare.<br>If the superior person undertakes something and tries to lead,<br>they go astray;<br>But if they follow, they find guidance.<br>It is favorable to find friends in the west and south,<br>To forego friends in the east and north.<br>Quiet perseverance brings good fortune.";
  // } else if (simple_results === 100010) {
  //   title = "Chun / Difficulty at the Beginning";
  //   text = "Difficulty at the beginning works supreme success,<br>Furthering through perseverance.<br>Nothing should be undertaken.<br>It furthers one to appoint helpers."
  // } else if (simple_results === 010001){
  //   title = "Mêng / Youthful Folly";
  //   text = "Youthful folly has success.<br>It is not I who seek the young fool;<br>The young fool seeks me.<br>At the first oracle I inform them.<br>If they ask two or three times, it is importunity.<br>If they importune, I give them no information.<br>Perseverance furthers."
  // } else if (simple_results === 111010){
  //   title = "Hsü / Waiting (Nourishment)";
  //   text = "Waiting. If you are sincere,<br>You have light and success.<br>Perseverance brings good fortune.<br>It furthers one to cross the great water.";
  // } else if (simple_results === 010111){
  //   title = "Sung / Conflict";
  //   text = "Conflict. You are sincere<br>And are being obstructed.<br>A cautious halt halfway brings good fortune.<br>Going through to the end brings misfortune.<br>It furthers one to see the great person.<br>It does not further one to cross the great water.";
  // } else if (simple_results === 010000){
  //   title = "Shih / The Army";
  //   text = "The Army. The army needs perseverance<br>And a strong person.<br>Good fortune without blame."
  // } else if (simple_results === 000010){
  //   title = "Pi / Holding Together [Union]";
  //   text = "Holding together brings great fortune.<br>Inquire of the oracle once again<br>Whether you possess sublimity, constancy, and perseverance;<br>Then there is no blame.<br>Those who are uncertain gradually join.<br>Whoever comes too late<br>Meets with misfortune.";
  // } else if (simple_results === 111011){
  //   title = "Hsiao Ch'u / The Taming Power of the Small";
  //   text = "The taming power of the small<br>Has success.<br>Dense clouds, no rain from our western region.";
  // } else if (simple_results === 110111){
  //   title = "Lü / Treading [Conduct]";
  //   text = "Treading. Treading upon the tail of the tiger.<br>It does not bite the person. Success."
  // } else if (simple_results === 111000){
  //   title = "T'ai / Peace";
  //   text = "Peace. The small departs,<br>The great approaches.<br>Good fortune. Success.";
  // } else if (simple_results === 000111){
  //   title = "P'i / Standstill [Stagnation]";
  //   text = "Standstill. Evil people do not further<br>The perserverance of the superior person.<br>The great departs; the small approaches.";
  // } else if (simple_results === 101111){
  //   title = "T'ung Jên / Fellowship with People";
  //   text = "Fellowship with people in the open.<br>Success.<br>It furthers one to cross the great water.<br>The perseverance of the superior person furthers.";
  // } else if (simple_results === 111101){
  //   title = "Ta Yu / Possession in Great Measure";
  //   text = "Possession in great measure.<br>Supreme success.";
  // } else if (simple_results === 001000){
  //   title = "Ch'ien / Modesty";
  //   text = "Modesty creates success.<br>The superior person carries things through.";
  // } else {
  //   title = "Yü / Enthusiasm";
  //   text = "Enthusiasm. It furthers one to install helpers<br>And to set armies marching."
  // }
  





  //   else if (simple_results === 100010) {
  //   title = "Chun / Difficulty at the Beginning";
  //   text = "Difficulty at the beginning works supreme success,<br>Furthering through perseverance.<br>Nothing should be undertaken.<br>It furthers one to appoint helpers."
  // } else if (simple_results === 010001){
  //   title = "Mêng / Youthful Folly";
  //   text = "Youthful folly has success.<br>It is not I who seek the young fool;<br>The young fool seeks me.<br>At the first oracle I inform them.<br>If they ask two or three times, it is importunity.<br>If they importune, I give them no information.<br>Perseverance furthers."
  // } else if (simple_results === 111010){
  //   title = "Hsü / Waiting (Nourishment)";
  //   text = "Waiting. If you are sincere,<br>You have light and success.<br>Perseverance brings good fortune.<br>It furthers one to cross the great water.";
  // } else if (simple_results === 010111){
  //   title = "Sung / Conflict";
  //   text = "Conflict. You are sincere<br>And are being obstructed.<br>A cautious halt halfway brings good fortune.<br>Going through to the end brings misfortune.<br>It furthers one to see the great person.<br>It does not further one to cross the great water.";
  // } else if (simple_results === 010000){
  //   title = "Shih / The Army";
  //   text = "The Army. The army needs perseverance<br>And a strong person.<br>Good fortune without blame."
  // } else if (simple_results === 000010){
  //   title = "Pi / Holding Together [Union]";
  //   text = "Holding together brings great fortune.<br>Inquire of the oracle once again<br>Whether you possess sublimity, constancy, and perseverance;<br>Then there is no blame.<br>Those who are uncertain gradually join.<br>Whoever comes too late<br>Meets with misfortune.";
  // } else if (simple_results === 111011){
  //   title = "Hsiao Ch'u / The Taming Power of the Small";
  //   text = "The taming power of the small<br>Has success.<br>Dense clouds, no rain from our western region.";
  // } else if (simple_results === 110111){
  //   title = "Lü / Treading [Conduct]";
  //   text = "Treading. Treading upon the tail of the tiger.<br>It does not bite the person. Success."
  // } else if (simple_results === 111000){
  //   title = "T'ai / Peace";
  //   text = "Peace. The small departs,<br>The great approaches.<br>Good fortune. Success.";
  // } else if (simple_results === 000111){
  //   title = "P'i / Standstill [Stagnation]";
  //   text = "Standstill. Evil people do not further<br>The perserverance of the superior person.<br>The great departs; the small approaches.";
  // } else if (simple_results === 101111){
  //   title = "T'ung Jên / Fellowship with People";
  //   text = "Fellowship with people in the open.<br>Success.<br>It furthers one to cross the great water.<br>The perseverance of the superior person furthers.";
  // } else if (simple_results === 111101){
  //   title = "Ta Yu / Possession in Great Measure";
  //   text = "Possession in great measure.<br>Supreme success.";
  // } else if (simple_results === 001000){
  //   title = "Ch'ien / Modesty";
  //   text = "Modesty creates success.<br>The superior person carries things through.";
  // } else {
  //   title = "Yü / Enthusiasm";
  //   text = "Enthusiasm. It furthers one to install helpers<br>And to set armies marching."
  // }
// }