'use strict'

///////////////////////////////////////////////////////////////////////////////
// ZzFXMicro - Zuper Zmall Zound Zynth

// play a zzfx sound
var zzfx = (...parameters)=> OS13k.PlaySamples(zzfxG(...parameters)),

// generate zzfx samples
zzfxG = (volume = 1, randomness = .05, frequency = 220, attack = 0, sustain = 0, release = .1, shape = 0, shapeCurve = 1, slide = 0, deltaSlide = 0, pitchJump = 0, pitchJumpTime = 0, repeatTime = 0, noise = 0, modulation = 0, bitCrush = 0, delay = 0, sustainVolume = 1, decay = 0, tremolo = 0, buffer = [])=>
{
    attack = 99 + attack * defaultSampleRate;
    release = release * defaultSampleRate;
    sustain *= defaultSampleRate;
    decay *= defaultSampleRate;
    delay *= defaultSampleRate;
    
    // init parameters and helper functions
    let PI2 = Math.PI*2,
    sign = v=> v>0? 1 : -1,
    length = OS13k.randomSeed = OS13k.Clamp(attack + decay + sustain + release + delay, 9*defaultSampleRate) | 0,
    startSlide = slide *= 500 * PI2 / defaultSampleRate**2,
    startFrequency = frequency *= (1 + randomness*2*Math.random() - randomness) * PI2 / defaultSampleRate,
    modPhase = sign(modulation) * PI2/4,
    t=0, tm=0, i=0, j=1, r=0, c=0, s=0, f;

    repeatTime = repeatTime * defaultSampleRate | 0;
    pitchJumpTime *= defaultSampleRate;
    pitchJump *= PI2 / defaultSampleRate;
    deltaSlide *= 500 * PI2 / defaultSampleRate**3;
    for(modulation *= PI2 / defaultSampleRate;
    
        // loop and generate waveform, combine with buffer if passed in
        i < length; buffer[i] = (buffer[i++] || 0) + s)
    {
        if (!(++c%(bitCrush*100|0)))                     // bit crush
        {
            s = shape? shape>1? shape>2? shape>3?        // wave shape
                Math.sin((t%PI2)**3) :                   // 4 noise
                Math.max(Math.min(Math.tan(t),1),-1):    // 3 tan
                1-(2*t/PI2%2+2)%2:                       // 2 saw
                1-4*Math.abs(Math.round(t/PI2)-t/PI2):   // 1 triangle
                Math.sin(t);                             // 0 sin

            s = (repeatTime ?
                    1 - tremolo + tremolo*Math.sin(2*Math.PI*i/repeatTime) // tremolo
                    : 1) *
                sign(s)*(Math.abs(s)**shapeCurve) *          // curve 0=square, 2=pointy
                volume * (                                   // envelope
                    i < attack ? i/attack :                  // attack
                    i < attack + decay ?                     // decay
                    1-((i-attack)/decay)*(1-sustainVolume) : // decay falloff
                    i < attack + decay + sustain ?           // sustain
                    sustainVolume :                          // sustain volume
                    i < length - delay ?                     // release
                    (length - i - delay)/release *           // release falloff
                    sustainVolume :                          // release volume
                0);                                          // post release

            s = delay ?                                      // delay
                s/2 + (delay > i ? 0 :
                (i<length-delay? 1 : (length-i)/delay) *     // release delay 
                buffer[i - delay|0]/2) : s;                  // sample delay
        }

        f = (frequency += slide += deltaSlide) *     // frequency
            Math.sin(tm * modulation - modPhase);    // modulation

        t += f - f*noise*(1 - (Math.sin(i)+1)*1e9%2);     // noise
        tm += f - f*noise*(1 - (Math.sin(i)**2+1)*1e9%2); // modulation noise

        if (j && ++j > pitchJumpTime)       // pitch jump
        {
            frequency += pitchJump;         // apply pitch jump
            startFrequency += pitchJump;    // also apply to start
            j = 0;                          // reset pitch jump time
        }

        if (repeatTime && !(++r % repeatTime)) // repeat
        {
            frequency = startFrequency;     // reset frequency
            slide = startSlide;             // reset slide
            j = j || 1;                     // reset pitch jump time
        }
    }
    
    return buffer;
},

///////////////////////////////////////////////////////////////////////////////
//! ZzFXM (v2.0.2) | (C) Keith Clark & Frank Force | MIT | https://github.com/keithclark/ZzFXM

zzfxM = (instruments, patterns, sequence, BPM = 125, validate) => 
{
    let instrumentParameters, i, j, k, sample, patternChannel, isSequenceEnd,
        notFirstBeat, stop, instrument, pitch, attenuation, pan = 0,
        outSampleOffset, sampleOffset, nextSampleOffset, sampleBuffer = [], 
        channelIndex = 0, hasMore = 1, channelBuffers = [[],[]], 
        sampleCache = {}, beatLength = defaultSampleRate / BPM * 60 >> 2;

    // for each channel in order until there are no more
    for(; hasMore; channelIndex++)
    {
        // reset current values
        sampleBuffer = [hasMore = notFirstBeat = outSampleOffset = 0];

        // for each pattern in sequence
        sequence.map((patternIndex, sequenceIndex) => 
        {
            // get pattern for current channel, use empty 1 note pattern if none found
            patternChannel = patterns[patternIndex][channelIndex] || [0, 0, 0];

            // check if there are more channels
            hasMore |= !!patterns[patternIndex][channelIndex];

            // get next offset, use the length of first channel
            nextSampleOffset = outSampleOffset + (patterns[patternIndex][0].length - 2 - !notFirstBeat) * beatLength;

            // for each beat in pattern, plus one extra if end of sequence
            isSequenceEnd = sequenceIndex == sequence.length - 1;
            for (i = 2, k = outSampleOffset; i < patternChannel.length + isSequenceEnd; notFirstBeat = ++i)
            {
                // stop if end, different instrument, or new note
                stop = i == patternChannel.length + isSequenceEnd - 1 && isSequenceEnd || 
                    instrument != (patternChannel[0] || 0) | patternChannel[i] | 0;

                // fill buffer with samples for previous beat, most cpu intensive part
                if (!validate)
                for(j = 0; j < beatLength && notFirstBeat; 

                    // fade off attenuation at end of beat if stopping note, prevents clicking
                    j++ > beatLength - 99 && stop ? attenuation += (attenuation < 1) / 99 : 0
                )
                {
                    // copy sample to stereo buffers with panning
                    sample = (1-attenuation) * sampleBuffer[sampleOffset++] / 2 || 0;
                    channelBuffers[0][k] = (channelBuffers[0][k]   || 0) - sample * pan + sample;
                    channelBuffers[1][k] = (channelBuffers[1][k++] || 0) + sample * pan + sample;
                }

                // set up for next note
                if (patternChannel[i])
                {
                    // set attenuation and pan
                    attenuation = patternChannel[i] % 1;
                    pan = patternChannel[1] || 0;

                    if (patternChannel[i] | 0)
                    {
                        // get cached sample
                        sampleBuffer = sampleCache
                            [[
                                instrument = patternChannel[sampleOffset = 0] || 0, 
                                pitch = patternChannel[i] | 0
                            ]] = 
                            sampleCache[[instrument, pitch]] ||
                        (
                            // add sample to cache
                            instrumentParameters = [...instruments[instrument]],
                            instrumentParameters[2] *= 2 ** ((pitch - 12) / 12),
                            pitch > 0 ? zzfxG(...instrumentParameters) : []
                        );
                    }
                }
            }

            // update the sample offset
            outSampleOffset = nextSampleOffset;
        });
    }

    return channelBuffers;
}