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
    $('#begin').hide();
    coinOn($('#coin1'));
    // $('#instructions').fadeOut('slow').remove();
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

  coinOff(coin);
  coinOn(next_coin);

  if (current_coin_num % 3 === 0) {
    var line_num = (current_coin_num / 3);
    revealLine(line_num);
  }
  if (current_coin_num === 18) {
    determineHexagram();
  }
}

function coinOff(coin){
  $(coin).attr('disabled', 'disabled');
  $(coin).removeClass('btn btn-success');
  $(coin).addClass('btn btn-warning');
}

function coinOn(coin){
  $(coin).removeAttr('disabled');
  $(coin).removeClass('btn btn-default');
  $(coin).addClass('btn btn-success');
}

function revealLine(line_num){
  var total = totalCoins(line_num);
  if (total === 9 || total === 7) {
    lineImage("closed", line_num);
  } else if (total === 8 || total === 6) {
    lineImage("open", line_num);
  }
}

function lineImage(type, line_num){
  $("#line"+line_num).hide().html("<img src='images/"+type+".jpg'>").fadeIn('slow');
}

function totalCoins(line_num){
  var third_coin = Number($("#coin"+(line_num * 3)).html());
  var second_coin = Number($("#coin"+(line_num * 3 - 1)).html());
  var first_coin = Number($("#coin"+(line_num * 3 - 2)).html());
  return (first_coin + second_coin + third_coin);
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
  readHexagram(simple_results);
}

