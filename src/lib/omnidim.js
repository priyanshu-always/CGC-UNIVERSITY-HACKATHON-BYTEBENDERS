// OmniDimension & In-Browser Voice Calling Engine for CGC Admissions
import { answerCounselorQuery } from "../data/cgcKnowledge.js";

export const OMNIDIM_AGENT_ID = "277505";
export const OMNIDIM_SECRET_KEY = "8c421fcab39aa4f651c748210fe18e72";
export const AGENT_NAME = "Ritu (CGC Admissions Counselor)";

// Load OmniDimension official widget if available
export function injectOmniDimensionWidget(secretKey = OMNIDIM_SECRET_KEY) {
  if (typeof document === "undefined") return;
  const existingScript = document.getElementById("omnidimension-web-widget");
  if (existingScript) return;

  const script = document.createElement("script");
  script.id = "omnidimension-web-widget";
  script.src = `https://omnidim.io/web_widget.js?secret_key=${secretKey}`;
  script.async = true;
  script.onerror = () => {
    console.info("OmniDimension widget script not reachable; fallback ready.");
  };
  document.body.appendChild(script);
}

// Trigger official OmniDimension widget modal
export function openOmniDimensionWidget() {
  const btn = document.getElementById("omni-open-widget-btn");
  if (btn) {
    btn.click();
    return true;
  }
  return false;
}

// Full-Duplex Browser Voice Engine (Zero external latency fallback for flawless hackathon presentations)
export class VoiceAgentSession {
  constructor({ onTranscript, onStateChange, onAudioLevel, onCallEnd }) {
    this.onTranscript = onTranscript || (() => {});
    this.onStateChange = onStateChange || (() => {});
    this.onAudioLevel = onAudioLevel || (() => {});
    this.onCallEnd = onCallEnd || (() => {});

    this.isActive = false;
    this.isMuted = false;
    this.state = "idle"; // idle, connecting, listening, thinking, speaking
    this.recognition = null;
    this.synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    this.audioContext = null;
    this.analyser = null;
    this.microphoneStream = null;
    this.simulatedWaveformInterval = null;
    this.callStartTime = null;
  }

  setState(newState) {
    this.state = newState;
    this.onStateChange(newState);
  }

  async startCall() {
    this.isActive = true;
    this.callStartTime = Date.now();
    this.setState("connecting");

    // Initialize audio analyzer for waveform visualizer
    await this.initAudioAnalyzer();

    // Set up Speech Recognition
    this.initSpeechRecognition();

    // Welcome greeting from Ritu
    setTimeout(() => {
      this.setState("speaking");
      const welcomeMsg = "Hello! I am Ritu, the AI Admissions Counsellor for CGC University, Jhanjeri, Mohali. How may I help you today?";
      this.onTranscript({
        id: Date.now(),
        speaker: "agent",
        text: welcomeMsg,
        sentiment: "positive",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
      this.speak(welcomeMsg, () => {
        if (this.isActive) {
          this.listen();
        }
      });
    }, 1200);
  }

  async initAudioAnalyzer() {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        const source = this.audioContext.createMediaStreamSource(this.microphoneStream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 64;
        source.connect(this.analyser);

        const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        const updateLevel = () => {
          if (!this.isActive) return;
          if (this.state === "listening" && !this.isMuted) {
            this.analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            const avg = sum / dataArray.length;
            this.onAudioLevel(avg);
          } else if (this.state === "speaking") {
            // Simulated speech pulse
            const pulse = 40 + Math.sin(Date.now() / 80) * 35 + Math.random() * 20;
            this.onAudioLevel(pulse);
          } else {
            this.onAudioLevel(5);
          }
          requestAnimationFrame(updateLevel);
        };
        requestAnimationFrame(updateLevel);
      }
    } catch (err) {
      console.warn("Microphone direct stream error, using simulated wave pulse:", err);
      this.startSimulatedAudioLevel();
    }
  }

  startSimulatedAudioLevel() {
    clearInterval(this.simulatedWaveformInterval);
    this.simulatedWaveformInterval = setInterval(() => {
      if (!this.isActive) return;
      if (this.state === "speaking") {
        const level = 45 + Math.sin(Date.now() / 90) * 35;
        this.onAudioLevel(level);
      } else if (this.state === "listening") {
        const level = 15 + Math.random() * 20;
        this.onAudioLevel(level);
      } else {
        this.onAudioLevel(5);
      }
    }, 100);
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Web Speech API not supported in this browser. Fallback typing enabled.");
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-IN"; // Indian English / Hindi mix

    this.recognition.onstart = () => {
      if (this.state !== "speaking") {
        this.setState("listening");
      }
    };

    this.recognition.onresult = (event) => {
      // Barge-in check: If user speaks while agent is speaking, cancel speech immediately!
      if (this.state === "speaking" && this.synth) {
        this.synth.cancel();
      }

      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript.trim()) {
        this.handleUserUtterance(finalTranscript.trim());
      }
    };

    this.recognition.onerror = (event) => {
      if (event.error !== "no-speech" && event.error !== "aborted") {
        console.warn("Speech recognition error:", event.error);
      }
    };

    this.recognition.onend = () => {
      if (this.isActive && this.state === "listening" && !this.isMuted) {
        // Automatically restart listening
        try {
          this.recognition.start();
        } catch (_) {}
      }
    };
  }

