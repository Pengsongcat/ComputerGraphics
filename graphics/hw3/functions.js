let scale = (sx,sy = sx,sz = sx) => [ sx, 0, 0, 0,
                                      0, sy, 0, 0,
                                      0, 0, sz, 0,
                                      0, 0, 0, 1 ];

let move = (tx,ty,tz) => [ 1,0,0,0,
                           0,1,0,0,
                           0,0,1,0,
                           tx,ty,tz, 1 ];

let c = (angle) => Math.cos(angle);
let s = (angle) => Math.sin(angle);                  

let turnX = angle => [  1,0,0,0, 
                        0,c(angle),s(angle),0,
                        0,-s(angle), c(angle),0,   
                        0,0,0,1 ];

let turnY = angle => [  s(angle),0,c(angle),0,
                        0,1,0,0,
                       c(angle),0,-s(angle),0,
                        0,0,0,1 ];

let turnZ = angle => [  c(angle),s(angle),0,0,
                        -s(angle), c(angle),0,0,
                        0,0,1,0,
                        0,0,0,1 ];  

// add sphere, parabX, parabY, parabZ, slabX, slabY, slabZ, tubeX, tubeY, tubeZ and space.

let sphere = [ 1,0,0,0,
               0,1,0,0,
               0,0,1,0,
               0,0,0,-1 ];

let parabX = [ 0,0,0,1,
               0,1,0,0,
               0,0,1,0,
               0,0,0,0 ];
      
let parabY = [ 1,0,0,0,
               0,0,0,1,
               0,0,1,0,
               0,0,0,0 ];

let parabZ = [ 1,0,0,0,
               0,1,0,0,
               0,0,0,1,
               0,0,0,0 ];

let slabX = [ 1,0,0,0,
              0,0,0,0,
              0,0,0,0,
              0,0,0,-1 ];

let slabY = [ 0,0,0,0,
              0,1,0,0,
              0,0,0,0,
              0,0,0,-1 ];

let slabZ = [ 0,0,0,0,
              0,0,0,0,
              0,0,1,0,
              0,0,0,-1 ];

let tubeX = [ 0,0,0,0,
              0,1,0,0,
              0,0,1,0,
              0,0,0,-1 ];

let tubeY = [ 1,0,0,0,
              0,0,0,0,
              0,0,1,0,
              0,0,0,-1 ];

let tubeZ = [ 1,0,0,0,
              0,1,0,0,
              0,0,0,0,
              0,0,0,-1 ];

let space = [ 0,0,0,0,
              0,0,0,0,
              0,0,0,0,
              0,0,0,-1 ];

