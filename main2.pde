void setup()
{
  
  size(200, 200);  // Size should be the first statement
  stroke(255);     // Set line drawing color to white
  frameRate(60);
}
float y = 100;
void draw()
{
  background(0);   // Set the background to black
  y = y - 1;
  if (y < 0) { y = height; }
  line(0, y, width, y);
}