function getHistory(){
    return document.getElementById("history-value").innerText;
}
//Show the users inputs on the top screen including operations and numbers
function printHistory(num){
    document.getElementById("history-value").innerText=num;
}

//Show the result of the operation on the bottom section
function getOutput(){
    return document.getElementById("output-value").innerText;
}

function printOutput(num){
    if (num==""){
        document.getElementById("output-value").innerText=num; //If there is nothing to display, don't display a zero
    }
    else {
        document.getElementById("output-value").innerText=formattedText(num); //If there is a number to display, display it in a formatted text
    }    
}

//Display the result in comma format
function formattedText(num){
    if (num=="-"){ //if there is only the negative sign left on the output, then for that character, it should return empty
        return ("");
    }
    var n= Number (num);
    var value=n.toLocaleString("en");
    return value;
}

//This function will Reverse the number formatting 
function reverseFormatting(num){
    return Number(num.replace(/,/g,'')); //The commas in the text will be replaced with empty
}

//Which operator is clicked
var clickedOperator=document.getElementsByClassName("operator");
for (var i=0; i<clickedOperator.length; i++){
    clickedOperator[i].addEventListener('click', function(){
        //When the clear button is clicked, both history and output must be cleared
        if (this.id=="Clear"){
            printHistory("");
            printOutput("");
        }
        //When backspace button is clicked, only one digit must be erased from the screen
        else if (this.id=="CE"){
            var output=reverseFormatting(getOutput()).toString(); //Before we take out the last digit, we need to get rid of the commas
            if (output){ //if there is any value on the output screen
                output=output.substr(0,output.length-1); //cancel out the last number
                printOutput(output);
            }
        }
        //What happens when an operator other than clear and backspace is clicked
        else {
            var output=getOutput();
            var history=getHistory();
            //If the user clicks another operator right after clicking one operator, the current operator should be replaced
            if (output=="" && history!=""){ //if there is nothing on the output and there is some operations in the history
                if(isNaN(history[history.length-1])){ //If the last character of the history is an operator (not a number)
                    history=history.substr(0,history.length-1); //Erase the last character from the history
                }
            }
            if (output!="" || history!=""){ //if there is a value in the output and the history is not empty
                output= output==""? output:reverseFormatting(getOutput());
                history=history+output; //the clicked number must be displayed on the history section
                //if = operator is clicked, the history must be cleared
                if (this.id=="="){
                    var result=eval(history); //calculate the operation
                    printOutput(result); //place the result on the output screen
                    printHistory(""); //clear the history section
                }
                //if the operator is addition, subtraction, multiplication, or division, then the output section will be cleared first.
                 else{
                    history=history+this.id; // Clicked operator will be added in the history section
                    printHistory(history);
                    printOutput("");
                 }
            }
        }
    });
}

//Which number is clicked
var clickedNumber=document.getElementsByClassName("number");
for (var i=0; i<clickedNumber.length; i++){
    clickedNumber[i].addEventListener('click', function(){
        var output=reverseFormatting(getOutput());
        if (output != NaN) { //if the output is number
            output=output+this.id;
            printOutput(output);
        }
    });
}


//1430