var hexagrams = {
  "111111": {
    title: "1. Ch'ien / The Creative",
    text: "The creative works sublime success,<br>Furthering through perseverance."
  },
  "000000": {
    title: "2. K'un / The Receptive",
    text: "The receptive brings about sublime success,<br>Furthering through the perseverance of a mare.<br>If the superior person undertakes something and tries to lead,<br>they go astray;<br>But if they follow, they find guidance.<br>It is favorable to find friends in the west and south,<br>To forego friends in the east and north.<br>Quiet perseverance brings good fortune."
  },
  "100010": {
    title: "3. Chun / Difficulty at the Beginning",
    text: "Difficulty at the beginning works supreme success,<br>Furthering through perseverance.<br>Nothing should be undertaken.<br>It furthers one to appoint helpers."
  },
  "010001": {
    title: "4. Mêng / Youthful Folly",
    text: "Youthful folly has success.<br>It is not I who seek the young fool;<br>The young fool seeks me.<br>At the first oracle I inform them.<br>If they ask two or three times, it is importunity.<br>If they importune, I give them no information.<br>Perseverance furthers."
  },
  "111010": {
    title: "5. Hsü / Waiting (Nourishment)",
    text: "Waiting. If you are sincere,<br>You have light and success.<br>Perseverance brings good fortune.<br>It furthers one to cross the great water."
  },
  "010111": {
    title: "6. Sung / Conflict",
    text: "Conflict. You are sincere<br>And are being obstructed.<br>A cautious halt halfway brings good fortune.<br>Going through to the end brings misfortune.<br>It furthers one to see the great person.<br>It does not further one to cross the great water."
  },
  "010000": {
    title: "7. Shih / The Army",
    text: "The Army. The army needs perseverance<br>And a strong person.<br>Good fortune without blame."
  },
  "000010": {
    title: "8. Pi / Holding Together [Union]",
    text: "Holding together brings great fortune.<br>Inquire of the oracle once again<br>Whether you possess sublimity, constancy, and perseverance;<br>Then there is no blame.<br>Those who are uncertain gradually join.<br>Whoever comes too late<br>Meets with misfortune."
  },
  "111011": {
    title: "9. Hsiao Ch'u / The Taming Power of the Small",
    text: "The taming power of the small<br>Has success.<br>Dense clouds, no rain from our western region."
  },
  "110111": {
    title: "10. Lü / Treading [Conduct]",
    text: "Treading. Treading upon the tail of the tiger.<br>It does not bite the person. Success."
  },
  "111000": {
    title: "11. T'ai / Peace",
    text: "Peace. The small departs,<br>The great approaches.<br>Good fortune. Success."
  },
  "000111": {
    title: "12. P'i / Standstill [Stagnation]",
    text: "Standstill. Evil people do not further<br>The perseverance of the superior person.<br>The great departs; the small approaches."
  },
  "101111": {
    title: "13. T'ung Jên / Fellowship with People",
    text: "Fellowship with people in the open.<br>Success.<br>It furthers one to cross the great water.<br>The perseverance of the superior person furthers."
  },
  "111101": {
    title: "14. Ta Yu / Possession in Great Measure",
    text: "Possession in great measure.<br>Supreme success."
  },
  "001000": {
    title: "15. Ch'ien / Modesty",
    text: "Modesty creates success.<br>The superior person carries things through."
  }, 
  "000100": {
    title: "16. Yü / Enthusiasm",
    text: "Enthusiasm. It furthers one to install helpers<br>And to set armies marching."
  },
  "100110": {
    title: "17. Sui / Following",
    text: "Following has supreme success.<br>Perseverance furthers. No blame."
  },
  "011001": {
    title: "18. Ku / Work on What Has Been Spoiled [Decay]",
    text: "Work on what has been spoiled<br>Has supreme success.<br>It furthers one to cross the great water.<br>Before the starting point, three days.<br>After the starting point, three days."
  },
  "110000": {
    title: "19. Lin / Approach",
    text: "Approach has supreme success.<br>Perseverance furthers.<br>When the eighth month comes,<br>There will be misfortune."
  },
  "000011": {
    title: "20. Kuan / Contemplation (View)",
    text: "Contemplation. The ablution has been made,<br>But not yet the offering.<br>Full of trust they look up to the great one."
  },
  "100101": {
    title: "21. Shih Ho / Biting Through",
    text: "Biting through has success.<br>It is favorable to let justice be administered."
  },
  "101001": {
    title: "22. Pi / Grace",
    text: "Grace has success.<br>In small matters<br>It is favorable to undertake something."
  },
  "000001": {
    title: "23. Po / Splitting Apart",
    text: "Splitting apart. It does not further one<br>To go anywhere."
  },
  "100000": {
    title: "24. Fu / Return (The Turning Point)",
    text: "Return. Success.<br>Going out and coming in without error.<br>Friends come without blame.<br>To and fro goes the way.<br>On the seventh day comes return.<br>It furthers one to have somewhere to go."
  },
  "100111": {
    title: "25. Wu Wang / Innocence (The Unexpected)",
    text: "Innocence. Supreme success.<br>Perseverance furthers.<br>If someone is not as they should be,<br>They have misfortune,<br>And it does not further them<br>To undertake anything."
  },
  "111001": {
    title: "26. Ta Ch'u / The Taming Power of the Great",
    text: "The taming power of the great.<br>Perseverance furthers.<br>Not eating at home brings good fortune.<br>It furthers one to cross the great water."
  },
  "100001": {
    title: "27. I / The Corners of the Mouth (Providing Nourishment)",
    text: "The corners of the mouth.<br>Perseverance brings good fortune.<br>Pay heed to the providing of nourishment<br>And to what a person seeks<br>To fill their own mouth with."
  },
  "011110": {
    title: "28. Ta Kuo / Preponderance of the Great",
    text: "Preponderance of the great.<br>The ridgepole sags to the breaking point.<br>It furthers one to have somewhere to go.<br>Success."
  },
  "010010": {
    title: "29. K'an / The Abysmal (Water)",
    text: "The Abysmal repeated.<br>If you are sincere, you have success in your heart,<br>And whatever you do succeeds."
  },
  "101101": {
    title: "30. Li / The Clinging, Fire",
    text: "The clinging. Perseverance furthers.<br>It brings success.<br>Care of the cow brings good fortune."
  },
  "001110": {
    title: "31. Hsien / Influence (Wooing)",
    text: "Influence. Success.<br>Perseverance furthers.<br>To wed a young person brings good fortune."
  },
  "011100": {
    title: "32. Hêng / Duration",
    text: "Duration. Success. No blame.<br>Perseverance furthers.<br>It furthers one to have somewhere to go."
  },
  "001111": {
    title: "33. Tun / Retreat",
    text: "Retreat. Success.<br>In what is small, perseverance furthers."
  },
  "111100": {
    title: "34.Ta Chuang / The Power of the Great",
    text: "The power of the great. Perseverance furthers."
  },
  "000101": {
    title: "35. Chin / Progress",
    text: "Progress. The powerful public servant<br>Is honored with horses in large numbers.<br>In a single day they are granted audience three times."
  },
  "101000": {
    title: "36. Ming I / Darkening of the Light",
    text: "Darkening of the light. In adversity<br>It furthers one to be persevering."
  },
  "101011": {
    title: "37. Chia Jên / The Family [The Clan]",
    text: "The family. The perseverance of the woman furthers."
  },
  "110101": {
    title: "38. K'uei / Opposition",
    text: "Opposition. In small matters, good fortune."
  },
  "001010": {
    title: "39. Chien / Obstruction",
    text: "Obstruction. The southwest furthers.<br>The northeast does not further.<br>It furthers one to see the great leader.<br>Perseverance brings good fortune."
  },
  "010100": {
    title: "40. Hsieh / Deliverance",
    text: "Deliverance. The southwest furthers.<br>If there is no longer anything where one has to go,<br>Return brings good fortune.<br>If there is still something where one has to go,<br>Hastening brings good fortune."
  },
  "110001": {
    title: "41. Sun / Decrease",
    text: "Decrease combined with sincerity<br>Brings about supreme good fortune<br>Without blame.<br>One may be persevering in this.<br>It furthers one to undertake something.<br>How is this to be carried out?<br>One may use two small bowls for the sacrifice."
  },
  "100011": {
    title: "42. I / Increase",
    text: "Increase. It furthers one<br>To undertake something.<br>It furthers one to cross the great water."
  },
  "111110": {
    title: "43. Kuai / Break-through (Resoluteness)",
    text: "Break-through. One must resolutely make the matter known<br>At the court of the ruler.<br>It must be announced truthfully. Danger.<br>It is necessary to notify one's own city.<br>It does not further to resort to arms.<br>It furthers one to undertake something."
  },
  "011111": {
    title: "44. Kou / Coming to Meet",
    text: "Coming to meet. The maiden is powerful.<br>One should not marry such a maiden.<br><br><h5>*There's no good way to rewrite this one...</h5>"
  },
  "000110": {
    title: "45. Ts'ui / Gathering Together [Massing]",
    text: "Gathering together. Success.<br>The ruler approaches the temple.<br>It furthers one to see the great leader.<br>This brings success. Perseverance furthers.<br>To bring great offerings creates good fortune.<br>It furthers one to undertake something."
  },
  "011000": {
    title: "46. Shêng / Pushing Upward",
    text: "Pushing upward has supreme success.<br>One must see the great leader.<br>Fear not.<br>Departure toward the south<br>Brings good fortune."
  },
  "010110": {
    title: "47. K'un / Oppression (Exhaustion)",
    text: "Oppression. Success. Perseverance.<br>The great person brings about good fortune.<br>No blame.<br>.When one has something to say,<br>It is not believed."
  },
  "011010": {
    title: "48. Ching / The Well",
    text: "The well. The town may be changed.<br>But the well cannot be changed.<br>It neither decreases nor increase.<br>They come and go and draw from the well.<br>If one gets down almost to the water<br>And the rope does not go all the way,<br>Or the jug breaks, it brings misfortune."
  },
  "101110": {
    title: "49. Ko / Revolution (Molting)",
    text: "Revolution. On your own day<br>You are believed.<br>Supreme success,<br>Furthering through perseverance.<br>Remorse disappears."
  },
  "011101": {
    title: "50. Ting / The Caldron",
    text: "The caldron. Supreme good fortune.<br>Success."
  },
  "100100": {
    title: "51. Chên / The Arousing (Shock, Thunder)",
    text: "Shock brings success.<br>Shock comes--oh, oh!<br>Laughing words--ha, ha!<br>The shock terrifies for a hundred miles,<br>And he does not let fall the sacrificial spoon and chalice."
  },
  "001001": {
    title: "52. Kên / Keeping Still, Mountain",
    text: "Keeping still. Keeping one's back still<br>So that one no longer feels one's body.<br>One goes into one's courtyard<br>And does not see one's people.<br>No blame."
  },
  "001011": {
    title: "53. Chien / Development (Gradual Progress)",
    text: "Development. The young one<br>Is given in marriage.<br>Good fortune.<br>Perseverance furthers."
  },
  "110100": {
    title: "54. Kuei Mei / The Marrying Maiden",
    text: "The marrying maiden.<br>Undertakings bring misfortune.<br>Nothing that would further."
  },
  "101100": {
    title: "55. Fêng / Abundance [Fullness]",
    text: "Abundance has success.<br>The ruler attains abundance.<br>Be not sad.<br>Be like the sun at midday."
  },
  "001101": {
    title: "56. Lü / The Wanderer",
    text: "The wanderer. Success through smallness.<br>Perseverance brings good fortune<br>To the wanderer."
  },
  "011011": {
    title: "57. Sun / The Gentle (The Penetrating, Wind)",
    text: "The gentle. Success through what is small.<br>It furthers one to have somewhere to go.<br>It furthers one to see the great leader."
  },
  "110110": {
    title: "58. Tui / The Joyous, Lake",
    text: "The joyous. Success.<br>Perseverance is favorable."
  },
  "010011": {
    title: "59. Huan / Dispersion [Dissolution]",
    text: "Dispersion. Success.<br>The ruler approaches the temple.<br>It furthers one to cross the great water.<br>Perseverance furthers."
  },
  "110010": {
    title: "60. Chieh / Limitation",
    text: "Limitation. Success.<br>Galling limitation must not be persevered in."
  },
  "110011": {
    title: "61. Chung Fu / Inner Truth",
    text: "Inner truth. Pigs and fishes.<br>Good fortune.<br>It furthers one to cross the great water.<br>Perseverance furthers."
  },
  "001100": {
    title: "62. Hsiao Kuo / Preponderance of the Small",
    text: "Preponderance of the small. Success.<br>Perseverance furthers.<br>Small things may be done; great things should not be done.<br>The flying bird brings the message:<br>It is not well to strive upward,<br>It is well to remain below.<br>Great good fortune."
  },
  "101010": {
    title: "63. Chi Chi / After Completion",
    text: "After completion. Success in small matters.<br>Perseverance furthers.<br>At the beginning good fortune,<br>At the end disorder."
  },
  "010101": {
    title: "64. Wei Chi / Before Completion",
    text: "Before completion. Success.<br>But if the little fox, after nearly completing the crossing,<br>Gets his tail in the water,<br>There is nothing that would further."
  }};

function readHexagram(simple_results){
  $('#hexagram-text').html("<h1>"+hexagrams[simple_results]["title"]+"</h1><h3>"+hexagrams[simple_results]["text"]+"</h3>");
}