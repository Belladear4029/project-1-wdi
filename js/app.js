$(() => {

  function fireBall(){
    const $ball = $('<div></div>');
    $ball.addClass('ball');
    $ball.appendTo('.circles');
    setInterval(function(){
      $ball.css('top', '-=1px');
    }, 5);
  }

  fireBall();

//function collision

//function checkForMatch

//function scoreIncrease


});
