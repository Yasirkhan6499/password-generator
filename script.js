// All letters array
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

// Alphabets reg expression
const alphabets = /[a-zA-Z]/;
// Numbers reg expression
const numbers = /^-?\d+\.?\d*$/;
// special characters reg expression
const specialChars =
/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;


const generate_btn = document.querySelector(".generate-btn");
const pass_field = Array.from(document.querySelectorAll(".pass"));


let symbolAllow=false;
let numberAllow=false;

let is2ndpass = false;


// generate button event
generate_btn.addEventListener("click",function(){
    is2ndpass = false;
    let pass=["",""];
    let num = 0;
    //check passwords length 
    let length = checkLength() || 0;
    
    //check symbols and numbers are on or off
    const switches = document.querySelectorAll(".check");
    if(switches[0].checked)
    symbolAllow = true;
    if(switches[1].checked)
    numberAllow=true;

    //random letter pick
    for(let i=0; i<length; i++){
        let rand = Math.floor(Math.random() * characters.length)

        //if symbols and numbers both allowed with alphabets 
        if(numberAllow && symbolAllow)
        pass[num]+=characters[rand];
        //if symbol allowed
        else if(symbolAllow && isLetter(specialChars,rand))
        pass[num]+=characters[rand];
        //  if numbers allowed
        else if(numberAllow && isLetter(numbers,rand))
        pass[num]+=characters[rand];
        // if only alphabets allowed
       else if(isLetter(alphabets,rand)){
        pass[num]+=characters[rand];
        }
        else i-=1; 
        // console.log(characters[i]);

        //now set the 2nd password
        if(i>=length-1 && !is2ndpass){
            is2ndpass=true;
            num=1;
            i=0;
        }
        console.log(pass[num]);
    }
    //show password
    console.log(pass[0]);
    console.log(pass[1]);
    if(length>0){
    pass_field[0].textContent = pass[0];
    pass_field[1].textContent = pass[1];
    }

    //set default values
    symbolAllow = numberAllow = false;
 
    
});

//-- is letter
function isLetter(regExp,rand){
    // only letters
    let letterCheck = ( (characters[rand] >= 'A' &&  characters[rand] <= 'Z') ||
    (characters[rand] >= 'a' &&  characters[rand] <= 'z') );

    //check whether the sent reg exp is true
    if(regExp.test(characters[rand]) || letterCheck)
    return true;
    else return false;
}
//how many letters in the password
function checkLength(){
    const pass_length = document.querySelector("#pass-length").value;
    
    if(pass_length>0){
        if(pass_length<=15)
        return pass_length;
        else return 15;
    }
    else alert("passowrd's length should be > 0");
}

//--- if password clicked, copy it to the clipboard

pass_field.forEach(item=>{
    item.addEventListener("click",function(e){
        let copy = e.target.nextElementSibling;
        navigator.clipboard.writeText(e.target.textContent);
       copy.classList.remove("hide");

        setTimeout(function(){
           copy.classList.add("hide");
        },1000);
    });
});

