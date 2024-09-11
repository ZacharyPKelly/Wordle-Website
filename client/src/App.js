// NOTES

// IMPORTS
import React, { useEffect, useState } from 'react';
import './index.css'; //Import the Tailwind CSS file
import { moveCursorToEnd, clearKnownLetters, clearValidLetters, clearAllSelections, updateInputBox, updateUnusedLetters, letterColour, possibleAnswersText, loadingText, scroll } from './scripts/scripts.js';
import palmTreeLogo from "./images/palmTrees.png"

const App = () => {

  // //Store dataset fetched from the server
  // const [data, setData] = useState([]);
  // //Store filtered data
  // const [filteredData, setFilteredData] = useState([]);
  // //Store selected start date
  // const [startDate, setStartDate] = useState('');
  // //Store selected end date
  // const [endDate, setEndDate] = useState('');

  // //Hook to fetch the data from the server
  // useEffect(() => {
  //   fetch('http://localhost:8080/api/appointmentTable')
  //     .then(response => response.json()) //Parse the json data
  //     .then(responseData => {
  //       console.log('Fetched Data:', responseData);
  //       //Sort the data by appointment date
  //       const sortedData = responseData.data.sort((a, b) => new Date(a.AppointmentTime) - new Date(b.AppointmentTime));
  //       setData(sortedData); //Assign sorted data to the data state
  //       setFilteredData(sortedData); //Initially show all data
  //     })
  //     .catch(error => console.error('Error Fetching Data', error)); //Handle errors
  // }, []);

  // 
  
  // Known form inputs
  // const [known1, setKnown1] = useState("");
  // const [known2, setKnown2] = useState("");
  // const [known3, setKnown3] = useState("");
  // const [known4, setKnown4] = useState("");
  // const [known5, setKnown5] = useState("");

  // // Valid form inputs
  // const [valid1, setvalid1] = useState("");
  // const [valid2, setvalid2] = useState("");
  // const [valid3, setvalid3] = useState("");
  // const [valid4, setvalid4] = useState("");
  // const [valid5, setvalid5] = useState("");

  // Object to hold the forms state
  const [formData, setFormData] = useState({

      // Known form data
      known1: '',
      known2: '',
      known3: '',
      known4: '',
      known5: '',

      // Valid form data
      valid1: '',
      valid2: '',
      valid3: '',
      valid4: '',
      valid5: '',

      //Unused Letters
      unusedLetters: [],

    })

  // Object to hold possible words
  const [possibleWords, setPossibleWords] = useState(null);

  const inputOnKeyDown = (event, id) => {

    updateInputBox(event);

    if(event.key === "Backspace") {

      setFormData({...formData, [id]: ''});

    }
    else {

      setFormData({...formData, [id]: document.getElementById(id).value});

    }

  };

  const keyboardOnClick = (event) => {

    updateUnusedLetters(event);

    const index = formData.unusedLetters.indexOf(event.target.id);
  
    console.log(index);
    console.log(event.target.id);
    console.log(formData.unusedLetters);

    if(document.getElementById(event.target.id).classList.contains('selectedUnusedLetter') && index === -1) {

      console.log("Selected");

      formData.unusedLetters.push(event.target.id);

    }
    else if (document.getElementById(event.target.id).classList.contains('unselectedUnusedLetter') && index > -1) {

      console.log("Unselected");

      formData.unusedLetters.splice(index, 1)

    }
    
    console.log(formData.unusedLetters);

  };

  const knownClearOnClick = () => {

    clearKnownLetters();

    setFormData({...formData, 
                    known1: '', 
                    known2: '', 
                    known3: '', 
                    known4: '', 
                    known5: ''});

  };

  const validClearOnClick = () => {
    
    clearValidLetters();

    setFormData({...formData, 
                    valid1: '', 
                    valid2: '', 
                    valid3: '', 
                    valid4: '', 
                    valid5: ''});

  };

  const clearAllOnClick = () => {

    setPossibleWords(null);
    
    clearAllSelections();

    setFormData({...formData, 
                    known1: '', 
                    known2: '', 
                    known3: '', 
                    known4: '', 
                    known5: '',
                    valid1: '', 
                    valid2: '', 
                    valid3: '', 
                    valid4: '', 
                    valid5: '',
                    unusedLetters: []});

  };

  const handleSubmitOnClick = (event) => {

    event.preventDefault();

    setPossibleWords(null);

    const myHeader = new Headers();

    myHeader.append("Content-Type", "application/json");

    const serializedBody = JSON.stringify(formData);

    console.log(serializedBody);

    const fetchOptions = {
      method: 'POST',
      body: serializedBody,
      headers: myHeader,
    };

    fetch('/wordleFormInput', fetchOptions)
      .then(response => response.json())
      .then(data => {

        setPossibleWords(data);

      })
      .catch(error => {

        console.log("An error has occured while fetching data");

      });
    
    scroll();

  };

  return (

    // Main body element to serve as background
    <div className="siteBackground">

      {/* Container to hold the title */}
      <header id="titleHeader" className="flex place-content-between bg-[#dbfeef] w-full h-[60px] titleBorder">

        {/* 'WORDLE SOLVER' title */}
        <a className='leftTitleItem  caveatFont ml-[5px] md:ml-[25px] text-[23px] min-[450px]:text-[30px] md:text-[35px] max-w-max'> The Wordle Solver</a>
        <a className='rightTitleItem caveatFont mr-[12px] md:mr-[25px] text-[23px] min-[450px]:text-[30px] md:text-[35px] max-w-max' href="https://www.nytimes.com/games/wordle/index.html" target="_blank">Play Wordle!</a>

      </header>

      {/* Main container */}
      <main className="bg-[#FEEFDB] mainLayout max-h-max mainBorder text-center">

        {/* Title Row */}
        <div className="columnLayout caveatFont text-[40px] min-[450px]:text-[50px] md:text-[75px] ">
            The Wordle Solver
        </div>

        {/* Input, Keyboard and Answers container */}
        <div className="mainContentLayout">

            {/* Answers Column */}
          <div id='answers' className="bg-[#dbfeef] order-2 mx-auto mt-[25px] xl:mt-0 xl:mr-[25px] px-[10px] pb-[10px] answersLayout answerContainerBorder">

            {/* Possible Title */}
            <div className='answersTitleGridItem pb-[8px] mt-[23px]'>

              <div className="wordleBlockBoxShadowGreen  answersWordleSquare bg-wordle-green text-center place-content-center pb-[4px]">
                <div className="wordleBlockFont">P</div>
              </div>

              <div className="wordleBlockBoxShadowYellow answersWordleSquare bg-wordle-yellow text-center place-content-center pb-[4px]">
                <div className="wordleBlockFont">O</div>
              </div>

              <div className="wordleBlockBoxShadowGrey   answersWordleSquare bg-wordle-grey text-center place-content-center pb-[4px]">
                <div className="wordleBlockFont">S</div>
              </div>

              <div className="wordleBlockBoxShadowGreen  answersWordleSquare bg-wordle-green text-center place-content-center pb-[4px]">
                <div className="wordleBlockFont">S</div>
              </div>

              <div className="wordleBlockBoxShadowYellow answersWordleSquare bg-wordle-yellow text-center place-content-center pb-[4px]">
                <div className="wordleBlockFont">I</div>
              </div>

              <div className="wordleBlockBoxShadowGrey   answersWordleSquare bg-wordle-grey text-center place-content-center pb-[4px]">
                <div className="wordleBlockFont">B</div>
              </div>

              <div className="wordleBlockBoxShadowGreen  answersWordleSquare bg-wordle-green text-center place-content-center pb-[4px]">
                <div className="wordleBlockFont">L</div>
              </div>

              <div className="wordleBlockBoxShadowYellow answersWordleSquare bg-wordle-yellow text-center place-content-center pb-[4px]">
                <div className="wordleBlockFont">E</div>
              </div>

            </div>

            {/* Answers Title */}
            <div className='answersTitleGridItem'>

              <div className="wordleBlockBoxShadowGreen  answersWordleSquare bg-wordle-green text-center place-content-center pb-[4px]">
                <div className="wordleBlockFont">A</div>
              </div>

              <div className="wordleBlockBoxShadowYellow answersWordleSquare bg-wordle-yellow text-center place-content-center pb-[4px]">
                <div className="wordleBlockFont">N</div>
              </div>

              <div className="wordleBlockBoxShadowGrey   answersWordleSquare bg-wordle-grey text-center place-content-center pb-[4px]">
                <div className="wordleBlockFont">S</div>
              </div>

              <div className="wordleBlockBoxShadowGreen  answersWordleSquare bg-wordle-green text-center place-content-center pb-[4px]">
                <div className="wordleBlockFont">W</div>
              </div>

              <div className="wordleBlockBoxShadowYellow answersWordleSquare bg-wordle-yellow text-center place-content-center pb-[4px]">
                <div className="wordleBlockFont">E</div>
              </div>

              <div className="wordleBlockBoxShadowGrey  answersWordleSquare bg-wordle-grey text-center place-content-center pb-[4px]">
                <div className="wordleBlockFont">R</div>
              </div>

              <div className="wordleBlockBoxShadowGreen answersWordleSquare bg-wordle-green text-center place-content-center pb-[4px]">
                <div className="wordleBlockFont">S</div>
              </div>

            </div>

              {possibleWords ? (

                <div>

                  {possibleAnswersText(possibleWords[0].length)}

                  <div className="dividerHorizontal mb-[10px]"></div>

                  <div className="grid answersHolder gap-[10px]">
                  
                    {possibleWords[0].map(item => (

                      <div className="bg-white answerFlexBox answerBorder">

                        <div className="wordleSquareAnswerLetter text-center mb-[3px]">

                          {letterColour(item[0], possibleWords[1], possibleWords[2], 0)}

                        </div>
                        
                        <div className="wordleSquareAnswerLetter text-center mb-[3px]">

                          {letterColour(item[1], possibleWords[1], possibleWords[2], 1)}

                        </div>

                        <div className="wordleSquareAnswerLetter text-center mb-[3px]">

                          {letterColour(item[2], possibleWords[1], possibleWords[2], 2)}

                        </div>

                        <div className="wordleSquareAnswerLetter text-center mb-[3px]">

                          {letterColour(item[3], possibleWords[1], possibleWords[2], 3)}

                        </div>

                        <div className="wordleSquareAnswerLetter text-center mb-[3px]">

                          {letterColour(item[4], possibleWords[1], possibleWords[2], 4)}

                        </div>

                      </div>

                      ))}

                  </div>

                </div>
        
              ) : (

                <div id="answer placeholder" className="flex place-content-center palmTreeBorder">

                  <img src={palmTreeLogo} alt="Palm Tree" className=""></img>

                </div>
              )}

          </div>

          {/* Input Column*/}
          <div id='inputColumn' className='bg-[#dbfeef] order-1 columnLayout max-h-max md:max-h-[683.5px]'>

            {/* Flex Box to hold Known and Valid elements */}
            <div id="knownValidFlexBox" className="flex flex-col md:flex-row flex-nowrap h-[568px] md:h-[275px] md:place-content-between columnBorder">

              {/* 'KNOWN' */}
              <div id="knownInput" className="bg-transparent pb-[23px] md:pb[0px] md:w-[300px] text-center max-h-max mx-auto">

                {/* 'KNOWN' title */}
                <div className="mainBodyTitleGridItem place-content-center mt-[23px]">

                  <div className="wordleBlockBoxShadowGreen  wordleSquare mr-2 bg-wordle-green text-center place-content-center pb-[4px]">
                    <div className="wordleBlockFont">K</div>
                  </div>

                  <div className="wordleBlockBoxShadowYellow wordleSquare mr-2 bg-wordle-yellow text-center place-content-center pb-[4px]">
                    <div className="wordleBlockFont">N</div>
                  </div>

                  <div className="wordleBlockBoxShadowGrey   wordleSquare mr-2 bg-wordle-grey text-center place-content-center pb-[4px]">
                    <div className="wordleBlockFont">O</div>
                  </div>

                  <div className="wordleBlockBoxShadowGreen  wordleSquare mr-2 bg-wordle-green text-center place-content-center pb-[4px]">
                    <div className="wordleBlockFont">W</div>
                  </div>

                  <div className="wordleBlockBoxShadowYellow wordleSquare bg-wordle-yellow text-center place-content-center pb-[4px]">
                    <div className="wordleBlockFont">N</div>
                  </div>

                </div>

                <div className="infoFont mb-[15px]">
                  <div>Known Positions</div>
                  <div>Order Matters</div>
                </div>

                {/* 'KNOWN' input form */}
                <form className="flex flex-row place-content-center">

                  <input type="text" id="known1" maxLength="1" 
                    onClick=   {(e) => moveCursorToEnd(e.target)} 
                    onKeyDown= {(e) => inputOnKeyDown(e, e.target.id)}
                    className="knownInput inputText inputBorder inputSquare mr-[10px]" required>
                    </input>

                  <input type="text" id="known2" maxLength="1" 
                    onClick=   {(e) => moveCursorToEnd(e.target)} 
                    onKeyDown= {(e) => inputOnKeyDown(e, e.target.id)}
                    className="knownInput inputText inputBorder inputSquare mr-[10px]" required>
                  </input>

                  <input type="text" id="known3" maxLength="1" 
                    onClick=   {(e) => moveCursorToEnd(e.target)} 
                    onKeyDown= {(e) => inputOnKeyDown(e, e.target.id)}
                    className="knownInput inputText inputBorder inputSquare mr-[10px]" required>
                  </input>

                  <input type="text" id="known4" maxLength="1" 
                    onClick=   {(e) => moveCursorToEnd(e.target)} 
                    onKeyDown= {(e) => inputOnKeyDown(e, e.target.id)}
                    className="knownInput inputText inputBorder inputSquare mr-[10px]" required>
                  </input>

                  <input type="text" id="known5" maxLength="1" 
                    onClick=   {(e) => moveCursorToEnd(e.target)} 
                    onKeyDown= {(e) => inputOnKeyDown(e, e.target.id)}
                    className="knownInput inputText inputBorder inputSquare" required>
                  </input>

                </form>

                <button className='knownClear clearButton bg-wordle-green' onClick={knownClearOnClick}>CLEAR</button>

              </div>

              {/* Vertical Divider */}
              <div id="verticalDivider" className="hidden md:block dividerVertical"></div>

              {/* Horizontal Divider */}
              <div id="horizontalDivider" className="block md:hidden dividerHorizontal"></div>

              {/* 'VALID' */}
              <div id="validInput" className="bg-transparent md:w-[300px] text-center max-h-max mx-auto">

                {/* 'VALID' title */}
                <div className="flex flex-row place-content-center mt-[23px]">

                  <div className="wordleBlockBoxShadowGreen  wordleSquare bg-wordle-green text-center place-content-center pb-[4px]">
                    <div className="wordleBlockFont">V</div>
                  </div>

                  <div className="wordleBlockBoxShadowYellow wordleSquare bg-wordle-yellow text-center place-content-center pb-[4px]">
                    <div className="wordleBlockFont">A</div>
                  </div>

                  <div className="wordleBlockBoxShadowGrey   wordleSquare bg-wordle-grey text-center place-content-center pb-[4px]">
                    <div className="wordleBlockFont">L</div>
                  </div>

                  <div className="wordleBlockBoxShadowGreen  wordleSquare bg-wordle-green text-center place-content-center pb-[4px]">
                    <div className="wordleBlockFont">I</div>
                  </div>

                  <div className="wordleBlockBoxShadowYellow wordleSquare bg-wordle-yellow text-center place-content-center pb-[4px]">
                    <div className="wordleBlockFont">D</div>
                  </div>

                </div>

                <div className="infoFont mb-[15px]">
                  <div>Unknown Positions</div>
                  <div>Order Doesn't Matter</div>
                </div>

                {/* 'VALID' input form */}
                <form className="flex flex-row place-content-center">

                  <input type="text" id="valid1" maxLength="1" 
                    onClick={(e) => moveCursorToEnd(e.target)} 
                    onKeyDown={(e) => inputOnKeyDown(e, e.target.id)} 
                    className="validInput inputText inputBorder inputSquare mr-[10px]" required>
                  </input>

                  <input type="text" id="valid2" maxLength="1" 
                    onClick={(e) => moveCursorToEnd(e.target)} 
                    onKeyDown={(e) => inputOnKeyDown(e, e.target.id)} 
                    className="validInput inputText inputBorder inputSquare mr-[10px]" required>
                  </input>

                  <input type="text" id="valid3" maxLength="1" 
                    onClick={(e) => moveCursorToEnd(e.target)} 
                    onKeyDown={(e) => inputOnKeyDown(e, e.target.id)} 
                    className="validInput inputText inputBorder inputSquare mr-[10px]" required>
                  </input>

                  <input type="text" id="valid4" maxLength="1" 
                    onClick={(e) => moveCursorToEnd(e.target)} 
                    onKeyDown={(e) => inputOnKeyDown(e, e.target.id)} 
                    className="validInput inputText inputBorder inputSquare mr-[10px]" required>
                  </input>

                  <input type="text" id="valid5" maxLength="1" 
                    onClick={(e) => moveCursorToEnd(e.target)} 
                    onKeyDown={(e) => inputOnKeyDown(e, e.target.id)} 
                    className="validInput inputText inputBorder inputSquare" required>
                  </input>

                </form>

                <button  className='validClear clearButton bg-wordle-yellow' onClick={validClearOnClick}>CLEAR</button>

              </div>

            </div>

            {/* 'KEYBOARD' */}
            <div className='bg-transparent w-full h-full mx-auto'>

              {/* Grid for Keyboard 1280 breakpoint for keyboard */}
              <div className="w-full h-full md:w-[640px] pb-[20px] px-[20px] keyboardBorder">

                {/* Horizontal Divider */}
                <div className="dividerHorizontal"></div>

                <div className="infoFont">
                  <div>Select Letters Not In The Word</div>
                </div>

                <div className='grid max-[450px]:grid-cols-4 grid-cols-6 md:grid-cols-10 justify-center'>

                  <button id="a" onClick={(e) => keyboardOnClick(e)} className="order-[1]  md:order-[11] md:row-start-2 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[60px]">A</button>
                  <button id="b" onClick={(e) => keyboardOnClick(e)} className="order-[2]  md:order-[24] md:row-start-3 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[120px]">B</button>
                  <button id="c" onClick={(e) => keyboardOnClick(e)} className="order-[3]  md:order-[22] md:row-start-3 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[120px]">C</button>
                  <button id="d" onClick={(e) => keyboardOnClick(e)} className="order-[4]  md:order-[13] md:row-start-2 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[60px]">D</button>
                  <button id="e" onClick={(e) => keyboardOnClick(e)} className="order-[5]  md:order-[3]  md:row-start-1 keyboardButton unselectedUnusedLetter keyboardLetterFont">E</button>
                  <button id="f" onClick={(e) => keyboardOnClick(e)} className="order-[6]  md:order-[14] md:row-start-2 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[60px]">F</button>
                  <button id="g" onClick={(e) => keyboardOnClick(e)} className="order-[7]  md:order-[15] md:row-start-2 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[60px]">G</button>
                  <button id="h" onClick={(e) => keyboardOnClick(e)} className="order-[8]  md:order-[16] md:row-start-2 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[60px]">H</button>
                  <button id="i" onClick={(e) => keyboardOnClick(e)} className="order-[9]  md:order-[8]  md:row-start-1 keyboardButton unselectedUnusedLetter keyboardLetterFont">I</button>
                  <button id="j" onClick={(e) => keyboardOnClick(e)} className="order-[10] md:order-[17] md:row-start-2 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[60px]">J</button>
                  <button id="k" onClick={(e) => keyboardOnClick(e)} className="order-[11] md:order-[18] md:row-start-2 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[60px]">K</button>
                  <button id="l" onClick={(e) => keyboardOnClick(e)} className="order-[12] md:order-[19] md:row-start-2 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[60px]">L</button>
                  <button id="m" onClick={(e) => keyboardOnClick(e)} className="order-[13] md:order-[26] md:row-start-3 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[120px]">M</button>
                  <button id="n" onClick={(e) => keyboardOnClick(e)} className="order-[14] md:order-[25] md:row-start-3 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[120px]">N</button>
                  <button id="o" onClick={(e) => keyboardOnClick(e)} className="order-[15] md:order-[9]  md:row-start-1 keyboardButton unselectedUnusedLetter keyboardLetterFont">O</button>
                  <button id="p" onClick={(e) => keyboardOnClick(e)} className="order-[16] md:order-[10] md:row-start-1 keyboardButton unselectedUnusedLetter keyboardLetterFont">P</button>
                  <button id="q" onClick={(e) => keyboardOnClick(e)} className="order-[17] md:order-[1]  md:row-start-1 keyboardButton unselectedUnusedLetter keyboardLetterFont">Q</button>
                  <button id="r" onClick={(e) => keyboardOnClick(e)} className="order-[18] md:order-[4]  md:row-start-1 keyboardButton unselectedUnusedLetter keyboardLetterFont">R</button>
                  <button id="s" onClick={(e) => keyboardOnClick(e)} className="order-[19] md:order-[12] md:row-start-2 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[60px]">S</button>
                  <button id="t" onClick={(e) => keyboardOnClick(e)} className="order-[20] md:order-[5]  md:row-start-1 keyboardButton unselectedUnusedLetter keyboardLetterFont">T</button>
                  <button id="u" onClick={(e) => keyboardOnClick(e)} className="order-[21] md:order-[7]  md:row-start-1 keyboardButton unselectedUnusedLetter keyboardLetterFont">U</button>
                  <button id="v" onClick={(e) => keyboardOnClick(e)} className="order-[22] md:order-[23] md:row-start-3 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[120px]">V</button>
                  <button id="w" onClick={(e) => keyboardOnClick(e)} className="order-[23] md:order-[2]  md:row-start-1 keyboardButton unselectedUnusedLetter keyboardLetterFont">W</button>
                  <button id="x" onClick={(e) => keyboardOnClick(e)} className="order-[24] md:order-[21] md:row-start-3 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[120px]">X</button>
                  <button id="filler1" className="order-[25] max-[450px]:hidden invisible md:hidden">#</button>
                  <button id="filler2" className="order-[26] invisible md:hidden">#</button>
                  <button id="y" onClick={(e) => keyboardOnClick(e)} className="order-[27] md:order-[6]  md:row-start-1 keyboardButton unselectedUnusedLetter keyboardLetterFont">Y</button>
                  <button id="z" onClick={(e) => keyboardOnClick(e)} className="order-[28] md:order-[20] md:row-start-3 keyboardButton unselectedUnusedLetter keyboardLetterFont md:ml-[120px]">Z</button>
                  
                </div>

                {/* Submit and Clear All Buttons */}
                <div className='flex bg-transparent buttonBox'>

                  <button id="submitButton"   className='submitButton'   onClick={handleSubmitOnClick}>SUBMIT</button>

                  <button id="clearAllButton" className='clearAllButton' onClick={clearAllOnClick}>RESET</button>

                </div>
                
              </div>

            </div>

          </div>

        </div>

        {/* Info Row Row */}
        {/* <div className='columnLayout mt-[25px]'>

          Instructions
          <div className='bg-white columnBorder text-center'>
            <p className="w-full h-full">| Data sent to the server seems to not update untill submit button is clicked twice |</p>
          </div>

        </div> */}

      </main>

      {/* <div className="h-[500px]"></div> */}

      {/* // <div id="answers">
      //   {possibleWords ? ( */}

      {/* <main className="bg-[#f0fff8] answersLayout max-h-max mx-auto bodyBorder">

             <header className="grid grid-cols-1 w-full">

               POSSIBLE TITLE
               <div className='answersTitleGridItem pb-2'>

      //           <div className="wordleBlockBoxShadowGreenMobile  wordleSquareAnswerTitle mr-2 bg-wordle-green text-center place-content-center pb-[4px]">
      //             <div className="wordleBlockFont">P</div>
      //           </div>
      //           <div className="wordleBlockBoxShadowYellowMobile wordleSquareAnswerTitle mr-2 bg-wordle-yellow text-center place-content-center pb-[4px]">
      //             <div className="wordleBlockFont">O</div>
      //           </div>
      //           <div className="wordleBlockBoxShadowGreyMobile   wordleSquareAnswerTitle mr-2 bg-wordle-grey text-center place-content-center pb-[4px]">
      //             <div className="wordleBlockFont">S</div>
      //           </div>
      //           <div className="wordleBlockBoxShadowGreenMobile  wordleSquareAnswerTitle mr-2 bg-wordle-green text-center place-content-center pb-[4px]">
      //             <div className="wordleBlockFont">S</div>
      //           </div>
      //           <div className="wordleBlockBoxShadowYellowMobile wordleSquareAnswerTitle mr-2 bg-wordle-yellow text-center place-content-center pb-[4px]">
      //             <div className="wordleBlockFont">I</div>
      //           </div>
      //           <div className="wordleBlockBoxShadowGreyMobile   wordleSquareAnswerTitle mr-2 bg-wordle-grey text-center place-content-center pb-[4px]">
      //             <div className="wordleBlockFont">B</div>
      //           </div>
      //           <div className="wordleBlockBoxShadowGreenMobile  wordleSquareAnswerTitle mr-2 bg-wordle-green text-center place-content-center pb-[4px]">
      //             <div className="wordleBlockFont">L</div>
      //           </div>
      //           <div className="wordleBlockBoxShadowYellowMobile wordleSquareAnswerTitle mr-2 bg-wordle-yellow text-center place-content-center pb-[4px]">
      //             <div className="wordleBlockFont">E</div>
      //           </div>

               </div>

               ANSWERS TITLE
               <div className='answersTitleGridItem'>

      //           <div className="wordleBlockBoxShadowGreenMobile  wordleSquareAnswerTitle mr-2 bg-wordle-green text-center place-content-center pb-[4px]">
      //             <div className="wordleBlockFont">A</div>
      //           </div>
      //           <div className="wordleBlockBoxShadowYellowMobile wordleSquareAnswerTitle mr-2 bg-wordle-yellow text-center place-content-center pb-[4px]">
      //             <div className="wordleBlockFont">N</div>
      //           </div>
      //           <div className="wordleBlockBoxShadowGreyMobile   wordleSquareAnswerTitle mr-2 bg-wordle-grey text-center place-content-center pb-[4px]">
      //             <div className="wordleBlockFont">S</div>
      //           </div>
      //           <div className="wordleBlockBoxShadowGreenMobile  wordleSquareAnswerTitle mr-2 bg-wordle-green text-center place-content-center pb-[4px]">
      //             <div className="wordleBlockFont">W</div>
      //           </div>
      //           <div className="wordleBlockBoxShadowYellowMobile wordleSquareAnswerTitle mr-2 bg-wordle-yellow text-center place-content-center pb-[4px]">
      //             <div className="wordleBlockFont">E</div>
      //           </div>
      //           <div className="wordleBlockBoxShadowGreyMobile   wordleSquareAnswerTitle mr-2 bg-wordle-grey text-center place-content-center pb-[4px]">
      //             <div className="wordleBlockFont">R</div>
      //           </div>
      //           <div className="wordleBlockBoxShadowGreenMobile  wordleSquareAnswerTitle mr-2 bg-wordle-green text-center place-content-center pb-[4px]">
      //             <div className="wordleBlockFont">S</div>
      //           </div>

               </div>

             </header>
        
             <div className="bg-[#fefff0] columnBorder grid grid-cols-5 gap-[10px] w-[850px] max-h-max mt-10 mx-auto p-5">

                 <div className="col-span-5">We found {possibleWords[0].length} possible answers</div>

               {possibleWords[0].map(item => (

                <div className="bg-white answerFlexBox answerBorder px-[10px]">

                  <div className="wordleSquareAnswerLetter text-center mr-1 mb-[3px]">

                    {letterColour(item[0], possibleWords[1], possibleWords[2], 0)}

                  </div>
                  
                  <div className="wordleSquareAnswerLetter text-center mr-1 mb-[3px]">

                    {letterColour(item[1], possibleWords[1], possibleWords[2], 1)}

                  </div>

                  <div className="wordleSquareAnswerLetter text-center mr-1 mb-[3px]">

                    {letterColour(item[2], possibleWords[1], possibleWords[2], 2)}

                  </div>

                  <div className="wordleSquareAnswerLetter text-center mr-1 mb-[3px]">

                    {letterColour(item[3], possibleWords[1], possibleWords[2], 3)}

                  </div>

                  <div className="wordleSquareAnswerLetter text-center mb-[3px]">

                    {letterColour(item[4], possibleWords[1], possibleWords[2], 4)}

                  </div>

                </div>

                ))}

            </div>

          </main>

        ) : (

          <div></div>

        )}
      </div> */}

    </div>
  );
}

export default App;