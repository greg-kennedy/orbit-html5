var system = [
 { name:"Sol", type:"star", mass:1.98855e30, radius:695500e3, x:0, y:0, velocity:{angle:0, magnitude:0 }},
 { name:"Mercury", type:"solid", mass:3.3022e23, radius: 2439.7e3, x:69816900e3,y:0,velocity:{angle:Math.PI/2,magnitude:38858 }},
 { name:"Venus", type:"solid", mass:4.8676e24, radius: 6051.8e3, x:108939000e3,y:0,velocity:{angle:Math.PI/2,magnitude:34790 }},
 { name:"Earth", type:"solid", mass:5.97219e24, radius: 6371.0e3, x:152098232e3,y:0,velocity:{angle:Math.PI/2,magnitude:29290 }},
   { name:"Moon", type:"solid", mass:7.3477e22, radius: 1737.1e3, x:152460832e3,y:0,velocity:{angle:Math.PI/2,magnitude:29290+964 }},
 { name:"Mars", type:"solid", mass:6.4185e23, radius: 3389.5e3, x:249230000e3,y:0,velocity:{angle:Math.PI/2,magnitude:21970 }}
 //  { name:"Phobos", type:"solid", mass:1.06e16, radius: 11.2e3, x:249239378e3,y:0,velocity:{angle:Math.PI/2,magnitude:500 }},
 //  { name:"Deimos", type:"solid", mass:2.4e15, radius: 6.1e3, x:249253459e3,y:0,velocity:{angle:Math.PI/2,magnitude:500 }}
];

// missing: "argument of pericenter".  In fact most of these should be at pericenter, not apocenter.