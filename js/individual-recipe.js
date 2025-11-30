
/* JAVASCRIPT FOR MAIN RECIPE CONTENT */


/* Call the print method in the browser to print content of current window  */
document.getElementById('print').addEventListener('click', function() {
    window.print();
});

/* in .ingredients-list span,
 data-* attribute is used to store custom data 
https://www.w3schools.com/tags/att_data-.asp
the ingredients have been assigned with the attribute data-number */

function formatFraction(number) {
    // Define the fractions (so that numbers are clearly defined)
    // It will look for object keys we have defined in the html under the data-number attribute
    const fractions = {
        0.13:"⅛",
        0.25: "¼",
        0.33: "⅓",
        0.50: "½",
        0.66: "⅔",
        0.75: "¾"
    };

    // Round up the value to 2 decimals using toFixed()
    /* Object keys are Strings even if it is in numerical form */
    let roundedNumber=number.toFixed(2);

    if (fractions[roundedNumber]){
        return fractions[roundedNumber];
    }
    else{
        //for whole numbers such as 5.00
        if (roundedNumber.endsWith('.00')){
            // Use slice(start.end) to only return selected elements in an array https://www.w3schools.com/jsref/jsref_slice_array.asp
            //array index starts at 0 & negative numbers select numbers from the end of an array. Hence (0,-3)
            return roundedNumber.slice(0,-3);
        }
        else{
            return roundedNumber;
        }
    }
}

//Setting variables in the document
const buttonScale=document.querySelectorAll('.ingredient-scale button');
const numbers=document.querySelectorAll('.ingredients-list .number');
const yield=document.getElementById('recipe-yield-label');
const servings=document.querySelector('.recipe-serving-number');
/* data- attributes in the class .recipe-serving-number are accessed with servings.dataset which gives number: "" which is a String
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset */
//parseFloat is used to convert a String "" into a number with decimals
const initialServings=parseFloat(servings.dataset.number);

//text.Content 
servings.textContent=initialServings;

//Loop for all 3 scale buttons and storing it in the variable "button"
for (var i=0;i<buttonScale.length;i++){
    var button=buttonScale[i];

    //Add a click event to each button
    button.addEventListener('click',function(){

        //Get the scale factor from the buttons (0.5x,1x,2x)
        var scaleText=this.textContent;
        //Store only the number in the scale button
        var scaleNumberString=scaleText.replace("x","");
        //Convert the String to a number & store it in scale
        var scale=parseFloat(scaleNumberString);

        //Update ingredients quantities
        for (var j=0;j<numbers.length;j++){
            var num=numbers[j];
            var number=parseFloat(num.dataset.number);
            var scaled=number*scale;
            //display any decimal numbers as a fraction
            num.textContent=formatFraction(scaled);
        }

        //Update yield label
        yield.textContent="x" + scale;

        //Update the servings
        var scaledServings=initialServings*scale;
        if(scaledServings%1===0){
            //if whole number
            servings.textContent=scaledServings;
        }
        else{
            //if it is decimal, show only 1 decimal place
            servings.textContent=scaledServings.toFixed(1);
        }

        //Remove active class from all buttons
        for (var h=0;h<buttonScale.length;h++){
            buttonScale[h].classList.remove('active');
        }

        //Add active class to the clicked button
        this.classList.add('active');
    })
}

/* JAVASCRIPT FOR CAROUSEL */


/* Assign variables to the classes in carousel section */
const box=document.querySelector('.carousel-box');
const content=document.querySelector('.carousel-content');
const leftButton=document.querySelector('.arrow.left');
const rightButton=document.querySelector('.arrow.right');


const firstImage=content.querySelector('img'); // select first image in the carousel (querySelectorAll selects all images)
const imageWidth=firstImage.offsetWidth; //returns the width of the element https://www.w3schools.com/Jsref/prop_element_offsetwidth.asp
const imageGap=32;
const itemWidth=imageWidth+imageGap;

/* Click function for the left button - move the carousel content to the left by itemWidth */
leftButton.addEventListener('click', function() {
  box.scrollBy({
    left: -itemWidth,
    behavior: 'smooth'
  });
});

/* Click function for the right button - move the carousel content to the right by itemWidth */
rightButton.addEventListener('click', function() {
  box.scrollBy({
    left: itemWidth,
    behavior: 'smooth'
  });
});




// Auto-mark the current nav link as active (adds the `active` class based on filename)
(function markActiveNavLink(){
    try {
        const topLinks = document.querySelectorAll('.navbar-nav#nav-top .nav-link');
        const currentFile = window.location.pathname.split('/').pop(); // e.g. "apple-crumble.html"
        topLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const linkFile = href.split('/').pop();
            if (linkFile === currentFile) {
                link.classList.add('active');
            }
        });
    } catch (e) {
        // Fail silently if nav isn't present on the page
        console.warn('markActiveNavLink: ', e);
    }
})();