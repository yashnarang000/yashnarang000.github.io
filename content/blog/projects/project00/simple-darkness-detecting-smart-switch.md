---
title: "Simple Darkness Detector Smart Switch"
date: 2025-06-17T19:30:00+05:30
thumbnail:
    url: "/img/ldr-switch.png"
tags: ["project 00"]
draft: false
---

***DISCLAIMER: This device may turn on the light when you're near it, since it might sense the darkness in your future.***

## Built In A Day (with a proper three-hour afternoon nap)

They say necessity is the mother of invention. In my case, it was laziness and the sheer refusal to get up and switch off the room light manually.

So I built this: a light-detecting Arduino switch that automatically turns on/off a room bulb based on ambient darkness. The soul of this setup? A Light Dependent Resistor (LDR), a servo, and some classic jugaad.

## What I Used

- **Arduino Uno (clone)** – because originals are for trust fund kids  
- **LDR** – plugged into analog pin A0  
- **Servo Motor** – connected to pin 9 (PWM)  
- **A dream** – of not moving from bed again  

## How It Works

The logic is simple:  
LDR detects darkness → Arduino sends signal → Servo physically toggles the bulb switch.

Yup. No fancy relays or Bluetooth modules — the servo’s wing literally **presses the physical switch** like a tiny robot butler with no salary and zero rights (uhm).

## Code Breakdown

Here’s the basic sketch I used:

```cpp
#include <Servo.h>
Servo s;

#define ldrpin A0
#define spin 9

void setup() {
  pinMode(ldrpin, INPUT);
  s.attach(spin);
  s.write(0); // Servo at rest
  Serial.begin(9600);
}

void loop() {
  delay(100);

  int x = analogRead(ldrpin);
  Serial.println(x); // Used for calibration

  if (x >= 980) { // It’s dark enough
    s.write(100);
    delay(500);
    s.write(0);
    delay(400);
  }
}
```

**Key Insight**: The darkness threshold is 980 (out of 1023). Tweak it depending on your room’s lighting.

## Physical Setup

There’s a reason engineers love duct tape. I went a step further — **double-sided tape**.

- The **servo** is positioned *below* the switch, patiently waiting for darkness.  
- One of its wings hits the switch when rotated.  
- Fixed everything tight using tape, friction, and blind faith.  

And... all set, you think? Nope. *Picture abhi baaki hai, mere dost!*

## When Things Went South (aka Arduino’s Existential Crisis)

Initially, everything worked smoothly — the servo clicked, the light responded, and I felt like Tony Stark (minus the billions and Pepper Potts).

But after a few minutes:

- Servo stopped.
- RX LED turned off.
- Serial Monitor froze.
- Board was still powered and detected on COM port.

Panic? A bit. But then I did what every engineer does — *blamed the hardware*.  
Spoiler: the board wasn’t dead.

## The Real Issue

The servo was **pulling too much current**, and the Arduino’s onboard 5V regulator was basically screaming silently. It couldn’t keep up with the spikes.

What fixed it?

- Smoothed the logic  
- Reduced unnecessary updates  
- Calmed the servo’s movement  
- Gave the board some breathing room  

> **Moral**: Don’t throw more power at the problem. Throw better logic.

## Final Thoughts

I didn’t build a smart home system.  
I didn’t write an app.  
I just made a cheap Arduino servo *physically* press a light switch when the room gets dark.

And that’s exactly why it’s awesome.

If you liked this project, feel free to recreate it, tweak it, or judge it silently.  
If you didn’t like it — go build something better. That’s the whole point.

Until then, this was me vs the light switch.  
**Conclusion: I won.**
