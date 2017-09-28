var osc = {};
var octaveID;
var noteID;

var whiteKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>'];
var whitePitchNotation = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];
var blackKeys = ['2', '3', undefined, '5', '6', '7', undefined, '9', '0', undefined, '=', 'A', 'S', undefined, 'F', 'G', undefined, 'J', 'K', 'L'];
var blackPitchNotation = ['C3#', 'D3#', undefined, 'F3#', 'G3#', 'A3#', undefined, 'C4#', 'D4#', undefined, 'F4#', 'G4#', 'A4#', undefined, 'C5#', 'D5#', undefined, 'F5#', 'G5#', 'A5#'];

var KeyToMidi = {
    '81': 48, // C3, q
    '50': 49, // C3#, 2
    '87': 50, // D3, w
    '51': 51, // D3#, 3
    '69': 52, // E3, e
    '82': 53, // F3, r
    '53': 54, // F3#, 5
    '84': 55, // G3, t
    '54': 56, // G3#, 6
    '89': 57, // A3, y
    '55': 58, // A3#, 7
    '85': 59, // B3, u
    '73': 60, // C4, i
    '57': 61, 
    '79': 62, 
    '48': 63,
    '80': 64,
    '219': 65,
    '187': 66,
    '221': 67,
    '65': 68,
    '90': 69,
    '83': 70,
    '88': 71, 
    '67': 72, // C5, c
    '70': 73, 
    '86': 74,
    '71': 75,
    '66': 76,
    '78': 77,
    '74': 78,
    '77': 79,
    '75': 80,
    '188': 81,
    '76': 82,
    '190': 83
}

var numOctave = 3;
var baseWidth = 50; 
var baseHeight = baseWidth * 4;  
var start_x_white = (window.innerWidth - baseWidth * 7 * numOctave) / 2 ;
var start_x_black = start_x_white + baseWidth * 0.75 ; 
var startY = (window.innerHeight - baseHeight) / 3 ; 

function setup(){
    var canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('wrapper');
    background('#282B6E');
    drawKeyboard();
    noLoop();
}

function draw(){
    console.log('drawing');
    drawPressedKeys();
}


function keyPressed(){
    var midi = KeyToMidi[keyCode];
    var octave = floor(midi / 12) - 1;
    octaveID = octave - numOctave;

    var musicNote = midi % 12;

    if(musicNote >= 5){
        noteID = musicNote + 1;
    } else {
        noteID = musicNote;
    }

    // console.log('keycode: ' + keyCode + ' midi: ' + midi);
    // console.log('midi', midi, 'octave', octave, 'octaveID:', octaveID, 'musicNote:', musicNote, 'noteID:', noteID);
    // drawPressedKeys();
    loop();
    playNote(KeyToMidi[keyCode], 100);
    return false;
}

function keyReleased(){
    setTimeout(drawKeyboard, 100);
    noLoop();
    return false;
}

function drawKeyboard(){
    for (var octave = 0; octave < numOctave; octave++){
        // white keys
        for (var n = 0; n < 14; n++){
            if (n % 2 === 0){
                i = n / 2;
                fill(255);
                rect(start_x_white + baseWidth * i + (baseWidth * 7 * octave), startY, baseWidth, baseHeight, 0, 0, 5, 5);
                fill(0);
                var k = i + 7 * octave;
                text(String(whiteKeys[k]), start_x_white + baseWidth * i + (baseWidth * 7 * octave) + baseWidth*0.45, startY + baseHeight*0.75);
                text(String(whitePitchNotation[k]), start_x_white + baseWidth * i + (baseWidth * 7 * octave) + baseWidth*0.4, startY + baseHeight*0.9);
            }
        }
        // black keys
        for (var n = 0; n < 14; n++){
            if (n % 2 === 1 && (n%14 !== 5) && (n%14 !== 13) ){
                j = (n-1) / 2;
                fill(0);
                rect(start_x_black + baseWidth * j + (baseWidth * 7 * octave), startY, baseWidth*0.5, baseHeight*0.6, 0, 0, 5, 5); 
                fill(255);
                var k = j + 7 * octave;
                text(String(blackKeys[k]), start_x_black + baseWidth * j + (baseWidth * 7 * octave) + baseWidth*0.2, startY + baseHeight*0.35);
                text(String(blackPitchNotation[k]), start_x_black + baseWidth * j + (baseWidth * 7 * octave) + baseWidth*0.05, startY + baseHeight*0.5);
            }
        }
    }
}

