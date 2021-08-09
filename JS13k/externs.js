/**
 * @fileoverview Public API of OS13k.js
 * @externs
 */

OS13k;
iframeContent;
iframeContent.OS13k;
iframeContent.OS13kWindow;
iframeContent.zzfx;

window.document.OS13kInput;
window.document.OS13kInput.x;
window.document.OS13kInput.y;
window.document.OS13kInput.keypress;
window.document.OS13kInput.mousepress;
window.document.OS13kInput.keydown;
window.document.OS13kInput.mousedown;
window.document.OS13kInput.mousex;
window.document.OS13kInput.mousey;

settings.v; // volume
settings.m; // music volume
settings.s; // speech
settings.p; // popups
settings.o; // system sounds
settings.c; // color 1
settings.d; // color 2
settings.t; // text

zzfx;
zzfxG;
zzfxM;

localStorage.OS13k
localStorage.OS13kVersion;
source.gain;

_OS13k = class
{
    Clamp(a, max=1, min=0) {}
    Percent(v, a, b) {}
    Lerp(p, a, b) {}
    Hash(s) {}
    Random(max=1, min=0) {}
    Trophy(icon, game, name, message) {}
    GetTrophy(game, name)  {}
    Trophies() {}
    PlaySeed(seed, lengthScale=1, volume=1, randomness=.05, frequency, isMusic) {}
    SeedSamples(...parameters) {}
    SeedParameters(seed, lengthScale=1, volume=1, randomness=.05, frequency) {}
    PlaySamples(samples, isMusic, sampleRate=defaultSampleRate) {}
    PlaySamplesArray(samplesArray, isMusic, sampleRate=defaultSampleRate) {}
    PlayMusic(song) {}
    GetAnalyser() {}
    GetAnalyserData(e) {}
    StringToMusic(string, validate) {}
    Note(semitoneOffset=0, rootNoteFrequency=440) {}
    Speak(text, language='en', stopSpeech, volume=1, rate=1, pitch=1) {}
    StripHTML(string, maxLength) {}
    Popup(html, speak, language) {}
    Input(inputWindow) {}
    Save() {}
    SaveSettings(volume, musicVolume, speech, popups, systemSounds, color1, color2, text) {}
    Settings() {}
};