  listen() {
    if (!this.isActive || this.isMuted) return;
    this.setState("listening");
    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (_) {}
    }
  }

  handleUserUtterance(text) {
    if (!text || !this.isActive) return;

    this.onTranscript({
      id: Date.now(),
      speaker: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    this.setState("thinking");

    // Match intent from CGC Knowledge Base
    setTimeout(() => {
      if (!this.isActive) return;
      const answer = answerCounselorQuery(text);

      this.onTranscript({
        id: Date.now() + 1,
        speaker: "agent",
        text: answer.text,
        intent: answer.intent,
        sentiment: answer.sentiment,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });

      this.setState("speaking");
      this.speak(answer.text, () => {
        if (this.isActive) {
          this.listen();
        }
      });
    }, 450); // Lightning-fast 450ms thinking delay simulating Sarvam/Groq LLM
  }

  speak(text, onComplete) {
    if (!this.synth) {
      setTimeout(onComplete, 2000);
      return;
    }

    this.synth.cancel(); // Stop prior speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.05; // Pleasant, warm counselor pitch

    // Prefer Indian English or female voice if available
    const voices = this.synth.getVoices();
    const preferredVoice =
      voices.find((v) => v.lang.includes("en-IN") || v.name.toLowerCase().includes("india") || v.name.toLowerCase().includes("neerja") || v.name.toLowerCase().includes("ritu")) ||
      voices.find((v) => v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("zira") || v.name.toLowerCase().includes("samantha")) ||
      voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      if (onComplete) onComplete();
    };

    utterance.onerror = () => {
      if (onComplete) onComplete();
    };

    this.synth.speak(utterance);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.recognition) {
        try {
          this.recognition.stop();
        } catch (_) {}
      }
    } else {
      this.listen();
    }
    return this.isMuted;
  }

  endCall() {
    this.isActive = false;
    this.setState("idle");

    if (this.synth) this.synth.cancel();
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (_) {}
    }
    if (this.microphoneStream) {
      this.microphoneStream.getTracks().forEach((track) => track.stop());
    }
    if (this.audioContext) {
      try {
        this.audioContext.close();
      } catch (_) {}
    }
    clearInterval(this.simulatedWaveformInterval);

    const durationSeconds = this.callStartTime ? Math.round((Date.now() - this.callStartTime) / 1000) : 0;
    this.onCallEnd({ durationSeconds });
  }
}