function drawPressedKeys(){
    if (keyIsPressed && octaveID !== NaN && noteID !== NaN){ 
        // white keys
        if (noteID % 2 === 0){
            fill("gold");
            rect(start_x_white + baseWidth * noteID/2 + (baseWidth * 7 * octaveID), startY, baseWidth, baseHeight, 0, 0, 5, 5);
            fill(0);
            var k = noteID/2 + 7 * octaveID;
            text(String(whiteKeys[k]), start_x_white + baseWidth * noteID/2 + (baseWidth * 7 * octaveID) + baseWidth*0.45, startY + baseHeight*0.75);
            text(String(whitePitchNotation[k]), start_x_white + baseWidth * noteID/2 + (baseWidth * 7 * octaveID) + baseWidth*0.4, startY + baseHeight*0.9);

            // backfill the neighboring black keys
            if(noteID === 2 || noteID === 8 || noteID === 10){
                fill(0);
                var m = noteID - 1;
                var n = noteID + 1;
                rect(start_x_black + baseWidth * (m-1)/2 + (baseWidth * 7 * octaveID), startY, baseWidth*0.5, baseHeight*0.6, 0, 0, 5, 5); 
                rect(start_x_black + baseWidth * (n-1)/2 + (baseWidth * 7 * octaveID), startY, baseWidth*0.5, baseHeight*0.6, 0, 0, 5, 5); 
                fill(255);
                var kl = (m-1)/2 + 7 * octaveID;
                var kr = (n-1)/2 + 7 * octaveID;
                text(String(blackKeys[kl]), start_x_black + baseWidth * (m-1)/2 + (baseWidth * 7 * octaveID) + baseWidth*0.2, startY + baseHeight*0.35);
                text(String(blackPitchNotation[kl]), start_x_black + baseWidth * (m-1)/2 + (baseWidth * 7 * octaveID) + baseWidth*0.05, startY + baseHeight*0.5);
                text(String(blackKeys[kr]), start_x_black + baseWidth * (n-1)/2 + (baseWidth * 7 * octaveID) + baseWidth*0.2, startY + baseHeight*0.35);
                text(String(blackPitchNotation[kr]), start_x_black + baseWidth * (n-1)/2 + (baseWidth * 7 * octaveID) + baseWidth*0.05, startY + baseHeight*0.5);
            } else if( noteID === 0 || noteID === 6){
                // fill the right black key
                fill(0);
                var m = noteID + 1;
                rect(start_x_black + baseWidth * (m-1)/2 + (baseWidth * 7 * octaveID), startY, baseWidth*0.5, baseHeight*0.6, 0, 0, 5, 5); 
                fill(255);
                var k = (m-1)/2 + 7 * octaveID;
                text(String(blackKeys[k]), start_x_black + baseWidth * (m-1)/2 + (baseWidth * 7 * octaveID) + baseWidth*0.2, startY + baseHeight*0.35);
                text(String(blackPitchNotation[k]), start_x_black + baseWidth * (m-1)/2 + (baseWidth * 7 * octaveID) + baseWidth*0.05, startY + baseHeight*0.5);
            } else if( noteID === 4 || noteID === 12){ 
                // fill the left black key
                fill(0);
                var m = noteID - 1;
                rect(start_x_black + baseWidth * (m-1)/2 + (baseWidth * 7 * octaveID), startY, baseWidth*0.5, baseHeight*0.6, 0, 0, 5, 5); 
                fill(255);
                var k = (m-1)/2 + 7 * octaveID;
                text(String(blackKeys[k]), start_x_black + baseWidth * (m-1)/2 + (baseWidth * 7 * octaveID) + baseWidth*0.2, startY + baseHeight*0.35);
                text(String(blackPitchNotation[k]), start_x_black + baseWidth * (m-1)/2 + (baseWidth * 7 * octaveID) + baseWidth*0.05, startY + baseHeight*0.5);

            }
        }
        // black keys
        if (noteID % 2 === 1 && noteID !== 5){ 
            fill("gold");
            rect(start_x_black + baseWidth * (noteID-1)/2 + (baseWidth * 7 * octaveID), startY, baseWidth*0.5, baseHeight*0.6, 0, 0, 5, 5); 
            fill(0);
            var k = (noteID-1)/2 + 7 * octaveID;
            text(String(blackKeys[k]), start_x_black + baseWidth * (noteID-1)/2 + (baseWidth * 7 * octaveID) + baseWidth*0.2, startY + baseHeight*0.35);
            text(String(blackPitchNotation[k]), start_x_black + baseWidth * (noteID-1)/2 + (baseWidth * 7 * octaveID) + baseWidth*0.05, startY + baseHeight*0.5);
        }
    }
}

function playNote(note, duration) {
    if (!osc[note]) {
        console.log('no osc for note:' + note);
        if (midiToFreq(note)){
            createAndFadeInNote(note);
        } else {
            console.log('cannot find note');
        }
    } 
  // If we set a duration, fade it out
  if (duration) {
    fadeOutNote(note, duration);
  }
}

function createAndFadeInNote(note) {
    osc[note] = new p5.TriOsc();
    osc[note].start();
    osc[note].amp(0);
    osc[note].freq(midiToFreq(note));
    osc[note].fade(0.5, 0.2);
}

function fadeOutNote(note, duration) {
    if(note !== undefined){
        setTimeout(function() {
            osc[note].fade(0, 0.2);
        }, duration-100);
        
        setTimeout(function() {
            osc[note].stop();
            osc[note] = null;
        }, duration+50); 
    }
}



