function getModalOfNote(event){
  let noteNumber = event.target.id.split("-")[1];


  // Get the modal
  var modal = document.getElementById( `myModal-${noteNumber}`);

  // Get the button that opens the modal
  var btn = document.getElementById(`myBtn-${noteNumber}`);

  // Get the <span> element that closes the modal
  var span = document.getElementById(`close-${noteNumber}`);

  // When the user clicks the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

}


// function boldText(event){
//     let noteNumber = event.target.id.split("-")[1];
//     var target = document.getElementById(`hereText-${noteNumber}`);
//     if( target.style.fontWeight == "bolder" ) {
//         target.style.fontWeight = "normal";
//     } else {
//         target.style.fontWeight = "bolder";
//     }
// }
//
// function italicText(event){
//   let noteNumber = event.target.id.split("-")[1];
//     var target = document.getElementById(`hereText-${noteNumber}`);
//     if( target.style.fontStyle == "italic" ) {
//         target.style.fontStyle = "normal";
//     } else {
//         target.style.fontStyle = "italic";
//     }
// }
//
// function underlineText(event){
//   let noteNumber = event.target.id.split("-")[1];
//     var target = document.getElementById(`hereText-${noteNumber}`);
//     if( target.style.textDecoration == "underline" ) {
//         target.style.textDecoration = "none";
//     } else {
//         target.style.textDecoration = "underline";
//     }
// }
