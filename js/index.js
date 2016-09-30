var onScreen = 0, memory = [], tempArray = [], clearer = 0;

function refreshScreen(tempArray){
  onScreen = tempArray.join("");
  $("#screen").html(onScreen);
}

function clear(){
  memory = [];
  tempArray = [];
  onScreen = "0";
  $("#screen").html(onScreen);
}

$(".buttonNumber").on("click", function(){
  if (onScreen.length > 20){
    clear();
  } else {
    if (clearer === 1) {
      clear();
      clearer = 0
    }
    tempArray.push($(this).val());
    refreshScreen(tempArray);
  }
})

$("#buttonPoint").on("click", function(){
  if (onScreen.length > 20 || clearer === 1){
    clear();
    clearer = 0;
  }
  if (/[0-9]/.test(tempArray[tempArray.length - 1])){
    tempArray.push($(this).val());
    refreshScreen(tempArray);
  } else {
    tempArray.push("0");
    tempArray.push($(this).val());
    refreshScreen(tempArray);
  }
})

$(".buttonOperation").on("click", function(){
  if (/[0-9]/.test(tempArray[tempArray.length - 1])){
    clearer = 0;
    memory.push(tempArray.join(""));
    memory.push($(this).val());
    tempArray = [];
    onScreen = $(this).val();
    $("#screen").html(onScreen);
  }
  console.log(memory);
})

$("#buttonTotal").on("click", function(){
  
  if (/[0-9]/.test(tempArray[tempArray.length - 1])) {
    memory.push(tempArray.join(""));
    onScreen = eval(memory.join(" "));
    tempArray.push(eval(memory.join(" ")));
    $("#screen").html(onScreen);
  
    memory = [];
    tempArray = [];
    tempArray.push(onScreen);
    clearer = 1;
  } 
  
  console.log("memory : " + memory);
  console.log("tempArray : " + tempArray);
});

$("#buttonC").on("click", clear);