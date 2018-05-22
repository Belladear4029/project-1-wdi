$(() => {
  const timings1 = [329.67033, 659.340659, 1978.02198, 3296.7033, 5274.72527];
  const timings2 = [1318.68132, 1978.02198, 3296.7033, 4615.38462, 6593.40659];
  const timings3 = [3956.04396, 4615.38462, 5934.06593];
  const timings4 = [329.67033, 659.340659, 2637.36264, 5934.06593];

  const $target1 = $('#1');
  const $target2 = $('#2');
  const $target3 = $('#3');
  const $target4 = $('#4');
  const $targets = $('.targets');

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

  const $comments = $('.comments');
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
  const $1PKeys = $('.player-1-keys');
  const $2PKeys = $('.player-2-keys');
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
  const $scoreboard = $('.scoreboard');
  const $score = $('.score');
  let score = 0;


  //AUDIO

  function sound(){
    $audio.src = './Red_Hot_Chili_Peppers _Cant Stop.mp3';
    $audio.get(0).play();
  }

  //1 or 2 PLAYER

  $buttons.show();
  $1and2PTargets.hide();
  $scoreboard.hide();
  $chooseKeys.hide();
  $enterName.hide();
  $enterName2.hide();

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

  // $key1.keydown(function(){
  //   if($key1.val().length === this.maxlength) {
  //     $key2.focus();
  //   }
  // });

  $input.keydown(function(e){
    if(e.keyCode === 13){
      $submitName.click();
    }
  });

  //START GAME

  $submitKeys.on('click', function(){
    sound();
    $chooseKeys.remove();
    $1and2PTargets.show();
    $2PTargets.hide();
    $scoreboard.show();
    $displayName.html($input.val());
  });

  $chooseKeys.keydown(function(e){
    if(e.keyCode === 13){
      $submitKeys.click();
    }
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
        increaseScoreBy(-1);
        $ball.remove();
        $ballsArray = $ballsArray.filter(function(ball) {
          return !(ball === $ball);
        });
        clearInterval(intervalId);
      }
    }, 5);
  }

  //COLLISION DETECTION

  function collisionDetection(target, comment){
    for (let i = 0; i < $ballsArray.length; i++){
      if ($ballsArray[i].offset().top < target.offset().top + target.height()/3 &&
      $ballsArray[i].offset().top + $ballsArray[i].height()/3 > target.offset().top &&
      $ballsArray[i].offset().left < target.offset().left + target.width()/3 &&
      $ballsArray[i].offset().left + $ballsArray[i].width()/3 > target.offset().left) {
        increaseScoreBy(3);
        $ballsArray[i].remove();
        target.css('box-shadow', '0 0 20px #f5f3ce');
        setTimeout(function(){
          target.css('box-shadow', 'none');
        }, 500);
        comment.text('Perfect!');
        setTimeout(function(){
          comment.fadeOut();
        }, 1000);
      } else if ($ballsArray[i].offset().top < target.offset().top + target.height()/2 &&
      $ballsArray[i].offset().top + $ballsArray[i].height()/2 > target.offset().top &&
      $ballsArray[i].offset().left < target.offset().left + target.width()/2 &&
      $ballsArray[i].offset().left + $ballsArray[i].width()/2 > target.offset().left) {
        increaseScoreBy(2);
        $ballsArray[i].remove();
        target.css('box-shadow', '0 0 10px #f5f3ce');
        setTimeout(function(){
          target.css('box-shadow', 'none');
        }, 500);
        comment.text('Good!');
        setTimeout(function(){
          comment.fadeOut();
        }, 1000);
      } else if ($ballsArray[i].offset().top < target.offset().top + target.height() &&
      $ballsArray[i].offset().top + $ballsArray[i].height() > target.offset().top &&
      $ballsArray[i].offset().left < target.offset().left + target.width() &&
      $ballsArray[i].offset().left + $ballsArray[i].width() > target.offset().left){
        increaseScoreBy(1);
        $ballsArray[i].remove();
        target.css('box-shadow', '0 0 5px #f5f3ce');
        setTimeout(function(){
          target.css('box-shadow', 'none');
        }, 500);
        comment.text('Ok!');
        setTimeout(function(){
          comment.fadeOut();
        }, 1000);
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
        collisionDetection($target1, $comment1);
        break;
      case getKeyValue($key2):
        collisionDetection($target2, $comment2);
        break;
      case getKeyValue($key3):
        collisionDetection($target3, $comment3);
        break;
      case getKeyValue($key4):
        collisionDetection($target4, $comment4);
        break;
      case getKeyValue($key5):
        collisionDetection($target5, $comment5);
        break;
      case getKeyValue($key6):
        collisionDetection($target6, $comment6);
        break;
      case getKeyValue($key7):
        collisionDetection($target7, $comment7);
        break;
      case getKeyValue($key8):
        collisionDetection($target8, $comment8);
    }
  });

  //INTERVALS

  function ballIntervals(timings, target, duration) {
    setInterval(function(){
      for (let i = 0; i < timings.length; i++) {
        setTimeout(function(){
          fireBall(target);
        }, timings[i]);
      }
    }, duration);
  }

  $submitKeys.on('click', function() {
    ballIntervals(timings1, $target1, 7252.74725);
    ballIntervals(timings2, $target2, 7252.74725);
    ballIntervals(timings3, $target3, 7252.74725);
    ballIntervals(timings4, $target4, 7252.74725);
  });


  //SCORE

  function increaseScoreBy(number){
    score += number;
    $score.text(score);
  }

  //2 PLAYER

  $2playerButton.on('click', function(){

    $buttons.remove();
    $enterName.show();
    $input.focus();

    $submitName.on('click', function(){
      $input2.show().focus();
      $enterName2.show();
      $chooseKeys.hide();

      $submitName2.on('click', function(){
        $chooseKeys.show();
        $submitKeys.hide();
        $2PKeys.show();
        $enterName2.remove();
        $player1Name.text($input.val());
        $player2Name.text($input2.val());
      });
    });
  });

  $submitKeys2.on('click', function(){
    $chooseKeys.remove();
    $1and2PTargets.show();
    $1and2PComments.show();
    $displayName.text($input.val());
    $displayName2.text($input2.val());

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
