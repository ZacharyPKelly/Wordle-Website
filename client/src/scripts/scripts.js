
/**
 * Moves the cursor to the end of the input box in order to always 
 * allow the user to automatically be able to backspace current input
 * 
 * @param {*} input The target of the event from the onClick event
 */

export function moveCursorToEnd(input) {

  input.focus();
  const value = input.value;
  input.value = ''; // clear the value
  input.value = value; // set it back

};

/**
 * Clears the contents of the Absent boxes when called
 */

export function clearAllSelections() {

  console.log("Clear All Selections");

  const keyboardIds = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  clearKnownLetters();
  clearValidLetters();

  for (let index = 0; index < keyboardIds.length; index++) {

    console.log(document.getElementById(keyboardIds[index]));

    // if(!document.getElementById(keyboardIds[index]).classList.contains('validSelectedUnusedLetter') && 
    //    !document.getElementById(keyboardIds[index]).classList.contains('knownSelectedUnusedLetter')) {
    if(document.getElementById(keyboardIds[index]).classList.contains('selectedUnusedLetter')) {

        console.log("Element ", keyboardIds[index]);

        // Remove selected and no pointer events classes from value being removed
        document.getElementById(keyboardIds[index]).classList.remove('pointer-events-none', 'selectedUnusedLetter');
      
        // Add unselected class to removed value
        document.getElementById(keyboardIds[index]).classList.add('unselectedUnusedLetter');
    }
  }
};

/**
 * Clears the contents of the Known input boxes when called
 */

export function clearKnownLetters() {

  const knownIDs = ['known1', 'known2', 'known3', 'known4', 'known5']

  for (let index = 0; index < knownIDs.length; ++index){

    if (document.getElementById(knownIDs[index]).value !== '') {

      let inputID = document.getElementById(knownIDs[index]).value;

      let duplicateID = findDuplicate(knownIDs[index], inputID);

      // If there are duplicate letters in the valid inputs
      if(duplicateID === 2 || duplicateID === 3){

        // Remove selected and no pointer events classes from value being removed
        document.getElementById(inputID.toLowerCase()).classList.remove('selectedUnusedLetter', 'knownSelectedUnusedLetter');

        // Add valid class to duplicate letters
        document.getElementById(inputID.toLowerCase()).classList.add('pointer-events-none', 'validSelectedUnusedLetter');

        document.getElementById(knownIDs[index]).value = '';

      }
      else{ // There are no duplicate letters in the valid inputs

        // Remove selected and no pointer events classes from value being removed
        document.getElementById(inputID.toLowerCase()).classList.remove('pointer-events-none', 'selectedUnusedLetter', 'knownSelectedUnusedLetter');
      
        // Add unselected class to removed value
        document.getElementById(inputID.toLowerCase()).classList.add('unselectedUnusedLetter');

        document.getElementById(knownIDs[index]).value = '';

      } 
    }
  }

  console.log("Known Letters Input Boxes Cleared")

};

/**
 * Clears the contents of the Valid input boxes when called
 */

export function clearValidLetters() {

  const validIDs = ['valid1', 'valid2', 'valid3', 'valid4', 'valid5']

  for (var index = 0; index < validIDs.length; ++index){

    if (document.getElementById(validIDs[index]).value !== '') {

      let inputID = document.getElementById(validIDs[index]).value;

      let duplicateID = findDuplicate(validIDs[index], inputID);

      // If there are duplicate letters in the known inputs
      if(duplicateID === 1 || duplicateID === 3){

        // Remove selected and no pointer events classes from value being removed
        document.getElementById(inputID.toLowerCase()).classList.remove('selectedUnusedLetter', 'validSelectedUnusedLetter');

        // Add known class to for duplicate letters
        document.getElementById(inputID.toLowerCase()).classList.add('pointer-events-none', 'knownSelectedUnusedLetter');

        document.getElementById(validIDs[index]).value = '';

      }
      else{ // There are no duplicate letters in the known inputs

        // Remove selected and no pointer events classes from value being removed
        document.getElementById(inputID.toLowerCase()).classList.remove('pointer-events-none', 'selectedUnusedLetter', 'validSelectedUnusedLetter');
      
        // Add unselected class to removed value
        document.getElementById(inputID.toLowerCase()).classList.add('unselectedUnusedLetter');

        document.getElementById(validIDs[index]).value = '';

      }
    }
  }

  console.log("Valid Letters Input Boxes Cleared")

};

