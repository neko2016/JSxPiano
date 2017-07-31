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

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);

    background('lightCyan');
    numOctave = 3;
    baseWidth = 50; 
    baseHeight = baseWidth * 4;  
    start_x_white = (window.innerWidth - baseWidth * 7 * numOctave) / 2 ;
    start_x_black = start_x_white + baseWidth * 0.75 ; 
    startY = (window.innerHeight - baseHeight) / 8 ; 

    for (var octave = 0; octave < numOctave; octave ++){
        fill(255);
        for (n = 0; n < 14; n++){
            if (n % 2 === 0){
                i = n / 2;
                rect(start_x_white + baseWidth * i + (baseWidth * 7 * octave), startY, baseWidth, baseHeight)
            }
        }
        // only draw the black keys after the white keys are done to prevent overlapping
        fill(0);
        for (n = 0; n < 14; n++){
            if (n % 2 === 1 && (n%14 !== 5) && (n%14 !== 13) ){
                j = (n-1) / 2;
                rect(start_x_black + baseWidth * j + (baseWidth * 7 * octave), startY, baseWidth*0.5, baseHeight*0.6);  // 0, 0, 5, 5
            }
        }
    }
}

function draw(){}


function keyPressed(){
    console.log('keycode: ' + keyCode + ' midi: ' + KeyToMidi[keyCode]);
}

function playNote(note, duration){}
function mousePressed(){}
function mouseReleased(){}

function keyReleased(){}
