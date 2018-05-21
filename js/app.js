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
  let $ballsArray = [];

  const $comment1 = $('#comment1');
  const $comment2 = $('#comment2');
  const $comment3 = $('#comment3');
  const $comment4 = $('#comment4');

  const $submitName = $('#go');
  const $input = $('#name-input');
  const $name = $('#name');
  const $chooseKeys = $('.choose-keys');
  const $key1 = $('#key1');
  const $key2 = $('#key2');
  const $key3 = $('#key3');
  const $key4 = $('#key4');
  const $submitKeys = $('#play');
  const $audio = $('#audio');
  const $scoreboard = $('.scoreboard');
  const $score = $('.score');
  let score = 0;


  //AUDIO
  function sound(){
    $audio.src = './Red_Hot_Chili_Peppers _Cant Stop.mp3';
    $audio.get(0).play();
  }

  //ENTER NAME

  $targets.hide();
  $scoreboard.hide();
  $chooseKeys.hide();
  $submitKeys.hide();

  $submitName.on('click', function(){
    $chooseKeys.show();
    $submitKeys.show();
    $submitName.remove();
    $input.remove();
  });

  //START GAME

  $submitKeys.on('click', function(){
    sound();
    $chooseKeys.remove();
    $submitKeys.remove();
    $submitKeys.remove();
    $submitName.remove();
    $input.remove();
    $scoreboard.show();
    $targets.show();
    $name.html($input.val());
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

  //COLLISION DETECTION

  function collisionDetection(target, comment){
    for (let i = 0; i < $ballsArray.length; i++){
      if ($ballsArray[i].offset().top < target.offset().top + target.height()/3 &&
      $ballsArray[i].offset().top + $ballsArray[i].height()/3 > target.offset().top &&
      $ballsArray[i].offset().left < target.offset().left + target.width()/3 &&
      $ballsArray[i].offset().left + $ballsArray[i].width()/3 > target.offset().left) {
        increaseScoreBy3();
        console.log('Perfect!');
        setTimeout(function(){
          comment.text('Perfect!');
          comment.fadeOut();
        }, 1000);
      }
      if ($ballsArray[i].offset().top < target.offset().top + target.height()/2 &&
      $ballsArray[i].offset().top + $ballsArray[i].height()/2 > target.offset().top &&
      $ballsArray[i].offset().left < target.offset().left + target.width()/2 &&
      $ballsArray[i].offset().left + $ballsArray[i].width()/2 > target.offset().left) {
        increaseScoreBy2();
        console.log('Good!');
        setTimeout(function(){
          comment.text('Good!');
          comment.fadeOut();
        }, 1000);
      } else if ($ballsArray[i].offset().top < target.offset().top + target.height() &&
      $ballsArray[i].offset().top + $ballsArray[i].height() > target.offset().top &&
      $ballsArray[i].offset().left < target.offset().left + target.width() &&
      $ballsArray[i].offset().left + $ballsArray[i].width() > target.offset().left){
        increaseScoreBy1();
        console.log('Ok!');
        setTimeout(function(){
          comment.text('Ok!');
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
    console.log($key1.val().toUpperCase().charCodeAt(0), e.which);
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
    }
  });

  //INTERVALS
  function doStuff(timings, target, duration) {
    setInterval(function(){
      for (let i = 0; i < timings.length; i++) {
        setTimeout(function(){
          fireBall(target);
        }, timings[i]);
      }
    }, duration);
  }

  $submitKeys.on('click', function() {
    doStuff(timings1, $target1, 7252.74725);
  });


  $submitKeys.on('click', function(){
    setInterval(function(){
      for (let i = 0; i < timings1.length; i++) {
        setTimeout(function(){
          fireBall($target1);
        }, timings1[i]);
      }
    }, 7252.74725);

    setInterval(function(){
      for (let i = 0; i < timings2.length; i++) {
        setTimeout(function(){
          fireBall($target2);
        }, timings2[i]);
      }
    }, 7252.74725);

    setInterval(function(){
      for (let i = 0; i < timings3.length; i++) {
        setTimeout(function(){
          fireBall($target3);
        }, timings3[i]);
      }
    }, 7252.74725);

    setInterval(function(){
      for (let i = 0; i < timings4.length; i++) {
        setTimeout(function(){
          fireBall($target4);
        }, timings4[i]);
      }
    }, 7252.74725);
  });


  //SCORES

  function increaseScoreBy1(){
    score++;
    $score.text(score);
  }

  function increaseScoreBy2(){
    score += 2;
    $score.text(score);
  }

  function increaseScoreBy3(){
    score += 3;
    $score.text(score);
  }

});
