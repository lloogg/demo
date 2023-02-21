int sensor = A0;
int sensorValue = 0;
void setup() {
  Serial.begin(9600);
}

void loop() {
  sensorValue = analogRead(sensor);
  int bright = map(sensorValue, 0, 1023, 0, 255);
  Serial.println(bright);
  analogWrite(3, bright);
  delay(200);
}
