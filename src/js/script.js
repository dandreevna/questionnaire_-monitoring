//!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);
$(function(){

    //Модальное окно
  
      let $modal_inputs = $('#modal_form .check');
      var modal = document.getElementById('myModal');

      $("#btn_modal_form").click(function (e) {

        let err = false;

        for(let i = 0; i < $modal_inputs.length; i++){
          let val = $modal_inputs[i].value.trim();
          let validation = $modal_inputs[i].dataset.validation;
          let pattern = (validation in patterns) ? patterns[validation] : /.*/;

          if(pattern.test(val)){
            $modal_inputs[i].classList.remove('err');
          }
          else{
            err = true;
            $modal_inputs[i].classList.add('err');
          }
        }

        if(err){
          e.preventDefault();
        }else{
          sendAjaxForm('result_form', 'modal_form', '/php/mail.php');
          modal.style.display = "none";
          return false;
        }

      }); 

      var modal = document.getElementById('myModal');
      var span = document.getElementsByClassName("close")[0];
      $(".btn_modal").click(function () {
        modal.style.display = "block";
      });

      span.onclick = function () {
        modal.style.display = "none";
      };

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };


	let question = 1;

  //слайдер
    let $amount = $( ".kalk6 #amount" );
      let $slider = $( ".kalk6 #slider-range-min" );

    $slider.slider({
          range: "min",
          value: 1,
          min: 1,
          max: 150,
          slide: function( event, ui ) {
              $amount.val( ui.value );
              calc_res();
          }
      });

      $amount.val( $slider.slider( "value" ) );

      $amount.change(function() {
          let val = $(this).val();
          $slider.slider("value",val);       
      });

//изменение количества
    function calc_res() {
        let val = $amount.val();
        $slider.slider("value",val);
        // let repairs = $(".kalk6 .radio_repairs:checked").attr("value");
        // let apartment = $(".kalk6 .radio_apartment:checked").attr("value");
        // let cost = eval(apartment + '_' + repairs);       
        // let res = val*cost;
        // res = res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        // $(".res").html("<b>" + res + "  &#8381</b>");
    }

    // $(".kalk6").on('click',  function(){
    //     calc_res();        
    // }); //end on

    $amount.on('keyup',  function(){      
        if ($amount.val()>150){
            $amount.val(150);
            calc_res();
        }else{
            calc_res();
        }       
    }); //end on

	//кнопка далее
	$(".kalk6 .next").on('click',  function(){

        if (question!=4){
  
          //записываем первый вопрос в невидимое поле
          let transship_category = $(".kalk6 .question1 .white input[name=transship_category]:checked").val();
          $(".kalk6 .question4 .row .white .q_1").val(transship_category);

          //записываем второй вопрос в невидимое поле
          $(".kalk6 .question4 .row .white .q_2").val($amount.val());

          //записываем третий вопрос в невидимое поле
          let i = 0;
          let tasks = [];
          $(".kalk6 .question3 .white .checkbox:checked").each(function(){
            //alert($(this).val()) ;           
            tasks[i]=$(this).val();
            i++;
          });
          // let tasks = $(".kalk6 .question3 .white .checkbox:checked").val();
          $(".kalk6 .question4 .row .white .q_3").val(tasks);
          //console.log(tasks);
          
          $(".kalk6 .question"+question).css('display','none');
          question = question + 1;
          $(".kalk6 .question"+question).css('display','block');
        }

    }); //end on

	//кнопка назад
    $(".kalk6 .previous").on('click',  function(){

        $(".kalk6  .question"+question).css('display','none');
        question = question - 1;
        $(".kalk6 .question"+question).css('display','block');

    }); //end on

    //кнопка готово
    $(".kalk6 .sent").on('click',  function(){

    	let name = $(".kalk6 .question4 .white input[name=name]").val();
    	let phonenumber = $(".kalk6 .question4 .white input[name=phonenumber]").val();

    	if ((name.length<1)||(phonenumber.length<1)){
    		event.preventDefault();
    		if((name.length<1)&&(phonenumber.length<1)){
    			$(".kalk6 .question4 .white input[name=name]").css('background-color','#FDE0DD');
    			$(".kalk6 .question4 .white input[name=phonenumber]").css('background-color','#FDE0DD');
    		}else if(name.length<1){
    			$(".kalk6 .question4 .white input[name=name]").css('background-color','#FDE0DD');
    		}else if(phonenumber.length<1){
    			$(".kalk6 .question4 .white input[name=phonenumber]").css('background-color','#FDE0DD');
    		}
    	}else{

    		sendAjaxForm('result_form', 'modal_form', '/php/mail.php');
         modal.style.display = "none";
        return false;

    	}

    	
    }); //end on

   

});//end ready


function sendAjaxForm(result_form, ajax_form, url) {
  $.ajax({
    url: url,
    type: "POST",
    dataType: "html",
    data: $("#" + ajax_form).serialize(),
    success: function success(response) {
      var result = $.parseJSON(response);
      if (result.name!=0){
        alert(result.name + ', спасибо за Ваш интерес. В ближайшее время с Вами свяжутся.');
      }else{
         alert('Ошибка. Данные не отправлены');
      }   
    },
    error: function error(response) {
      alert('Ошибка. Данные не отправлены');
    }
  });
}
