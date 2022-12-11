"use strict";
/*    JavaScript 7th Edition
      Chapter 10
      Project 10-02

      Project to create a drag and drop tangram puzzle
      Author: herbert kigenyi
      Date:   12/3/2022

      Filename: project10-02.js
*/

// Reference to the tangram puzzle board
let puzzleBoard = document.getElementById("puzzle");
// Counter for the zIndex style of each puzzle piece
let zCounter = 1;
let eventX, eventY, tanX, tanY;

// Node list representing the tangram pieces
let tans = document.querySelectorAll("div#puzzle > img");

// Function to rotate a tan by a specified number of degrees
function rotateTan(elem, deg) {
   const obj = window.getComputedStyle(elem, null);
   const matrix = obj.getPropertyValue("transform");
   let angle = 0;
   if (matrix !== "none") {
      const values = matrix.split('(')[1].split(')')[0].split(',');
      const a = values[0];
      const b = values[1];
      angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
   }

   if (angle < 0) {
      angle += 360;
   }

   let newAngle = angle + deg;

   elem.style.transform = "rotate(" + newAngle + "deg)";
}

//3.	Go to the project10-02.js file in your code editor. Below the rotateTan() function add a for loop that iterates through all the pieces in the tans node list. For each piece add an event listener that runs the grabTan() function in response to the pointerdown event.
for (let tan of tans) {
   tan.onpointerdown = grabTan;
}
//4.	Create the grabTan() function. Within the function do the following:
function grabTan(e) {
   //a.	If the Shift key has been pressed down, call the rotateTan() function using the event target and a value of 15 as the parameter values.
   if (e.shiftKey) {
      rotateTan(e.target, 15);
   }
   //b.	Otherwise, store the e.clientX and e.clientY values in the eventX and eventY variables. Set the touch-action style to “none”. Increase the zCounter variable by 1 and apply it to the zIndex style of the event target.
   else {
      eventX = e.clientX;
      eventY = e.clientY;
      e.target.style.touchAction = "none";
      zCounter++;
      e.target.style.zIndex = zCounter;
      tanX = e.target.offsetLeft;
      tanY = e.target.offsetTop;


      //c.	Add an event listener to run the moveTan() function in response to the pointermove event. Add an event listener to run the dropTan() function in response to the pointerup event.

      e.target.addEventListener("pointermove", moveTan);
      e.target.addoveEventListener("pointerup", dropTan);

   }

}
//5.	Create the moveTan() function. Within the function calculate the distance horizontally and vertically that the pointer has moved from its initial position and move the event target the that same amount.
function moveTan(e) {
   let currentX = e.clientX;
   let currentY = e.clientY;
   let deltaX = currentX - eventX;
   let deltaY = currentY - eventY;

   e.target.style.left = tanX + deltaX + "px";
   e.target.style.top = tanY + deltaY + "px";
}
//6.	Create the dropTan() function. Within the function remove that event listeners you created for the pointermove and pointerup events.
function dropTan(e) {
   e.target.removeEventListener("pointermove", moveTan);
   e.target.removeEventListener("pointerup", dropTan);
}
