var KeyToMidi = {
	'192': 41, // F
	'65': 42, // 
	'90': 43, // G
	'83': 44, //
	'88': 45, // A
	'68': 46, // 
	'67': 47, // B
	'86': 48, // C
	'71': 49, // 
	'66': 50, // D
	'72': 51, //
	'78': 52, // E
	'77': 53, // F
	'75': 54, //
	'188': 55, // G
	'76': 56, // 
	'190': 57, // A
	'186': 58,
	'191': 59, // B
	'16': 60, // middle C
    '81': 60, // middle C q
    '50': 61, //   2
    '87': 62, // D w
    '51': 63, //   3
    '69': 64, // E e
    '82': 65, // F r
	'53': 66, //   5
	'84': 67, // G t
	'54': 68, //   6
	'89': 69, // A y
	'55': 70, //   7
	'85': 71, // B u
	'73': 72, // C i
	'57': 73, // 
	'79': 74, // D
	'48': 75, //
	'80': 76, // E
	'219': 77, // F
	'187': 78, //
	'221': 79, // G
	'8': 81, // del

}

function setup() {
    createCanvas(1280, 400);
    fill(255);              // white keys
    rect (10, 10, 30, 100); // 1st octave
    rect (40, 10, 30, 100);
    rect (70, 10, 30, 100);
    rect (100, 10, 30, 100);
    rect (130, 10, 30, 100);
    rect (160, 10, 30, 100);
    rect (190, 10, 30, 100);
    rect (220, 10, 30, 100); // 2nd octave 
    rect (250, 10, 30, 100);
    rect (280, 10, 30, 100);
    rect (310, 10, 30, 100);
    rect (340, 10, 30, 100);
    rect (370, 10, 30, 100);
    rect (400, 10, 30, 100);
    rect (430, 10, 30, 100); // 3rd octave
    rect (460, 10, 30, 100);
    rect (490, 10, 30, 100);
    rect (520, 10, 30, 100);
    rect (550, 10, 30, 100);
    rect (580, 10, 30, 100);
    rect (610, 10, 30, 100);
    fill(0);                  // black keys
    rect (32,10,15,60);       // 1st octave
    rect (62,10,15,60);
    rect (122,10,15,60);
    rect (152,10,15,60);
    rect (182,10,15,60);
    rect (242,10,15,60);      // 2nd octave
    rect (272,10,15,60);
    rect (332,10,15,60);
    rect (362,10,15,60);
    rect (392,10,15,60);
    rect (452,10,15,60);     // 3rd octave
    rect (482,10,15,60); 
    rect (542,10,15,60); 
    rect (572,10,15,60); 
    rect (602,10,15,60); 
}

var osc = {};

function playNote(note, duration) {
	if (!osc[note]) {
		console.log('no osc for note:' + note);
		if (midiToFreq(note)){
			createAndFadeInNote(note);
		} else {
			console.log('cannot find note');
		}
	} else {
//		if (duration){
//   		    fadeOutNote(note, duration);
//		}
		//createAndFadeInNote(note);
	}


  // If we sest a duration, fade it out
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
//	setTimeout(function() {
	
		
	    //osc[note].stop();
	    //osc[note] = null;
//	}, duration-50);
	setTimeout(function() {
		//osc[note].fade(0, 0.2);
		osc[note].fade(0, 0.2);
	}, duration-100);
	
	setTimeout(function() {
			osc[note].stop();
			osc[note] = null;
		}, duration+50); 
}

function draw() {
}

function keyPressed() {
	console.log('keycode: ' + keyCode);
    playNote(KeyToMidi[keyCode], 100);
    var mod = KeyToMidi[keyCode];
}


function drawPlaying () {
	
}

// Fade it out when we release
//function mouseReleased() {
//  osc.fade(0,0.5);
//}