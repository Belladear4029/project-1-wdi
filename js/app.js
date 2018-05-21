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
  const $ballsArray = [];

  const $submitName = $('#submitName');
  const $input = $('#name-input');
  const $name = $('#name');
  const $chooseKeys = $('.choose-keys');
  const $key1 = $('#key1');
  const $key2 = $('#key2');
  const $key3 = $('#key3');
  const $key4 = $('#key4');
  const $submitKeys = $('#submitKeys');
  const $scoreboard = $('.scoreboard');
  const $score = $('.score');
  let score = 0;



  //enter name
  //
  // $targets.hide();
  // $scoreboard.hide();
  // $chooseKeys.hide();
  // $submitKeys.hide();
  //
  // $submitName.on('click', function(){
  //   $chooseKeys.show();
  //   $submitKeys.show();
  //   $submitName.hide();
  //   $input.hide();
  // });

  //enter keys

  // $submitKeys.on('click', function(){
  //   $chooseKeys.hide();
  //   $submitKeys.hide();
  //   $submitKeys.hide();
  //   $scoreboard.show();
  //   $targets.show();
  //   $submitName.hide();
  //   $input.hide();
  //   $name.html($input.val());
  // });

  //fireball function

  function fireBall(target){
    const $ball = $('<div></div>');
    $ball.addClass('balls');
    $ball.appendTo('.targets');
    $ball.css('left', `${target.position().left}px`);
    $ballsArray.push($ball);

    const intervalId = setInterval(function(){
      $ball.css('top', '-=1px');

      if ($ball.position().top + $ball.height() === 0) {
        $ballsArray.shift();
        clearInterval(intervalId);
      }
    }, 5);
  }


  //function check for collision

  function collisionDetection(target){
    for (let i = 0; i < $ballsArray.length; i++){
      if ($ballsArray[i].offset().top < target.offset().top + target.height()/2 &&
      $ballsArray[i].offset().top + $ballsArray[i].height()/2 > target.offset().top &&
      $ballsArray[i].offset().left < target.offset().left + target.width()/2 &&
      $ballsArray[i].offset().left + $ballsArray[i].width()/2 > target.offset().left) {
        increaseScoreBy2();
        console.log('Perfect!');
      } else if ($ballsArray[i].offset().top < target.offset().top + target.height() &&
      $ballsArray[i].offset().top + $ballsArray[i].height() > target.offset().top &&
      $ballsArray[i].offset().left < target.offset().left + target.width() &&
      $ballsArray[i].offset().left + $ballsArray[i].width() > target.offset().left){
        increaseScoreBy1();
        console.log('Good!');
      }
    }
  }

  $(document).on('keydown', function(e){
    switch(e.which){
      case 65:
        collisionDetection($target1);
        break;
      case 83:
        collisionDetection($target2);
        break;
      case 68:
        collisionDetection($target3);
        break;
      case 70:
        collisionDetection($target4);
    }
  });


  //intervals
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


  //function scoreIncrease

  function increaseScoreBy1(){
    score++;
    $score.text(score);
  }

  function increaseScoreBy2(){
    score += 2;
    $score.text(score);
  }

  //function centre collision

});
