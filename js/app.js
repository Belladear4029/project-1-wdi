$(() => {
  const timings1 = [500, 1000, 3000, 5000, 8000];
  const timings2 = [2000, 3000, 5000, 7000, 10000];
  const timings3 = [6000, 7000, 9000];
  const timings4 = [500, 1000, 4000, 9000];

  const $target1 = $('#1');
  const $target2 = $('#2');
  const $target3 = $('#3');
  const $target4 = $('#4');



  //fireball function

  function fireBall(target){
    const $ball = $('<div></div>');
    $ball.addClass('balls');
    $ball.appendTo('.targets');
    $ball.css('left', `${target.position().left}px`);

    const intervalId = setInterval(function(){
      $ball.css('top', '-=1px');

      //first collision

      const $ballOffset = $ball.offset();
      const $targetOffset = target.offset();

      if ($ballOffset.top < $targetOffset.top + target.height()) {
        console.log('collision detected');
      }

      if ($ball.position().top+$ball.height() === 0) {
        $ball.remove();
        clearInterval(intervalId);

      }
    }, 5);
  }


  //intervals

  setInterval(function(){
    for (let i = 0; i < timings1.length; i++) {
      setTimeout(function(){
        fireBall($target1);
      }, timings1[i]);
    }
  }, 1000);

  setInterval(function(){
    for (let i = 0; i < timings2.length; i++) {
      setTimeout(function(){
        fireBall($target2);
      }, timings2[i]);
    }
  }, 10000);

  setInterval(function(){
    for (let i = 0; i < timings3.length; i++) {
      setTimeout(function(){
        fireBall($target3);
      }, timings3[i]);
    }
  }, 10000);

  setInterval(function(){
    for (let i = 0; i < timings4.length; i++) {
      setTimeout(function(){
        fireBall($target4);
      }, timings4[i]);
    }
  }, 10000);


  //function centre collision


  //function checkForMatch

  //function scoreIncrease


});
