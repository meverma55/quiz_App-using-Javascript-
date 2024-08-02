// selecting all required element //
const start_btn =document.querySelector(".start_btn")
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

//if startQuiz button clicked //
start_btn.onclick =()=> {
    info_box.classList.add("activeInfo");       // show info box
}
 // if exitQuix button clicked //
exit_btn.onclick = ()=> {
    info_box.classList.remove("activeInfo");     //hide info box
}
  
// if continueQuiz button clicked//
  continue_btn.onclick = () =>{
    info_box.classList.remove("activeInfo");      //hide into box
    quiz_box.classList.add("activeQuiz");        //show Quiz box
     showQuestions(0);                          //calling showQuestions function 
    queCounter(1);                           // passing 1 parameter to queCounter
    startTimer(10);                        // calling starttimer function
    startTimerLine(0);
   // next_btn.classList.remove("show")
}

let timeValue =10;
let que_count = 0;
let que_numb = 1;
let userScore =0;
let counter;
let counterLine;
let widthValue =0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz =result_box.querySelector(".buttons .quit");

    // getting question and options from arrays //
      function showQuestions(index){
          const que_text =document.querySelector(".que_text");
          console.log(questions);

       const option_list = document.querySelector(".option_list"); 
    // creating a new span and div tag for question and option and passing the value using array index//      
    let que_tag = "<span>"+questions[index].numb +". "+questions[index].question+"</span>";
    let option_tag = '<div class="option">'+questions[index].options[0]+'</div>'
                  +'<div class="option">'+questions[index].options[1] +'</div>'
                  +'<div class="option">'+questions[index].options[2] +'</div>'
                  +'<div class="option">'+questions[index].options[3]+'</div>'
        
     que_text.innerHTML = que_tag;             //adding new span tag inside que_tag//
     option_list.innerHTML = option_tag;       //adding new span tag inside option_tag//
     const option = option_list.querySelectorAll(".option");
     console.log(option);
     
     // set onclick attribute to all avilable options //
     for(i=0;i < option.length;i++){
        option[i].setAttribute("onclick","optionSelected(this)");
     }  
 }

 // create the new div tags which for icons //
 let tickIconTag ='<div class= "icon tick"><i class ="fas fa-check"></i></div>';
 let crossIconTag ='<div class= "icon cross"><i class ="fas fa-times"></i></div>';

 // if user clicked on options //
 function optionSelected(answer){
    clearInterval(counter);     // stopping timer when user selected option//
    clearInterval(counterLine);   
    let userAns = answer.textContent;            //getting user seelected option 
    let correctAns =questions[que_count].answer; //getting correct answer from array
    let allOptions = option_list.children.length; //getting all optin items

    if(userAns == correctAns){             // if user selected option is equal to array's correct answer//
        userScore +=1;                      //upgrading score value with 1
        answer.classList.add("correct");    //adding green colur to correct selected option
        answer.insertAdjacentHTML("beforeend",tickIconTag);
        console.log("correct Answer");
        console.log("Your correct Answer is = " + userScore)
    }else{
        answer.classList.add("incorrect");    //adding red colur to correct selected option
        answer.insertAdjacentHTML("beforeend",crossIconTag);
        console.log("Worng Answer");
      
        for(i=0; i< allOptions;i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIconTag);
                console.log("Auto selected correct Answer");
            }
        }
    }
     for(i= 0;i< allOptions;i++){
        option_list.children[i].classList.add("disabled");
     }
     next_btn.classList.add("show");
 }

 // if next que button clicked //
   function queCounter(index){
    let totalQueCountTag = '<span><p>'+ index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCountTag;
  }

 function startTimer(time){
    counter = setInterval(timer ,1000);
    function timer(){
        timeCount.textContent =time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
           timeText.textContent = "Time End";
            const allOptions= option_list.children.length;
            let correctAns = questions[que_count].answer;
            for(i =0; i < allOptions;i++){
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class","option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend",tickIconTag);
                    console.log("Time Off : auto selected correct answer.");
                }
            }
            for(i=0; i< allOptions;i++){
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
 }

     function startTimerLine(time){
        counterLine = setInterval(timer,29);
        function timer(){
            time+=1;                // upgrade time value with 1// 
            time_line.style.width =time + "px";     // increasing width of time_line with px by time value
            if(time > 549){                      // if time value is greater then 549
                clearInterval(counterLine)           // clear counterLine
            }  
        }
     }
     
 const next_btn = document.querySelector("footer .next_btn");
 const bottom_ques_counter = document.querySelector("footer .total_que");


      // if next question button clicked //
   next_btn.onclick = ()=>{             
    if(que_count < questions.length -1){        //if qurstion count is less than total question length//
        que_count++;                          //increment que_count value
        que_numb++;                            //increment que_numb value
        showQuestions(que_count);        // calling showQuestios function
        queCounter(que_numb);           // passing que_numb value to queCounter
        clearInterval(counter);       // clear counter
        clearInterval(counterLine);   //clear counterline
        startTimer(timeValue);        //calling startTimer function
        startTimerLine(widthValue);    //calling startTimerLine function
        // timeText.textContent ="Time Left";    // changing timeText to time left 
         next_btn.classList.remove("show");     //hide the next button
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();   // calling showResult function 
    }
}

     function showResult(){
        info_box.classList.remove("activeInfo");
        quiz_box.classList.remove("activeQuiz");
        result_box.classList.add("activeResult");
        const scoreText =result_box.querySelector(".score_text");
        if(userScore > 3){
            let scoreTag = '<span>Congrats!,You got<p>' + userScore +'</p> out of <p>' + questions.length + '/<p></span>';
            scoreText.innerHTML = scoreTag;
        }else if(userScore > 1){
            let scoreTag = '<span>and nice,You got<p>' + userScore +'</p> out of <p>' + questions.length + '</p></span>';
            scoreText.innerHTML = scoreTag;
        }else{
            let scoreTag = '<span>and Sorry,You got<p>' + userScore +'</p> out of <p>' + questions.length + '</p></span>';
            scoreText.innerHTML = scoreTag;
        }
    }
    
// if start quiz button clicked //
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
         timeValue =10;
         que_count = 0;
         que_numb = 1;
         userScore =0;
         widthValue =0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
   timeText.textContent ="Time Left";
    next_btn.classList.remove("show")
}

//if Quit Quiz buttion clicked //
quit_quiz.onclick= ()=>{
    window.location.reload();
}
      


























