var G=6.67384e-11;

function phys_gravitation(o1,o2)
{
  // Given two objects, return a vector indicating
  //  force from o2 on o1

  // Determine angle from o1 to o2
  var theta = Math.atan2(o2.y-o1.y,o2.x-o1.x);

  // Distance formula
  var r2 = phys_distance2(o1.x,o1.y,o2.x,o2.y);

  // Determine gravitational pull
  var f = G * o1.mass * o2.mass / r2;

  // Return vector
  return {angle:theta,magnitude:(f/o1.mass)};
}

function phys_distance2(x1,y1,x2,y2)
{
  return Math.pow(x2-x1,2) + Math.pow(y2-y1,2);
}

function vector_add(v1,v2)
{
  // Add two vectors by angle and magnitude,
  //  get a new vector.
  var x = (v1.magnitude * Math.cos(v1.angle)) + (v2.magnitude * Math.cos(v2.angle));
  var y = (v1.magnitude * Math.sin(v1.angle)) + (v2.magnitude * Math.sin(v2.angle));

  return {angle:Math.atan2(y,x),magnitude:Math.sqrt(x*x+y*y)};
}
