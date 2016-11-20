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
	'8': 80, // del

}

function setup() {
    createCanvas(1280, 400);
}

var osc = {};

function playNote(note, duration) {
	if (!osc[note]) {
	    createAndFadeInNote(note);
	} else {
		fadeOutNote(osc[note], duration);
		osc[note] = null;
		createAndFadeInNote(note);
	}


  // If we sest a duration, fade it out
  if (duration) {
    fadeOutNote(osc[note]);
	  osc[note] = null;
  }
}

function createAndFadeInNote(note) {
	osc[note] = new p5.TriOsc();
	osc[note].start();
	osc[note].amp(0);
	osc[note].freq(midiToFreq(note));
	osc[note].fade(0.5, 0.2);
}

function fadeOutNote(whichNote, duration) {
	setTimeout(function() {
		whichNote.fade(0, 0.2);
	}, duration-50);
}

function draw() {
  fill(255);
  rect (10, 10, 30, 100);
  rect (40, 10, 30, 100);
  rect (70, 10, 30, 100);
  rect (100, 10, 30, 100);
  rect (130, 10, 30, 100);
  rect (160, 10, 30, 100);
  rect (190, 10, 30, 100);
  rect (220, 10, 30, 100);
  rect (250, 10, 30, 100);
  rect (280, 10, 30, 100);
  rect (310, 10, 30, 100);
  rect (340, 10, 30, 100);
  rect (370, 10, 30, 100);
  rect (400, 10, 30, 100);
  fill(0);
  rect (32,10,15,60);
  rect (62,10,15,60);
  rect (122,10,15,60);
  rect (152,10,15,60);
  rect (182,10,15,60);
  rect (242,10,15,60);
  rect (272,10,15,60);
  rect (332,10,15,60);
  rect (362,10,15,60);
  rect (392,10,15,60);

}

function keyPressed() {
    playNote(KeyToMidi[keyCode], 200);
}


// Fade it out when we release
//function mouseReleased() {
//  osc.fade(0,0.5);
//}