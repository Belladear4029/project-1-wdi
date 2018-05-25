$(() => {

  //VARIABLES
  const arrayOfObjects = [
    {
      timing: [329.67033, 659.340659, 1978.02198, 3296.7033, 5274.72527],
      target: $('#1'),
      key: $('#key1'),
      comment: $('#comment1'),
      player: 1,
      control: $('#control1')
    },
    {
      timing: [1318.68132, 1978.02198, 3296.7033, 4615.38462, 6593.40659],
      target: $('#2'),
      key: $('#key2'),
      comment: $('#comment2'),
      player: 1,
      control: $('#control2')
    },
    {
      timing: [3956.04396, 4615.38462, 5934.06593],
      target: $('#3'),
      key: $('#key3'),
      comment: $('#comment3'),
      player: 1,
      control: $('#control3')
    },
    {
      timing: [329.67033, 659.340659, 2637.36264, 5934.06593],
      target: $('#4'),
      key: $('#key4'),
      comment: $('#comment4'),
      player: 1,
      control: $('#control4')
    },
    {
      timing: [329.67033, 659.340659, 1978.02198, 3296.7033, 5274.72527],
      target: $('#5'),
      key: $('#key5'),
      comment: $('#comment5'),
      player: 2
    },
    {
      timing: [1318.68132, 1978.02198, 3296.7033, 4615.38462, 6593.40659],
      target: $('#6'),
      key: $('#key6'),
      comment: $('#comment6'),
      player: 2
    },
    {
      timing: [3956.04396, 4615.38462, 5934.06593],
      target: $('#7'),
      key: $('#key7'),
      comment: $('#comment7'),
      player: 2
    },
    {
      timing: [329.67033, 659.340659, 2637.36264, 5934.06593],
      target: $('#8'),
      key: $('#key8'),
      comment: $('#comment8'),
      player: 2
    }
  ];

  const $audio = $('#audio');
  const $gameName = $('h1');
  const $1and2PTargets = $('.one-and-two-targets');
  const $1PTargets = $('.targets');
  const $2PTargets = $('.two-targets');

  const $mobileControls = $('.controls');

  const $buttons = $('.buttons');
  const $button = $('.button');
  const $1playerButton = $('#player-1');
  const $2playerButton = $('#player-2');

  const $1and2PComments = $('.one-and-two-comments');
  const $player1Comments = $('.comments');
  const $player2Comments = $('.two-comments');

  const $enterName = $('#enter-name-1');
  const $enterName2 = $('#enter-name-2');
  const $input = $('#name-input-1');
  const $input2 = $('#name-input-2');
  const $submitName = $('#go-1');
  const $submitName2 = $('#go-2');
  const $player1Name = $('#player-1-name');
  const $player2Name = $('#player-2-name');
  const $displayName = $('#name-1');
  const $displayName2 = $('#name-2');

  const $chooseKeys = $('.choose-keys');
  const $2PKeys = $('.player-2-keys');
  const $keyInputs = $('.key-inputs');
  const $keyInputs1 = $('.player-1-keys');
  const $key1 = $('#key1');
  const $submitKeys = $('#play-1');
  const $submitKeys2 = $('#play-2');
  const $keysAndButton = $('.keys-and-button');
  const $scoreboards = $('.scoreboards');
  const $scoreboard2 = $('.scoreboard2');
  const $score = $('.score1');
  const $score2 = $('.score2');
  const $displayWinner = $('#winner');

  let $ballsArray = [];
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
  $mobileControls.hide();

  //1 PLAYER

  $1playerButton.on('click', function(){
    $enterName.show();
    $input.show().focus();
    $buttons.remove();
    $gameName.remove();
  });

  //ENTER NAME

  $submitName.on('click', function(){
    $chooseKeys.show();
    $2PKeys.hide();
    $submitKeys2.hide();
    $player1Name.text($input.val());
    $key1.focus();
    $enterName.remove();
    $player2Name.hide();
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

  $keyInputs.keydown(function(e){
    if (e.keyCode === 8) {
      $(this).prev().focus();
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
    $player1Comments.show();
    $player2Comments.hide();
    $displayName.html($input.val());
    $displayName2.remove();
  });

  //FIREBALL

  function fireBall(target){
    const $ball = $('<div>');
    $ball.addClass('balls');
    $ball.appendTo('.targets');
    $ball.css('left', `${target.position().left}px`);
    if($.isMobile){
      $ball.css({'height': '80px', 'width': '80px'});
    }
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

  function collisionEffect(ballNumber, target, playerNumber, score, commentElement, comment){
    increaseScoreBy(playerNumber, score);
    $ballsArray[ballNumber].remove();
    target.css('box-shadow', '0 0 20px #f5f3ce');
    setTimeout(function(){
      target.css('box-shadow', 'none');
    }, 500);
    commentElement.text(comment);
    setTimeout(function(){
      commentElement.fadeOut(200, function(){
        $(this).css({'display': 'block'}).text('');
      });
    }, 200);
  }

  //COLLSION DETECTION

  function detectCollision(target, commentElement, playerNumber){
    for (let i = 0; i < $ballsArray.length; i++){
      if (ballCollides(i, target, 3)) {
        collisionEffect(i, target, playerNumber, 3, commentElement, 'Perfect!');
      } else if (ballCollides(i, target, 2)) {
        collisionEffect(i, target, playerNumber, 2, commentElement, 'Good!');
      } else if (ballCollides(i, target, 1)){
        collisionEffect(i, target, playerNumber, 1, commentElement, 'Ok!');
      }
    }
  }

  //GET KEYCODE

  function getKeyValue(key){
    return key.val().toUpperCase().charCodeAt(0);
  }

  //KEYDOWN COLLISION MATCH

  $(document).on('keydown', function(e){
    for (let i = 0; i < arrayOfObjects.length; i++) {
      switch(e.which){
        case getKeyValue(arrayOfObjects[i].key):
          detectCollision(arrayOfObjects[i].target, arrayOfObjects[i].comment, arrayOfObjects[i].player);
          break;
      }
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
        if (score2 === 0 && score > 100){
          $displayWinner.html('Good job!');
        } else if (score2 === 0 && score < 100){
          $displayWinner.html('Better luck next time!');
        } else if (score > score2) {
          $displayWinner.html(`${$input.val()} wins!`);
        } else if (score2 > score) {
          $displayWinner.html(`${$input2.val()} wins!`);
        } else if (score === score2) {
          $displayWinner.html('It\'s a draw!');
        }
        $audio.animate({volume: 0}, 5000);
      }, 8000);
    }, 40000);
  }

  $submitKeys.on('click', function() {
    for (let i = 0; i < arrayOfObjects.length/2; i++) {
      ballIntervals(arrayOfObjects[i].timing, arrayOfObjects[i].target, 7252.74725);
    }
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
    $gameName.remove();

    $submitName.on('click', function(){
      $enterName2.show();
      $input2.focus();
      $chooseKeys.hide();

      $submitName2.on('click', function(){
        $player2Name.show();
        $chooseKeys.show();
        $key1.focus();
        $2PKeys.show();
        $submitKeys2.show();
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

  $keysAndButton.keydown(function(e){
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

    for (let i = 0; i < arrayOfObjects.length; i++) {
      ballIntervals(arrayOfObjects[i].timing, arrayOfObjects[i].target, 7252.74725);
    }
  });



  //MOBILE MODE

  if($.isMobile){
    $('*').css({'border-sizing': 'border-box'});
    $('body').css({'height': '2250px', 'width': '110%', 'background-position': 'center'});
    $gameName.css({'font-size': '230px', 'text-shadow': '#000 0px 0px 15px'});
    $buttons.css({'top': '900px','width': '110%'});
    $button.css({'height': '80px', 'width': '550px', 'border': '10px solid rgba(0, 49, 82, .8)', 'margin': '30px auto', 'font-size': '30px', 'line-height': '60px'});
    $enterName.css({'margin-top': '800px'});
    $input.css({'height': '70px', 'width': '300px', 'font-size': '30px'});
    $submitName.css({'font-size': '30px', 'height': '70px', 'width': '150px', 'line-height': '70px'});
    $('.player').css({'line-height': '70px'});
    $mobileControls.css({'margin-top': `${$(window).height() - 700}px`});
    $1PTargets.css({'width': '100%', 'margin-top': '70px', 'height': '100px'});
    $('.one-player-targets').css({'height': '80px'});
    $('.one-player-targets').css({'width': '80px'});
    $displayName.css({'font-size': '80px'});
    $scoreboards.css({'font-size': '80px', 'margin-top': '50px', 'color': 'rgba(0, 49, 82, .8)'});
    $player1Comments.css({'font-size': '50px'});

    $submitName.on('click', function() {
      sound();
      $chooseKeys.remove();
      $1and2PTargets.show();
      $2PTargets.hide();
      $scoreboards.show();
      $scoreboard2.hide();
      $player1Comments.show();
      $player2Comments.hide();
      $displayName.html($input.val());
      $displayName2.remove();
      $mobileControls.show();

      for (let i = 0; i < arrayOfObjects.length/2; i++) {
        ballIntervals(arrayOfObjects[i].timing, arrayOfObjects[i].target, 7252.74725);
      }

    });

    for (let i = 0; i < arrayOfObjects.length; i++) {
      arrayOfObjects[i].control.on('click', function(){
        detectCollision(arrayOfObjects[i].target, arrayOfObjects[i].comment, arrayOfObjects[i].player);
      });
    }
  }

});
