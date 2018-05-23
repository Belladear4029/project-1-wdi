$(() => {
  //VARIABLES

  const timings1 = [329.67033, 659.340659, 1978.02198, 3296.7033, 5274.72527];
  const timings2 = [1318.68132, 1978.02198, 3296.7033, 4615.38462, 6593.40659];
  const timings3 = [3956.04396, 4615.38462, 5934.06593];
  const timings4 = [329.67033, 659.340659, 2637.36264, 5934.06593];

  const $target1 = $('#1');
  const $target2 = $('#2');
  const $target3 = $('#3');
  const $target4 = $('#4');

  const $target5 = $('#5');
  const $target6 = $('#6');
  const $target7 = $('#7');
  const $target8 = $('#8');
  const $2PTargets = $('.two-targets');

  const $1and2PTargets = $('.one-and-two-targets');

  let $ballsArray = [];

  const $buttons = $('.buttons');
  const $1playerButton = $('#player-1');
  const $2playerButton = $('#player-2');

  const $comment1 = $('#comment1');
  const $comment2 = $('#comment2');
  const $comment3 = $('#comment3');
  const $comment4 = $('#comment4');

  const $comment5 = $('#comment5');
  const $comment6 = $('#comment6');
  const $comment7 = $('#comment7');
  const $comment8 = $('#comment8');

  const $1and2PComments = $('.one-and-two-comments');

  const $enterName = $('.enter-name');
  const $enterName2 = $('.enter-name-2');
  const $input = $('#name-input');
  const $input2 = $('#name-input-2');
  const $submitName = $('#go');
  const $submitName2 = $('#go-2');
  const $player1Name = $('#player-1-name');
  const $player2Name = $('#player-2-name');
  const $displayName = $('#name');
  const $displayName2 = $('#name-2');

  const $chooseKeys = $('.choose-keys');
  const $2PKeys = $('.player-2-keys');
  const $keyInputs = $('.key-inputs');
  const $keyInputs1 = $('.player-1-keys');
  const $key1 = $('#key1');
  const $key2 = $('#key2');
  const $key3 = $('#key3');
  const $key4 = $('#key4');
  const $key5 = $('#key5');
  const $key6 = $('#key6');
  const $key7 = $('#key7');
  const $key8 = $('#key8');
  const $submitKeys = $('#play');
  const $submitKeys2 = $('#play-2');
  const $audio = $('#audio');
  const $scoreboards = $('.scoreboards');
  const $scoreboard2 = $('.scoreboard2');
  const $score = $('.score1');
  const $score2 = $('.score2');
  const $displayWinner = $('#winner');
  let score = 0;
  let score2 = 0;

  //AUDIO

  function sound(){
    $audio.src = './Red_Hot_Chili_Peppers _Cant Stop.mp3';
    $audio.get(0).play();
  }

  //1 or 2 PLAYER

  $buttons.show();
  $1and2PTargets.hide();
  $scoreboards.hide();
  $chooseKeys.hide();
  $enterName.hide();
  $enterName2.hide();
  $displayWinner.hide();

  //1 PLAYER

  $1playerButton.on('click', function(){
    $enterName.show();
    $input.show().focus();
    $buttons.remove();
  });

  //ENTER NAME

  $submitName.on('click', function(){
    $chooseKeys.show();
    $2PKeys.hide();
    $player1Name.text($input.val());
    $key1.focus();
    $enterName.remove();
  });

  $input.keydown(function(e){
    if(e.keyCode === 13){
      $submitName.click();
    }
  });

  $keyInputs.keyup(function(){
    if($(this).val().length === 1){
      $(this).next().focus();
    }
  });

  $keyInputs1.keydown(function(e){
    if(e.keyCode === 13){
      $submitKeys.click();
    }
  });

  //START GAME

  $submitKeys.on('click', function(){
    sound();
    $chooseKeys.remove();
    $1and2PTargets.show();
    $2PTargets.hide();
    $scoreboards.show();
    $scoreboard2.hide();
    $displayName.html($input.val());
  });

  //FIREBALL

  function fireBall(target){
    const $ball = $('<div>');
    $ball.addClass('balls');
    $ball.appendTo('.targets');
    $ball.css('left', `${target.position().left}px`);
    $ballsArray.push($ball);

    const intervalId = setInterval(function(){
      $ball.css('top', '-=1px');

      if ($ball.position().top + $ball.height() === 0) {
        $ball.remove();
        $ballsArray = $ballsArray.filter(function(ball) {
          return !(ball === $ball);
        });
        clearInterval(intervalId);
      }
    }, 5);
  }

  //COLLISION

  function ballCollides(i, target, accuracy){
    const collidesAbove = $ballsArray[i].offset().top < target.offset().top + target.height()/accuracy;
    const collidesBelow = $ballsArray[i].offset().top + $ballsArray[i].height()/accuracy > target.offset().top;
    const collidesLeft = $ballsArray[i].offset().left < target.offset().left + target.width()/accuracy;
    const collidesRight = $ballsArray[i].offset().left + $ballsArray[i].width()/accuracy > target.offset().left;
    return collidesAbove && collidesBelow && collidesLeft && collidesRight;
  }

  //EFFECT OF COLLISION

  function collisionEffect(ballNumber, target, playerNumber, score, commentElement){
    increaseScoreBy(playerNumber, score);
    $ballsArray[ballNumber].remove();
    target.css('box-shadow', '0 0 20px #f5f3ce');
    setTimeout(function(){
      target.css('box-shadow', 'none');
    }, 500);
    commentElement.text('Perfect!');
    setTimeout(function(){
      commentElement.fadeOut();
    }, 1000);
  }

  //COLLSION DETECTION

  function detectCollision(target, commentElement, playerNumber){
    for (let i = 0; i < $ballsArray.length; i++){
      if (ballCollides(i, target, 3)) {
        collisionEffect(i, target, playerNumber, 3, commentElement);
      } else if (ballCollides(i, target, 2)) {
        collisionEffect(i, target, playerNumber, 2, commentElement);
      } else if (ballCollides(i, target, 1)){
        collisionEffect(i, target, playerNumber, 1, commentElement);
      }
    }
  }

  //GET KEYCODE

  function getKeyValue(key){
    return key.val().toUpperCase().charCodeAt(0);
  }

  //KEYDOWN COLLISION MATCH

  $(document).on('keydown', function(e){
    switch(e.which){
      case getKeyValue($key1):
        detectCollision($target1, $comment1, 1);
        break;
      case getKeyValue($key2):
        detectCollision($target2, $comment2, 1);
        break;
      case getKeyValue($key3):
        detectCollision($target3, $comment3, 1);
        break;
      case getKeyValue($key4):
        detectCollision($target4, $comment4, 1);
        break;
      case getKeyValue($key5):
        detectCollision($target5, $comment5, 2);
        break;
      case getKeyValue($key6):
        detectCollision($target6, $comment6, 2);
        break;
      case getKeyValue($key7):
        detectCollision($target7, $comment7, 2);
        break;
      case getKeyValue($key8):
        detectCollision($target8, $comment8, 2);
    }
  });

  //INTERVALS

  function ballIntervals(timings, target, duration) {
    const runGame = setInterval(function(){
      for (let i = 0; i < timings.length; i++) {
        setTimeout(function(){
          fireBall(target);
        }, timings[i]);
      }
    }, duration);
    //END GAME
    setTimeout(function() {
      clearInterval(runGame);
      setTimeout(function(){
        $displayWinner.show();
        if (score > score2) {
          $displayWinner.html(`${$input.val()} wins!`);
        } else if (score2 > score) {
          $displayWinner.html(`${$input2.val()} wins!`);
        } else if (score === score2){
          $displayWinner.html('It\'s a draw!');
        }
      }, 5000);
    }, 20000);
  }

  $submitKeys.on('click', function() {
    ballIntervals(timings1, $target1, 7252.74725);
    ballIntervals(timings2, $target2, 7252.74725);
    ballIntervals(timings3, $target3, 7252.74725);
    ballIntervals(timings4, $target4, 7252.74725);
  });

  //SCORE

  function increaseScoreBy(playerNumber, number){
    if (playerNumber === 1){
      score += number;
      $score.text(score);
    } else if (playerNumber === 2){
      score2 += number;
      $score2.text(score2);
    }
  }

  //2 PLAYER

  $2playerButton.on('click', function(){

    $buttons.remove();
    $enterName.show();
    $input.focus();

    $submitName.on('click', function(){
      $enterName2.show();
      $input2.focus();
      $chooseKeys.hide();

      $submitName2.on('click', function(){
        $chooseKeys.show();
        $key1.focus();
        $2PKeys.show();
        $submitKeys.hide();
        $enterName2.remove();
        $player1Name.text($input.val());
        $player2Name.text($input2.val());

      });

    });
  });

  $enterName2.keydown(function(e){
    if(e.keyCode === 13){
      $submitName2.click();
    }
  });

  $keyInputs.keydown(function(e){
    if(e.keyCode === 13){
      $submitKeys2.click();
    }
  });

  $submitKeys2.on('click', function(){
    sound();
    $chooseKeys.remove();
    $1and2PTargets.show();
    $1and2PComments.show();
    $scoreboards.show();
    $displayName.html($input.val());
    $displayName2.html($input2.val());

    ballIntervals(timings1, $target1, 7252.74725);
    ballIntervals(timings2, $target2, 7252.74725);
    ballIntervals(timings3, $target3, 7252.74725);
    ballIntervals(timings4, $target4, 7252.74725);
    ballIntervals(timings1, $target5, 7252.74725);
    ballIntervals(timings2, $target6, 7252.74725);
    ballIntervals(timings3, $target7, 7252.74725);
    ballIntervals(timings4, $target8, 7252.74725);
  });


});