/**
 * Handles the input given to the Known and Valid input boxes, as well as the
 * logic for apply and removing css classes to the Absent letters.
 * 
 * @param {*event} event The event from the onKeyDown action
 */

export function updateInputBox(event) {

  // Input ID arrays
  const inputIDs = ['known1', 'known2', 'known3', 'known4', 'known5', 'valid1', 'valid2', 'valid3', 'valid4', 'valid5']
  const knownIDs = ['known1', 'known2', 'known3', 'known4', 'known5']
  const validIDs = ['valid1', 'valid2', 'valid3', 'valid4', 'valid5']

  var alphaRegExp = new RegExp('[a-zA-Z]');

  let targetID = event.target.id;
  let targetValue = event.target.value;
  let input = event.key;
  let currentInputElement = document.getElementById(event.target.value.toLowerCase());
  let inputElement = document.getElementById(event.key.toLowerCase());

  console.log("targetID: ", targetID);
  console.log("targetValue: ", targetValue);
  console.log("input: ", input);
  console.log("currentInputElement: ", currentInputElement);
  console.log("inputElement: ", inputElement);
  console.log("\n");

  // Check to see if input element is null due to quick input
  // Allows backspace
  if(!inputElement && event.key !== "Backspace" && event.key !== "Tab") {

    event.preventDefault();
    console.log("Input element was null");
    return;

  }

  // Prevents backspace on inputs that are empty
  if(event.key === "Backspace" && document.getElementById(event.target.id).value === '') {

    event.preventDefault();
    console.log("Backspace on empty input: ", targetID);
    return;

  }

  // Don't allow non-alpha/numberic or batched input and handle backspace
  if(event.ctrlKey || event.altKey || typeof event.key !== 'string' || event.key.length !== 1) {

    // If backspace and no duplicate letters
    if (event.key === "Backspace" && !boolenDuplicateFinder(event.target.id, event.target.value, inputIDs)) {

      // Remove selected and no pointer events classes from value being removed
      document.getElementById(event.target.value.toLowerCase()).classList.remove('pointer-events-none', 'selectedUnusedLetter', 'knownSelectedUnusedLetter', 'validSelectedUnusedLetter');
    
      // Add unselected class to removed value
      document.getElementById(event.target.value.toLowerCase()).classList.add('unselectedUnusedLetter');

      console.log("Non-Alpha Input Filtered: ", event.key);
      console.log("|-------------------- END OF KEY INPUT --------------------|\n");

      return;

    } //if Backspace and there are duplicate letters
    else if(event.key === "Backspace" && boolenDuplicateFinder(event.target.id, event.target.value, inputIDs)) {

      let duplicateID = findDuplicate(event.target.id, event.target.value);

      // If backspacing in a known input
      if(knownIDs.includes(event.target.id)) {

        //If duplicate is only in a known input
        if(duplicateID === 1) {

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
        //Else if duplciate is only in a valid input
        else if (duplicateID === 2) {

          // Remove selected and no pointer events classes from value being removed
          document.getElementById(event.target.value.toLowerCase()).classList.remove('selectedUnusedLetter', 'knownSelectedUnusedLetter');

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
        //Else if duplciate is in a valid and known input
        else if (duplicateID === 3){ 

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
      }
      else { // If a valid input

        //If duplicate is only in a known input
        if(duplicateID === 1) {

          // Remove selected and no pointer events classes from value being removed
          document.getElementById(event.target.value.toLowerCase()).classList.remove('selectedUnusedLetter', 'validSelectedUnusedLetter');

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
        //Else if duplciate is only in a valid input
        else if (duplicateID === 2) {

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
        //Else if duplciate is in a valid and known input
        else if (duplicateID === 3){ 

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
      }
    }
  }
  
  // Don't allow numeric input
  else if(!alphaRegExp.test(event.key)) {

    event.preventDefault();

    console.log("Non-Alpha Input Filtered: ", event.key);
    console.log("|-------------------- END OF KEY INPUT --------------------|\n");

    return;

  }

  // If the input is not empty then update with new input
  else if (event.target.value !== '') {

    // If a known input
    if(knownIDs.includes(event.target.id)) {

      let duplicateID = findDuplicate(event.target.id, event.key);

      if (duplicateID === 0) { // Known Input | No Duplicate

        // If current value has a duplicate
        if (boolenDuplicateFinder(event.target.id, event.target.value, knownIDs)) {

          // Add no pointer event classes to new value
          document.getElementById(event.key.toLowerCase()).classList.add('pointer-events-none', 'knownSelectedUnusedLetter');

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, knownIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
        else { // If current value does not have a duplicate

          // Remove unneeded classes from removed value
          document.getElementById(event.target.value.toLowerCase()).classList.remove('pointer-events-none', 'selectedUnusedLetter', 'knownSelectedUnusedLetter');

          // Add unselected class to removed value
          document.getElementById(event.target.value.toLowerCase()).classList.add('unselectedUnusedLetter');

          // Add no pointer event classes to new value
          document.getElementById(event.key.toLowerCase()).classList.add('pointer-events-none', 'knownSelectedUnusedLetter');

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, knownIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
      }
      else if (duplicateID === 1) { // Known Input | Known Duplicate

        // If current value has a duplicate
        if (boolenDuplicateFinder(event.target.id, event.target.value, knownIDs)) {

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, knownIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
        else { // If current value has no duplicate

          // Remove unneeded classes from removed value
          document.getElementById(event.target.value.toLowerCase()).classList.remove('pointer-events-none', 'selectedUnusedLetter', 'knownSelectedUnusedLetter');

          // Add unselected class to removed value
          document.getElementById(event.target.value.toLowerCase()).classList.add('unselectedUnusedLetter');

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, knownIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key, '\n');
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

        return;

        }
      }
      else if (duplicateID === 2) { // Known Input | Valid Duplicate

        // If current value has a duplicate
        if (boolenDuplicateFinder(event.target.id, event.target.value, knownIDs)) {

          // Add no pointer event classes to new value
          document.getElementById(event.key.toLowerCase()).classList.add('pointer-events-none', 'knownSelectedUnusedLetter');

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, knownIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
        else { // If current value has no duplicate

          // Remove unneeded classes from removed value
          document.getElementById(event.target.value.toLowerCase()).classList.remove('pointer-events-none', 'selectedUnusedLetter', 'knownSelectedUnusedLetter');

          // Add unselected class to removed value
          document.getElementById(event.target.value.toLowerCase()).classList.add('unselectedUnusedLetter');

          // Add no pointer event classes to new value
          document.getElementById(event.key.toLowerCase()).classList.add('pointer-events-none', 'knownSelectedUnusedLetter');

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, knownIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
      }
      else if (duplicateID === 3) { // Known Input | Known & Valid Duplicate

        // If current value has a duplicate
        if (boolenDuplicateFinder(event.target.id, event.target.value, knownIDs)) {

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, knownIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
        else { // If current value has no duplicate
        
          // Remove unneeded classes from removed value
          document.getElementById(event.target.value.toLowerCase()).classList.remove('pointer-events-none', 'selectedUnusedLetter', 'knownSelectedUnusedLetter');

          // Add unselected class to removed value
          document.getElementById(event.target.value.toLowerCase()).classList.add('unselectedUnusedLetter');

          // Add no pointer event classes to new value
          document.getElementById(event.key.toLowerCase()).classList.add('pointer-events-none', 'knownSelectedUnusedLetter');

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, knownIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;
        
        }
      }
      else { // Error

        console.log("ERROR\n");
        console.log("|-------------------- END OF KEY INPUT --------------------|\n");

        return;
        

      }
    }
    else {// If a valid input

      let duplicateID = findDuplicate(event.target.id, event.key);

      if (duplicateID === 0) { // Valid Input | No Duplicate

        // If current value has a duplicate
        if (boolenDuplicateFinder(event.target.id, event.target.value, validIDs)) {

          // Add no pointer event classes to new value
          document.getElementById(event.key.toLowerCase()).classList.add('pointer-events-none', 'validSelectedUnusedLetter');

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, validIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
        else { // If current value does not have a duplicate

          // Remove unneeded classes from removed value
          document.getElementById(event.target.value.toLowerCase()).classList.remove('pointer-events-none', 'selectedUnusedLetter', 'validSelectedUnusedLetter');

          // Add unselected class to removed value
          document.getElementById(event.target.value.toLowerCase()).classList.add('unselectedUnusedLetter');

          // Add no pointer event classes to new value
          document.getElementById(event.key.toLowerCase()).classList.add('pointer-events-none', 'validSelectedUnusedLetter');

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, validIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
      }
      else if (duplicateID === 1) { // Valid Input | Known Duplicate

        // If current value has a duplicate
        if (boolenDuplicateFinder(event.target.id, event.target.value, validIDs)) {

          // Add no pointer event classes to new value
          document.getElementById(event.key.toLowerCase()).classList.add('pointer-events-none', 'validSelectedUnusedLetter');

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, validIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
        else { // If current value has no duplicate

          // Remove unneeded classes from removed value
          document.getElementById(event.target.value.toLowerCase()).classList.remove('pointer-events-none', 'selectedUnusedLetter', 'validSelectedUnusedLetter');

          // Add unselected class to removed value
          document.getElementById(event.target.value.toLowerCase()).classList.add('unselectedUnusedLetter');

          // Add no pointer event classes to new value
          document.getElementById(event.key.toLowerCase()).classList.add('pointer-events-none', 'validSelectedUnusedLetter');

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, validIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }

      }
      else if (duplicateID === 2) { // Valid Input | Valid Duplicate

        // If current value has a duplicate
        if (boolenDuplicateFinder(event.target.id, event.target.value, validIDs)) {

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, validIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
        else { // If current value has no duplicate

          // Remove unneeded classes from removed value
          document.getElementById(event.target.value.toLowerCase()).classList.remove('pointer-events-none', 'selectedUnusedLetter', 'knownSelectedUnusedLetter', 'validSelectedUnusedLetter');

          // Add unselected class to removed value
          document.getElementById(event.target.value.toLowerCase()).classList.add('unselectedUnusedLetter');

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, validIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key, '\n');
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

        return;

        }

      }
      else if (duplicateID === 3) { // Valid Input | Known & Valid Duplicate

        // If current value has a duplicate
        if (boolenDuplicateFinder(event.target.id, event.target.value, validIDs)) {

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, validIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;

        }
        else { // If current value has no duplicate
        
          // Remove unneeded classes from removed value
          document.getElementById(event.target.value.toLowerCase()).classList.remove('pointer-events-none', 'selectedUnusedLetter', 'validSelectedUnusedLetter');

          // Add unselected class to removed value
          document.getElementById(event.target.value.toLowerCase()).classList.add('unselectedUnusedLetter');

          // Add no pointer event classes to new value
          document.getElementById(event.key.toLowerCase()).classList.add('pointer-events-none', 'validSelectedUnusedLetter');

          // Add new value to input box
          event.target.value = event.key;

          // Tab to the next empty input element unless at last then lose focus
          tabNextElement(event.target.id, validIDs);

          // Prevent input on the new focused input element
          event.preventDefault();

          console.log("Alpha-Input: ", event.key);
          console.log("|-------------------- END OF KEY INPUT --------------------|\n");

          return;
        
        }
      }
      else { // Error

        console.log("ERROR\n");
        console.log("|-------------------- END OF KEY INPUT --------------------|\n");

        return;
        

      }

    }
  }

   // Apply correct classes for input into blank input
  else if (document.getElementById(event.key.toLowerCase())) {

    // Known input
    if(knownIDs.includes(event.target.id)) {

      let duplicateID = findDuplicate(event.target.id, event.key);

      if (duplicateID === 1 || duplicateID === 0) { // Known Input | Known Duplicate or No Duplicate

        console.log("Known Input | DuplicateID: ", duplicateID);

        document.getElementById(event.key.toLowerCase()).classList.remove('unselectedUnusedLetter', 'selectedUnusedLetter', 'validSelectedUnusedLetter');

        // Add selected and no pointer events classes to new value
        document.getElementById(event.key.toLowerCase()).classList.add('pointer-events-none', 'knownSelectedUnusedLetter');

        // Add new value to input box
        event.target.value = event.key;

        // Tab to the next empty input element unless at last then lose focus
        tabNextElement(event.target.id, knownIDs);

        // Prevent input on the new focused input element
        event.preventDefault();

        console.log("Alpha-Input: ", event.key);
        console.log("|-------------------- END OF KEY INPUT --------------------|\n");

        return;

      }
      else if (duplicateID === 2) { // Known Input | Valid Duplicate

        console.log("Known Input | DuplicateID: ", duplicateID);

        document.getElementById(event.key.toLowerCase()).classList.remove('unselectedUnusedLetter', 'selectedUnusedLetter');

        // Add selected and no pointer events classes to new value
        document.getElementById(event.key.toLowerCase()).classList.add('pointer-events-none', 'knownSelectedUnusedLetter');

        // Add new value to input box
        event.target.value = event.key;

        // Add new value to input box
        event.target.value = event.key;

        // Tab to the next empty input element unless at last then lose focus
        tabNextElement(event.target.id, knownIDs);

        // Prevent input on the new focused input element
        event.preventDefault();

        console.log("Alpha-Input: ", event.key);
        console.log("|-------------------- END OF KEY INPUT --------------------|\n");

        return;

      }
      else if (duplicateID === 3) { // Known Input | Known & Valid Duplicate

        console.log("Known Input | DuplicateID: ", duplicateID);

        // Add new value to input box
        event.target.value = event.key;

        // Tab to the next empty input element unless at last then lose focus
        tabNextElement(event.target.id, knownIDs);

        // Prevent input on the new focused input element
        event.preventDefault();

        console.log("Alpha-Input: ", event.key);
        console.log("|-------------------- END OF KEY INPUT --------------------|\n");

        return;

      } 
      else { // Error

        console.log("ERROR\n");
        console.log("|-------------------- END OF KEY INPUT --------------------|\n");

      return;

      }
    }
    else { // Valid input

      let duplicateID = findDuplicate(event.target.id, event.key);

      if (duplicateID === 1) { // Valid Input | Known Duplicate

        console.log("Valid Input | DuplicateID: ", duplicateID);

        document.getElementById(event.key.toLowerCase()).classList.remove('unselectedUnusedLetter', 'selectedUnusedLetter');

        // Add selected and no pointer events classes to new value
        document.getElementById(event.key.toLowerCase()).classList.add('pointer-events-none', 'validSelectedUnusedLetter');

        // Add new value to input box
        event.target.value = event.key;

        // Tab to the next empty input element unless at last then lose focus
        tabNextElement(event.target.id, validIDs);

        // Prevent input on the new focused input element
        event.preventDefault();

        console.log("Alpha-Input: ", event.key, '\n');
        console.log("|-------------------- END OF KEY INPUT --------------------|\n");

        return;

      }
      else if (duplicateID === 2 || duplicateID === 0) { // Valid Input | Valid Duplicate or No Duplicate

        console.log("Valid Input | DuplicateID: ", duplicateID);

        document.getElementById(event.key.toLowerCase()).classList.remove('unselectedUnusedLetter', 'selectedUnusedLetter');

        // Add selected and no pointer events classes to new value
        document.getElementById(event.key.toLowerCase()).classList.add('pointer-events-none', 'validSelectedUnusedLetter');

        // Add new value to input box
        event.target.value = event.key;

        // Tab to the next empty input element unless at last then lose focus
        tabNextElement(event.target.id, validIDs);

        // Prevent input on the new focused input element
        event.preventDefault();

        console.log("Alpha-Input: ", event.key, '\n');
        console.log("|-------------------- END OF KEY INPUT --------------------|\n");

        return;

      }
      else if (duplicateID === 3) { // Valid Input | Known & Valid Duplicate

        console.log("Valid Input | DuplicateID: ", duplicateID);

        // Add new value to input box
        event.target.value = event.key;

        // Tab to the next empty input element unless at last then lose focus
        tabNextElement(event.target.id, validIDs);

        // Prevent input on the new focused input element
        event.preventDefault();

        console.log("Alpha-Input: ", event.key, '\n');
        console.log("|-------------------- END OF KEY INPUT --------------------|\n");

        return;

      }
      else { // Error

        console.log("Valid Input | DuplicateID: ", duplicateID);

        console.log("ERROR\n");
        console.log("|-------------------- END OF KEY INPUT --------------------|\n");

      return;

      }
    }
  }

  console.log("End of method; Potentially no input.");
  console.log("|--------------------- END OF KEY INPUT ---------------------|\n");
  
};

/**
 * Compares the value of the given character to the contents of the ID's given,
 * excluding the given ID
 * 
 * @param {*string} id      The ID to be excluded as a string (STRING)
 * @param {*string} value   The value to be compared as a string (STRING)
 * @param {*arrays} idArray The list of IDs to have their contents checked (ARRAY OF STRINGS)
 * 
 * @returns True if a match to the given value is found, false otherwise
 */

function boolenDuplicateFinder(id, value, idArray) {

  for (var index = 0; index < idArray.length; ++index) {

    if (idArray[index] !== id) {

      if(document.getElementById(idArray[index]).value === value){

        console.log("Duplicate letter WAS found.")

        return true;

      }
    }
  }

  console.log("Duplicate letter NOT found.")

  return false;

};

/**
 * Takes an ID and a string and determines 
 * 
 * @param {*string} id The ID to be excluded (STRING)
 * @param {*string} value The value to be compared (STRING)
 * @returns 0 if no duplicate, 1 if only known duplicate, 2 if only valid duplicate, 3 if both known and valid duplicates
 */

function findDuplicate(id, value) {

  console.log("\n");

  const knownIDs = ['known1', 'known2', 'known3', 'known4', 'known5']
  const validIDs = ['valid1', 'valid2', 'valid3', 'valid4', 'valid5']

  let knownFlag = 0;
  let validFlag = 0;
  let totalFlag = 0;

  for (let index = 0; index < knownIDs.length; ++index) {

    if(knownFlag !== 0){

      break;

    }

    if (knownIDs[index] !== id) {

      if(document.getElementById(knownIDs[index]).value === value){

        knownFlag = 1;

      }
    }
  }

  for (let index = 0; index < validIDs.length; ++index) {

    if(validFlag !== 0){

      break;

    }

    if (validIDs[index] !== id) {

      if(document.getElementById(validIDs[index]).value === value){

        validFlag = 2;

      }
    }
  }

  totalFlag = knownFlag + validFlag;

  console.log("Duplicates Total Flag: ", totalFlag);

  return totalFlag;

};

/**
 * Takes an ID and an array containing all its attached element IDs then finds the next
 * empty element and gives it focus, otherwise removes focus from element.
 * 
 * @param {*string} id The ID of the currently focused element
 * @param {*arrays} idArray The Array containing all attached elements to currently focused element
 */

function tabNextElement(id, idArray) {

  let startingIndex = idArray.indexOf(id);

  console.log("Index of id is: ", startingIndex);

  if(startingIndex === 4){

    document.getElementById(id).blur();

    return;

  }
  else{

    for (startingIndex; startingIndex < idArray.length - 1; ++startingIndex) {

      let nextElementContents = document.getElementById(idArray[startingIndex + 1]).value;

      if(nextElementContents === ''){

        document.getElementById(idArray[startingIndex + 1]).focus();

        return;

      }
    }

    document.getElementById(id).blur();

    return;

  }
};

/**
 * Applys the 'selected' css class to 'unselected buttons and vice versa
 * 
 * @param {*event} event The event from the onClick action
 */

export function updateUnusedLetters (event) {

  if (event.target.classList.contains('unselectedUnusedLetter')) {
    
    event.target.classList.remove('unselectedUnusedLetter')
    event.target.classList.add('selectedUnusedLetter')
  
  }
  else{

    event.target.classList.remove('selectedUnusedLetter')
    event.target.classList.add('unselectedUnusedLetter')

  }

};

export function letterColour(letter, knownLetters, validLetters, index) {

  if(knownLetters[index] === letter) {

    return <div className="pointer-events-none answerFont text-[#6ca965]">{letter.toUpperCase()}</div>

  }
  else if (validLetters.includes(letter)) {

    return <div className="pointer-events-none answerFont text-[#c8b653]">{letter.toUpperCase()}</div>

  }
  else {

    return <div className="pointer-events-none answerFont text-[#787c7f]">{letter.toUpperCase()}</div>

  }
};

export function possibleAnswersText(size) {

  if(size === 1) {

    return <div className="infoFont text-[25px] mb-[10px]"><div>We Found {size} Possible Answer!</div></div>

  }
  else {

    return <div className="infoFont text-[25px] mb-[10px]"><div>We Found {size} Possible Answers!</div></div>

  }

};

export function scroll() {
  
  document.getElementById("answers").scrollIntoView({behavior: 'smooth'});

};

export function loadingText(size){

  if(size) {

    return <div id="answer placeholder" className="flex place-content-center h-[475px]"><div className="caveatFont text-[50px] my-auto">Loading...</div></div>

  }
  else {

    return <div className="infoFont text-[25px]"><div>We Found {size} Possible Answers!</div></div>

  }
};

// document.addEventListener("DOMContentLoaded", function() {});