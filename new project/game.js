function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import * as THREE from 'three';
import { GLTFLoader } from 'three/loaders/GLTFLoader.js';
import { HandLandmarker, FilesetResolver } from 'https://esm.sh/@mediapipe/tasks-vision@0.10.14';
import { AudioManager } from './audioManager.js'; // Import the AudioManager
import { SpeechManager } from './SpeechManager.js'; // Import SpeechManager

// ---------- HOLOSENSE: synthesized sound effects (no audio files needed) ----------
class HoloSfx {
    constructor() { this.ctx = null; }
    _c() {
        if (!this.ctx) {
            try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { this.ctx = null; }
        }
        return this.ctx;
    }
    resume() { var c = this._c(); if (c && c.state === 'suspended') c.resume(); }
    tone(freq, dur, type, vol, slideTo, delay) {
        var c = this._c();
        if (!c || c.state !== 'running') return;
        var t = c.currentTime + (delay || 0);
        var o = c.createOscillator();
        var g = c.createGain();
        o.type = type || 'sine';
        o.frequency.setValueAtTime(freq, t);
        if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol || 0.04, t + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(c.destination);
        o.start(t); o.stop(t + dur + 0.03);
    }
    boot() {
        this.tone(90, 1.0, 'sawtooth', 0.03, 700);
        this.tone(520, 0.14, 'sine', 0.05, null, 0.85);
        this.tone(780, 0.28, 'sine', 0.05, null, 0.97);
    }
    start(kind) {
        var map = { drag: [520, 800], rotate: [330, 520], grow: [620, 930], shrink: [620, 930], resize: [620, 930], animate: [440, 660] };
        var f = map[kind] || [500, 700];
        this.tone(f[0], 0.12, 'triangle', 0.045, f[1]);
    }
    release() { this.tone(520, 0.14, 'triangle', 0.035, 240); }
    tick(sizePct) {
        var f = Math.max(380, Math.min(1500, 300 + sizePct * 3));
        this.tone(f, 0.05, 'square', 0.015);
    }
    confirm() { this.tone(700, 0.07, 'sine', 0.045); this.tone(1050, 0.1, 'sine', 0.045, null, 0.07); }
}

const HOLO_CSS = `
#boot-screen{position:absolute;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(ellipse at 50% 40%,#0a1226 0%,#04060c 70%);color:#d8e6f5;
  font-family:"Chakra Petch","Segoe UI",system-ui,sans-serif;transition:opacity .7s ease;}
#boot-screen.hide{opacity:0;pointer-events:none;}
.boot-core{display:flex;flex-direction:column;align-items:center;gap:16px;width:min(320px,80vw);}
.boot-logo{width:72px;height:72px;filter:drop-shadow(0 0 14px rgba(0,229,255,.7));animation:bootSpin 3.2s ease-in-out infinite;}
.boot-name{font-weight:700;font-size:1.6rem;letter-spacing:.32em;color:#00e5ff;text-shadow:0 0 18px rgba(0,229,255,.6);padding-left:.32em;}
.boot-bar{width:100%;height:3px;background:rgba(0,229,255,.15);border-radius:2px;overflow:hidden;}
#boot-fill{height:100%;width:4%;background:linear-gradient(90deg,#7c5cff,#00e5ff);box-shadow:0 0 12px #00e5ff;transition:width .45s ease;}
#boot-status{font-size:.85rem;color:#7f93ad;letter-spacing:.05em;min-height:1.2em;}
@keyframes bootSpin{0%,100%{transform:rotateY(0deg) scale(1)}50%{transform:rotateY(180deg) scale(1.06)}}
#fx-overlay{position:absolute;inset:0;z-index:2;pointer-events:none;
  background:radial-gradient(ellipse at center,transparent 52%,rgba(2,6,14,.78) 100%),
  repeating-linear-gradient(0deg,rgba(0,229,255,.05) 0,rgba(0,229,255,.05) 1px,transparent 1px,transparent 3px);}
#holo-hud{position:absolute;left:14px;bottom:14px;z-index:3;display:flex;align-items:center;gap:12px;padding:8px 14px 8px 10px;
  background:rgba(10,18,36,.62);border:1px solid rgba(0,229,255,.4);border-radius:6px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  box-shadow:0 0 18px rgba(0,229,255,.14);font-family:"Chakra Petch","Segoe UI",system-ui,sans-serif;color:#d8e6f5;pointer-events:none;
  transition:border-color .2s,box-shadow .2s;}
#holo-hud.active{border-color:#00e5ff;box-shadow:0 0 22px rgba(0,229,255,.4);}
#hud-icon{width:34px;height:34px;color:#00e5ff;flex:none;transition:transform .25s ease;}
#holo-hud.active #hud-icon{transform:scale(1.12);filter:drop-shadow(0 0 6px #00e5ff);}
#hud-gesture{font-weight:600;font-size:.95rem;letter-spacing:.04em;color:#00e5ff;}
#hud-stats{font-size:.75rem;color:#7f93ad;margin-top:2px;white-space:nowrap;}
#upload-btn{position:absolute;right:14px;bottom:14px;z-index:30;display:flex;align-items:center;gap:8px;padding:9px 14px;cursor:pointer;
  font:600 .85rem "Chakra Petch","Segoe UI",system-ui,sans-serif;letter-spacing:.04em;color:#d8e6f5;background:rgba(10,18,36,.62);
  border:1px solid rgba(0,229,255,.45);border-radius:6px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  box-shadow:0 0 18px rgba(0,229,255,.14);transition:border-color .15s,box-shadow .15s,background .15s;}
#upload-btn:hover{border-color:#00e5ff;box-shadow:0 0 18px rgba(0,229,255,.4);background:rgba(0,229,255,.1);}
#upload-btn:focus-visible{outline:2px solid #00e5ff;outline-offset:2px;}
@media (prefers-reduced-motion:reduce){.boot-logo{animation:none}#boot-screen{transition:none}}
@media (max-width:600px){#hud-stats{display:none}}
`;
const HUD_ICONS = {
    ready: '<circle cx="12" cy="12" r="3"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>',
    drag: '<path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/>',
    rotate: '<path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 3v5h-5"/>',
    grow: '<path d="M6 18L18 6M18 6h-7M18 6v7"/>',
    shrink: '<path d="M18 6L6 18M6 18h7M6 18v-7"/>',
    resize: '<path d="M4 4l6 6M4 4h5M4 4v5M20 20l-6-6M20 20h-5M20 20v-5"/>',
    animate: '<path d="M8 5l11 7-11 7z"/>'
};
const HUD_LABELS = { ready: 'Ready', drag: 'Dragging', rotate: 'Rotating', grow: 'Growing', shrink: 'Shrinking', resize: 'Resizing', animate: 'Animate mode' };

export var Game = /*#__PURE__*/ function() {
    "use strict";
    function Game(renderDiv) {
        var _this = this;
        _class_call_check(this, Game);
        this.renderDiv = renderDiv;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.videoElement = null;
        this.handLandmarker = null;
        this.lastVideoTime = -1;
        this.hands = []; // Stores data about detected hands (landmarks, anchor position, line group)
        this.handLineMaterial = null; // Material for hand lines
        this.fingertipMaterialHand1 = null; // Material for first hand's fingertip circles (blue)
        this.fingertipMaterialHand2 = null; // Material for second hand's fingertip circles (green)
        this.fingertipLandmarkIndices = [
            0,
            4,
            8,
            12,
            16,
            20
        ]; // WRIST + TIP landmarks
        this.handConnections = null; // Landmark connection definitions
        // this.handCollisionRadius = 30; // Conceptual radius for hand collision, was 25 (sphere radius) - Not needed for template
        this.gameState = 'loading'; // loading, ready, tracking, error
        this.gameOverText = null; // Will be repurposed or simplified
        this.clock = new THREE.Clock();
        this.audioManager = new AudioManager(); // Create an instance of AudioManager
        this.lastLandmarkPositions = [
            [],
            []
        ]; // Store last known smoothed positions for each hand's landmarks
        this.smoothingFactor = 0.28; // Alpha for exponential smoothing (0 < alpha <= 1). Smaller = more smoothing.
        this.loadedModels = {};
        this.pandaModel = null; // Add reference for the Panda model
        this.animationMixer = null; // For Stan model animations
        this.animationClips = []; // To store all animation clips from the model
        this.animationActions = {}; // To store animation actions by name or index
        this.currentAction = null; // To keep track of the currently playing animation action
        this.speechManager = null;
        this.speechBubble = null;
        this.speechBubbleTimeout = null;
        this.isSpeechActive = false; // Track if speech recognition is active for styling
        this.grabbingHandIndex = -1; // -1: no hand, 0: first hand, 1: second hand grabbing
        this.pickedUpModel = null; // Reference to the model being dragged
        this.modelDragOffset = new THREE.Vector3(); // Offset between model and pinch point in 3D
        this.modelGrabStartDepth = 0; // To store the model's Z depth when grabbed
        this.interactionMode = 'drag'; // 'drag', 'rotate', 'scale', 'animate' - Default to drag
        this.interactionModeButtons = {}; // To store references to mode buttons
        this.loadedDroppedModelData = null; // To temporarily store parsed GLTF data
        this.interactionModeColors = {
            drag: {
                base: '#00FFFF',
                text: '#000000',
                hand: new THREE.Color('#00FFFF')
            },
            rotate: {
                base: '#FF00FF',
                text: '#FFFFFF',
                hand: new THREE.Color('#FF00FF')
            },
            scale: {
                base: '#FFFF00',
                text: '#000000',
                hand: new THREE.Color('#FFFF00')
            },
            animate: {
                base: '#FFA500',
                text: '#000000',
                hand: new THREE.Color('#FFA500')
            } // Orange
        };
        this.rotateLastHandX = null; // Stores the last hand X position for rotation calculation
        this.rotateSensitivity = 0.008; // Adjust for faster/slower rotation
        this.scaleInitialPinchDistance = null; // Stores the initial distance between two pinching hands
        this.scaleInitialModelScale = null; // Stores the model's scale when scaling starts
        this.scaleSensitivity = 0.02; // Adjust for faster/slower scaling - Increased from 0.02 to 0.05
        this.grabbingPulseSpeed = 8; // Speed of the grab pulse animation
        this.grabbingPulseAmplitude = 0.5; // How much the scale increases (e.g., 0.5 means 50% bigger at peak)
        this.pulseBaseScale = 1.0; // Base scale for non-pulsing and start of pulse
        this.fingertipDefaultOpacity = 0.7; // Default opacity for hand landmarks (Reduced from 0.6)
        this.fingertipGrabOpacity = 1.0; // Opacity when hand is actively grabbing/interacting
        this.instructionTextElement = document.querySelector("#instruction-text"); // DOM element for instruction text
        this.interactionModeInstructions = {
            drag: "Pinch near the model, then move your hand to drag it",
            rotate: "Open your palm and move your hand to rotate",
            scale: "Thumbs up to grow the model, thumbs down to shrink it",
            animate: "Pinch and move your hand up or down to change animation" // Updated instruction
        };
        this.animationControlHandIndex = -1; // Index of the hand controlling animation scrolling
        this.animationControlInitialPinchY = null; // Initial Y position of the pinch for animation scrolling
        this.enabledModes = { drag: true, rotate: true, scale: true }; // Voice can switch these on/off
        this.palmHoldFrames = 0; // Consecutive frames an open palm has been held
        this.thumbHoldFrames = 0; // Consecutive frames the same thumb direction has been held
        this.lastThumbDir = 0; // 1 = thumbs up, -1 = thumbs down, 0 = none
        this.thumbScaleRate = 0.018; // Size change per frame while a thumb is held
        this.rotVelX = 0; // Smoothed hand velocity used for rotation
        this.rotVelY = 0;
        this.lastVoiceText = '';
        this.lastVoiceTime = 0;
        this.voiceFlashTimeout = null;
        this.sfx = new HoloSfx();
        this.handTrails = [{ last: 0, tips: {} }, { last: 0, tips: {} }];
        this.holoUniforms = { uTime: { value: 0 }, uGlow: { value: 0 } };
        this.holoRing = null;
        this.activeGesture = 'ready';
        this.hudFrame = 0;
        this.lastSizeStep = 0;
        this.animationScrollThreshold = 70; // Pixels of vertical movement to trigger an animation change (Reduced from 50)
        // Initialize asynchronously
        this._init().catch(function(error) {
            console.error("Initialization failed:", error);
            _this._showError("Initialization failed. Check console.");
        });
    }
    _create_class(Game, [
        {
            key: "_init",
            value: function _init() {
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _this._setupDOM(); // Sets up basic DOM, including speech bubble container
                                _this._setupThree();
                                _this._setupSpeechRecognition(); // Initialize SpeechManager
                                _this._bootStatus("Loading 3D model", 18);
                                return [
                                    4,
                                    _this._loadAssets()
                                ];
                            case 1:
                                _state.sent(); // Add asset loading step
                                _this._bootStatus("Starting camera and hand tracking", 45);
                                return [
                                    4,
                                    _this._setupHandTracking()
                                ];
                            case 2:
                                _state.sent(); // This needs to complete before we can proceed
                                _this._bootStatus("Warming up voice control", 85);
                                // Ensure webcam is playing before starting game logic dependent on it
                                return [
                                    4,
                                    _this.videoElement.play()
                                ];
                            case 3:
                                _state.sent();
                                _this.audioManager.resumeContext(); // Resume audio context as game starts automatically
                                _this.speechManager.requestPermissionAndStart(); // Start speech recognition
                                _this.clock.start(); // Start the main clock as game starts automatically
                                window.addEventListener('resize', _this._onResize.bind(_this));
                                _this.gameState = 'tracking'; // Change state to tracking to start immediately
                                _this._bootStatus("Online", 100);
                                _this.sfx.boot();
                                setTimeout(function() { _this._hideBoot(); }, 600);
                                _this._animate(); // Start the animation loop (it will check state)
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "_setupDOM",
            value: function _setupDOM() {
                var _this = this;
                this.renderDiv.style.position = 'relative';
                this.renderDiv.style.width = '100vw'; // Use viewport units for fullscreen
                this.renderDiv.style.height = '100vh';
                this.renderDiv.style.overflow = 'hidden';
                this.renderDiv.style.background = '#111'; // Fallback background
                // Start Screen Overlay and related DOM elements (title, instructions, loading text) removed.
                // --- End Start Screen Overlay ---
                this.videoElement = document.createElement('video');
                this.videoElement.style.position = 'absolute';
                this.videoElement.style.top = '0';
                this.videoElement.style.left = '0';
                this.videoElement.style.width = '100%';
                this.videoElement.style.height = '100%';
                this.videoElement.style.objectFit = 'cover';
                this.videoElement.style.transform = 'scaleX(-1)'; // Mirror view for intuitive control
                this.videoElement.autoplay = true;
                this.videoElement.muted = true; // Mute video to avoid feedback loops if audio was captured
                this.videoElement.playsInline = true;
                this.videoElement.style.zIndex = '0'; // Ensure video is behind THREE canvas
                this.renderDiv.appendChild(this.videoElement);
                // Container for Status text (formerly Game Over) and restart hint
                this.gameOverContainer = document.createElement('div');
                this.gameOverContainer.style.position = 'absolute';
                this.gameOverContainer.style.top = '50%';
                this.gameOverContainer.style.left = '50%';
                this.gameOverContainer.style.transform = 'translate(-50%, -50%)';
                this.gameOverContainer.style.zIndex = '10';
                this.gameOverContainer.style.display = 'none'; // Hidden initially
                this.gameOverContainer.style.pointerEvents = 'none'; // Don't block clicks
                this.gameOverContainer.style.textAlign = 'center'; // Center text elements within
                this.gameOverContainer.style.color = 'white'; // Default color, can be changed by _showError
                // this.gameOverContainer.style.textShadow = '2px 2px 4px black'; // Removed for flatter look
                this.gameOverContainer.style.fontFamily = '"Chakra Petch", "Segoe UI", system-ui, sans-serif'; // Cleaner, modern sans-serif
                // Main Status Text (formerly Game Over Text)
                this.gameOverText = document.createElement('div'); // Will be 'gameOverText' internally
                this.gameOverText.innerText = 'STATUS'; // Generic placeholder
                this.gameOverText.style.fontSize = 'clamp(36px, 10vw, 72px)'; // Responsive font size
                this.gameOverText.style.fontWeight = 'bold';
                this.gameOverText.style.marginBottom = '10px'; // Space below main text
                this.gameOverContainer.appendChild(this.gameOverText);
                // Restart Hint Text (may or may not be shown depending on context)
                this.restartHintText = document.createElement('div');
                this.restartHintText.innerText = '(click to restart tracking)';
                this.restartHintText.style.fontSize = 'clamp(16px, 3vw, 24px)';
                this.restartHintText.style.fontWeight = 'normal';
                this.restartHintText.style.opacity = '0.8'; // Slightly faded
                this.gameOverContainer.appendChild(this.restartHintText);
                this.renderDiv.appendChild(this.gameOverContainer);
                // --- Speech Bubble ---
                this.speechBubble = document.createElement('div');
                this.speechBubble.id = 'speech-bubble';
                this.speechBubble.style.position = 'absolute';
                this.speechBubble.style.top = '10px'; // Changed from 20px to 10px
                this.speechBubble.style.left = '50%';
                this.speechBubble.style.transform = 'translateX(-50%)';
                this.speechBubble.style.padding = '15px 25px';
                this.speechBubble.style.backgroundColor = 'rgba(10, 18, 36, 0.72)';
                this.speechBubble.style.border = '1px solid rgba(0, 229, 255, 0.45)'; // Solid black border
                this.speechBubble.style.borderRadius = '4px'; // Sharper corners
                this.speechBubble.style.boxShadow = '0 0 22px rgba(0, 229, 255, 0.25)'; // Hard shadow
                this.speechBubble.style.color = '#d8e6f5';
                this.speechBubble.style.fontFamily = '"Chakra Petch", "Segoe UI", system-ui, sans-serif'; // Consistent modern sans-serif
                this.speechBubble.style.fontSize = 'clamp(16px, 3vw, 22px)';
                this.speechBubble.style.maxWidth = '80%';
                this.speechBubble.style.textAlign = 'center';
                this.speechBubble.style.zIndex = '25'; // Above most things but below modal popups if any
                this.speechBubble.style.opacity = '0'; // Hidden initially, fade in
                // Added boxShadow, border, padding, fontSize, top to transition for smooth active state changes
                this.speechBubble.style.transition = 'opacity 0.5s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border 0.3s ease-in-out, padding 0.3s ease-in-out, font-size 0.3s ease-in-out, top 0.3s ease-in-out';
                this.speechBubble.style.pointerEvents = 'none'; // Not interactive
                this.speechBubble.innerHTML = "..."; // Default text
                this.renderDiv.appendChild(this.speechBubble);
                // Animation buttons container
                this.animationButtonsContainer = document.createElement('div');
                this.animationButtonsContainer.id = 'animation-buttons-container';
                this.animationButtonsContainer.style.position = 'absolute';
                this.animationButtonsContainer.style.bottom = 'auto'; // Remove bottom positioning
                this.animationButtonsContainer.style.top = '10px'; // Position from the top, changed from 20px
                this.animationButtonsContainer.style.left = '10px'; // Position from the left, changed from 20px
                this.animationButtonsContainer.style.transform = 'none'; // Remove centering transform
                this.animationButtonsContainer.style.zIndex = '30'; // Above speech bubble
                this.animationButtonsContainer.style.display = 'flex';
                this.animationButtonsContainer.style.flexDirection = 'column'; // Arrange buttons in a column
                this.animationButtonsContainer.style.gap = '4px'; // Reduced gap for tighter vertical layout
                this.animationButtonsContainer.style.opacity = '0'; // Start fully transparent for fade-in
                this.animationButtonsContainer.style.transition = 'opacity 0.3s ease-in-out'; // Smooth fade transition
                this.animationButtonsContainer.style.display = 'none'; // Initially hidden (will be set to flex by logic)
                this.renderDiv.appendChild(this.animationButtonsContainer);
                // Interaction Mode UI Container
                this.interactionModeContainer = document.createElement('div');
                this.interactionModeContainer.id = 'interaction-mode-container';
                this.interactionModeContainer.style.position = 'absolute';
                this.interactionModeContainer.style.top = '10px'; // Changed from 20px
                this.interactionModeContainer.style.right = '10px'; // Changed from 20px
                this.interactionModeContainer.style.zIndex = '30';
                this.interactionModeContainer.style.display = 'flex';
                this.interactionModeContainer.style.flexDirection = 'column';
                this.interactionModeContainer.style.gap = '4px';
                this.renderDiv.appendChild(this.interactionModeContainer);
                // Create interaction mode buttons
                [
                    'Drag',
                    'Rotate',
                    'Scale',
                    'Animate'
                ].forEach(function(mode) {
                    var button = document.createElement('button');
                    button.innerText = mode;
                    button.id = "interaction-mode-".concat(mode.toLowerCase());
                    button.style.padding = '10px 22px'; // Increased padding
                    button.style.fontSize = '18px'; // Increased font size further
                    button.style.border = '1px solid rgba(0, 229, 255, 0.45)'; // Consistent black border
                    button.style.borderRadius = '4px'; // Sharper corners
                    button.style.cursor = 'pointer';
                    button.style.fontWeight = 'bold'; // Always bold
                    button.style.transition = 'background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease'; // Faster transition, added shadow
                    button.style.boxShadow = '0 0 12px rgba(0, 229, 255, 0.22)'; // Default shadow for inactive
                    if (mode !== 'Animate') {
    button.style.display = 'none';
}
                    button.addEventListener('click', function() {
                        return _this._setInteractionMode(mode.toLowerCase());
                    });
                    _this.interactionModeContainer.appendChild(button);
                    _this.interactionModeButtons[mode.toLowerCase()] = button; // Store button reference
                });
                this._updateInteractionModeButtonStyles(); // Apply initial styles
                this._updateInstructionText(); // Set initial instruction text
                this._setupFx(); // Boot screen, camera tint, HUD
                this._setupDragAndDrop(); // Add drag and drop listeners
            }
        },
        {
            key: "_setupThree",
            value: function _setupThree() {
                var _this_interactionModeColors_this_interactionMode;
                var width = this.renderDiv.clientWidth;
                var height = this.renderDiv.clientHeight;
                this.scene = new THREE.Scene();
                // Using OrthographicCamera for a 2D-like overlay effect
                this.camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 2000); // Increased far plane
                this.camera.position.z = 100; // Position along Z doesn't change scale in Ortho
                this.renderer = new THREE.WebGLRenderer({
                    alpha: true,
                    antialias: true
                });
                this.renderer.setSize(width, height);
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.domElement.style.position = 'absolute';
                this.renderer.domElement.style.top = '0';
                this.renderer.domElement.style.left = '0';
                this.renderer.domElement.style.zIndex = '1'; // Canvas on top of video
                this.renderDiv.appendChild(this.renderer.domElement);
                var ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Increased intensity
                this.scene.add(ambientLight);
                var directionalLight = new THREE.DirectionalLight(0xffffff, 1.8); // Increased intensity
                directionalLight.position.set(0, 0, 100); // Pointing from behind camera
                this.scene.add(directionalLight);
                // Setup hand visualization (palm circles removed, lines will be added later)
                for(var i = 0; i < 2; i++){
                    var lineGroup = new THREE.Group();
                    lineGroup.visible = false;
                    this.scene.add(lineGroup);
                    this.hands.push({
                        landmarks: null,
                        anchorPos: new THREE.Vector3(),
                        lineGroup: lineGroup,
                        isPinching: false,
                        pinchPointScreen: new THREE.Vector2(),
                        isFist: false // True if hand is detected as a fist
                    });
                }
                this.handLineMaterial = new THREE.LineBasicMaterial({
                    color: 0x00e5ff,
                    linewidth: 8,
                    transparent: true,
                    opacity: 0.95,
                    blending: THREE.AdditiveBlending
                });
                this.handLineGlowMaterial = new THREE.LineBasicMaterial({
                    color: 0x00e5ff,
                    transparent: true,
                    opacity: 0.35,
                    blending: THREE.AdditiveBlending
                });
                var initialModeHandColor = ((_this_interactionModeColors_this_interactionMode = this.interactionModeColors[this.interactionMode]) === null || _this_interactionModeColors_this_interactionMode === void 0 ? void 0 : _this_interactionModeColors_this_interactionMode.hand) || new THREE.Color(0x00ccff);
                this.fingertipMaterialHand1 = new THREE.MeshBasicMaterial({
                    color: initialModeHandColor.clone(),
                    side: THREE.DoubleSide,
                    transparent: true,
                    blending: THREE.AdditiveBlending,
                    opacity: this.fingertipDefaultOpacity
                });
                this.fingertipMaterialHand2 = new THREE.MeshBasicMaterial({
                    color: initialModeHandColor.clone(),
                    side: THREE.DoubleSide,
                    transparent: true,
                    blending: THREE.AdditiveBlending,
                    opacity: this.fingertipDefaultOpacity
                });
                // Define connections for MediaPipe hand landmarks
                // See: https://developers.google.com/mediapipe/solutions/vision/hand_landmarker#hand_landmarks
                this.handConnections = [
                    // Thumb
                    [
                        0,
                        1
                    ],
                    [
                        1,
                        2
                    ],
                    [
                        2,
                        3
                    ],
                    [
                        3,
                        4
                    ],
                    // Index finger
                    [
                        0,
                        5
                    ],
                    [
                        5,
                        6
                    ],
                    [
                        6,
                        7
                    ],
                    [
                        7,
                        8
                    ],
                    // Middle finger
                    [
                        0,
                        9
                    ],
                    [
                        9,
                        10
                    ],
                    [
                        10,
                        11
                    ],
                    [
                        11,
                        12
                    ],
                    // Ring finger
                    [
                        0,
                        13
                    ],
                    [
                        13,
                        14
                    ],
                    [
                        14,
                        15
                    ],
                    [
                        15,
                        16
                    ],
                    // Pinky
                    [
                        0,
                        17
                    ],
                    [
                        17,
                        18
                    ],
                    [
                        18,
                        19
                    ],
                    [
                        19,
                        20
                    ],
                    // Palm
                    [
                        5,
                        9
                    ],
                    [
                        9,
                        13
                    ],
                    [
                        13,
                        17
                    ] // Connect base of fingers
                ];
            }
        },
        {
            key: "_loadAssets",
            value: function _loadAssets() {
                var _this = this;
                return _async_to_generator(function() {
                    var gltfLoader, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                console.log("Loading assets...");
                                gltfLoader = new GLTFLoader(); // Changed from FBXLoader
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    3,
                                    ,
                                    4
                                ]);
                                return [
                                    4,
                                    new Promise(function(resolve, reject) {
                                        gltfLoader.load('assets/Stan.gltf', function(gltf) {
                                            _this.pandaModel = gltf.scene; // GLTFLoader returns an object with a 'scene' property
                                            _this.animationMixer = new THREE.AnimationMixer(_this.pandaModel);
                                            _this.animationClips = gltf.animations;
                                            if (_this.animationClips && _this.animationClips.length) {
                                                _this.animationClips.forEach(function(clip, index) {
                                                    var action = _this.animationMixer.clipAction(clip);
                                                    var actionName = clip.name || "Animation ".concat(index + 1);
                                                    _this.animationActions[actionName] = action;
                                                    // Create a button for this animation
                                                    var button = document.createElement('button');
                                                    button.innerText = actionName;
                                                    button.style.padding = '5px 10px'; // Adjusted padding
                                                    button.style.fontSize = '13px'; // Consistent font size
                                                    button.style.backgroundColor = 'rgba(10, 18, 36, 0.62)';
                                                    button.style.color = '#d8e6f5';
                                                    button.style.border = '1px solid rgba(0, 229, 255, 0.45)'; // Black border
                                                    button.style.borderRadius = '4px'; // Sharper corners
                                                    button.style.cursor = 'pointer';
                                                    button.style.transition = 'background-color 0.2s ease, box-shadow 0.2s ease';
                                                    button.style.boxShadow = '0 0 12px rgba(0, 229, 255, 0.22)'; // Default shadow
                                                    button.addEventListener('click', function() {
                                                        return _this._playAnimation(actionName);
                                                    });
                                                    _this.animationButtonsContainer.appendChild(button);
                                                    console.log("Loaded animation and created button for: ".concat(actionName));
                                                });
                                                // Play the first animation by default
                                                // Try to find and play an "idle" animation by default
                                                var defaultActionName = Object.keys(_this.animationActions)[0]; // Fallback to the first animation
                                                var idleActionKey = Object.keys(_this.animationActions).find(function(name) {
                                                    return name.toLowerCase().includes('idle');
                                                });
                                                if (idleActionKey) {
                                                    defaultActionName = idleActionKey;
                                                    console.log("Found idle animation: ".concat(defaultActionName));
                                                } else if (defaultActionName) {
                                                    console.log("No specific idle animation found, defaulting to first animation: ".concat(defaultActionName));
                                                }
                                                if (defaultActionName && _this.animationActions[defaultActionName]) {
                                                    _this.currentAction = _this.animationActions[defaultActionName];
                                                    _this.currentAction.play();
                                                    console.log("Playing default animation: ".concat(defaultActionName));
                                                    _this._updateButtonStyles(defaultActionName);
                                                } else {
                                                    console.log("No animations found or default animation could not be played.");
                                                }
                                            } else {
                                                console.log("Stan model has no embedded animations.");
                                            }
                                            // Scale and position the model
                                            // These values might need adjustment based on the model's original size and pivot
                                            var scale = 80; // This scale might need adjustment for Stan model
                                            _this.pandaModel.scale.set(scale, scale, scale);
                                            // Position the model: X=center, Y=roughly bottom, Z=in front of hands
                                            var sceneHeight = _this.renderDiv.clientHeight;
                                            _this.pandaModel.position.set(0, sceneHeight * -0.45, -1000); // Updated Z to -1000
                                            _this.scene.add(_this.pandaModel);
                                            _this._applyHologram(_this.pandaModel);
                                            console.log("Stan GLTF model loaded and added to scene.");
                                            resolve();
                                        }, undefined, function(error) {
                                            console.error('An error occurred while loading the Stan GLTF model:', error); // Updated log
                                            reject(error);
                                        });
                                    })
                                ];
                            case 2:
                                _state.sent();
                                console.log("All specified assets loaded.");
                                return [
                                    3,
                                    4
                                ];
                            case 3:
                                error = _state.sent();
                                console.error("Error loading assets:", error);
                                _this._showError("Failed to load 3D model.");
                                throw error; // Stop initialization
                            case 4:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "_setupHandTracking",
            value: function _setupHandTracking() {
                var _this = this;
                return _async_to_generator(function() {
                    var vision, stream, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    4,
                                    ,
                                    5
                                ]);
                                console.log("Setting up Hand Tracking...");
                                return [
                                    4,
                                    FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm')
                                ];
                            case 1:
                                vision = _state.sent();
                                return [
                                    4,
                                    HandLandmarker.createFromOptions(vision, {
                                        baseOptions: {
                                            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
                                            delegate: 'GPU'
                                        },
                                        numHands: 2,
                                        runningMode: 'VIDEO'
                                    })
                                ];
                            case 2:
                                _this.handLandmarker = _state.sent();
                                console.log("HandLandmarker created.");
                                console.log("Requesting webcam access...");
                                return [
                                    4,
                                    navigator.mediaDevices.getUserMedia({
                                        video: {
                                            facingMode: 'user',
                                            width: {
                                                ideal: 1920
                                            },
                                            height: {
                                                ideal: 1080
                                            } // Request Full HD height
                                        },
                                        audio: false
                                    })
                                ];
                            case 3:
                                stream = _state.sent();
                                _this.videoElement.srcObject = stream;
                                console.log("Webcam stream obtained.");
                                // Wait for video metadata to load to ensure dimensions are available
                                return [
                                    2,
                                    new Promise(function(resolve) {
                                        _this.videoElement.onloadedmetadata = function() {
                                            console.log("Webcam metadata loaded.");
                                            // Adjust video size slightly after metadata is loaded if needed, but CSS handles most
                                            _this.videoElement.style.width = _this.renderDiv.clientWidth + 'px';
                                            _this.videoElement.style.height = _this.renderDiv.clientHeight + 'px';
                                            resolve();
                                        };
                                    })
                                ];
                            case 4:
                                error = _state.sent();
                                console.error('Error setting up Hand Tracking or Webcam:', error);
                                _this._showError("Webcam/Hand Tracking Error: ".concat(error.message, ". Please allow camera access."));
                                throw error; // Re-throw to stop initialization
                            case 5:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
       key: "_updateHands",
            value: function _updateHands() {
                var _this = this;
                if (!this.handLandmarker || !this.videoElement.srcObject || this.videoElement.readyState < 2 || this.videoElement.videoWidth === 0) return;
                var videoTime = this.videoElement.currentTime;
                if (videoTime > this.lastVideoTime) {
                    this.lastVideoTime = videoTime;
                    try {
                        var results = this.handLandmarker.detectForVideo(this.videoElement, performance.now());
                        var videoParams = this._getVisibleVideoParameters();
                        if (!videoParams) return;
                        var canvasWidth = this.renderDiv.clientWidth;
                        var canvasHeight = this.renderDiv.clientHeight;

                        // STEP 1: Process landmarks & detect Pinch / Fist for each hand
                        for (var i = 0; i < this.hands.length; i++) {
                            var hand = this.hands[i];
                            hand.prevIsPinching = hand.isPinching;
                            hand.prevIsFist = hand.isFist;

                            if (results.landmarks && results.landmarks[i]) {
                                var currentRawLandmarks = results.landmarks[i];
                                if (!this.lastLandmarkPositions[i] || this.lastLandmarkPositions[i].length !== currentRawLandmarks.length) {
                                    this.lastLandmarkPositions[i] = currentRawLandmarks.map(function(lm) {
                                        return _object_spread({}, lm);
                                    });
                                }
                                var smoothedLandmarks = currentRawLandmarks.map(function(lm, lmIndex) {
                                    var prevLm = _this.lastLandmarkPositions[i][lmIndex];
                                    return {
                                        x: _this.smoothingFactor * lm.x + (1 - _this.smoothingFactor) * prevLm.x,
                                        y: _this.smoothingFactor * lm.y + (1 - _this.smoothingFactor) * prevLm.y,
                                        z: _this.smoothingFactor * lm.z + (1 - _this.smoothingFactor) * prevLm.z
                                    };
                                });
                                this.lastLandmarkPositions[i] = smoothedLandmarks.map(function(lm) {
                                    return _object_spread({}, lm);
                                });
                                hand.landmarks = smoothedLandmarks;

                                var palm = smoothedLandmarks[9]; // MIDDLE_FINGER_MCP
                                var lmOriginalX = palm.x * videoParams.videoNaturalWidth;
                                var lmOriginalY = palm.y * videoParams.videoNaturalHeight;
                                var normX_visible = (lmOriginalX - videoParams.offsetX) / videoParams.visibleWidth;
                                var normY_visible = (lmOriginalY - videoParams.offsetY) / videoParams.visibleHeight;
                                var handX = (1 - normX_visible) * canvasWidth - canvasWidth / 2;
                                var handY = (1 - normY_visible) * canvasHeight - canvasHeight / 2;
                                hand.anchorPos.set(handX, handY, 1);

                                var convertToScreenSpace = function(lm) {
                                    var originalX = lm.x * videoParams.videoNaturalWidth;
                                    var originalY = lm.y * videoParams.videoNaturalHeight;
                                    var nX = (originalX - videoParams.offsetX) / videoParams.visibleWidth;
                                    var nY = (originalY - videoParams.offsetY) / videoParams.visibleHeight;
                                    return {
                                        x: (1 - nX) * canvasWidth - canvasWidth / 2,
                                        y: (1 - nY) * canvasHeight - canvasHeight / 2
                                    };
                                };

                                // Fist detection logic (check if fingers are curled into palm)
                                var isTipNearMCP = function(tipLandmark, mcpLandmark, threshold) {
                                    var thresh = threshold !== void 0 ? threshold : 0.11;
                                    if (!tipLandmark || !mcpLandmark) return false;
                                    var dx = tipLandmark.x - mcpLandmark.x;
                                    var dy = tipLandmark.y - mcpLandmark.y;
                                    return Math.sqrt(dx * dx + dy * dy) < thresh;
                                };

                                var wristLm = smoothedLandmarks[0];
                                var indexFingerTip = smoothedLandmarks[8];
                                var indexFingerMcp = smoothedLandmarks[5];
                                var middleFingerTip = smoothedLandmarks[12];
                                var middleFingerMcp = smoothedLandmarks[9];
                                var ringFingerTip = smoothedLandmarks[16];
                                var ringFingerMcp = smoothedLandmarks[13];
                                var pinkyTip = smoothedLandmarks[20];
                                var pinkyMcp = smoothedLandmarks[17];

                                var curledFingers = 0;
                                if (isTipNearMCP(indexFingerTip, indexFingerMcp, 0.11) || isTipNearMCP(indexFingerTip, wristLm, 0.18)) curledFingers++;
                                if (isTipNearMCP(middleFingerTip, middleFingerMcp, 0.11) || isTipNearMCP(middleFingerTip, wristLm, 0.18)) curledFingers++;
                                if (isTipNearMCP(ringFingerTip, ringFingerMcp, 0.11) || isTipNearMCP(ringFingerTip, wristLm, 0.18)) curledFingers++;
                                if (isTipNearMCP(pinkyTip, pinkyMcp, 0.11) || isTipNearMCP(pinkyTip, wristLm, 0.18)) curledFingers++;

                                // Pinch detection logic (Thumb + Index)
                                var thumbTipLm = smoothedLandmarks[4];
                                var rawPinch = false;
                                if (thumbTipLm && indexFingerTip) {
                                    var thumbTipScreen = convertToScreenSpace(thumbTipLm);
                                    var indexTipScreen = convertToScreenSpace(indexFingerTip);
                                    var distanceX = thumbTipScreen.x - indexTipScreen.x;
                                    var distanceY = thumbTipScreen.y - indexTipScreen.y;
                                    var pinchDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                                    if (pinchDistance < 45) {
                                        rawPinch = true;
                                        hand.pinchPointScreen.set((thumbTipScreen.x + indexTipScreen.x) / 2, (thumbTipScreen.y + indexTipScreen.y) / 2);
                                    }
                                }

                                // Distinguish Fist (all 4 fingers curled) vs Pinch (Thumb + Index together, other fingers not all curled into a tight fist)
                                if (curledFingers >= 4) {
                                    hand.isFist = true;
                                    hand.isPinching = false;
                                } else if (rawPinch) {
                                    hand.isPinching = true;
                                    hand.isFist = false;
                                } else if (curledFingers >= 3 && !rawPinch) {
                                    hand.isFist = true;
                                    hand.isPinching = false;
                                } else {
                                    // Open palm / neutral
                                    hand.isPinching = false;
                                    hand.isFist = false;
                                }
                            } else {
                                hand.landmarks = null;
                                hand.isPinching = false;
                                hand.isFist = false;
                                if (hand.lineGroup) hand.lineGroup.visible = false;
                            }
                        }

                        // STEP 2: Automatic Gesture Mode Selection & Action Execution
                        var hand0 = this.hands[0];
                        var hand1 = this.hands[1];
                        var h0Visible = Boolean(hand0 && hand0.landmarks);
                        var h1Visible = Boolean(hand1 && hand1.landmarks);

                        // Require 4 consecutive frames of the same gesture before switching (prevents flickering)
var isPointingHand = function(h) {
                            if (!h || !h.landmarks) return false;
                            var lm = h.landmarks;
                            var wrist = lm[0];
                            var dist = function(a, b) {
                                return Math.hypot(a.x - b.x, a.y - b.y);
                            };
                            var indexExtended = dist(lm[8], wrist) > dist(lm[6], wrist) * 1.1;
                            var middleBent = dist(lm[12], wrist) < dist(lm[8], wrist) * 0.85;
                            return indexExtended && middleBent;
                        };

                        var h0Pointing = h0Visible && isPointingHand(hand0);
                        var h1Pointing = h1Visible && isPointingHand(hand1);

                        // Open palm: all four fingers extended, not pinching
                        var isOpenPalmHand = function(h) {
                            if (!h || !h.landmarks || h.isPinching) return false;
                            var lm = h.landmarks;
                            var wrist = lm[0];
                            var d = function(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); };
                            var pairs = [[8, 6], [12, 10], [16, 14], [20, 18]];
                            for (var q = 0; q < pairs.length; q++) {
                                if (!(d(lm[pairs[q][0]], wrist) > d(lm[pairs[q][1]], wrist) * 1.1)) return false;
                            }
                            return true;
                        };
                        var h0Palm = h0Visible && !h0Pointing && isOpenPalmHand(hand0);
                        var h1Palm = h1Visible && !h1Pointing && isOpenPalmHand(hand1);
                        this.palmHoldFrames = (h0Palm || h1Palm) ? this.palmHoldFrames + 1 : 0;
                        // Palm must be held for 5 frames before rotation starts (prevents accidental spins)
                        var palmHandIndex = (this.palmHoldFrames >= 5 && this.enabledModes.rotate) ? (h0Palm ? 0 : 1) : -1;

                        // Thumbs up (+1) / thumbs down (-1): four fingers curled, thumb extended and pointing up or down
                        var thumbDirectionOf = function(h) {
                            if (!h || !h.landmarks || h.isPinching) return 0;
                            var lm = h.landmarks;
                            var wrist = lm[0];
                            var d = function(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); };
                            var pairs = [[8, 6], [12, 10], [16, 14], [20, 18]];
                            for (var q = 0; q < pairs.length; q++) {
                                if (d(lm[pairs[q][0]], wrist) > d(lm[pairs[q][1]], wrist) * 1.05) return 0;
                            }
                            var dx = lm[4].x - lm[2].x;
                            var dy = lm[4].y - lm[2].y;
                            if (Math.hypot(dx, dy) < 0.07 || Math.abs(dy) < Math.abs(dx) * 1.2) return 0;
                            return dy < 0 ? 1 : -1;
                        };
                        var rawThumbDir = (h0Visible ? thumbDirectionOf(hand0) : 0) || (h1Visible ? thumbDirectionOf(hand1) : 0);
                        if (rawThumbDir !== 0 && rawThumbDir === this.lastThumbDir) {
                            this.thumbHoldFrames++;
                        } else {
                            this.thumbHoldFrames = rawThumbDir !== 0 ? 1 : 0;
                        }
                        this.lastThumbDir = rawThumbDir;
                        // Thumb must be held for 4 frames (prevents accidental resizing)
                        var thumbDir = (this.thumbHoldFrames >= 4 && this.enabledModes.scale) ? rawThumbDir : 0;

                        var h0Pinch = h0Visible && hand0.isPinching;
                        var h1Pinch = h1Visible && hand1.isPinching;
                        var rawGesture = 'none';
                        if (h0Visible && h1Visible && hand0.isPinching && hand1.isPinching) {
                            rawGesture = 'scale';
                        } else if (h0Pinch || h1Pinch) {
                            rawGesture = 'drag';
                        }

                        if (rawGesture === this.lastRawGesture) {
                            this.gestureHoldFrames = (this.gestureHoldFrames || 0) + 1;
                        } else {
                            this.lastRawGesture = rawGesture;
                            this.gestureHoldFrames = 1;
                        }
                        if (this.gestureHoldFrames >= 4 || rawGesture === 'none') {
                            this.confirmedGesture = rawGesture;
                        }

                        var bothHandsPinching = (this.confirmedGesture === 'scale') && this.enabledModes.scale;
                        var pointHandIndex = (this.confirmedGesture === 'drag' && this.enabledModes.drag) ? (h0Pinch ? 0 : 1) : -1;
                        var singlePinchHandIndex = (h0Visible && hand0.isPinching) ? 0 : ((h1Visible && hand1.isPinching) ? 1 : -1);

                        this.isRotatingModel = false;                       
                 
                        // CASE 0: ANIMATE MODE LOCK (ONLY PINCH SCROLL WORKS)
                        if (this.interactionMode === 'animate') {
                            this.grabbingHandIndex = -1;
                            this.pickedUpModel = null;
                            this.rotateLastHandX = null;
                            this.rotateLastHandY = null;
                            this.scaleInitialPinchDistance = null;
                            this.scaleInitialModelScale = null;

                            if (singlePinchHandIndex !== -1) {
                                var animHand = this.hands[singlePinchHandIndex];
                                if (!animHand.prevIsPinching || this.animationControlHandIndex === -1) {
                                    this.animationControlHandIndex = singlePinchHandIndex;
                                    this.animationControlInitialPinchY = animHand.pinchPointScreen.y;
                                } else if (this.animationControlHandIndex === singlePinchHandIndex && this.animationControlInitialPinchY !== null) {
                                    var deltaY = animHand.pinchPointScreen.y - this.animationControlInitialPinchY;
                                    if (Math.abs(deltaY) > (this.animationScrollThreshold || 40)) {
                                        var animationNames = Object.keys(this.animationActions);
                                        if (animationNames.length > 0) {
                                            var currentIndex = -1;
                                            if (this.currentAction) {
                                                for (var j = 0; j < animationNames.length; j++) {
                                                    if (this.animationActions[animationNames[j]] === this.currentAction) {
                                                        currentIndex = j;
                                                        break;
                                                    }
                                                }
                                            }
                                            var nextIndex = deltaY > 0
                                                ? (currentIndex + 1) % animationNames.length
                                                : (currentIndex - 1 + animationNames.length) % animationNames.length;
                                            if (nextIndex !== currentIndex) {
                                                this._playAnimation(animationNames[nextIndex]);
                                            }
                                        }
                                        this.animationControlInitialPinchY = animHand.pinchPointScreen.y;
                                    }
                                }
                                this.audioManager.playInteractionClickSound();
                            } else {
                                this.animationControlHandIndex = -1;
                                this.animationControlInitialPinchY = null;
                            }
                          }

                        // CASE 1: TWO-HAND PINCH -> SCALE

                       else if (bothHandsPinching && this.pandaModel) {
                            if (this.interactionMode !== 'scale') {
                                this.interactionMode = 'scale';
                                this.rotateLastHandX = null;
                                this.rotateLastHandY = null;
                                if (this._updateInstructionText) this._updateInstructionText();
                            }
                            var dist = hand0.pinchPointScreen.distanceTo(hand1.pinchPointScreen);
                            if (this.scaleInitialPinchDistance === null || this.scaleInitialModelScale === null) {
                                this.scaleInitialPinchDistance = dist;
                                this.scaleInitialModelScale = this.pandaModel.scale.clone();
                                this.grabbingHandIndex = 0;
                                this.pickedUpModel = this.pandaModel;
                            } else {
                                var deltaDistance = dist - this.scaleInitialPinchDistance;
                                var scaleFactorChange = deltaDistance * this.scaleSensitivity;
                                var newScaleValue = this.scaleInitialModelScale.x + scaleFactorChange;
                                newScaleValue = Math.max(10, Math.min(300, newScaleValue));
                                var targetScaleVec = new THREE.Vector3(newScaleValue, newScaleValue, newScaleValue);
                                this.pandaModel.scale.lerp(targetScaleVec, 0.12);
                            }
                            this.audioManager.playInteractionClickSound();
                        }
                        // CASE 1B: THUMBS UP -> GROW, THUMBS DOWN -> SHRINK
                        else if (thumbDir !== 0 && this.pandaModel) {
                            if (this.interactionMode !== 'scale') {
                                this.interactionMode = 'scale';
                                if (this._updateInstructionText) this._updateInstructionText();
                            }
                            this.isModelTouched = false;
                            this.grabbingHandIndex = -1;
                            this.pickedUpModel = null;
                            this.rotateLastHandX = null;
                            this.rotateLastHandY = null;
                            this.scaleInitialPinchDistance = null;
                            this.scaleInitialModelScale = null;
                            var currentSize = this.pandaModel.scale.x;
                            var newSize = currentSize * (thumbDir > 0 ? 1 + this.thumbScaleRate : 1 - this.thumbScaleRate);
                            newSize = Math.max(10, Math.min(300, newSize));
                            this.pandaModel.scale.set(newSize, newSize, newSize);
                            this.audioManager.playInteractionClickSound();
                        }
                        // CASE 2: OPEN PALM -> ROTATE (SMOOTHED, WORLD-AXIS)
                        else if (palmHandIndex !== -1 && this.pandaModel) {
                            this.isRotatingModel = true;
                            this.scaleInitialPinchDistance = null;
                            this.scaleInitialModelScale = null;
                            var fistHand = this.hands[palmHandIndex];

                            if (this.interactionMode !== 'rotate' || this.grabbingHandIndex !== palmHandIndex || this.rotateLastHandX === null) {
                                this.interactionMode = 'rotate';
                                this.grabbingHandIndex = palmHandIndex;
                                this.pickedUpModel = this.pandaModel;
                                this.rotateLastHandX = fistHand.anchorPos.x;
                                this.rotateLastHandY = fistHand.anchorPos.y;
                                this.rotVelX = 0;
                                this.rotVelY = 0;
                                if (this._updateInstructionText) this._updateInstructionText();
                            } else if (this.rotateLastHandX !== null && this.rotateLastHandY !== null) {
                                var currentHandX = fistHand.anchorPos.x;
                                var currentHandY = fistHand.anchorPos.y;
                                var deltaX = currentHandX - this.rotateLastHandX;
                                var deltaY = currentHandY - this.rotateLastHandY;

                                // Slow, smoothed rotation
                                var rotSpeed = this.rotateSensitivity || 0.008;
                                // Low-pass filter the hand motion and ignore tiny jitters
                                this.rotVelX = this.rotVelX * 0.75 + (Math.abs(deltaX) > 2.5 ? deltaX : 0) * 0.25;
                                this.rotVelY = this.rotVelY * 0.75 + (Math.abs(deltaY) > 2.5 ? deltaY : 0) * 0.25;

                                // Rotate cleanly around screen Y (left/right) and screen X (up/down)
                                if (Math.abs(this.rotVelX) > 0.05) {
                                    this.pickedUpModel.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), this.rotVelX * rotSpeed);
                                }
                                if (Math.abs(this.rotVelY) > 0.05) {
                                    this.pickedUpModel.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -this.rotVelY * rotSpeed);
                                }

                                this.rotateLastHandX = currentHandX;
                                this.rotateLastHandY = currentHandY;
                            }
                            this.audioManager.playInteractionClickSound();
                        }
                        // CASE 3: SINGLE-HAND PINCH -> GRAB & DRAG
                     else if (pointHandIndex !== -1 && this.pandaModel) {
                         this.scaleInitialPinchDistance = null;
                         this.scaleInitialModelScale = null;
                         this.rotateLastHandX = null;
                         this.rotateLastHandY = null;

                         var pointHand = this.hands[pointHandIndex];
                         // Pinch point = midpoint between thumb tip and index fingertip
                         var indexTip = {
                             x: (pointHand.landmarks[4].x + pointHand.landmarks[8].x) / 2,
                             y: (pointHand.landmarks[4].y + pointHand.landmarks[8].y) / 2
                         };
                         var viewW = this.renderDiv.clientWidth || window.innerWidth;
                         var viewH = this.renderDiv.clientHeight || window.innerHeight;

                         // Convert normalized fingertip (mirrored X) to screen pixels
                         var tipScreenX = (1 - indexTip.x) * viewW;
                         var tipScreenY = indexTip.y * viewH;

                         // Check if fingertip touches the model on screen
                         if (!this.isModelTouched || this.grabbingHandIndex !== pointHandIndex) {
                             var box = new THREE.Box3().setFromObject(this.pandaModel);
                             var modelCenter = new THREE.Vector3();
                             box.getCenter(modelCenter);
                             modelCenter.project(this.camera);

                             var modelScreenX = (modelCenter.x * 0.5 + 0.5) * viewW;
                             var modelScreenY = (-modelCenter.y * 0.5 + 0.5) * viewH;
                             var touchDistance = Math.hypot(tipScreenX - modelScreenX, tipScreenY - modelScreenY);

                             // Touching anywhere within 250px of the robot's body selects it
                             if (touchDistance < 250) {
                                 this.isModelTouched = true;
                                 this.interactionMode = 'drag';
                                 this.grabbingHandIndex = pointHandIndex;
                                 this.pickedUpModel = this.pandaModel;
                                 this.modelGrabStartDepth = this.pickedUpModel.position.z;
                                 this.audioManager.playInteractionClickSound();
                                 if (this.instructionTextElement) {
                                     this.instructionTextElement.innerText = "Model grabbed. Move your hand to drag it";
                                 }
                             } else if (this.instructionTextElement) {
                                 this.instructionTextElement.innerText = "Pinch near the model to grab it";
                             }
                         }

                         // Once selected, move the model directly under your fingertip
                         if (this.isModelTouched && this.pickedUpModel && this.grabbingHandIndex === pointHandIndex) {
                             var currentNdcX = (tipScreenX / viewW) * 2 - 1;
                             var currentNdcY = -(tipScreenY / viewH) * 2 + 1;
                             var touchPoint3D = new THREE.Vector3(currentNdcX, currentNdcY, 0.5);
                             touchPoint3D.unproject(this.camera);

                             var dir = touchPoint3D.sub(this.camera.position).normalize();
                             var distance = (this.modelGrabStartDepth - this.camera.position.z) / dir.z;
                             var exactTouchPos = this.camera.position.clone().add(dir.multiplyScalar(distance));

                             // Keep robot's visual center aligned under your fingertip
                             var currentBox = new THREE.Box3().setFromObject(this.pickedUpModel);
                             var currentCenter = new THREE.Vector3();
                             currentBox.getCenter(currentCenter);
                             var centerOffsetY = currentCenter.y - this.pickedUpModel.position.y;
                             exactTouchPos.y -= centerOffsetY;

                             this.pickedUpModel.position.lerp(exactTouchPos, 0.35);
                             this.pickedUpModel.position.z = Math.max(-200, Math.min(50, this.pickedUpModel.position.z));
                         }
                     }
                        // CASE 4: NO GESTURE (fist, relaxed hand, nothing) -> RELEASE
                        else {
                            this.isModelTouched = false;
                            this.grabbingHandIndex = -1;
                            this.pickedUpModel = null;
                            this.rotateLastHandX = null;
                            this.rotateLastHandY = null;
                            this.scaleInitialPinchDistance = null;
                            this.scaleInitialModelScale = null;
                        }

                        // STEP 3: Draw hand lines on screen
                        for (var k = 0; k < this.hands.length; k++) {
                            if (this.hands[k].landmarks) {
                                this._updateHandLines(k, this.hands[k].landmarks, videoParams, canvasWidth, canvasHeight);
                            }
                        }
                    } catch (error) {
                        console.error("Error during hand detection:", error);
                    }
                }
            }
        },
        {
            key: "_getModelScreenBoundingBox",
            value: function _getModelScreenBoundingBox() {
                var _this = this;
                if (!this.pandaModel || !this.camera || !this.renderer) {
                    return null;
                }
                // Ensure the model's world matrix is up to date
                this.pandaModel.updateMatrixWorld(true);
                var box = new THREE.Box3().setFromObject(this.pandaModel);
                if (box.isEmpty()) {
                    return null; // Model might not be loaded or has no geometry
                }
                var corners = [
                    new THREE.Vector3(box.min.x, box.min.y, box.min.z),
                    new THREE.Vector3(box.min.x, box.min.y, box.max.z),
                    new THREE.Vector3(box.min.x, box.max.y, box.min.z),
                    new THREE.Vector3(box.min.x, box.max.y, box.max.z),
                    new THREE.Vector3(box.max.x, box.min.y, box.min.z),
                    new THREE.Vector3(box.max.x, box.min.y, box.max.z),
                    new THREE.Vector3(box.max.x, box.max.y, box.min.z),
                    new THREE.Vector3(box.max.x, box.max.y, box.max.z)
                ];
                var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
                var canvasWidth = this.renderDiv.clientWidth;
                var canvasHeight = this.renderDiv.clientHeight;
                corners.forEach(function(corner) {
                    // Apply model's world transformation to the local bounding box corners
                    corner.applyMatrix4(_this.pandaModel.matrixWorld);
                    // Project to Normalized Device Coordinates (NDC)
                    corner.project(_this.camera);
                    // Convert NDC to screen coordinates (origin at center of screen)
                    // This matches the coordinate system of pinchPointScreen
                    var screenX = corner.x * (canvasWidth / 2);
                    var screenY = corner.y * (canvasHeight / 2); // In Three.js NDC, +Y is up
                    minX = Math.min(minX, screenX);
                    maxX = Math.max(maxX, screenX);
                    minY = Math.min(minY, screenY);
                    maxY = Math.max(maxY, screenY);
                });
                if (minX === Infinity) return null; // All points were behind camera or some other issue
                return {
                    minX: minX,
                    minY: minY,
                    maxX: maxX,
                    maxY: maxY
                };
            }
        },
        {
            key: "_getVisibleVideoParameters",
            value: function _getVisibleVideoParameters() {
                if (!this.videoElement || this.videoElement.videoWidth === 0 || this.videoElement.videoHeight === 0) {
                    return null;
                }
                var vNatW = this.videoElement.videoWidth;
                var vNatH = this.videoElement.videoHeight;
                var rW = this.renderDiv.clientWidth;
                var rH = this.renderDiv.clientHeight;
                if (vNatW === 0 || vNatH === 0 || rW === 0 || rH === 0) return null;
                var videoAR = vNatW / vNatH;
                var renderDivAR = rW / rH;
                var finalVideoPixelX, finalVideoPixelY;
                var visibleVideoPixelWidth, visibleVideoPixelHeight;
                if (videoAR > renderDivAR) {
                    // Video is wider than renderDiv, scaled to fit renderDiv height, cropped horizontally.
                    var scale = rH / vNatH; // Scale factor based on height.
                    var scaledVideoWidth = vNatW * scale; // Width of video if scaled to fit renderDiv height.
                    // Total original video pixels cropped horizontally (from both sides combined).
                    var totalCroppedPixelsX = (scaledVideoWidth - rW) / scale;
                    finalVideoPixelX = totalCroppedPixelsX / 2; // Pixels cropped from the left of original video.
                    finalVideoPixelY = 0; // No vertical cropping.
                    visibleVideoPixelWidth = vNatW - totalCroppedPixelsX; // Width of the visible part in original video pixels.
                    visibleVideoPixelHeight = vNatH; // Full height is visible.
                } else {
                    // Video is taller than renderDiv (or same AR), scaled to fit renderDiv width, cropped vertically.
                    var scale1 = rW / vNatW; // Scale factor based on width.
                    var scaledVideoHeight = vNatH * scale1; // Height of video if scaled to fit renderDiv width.
                    // Total original video pixels cropped vertically (from top and bottom combined).
                    var totalCroppedPixelsY = (scaledVideoHeight - rH) / scale1;
                    finalVideoPixelX = 0; // No horizontal cropping.
                    finalVideoPixelY = totalCroppedPixelsY / 2; // Pixels cropped from the top of original video.
                    visibleVideoPixelWidth = vNatW; // Full width is visible.
                    visibleVideoPixelHeight = vNatH - totalCroppedPixelsY; // Height of the visible part in original video pixels.
                }
                // Safety check for degenerate cases (e.g., extreme aspect ratios leading to zero visible dimension)
                if (visibleVideoPixelWidth <= 0 || visibleVideoPixelHeight <= 0) {
                    // Fallback or log error, this shouldn't happen in normal scenarios
                    console.warn("Calculated visible video dimension is zero or negative.", {
                        visibleVideoPixelWidth: visibleVideoPixelWidth,
                        visibleVideoPixelHeight: visibleVideoPixelHeight
                    });
                    return {
                        offsetX: 0,
                        offsetY: 0,
                        visibleWidth: vNatW,
                        visibleHeight: vNatH,
                        videoNaturalWidth: vNatW,
                        videoNaturalHeight: vNatH
                    };
                }
                return {
                    offsetX: finalVideoPixelX,
                    offsetY: finalVideoPixelY,
                    visibleWidth: visibleVideoPixelWidth,
                    visibleHeight: visibleVideoPixelHeight,
                    videoNaturalWidth: vNatW,
                    videoNaturalHeight: vNatH
                };
            }
        },
        {
            // _updateGhosts method removed.
            key: "_showStatusScreen",
            value: function _showStatusScreen(message) {
                var color = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'white', showRestartHint = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                this.gameOverContainer.style.display = 'block';
                this.gameOverText.innerText = message;
                this.gameOverText.style.color = color;
                this.restartHintText.style.display = showRestartHint ? 'block' : 'none';
            // No spawning to stop for template
            }
        },
        {
            key: "_showError",
            value: function _showError(message) {
                this.gameOverContainer.style.display = 'block';
                this.gameOverText.innerText = "ERROR: ".concat(message);
                this._hideBoot();
                this.gameOverText.style.color = 'orange';
                this.restartHintText.style.display = 'true'; // Show restart hint on error
                this.gameState = 'error';
                // No spawning to stop
                this.hands.forEach(function(hand) {
                    if (hand.lineGroup) hand.lineGroup.visible = false;
                });
            }
        },
        {
            key: "_restartGame",
            value: function _restartGame() {
                console.log("Restarting tracking...");
                this.gameOverContainer.style.display = 'none';
                this.hands.forEach(function(hand) {
                    if (hand.lineGroup) {
                        hand.lineGroup.visible = false;
                    }
                });
                // Ghost removal removed
                // Score reset removed
                // Visibility of game elements removed
                this.gameState = 'tracking'; // Changed from 'playing'
                this.lastVideoTime = -1;
                this.clock.start();
            // Removed _startSpawning()
            }
        },
        {
            // _updateScoreDisplay method removed.
            key: "_onResize",
            value: function _onResize() {
                var width = this.renderDiv.clientWidth;
                var height = this.renderDiv.clientHeight;
                // Update camera perspective
                this.camera.left = width / -2;
                this.camera.right = width / 2;
                this.camera.top = height / 2;
                this.camera.bottom = height / -2;
                this.camera.updateProjectionMatrix();
                // Update renderer size
                this.renderer.setSize(width, height);
                // Update video element size
                this.videoElement.style.width = width + 'px';
                this.videoElement.style.height = height + 'px';
            // Watermelon, Chad, GroundLine updates removed.
            }
        },
        {
            key: "_updateHandLines",
            value: function _updateHandLines(handIndex, landmarks, videoParams, canvasWidth, canvasHeight) {
                var _this = this;
                var hand = this.hands[handIndex];
                var lineGroup = hand.lineGroup;
                // Determine if this specific hand is currently involved in a grab/scale interaction
                var isThisHandActivelyInteracting = false;
                if (this.interactionMode === 'drag' || this.interactionMode === 'rotate') {
                    isThisHandActivelyInteracting = this.grabbingHandIndex === handIndex && this.pickedUpModel === this.pandaModel;
                } else if (this.interactionMode === 'scale') {
                    // For scale, both hands involved show the effect if scaling is active
                    isThisHandActivelyInteracting = this.scaleInitialPinchDistance !== null && (handIndex === 0 || handIndex === 1);
                } else if (this.interactionMode === 'animate') {
                    // For animate, the hand controlling animation scrolling (via pinch) shows the effect
                    isThisHandActivelyInteracting = this.animationControlHandIndex === handIndex;
                }
                var currentHandMaterial = handIndex === 0 ? this.fingertipMaterialHand1 : this.fingertipMaterialHand2;
                if (currentHandMaterial) {
                    currentHandMaterial.opacity = isThisHandActivelyInteracting ? this.fingertipGrabOpacity : this.fingertipDefaultOpacity;
                }
                while(lineGroup.children.length){
                    var child = lineGroup.children[0];
                    lineGroup.remove(child);
                    if (child.geometry) child.geometry.dispose();
                // Materials are shared, no need to dispose them here unless they are unique per line/circle
                }
                if (!landmarks || landmarks.length === 0 || !videoParams) {
                    lineGroup.visible = false;
                    return;
                }
                var isAnyLandmarkOffScreen = false;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    // First, check if any landmark is off-screen based on unclamped normalized coordinates
                    for(var _iterator = landmarks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var lm = _step.value;
                        var lmOriginalX = lm.x * videoParams.videoNaturalWidth;
                        var lmOriginalY = lm.y * videoParams.videoNaturalHeight;
                        var normX_visible = (lmOriginalX - videoParams.offsetX) / videoParams.visibleWidth;
                        var normY_visible = (lmOriginalY - videoParams.offsetY) / videoParams.visibleHeight;
                        if (normX_visible < 0 || normX_visible > 1 || normY_visible < 0 || normY_visible > 1) {
                            isAnyLandmarkOffScreen = true;
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                if (isAnyLandmarkOffScreen) {
                    lineGroup.visible = false;
                    return;
                }
                // If all landmarks are on-screen (or would be, before clamping), proceed to calculate points3D for drawing.
                // These points will use clamped coordinates to ensure they are drawn within canvas bounds if very close to edge.
                var points3D = landmarks.map(function(lm) {
                    var lmOriginalX = lm.x * videoParams.videoNaturalWidth;
                    var lmOriginalY = lm.y * videoParams.videoNaturalHeight;
                    var normX_visible = (lmOriginalX - videoParams.offsetX) / videoParams.visibleWidth;
                    var normY_visible = (lmOriginalY - videoParams.offsetY) / videoParams.visibleHeight;
                    // Clamp values FOR DRAWING purposes
                    normX_visible = Math.max(0, Math.min(1, normX_visible));
                    normY_visible = Math.max(0, Math.min(1, normY_visible));
                    var x = (1 - normX_visible) * canvasWidth - canvasWidth / 2;
                    var y = (1 - normY_visible) * canvasHeight - canvasHeight / 2;
                    return new THREE.Vector3(x, y, 1.1); // Z for fingertip circles, slightly in front of lines
                });
                var lineZ = 1; // Z for connection lines
                this.handConnections.forEach(function(conn) {
                    var p1 = points3D[conn[0]];
                    var p2 = points3D[conn[1]];
                    if (p1 && p2) {
                        // Create points for the line with the correct Z
                        var lineP1 = p1.clone().setZ(lineZ);
                        var lineP2 = p2.clone().setZ(lineZ);
                        var geometry = new THREE.BufferGeometry().setFromPoints([
                            lineP1,
                            lineP2
                        ]);
                        var line = new THREE.Line(geometry, _this.handLineMaterial);
                        lineGroup.add(line);
                        // Soft neon glow: two faint offset copies of the same line
                        [[1.6, 1.6], [-1.6, -1.6]].forEach(function(o) {
                            var g2 = new THREE.BufferGeometry().setFromPoints([
                                lineP1.clone().add(new THREE.Vector3(o[0], o[1], -0.02)),
                                lineP2.clone().add(new THREE.Vector3(o[0], o[1], -0.02))
                            ]);
                            lineGroup.add(new THREE.Line(g2, _this.handLineGlowMaterial));
                        });
                    }
                });
                // Draw fingertip circles
                var fingertipRadius = 8; // Radius of the circle for fingertips
                var wristRadius = 12; // Larger radius for the wrist
                var circleSegments = 16; // Smoothness of the circle
                this.fingertipLandmarkIndices.forEach(function(index) {
                    var landmarkPosition = points3D[index];
                    if (landmarkPosition) {
                        var radius = index === 0 ? wristRadius : fingertipRadius; // Use wristRadius for landmark 0
                        var circleGeometry = new THREE.CircleGeometry(radius, circleSegments);
                        // The 'currentHandMaterial' (fetched and opacity-updated above) is used here.
                        var landmarkCircle = new THREE.Mesh(circleGeometry, currentHandMaterial);
                        landmarkCircle.position.copy(landmarkPosition); // Already has Z=1.1
                        // Pulse scaling also depends on 'isThisHandActivelyInteracting'
                        if (isThisHandActivelyInteracting) {
                            // Apply pulsing effect to scale
                            // (1 + sin) / 2 gives a 0-1 range, perfect for modulating amplitude
                            var currentPulseProgress = (1 + Math.sin(_this.clock.elapsedTime * _this.grabbingPulseSpeed)) / 2;
                            var scaleValue = _this.pulseBaseScale + currentPulseProgress * _this.grabbingPulseAmplitude;
                            landmarkCircle.scale.set(scaleValue, scaleValue, 1);
                        } else {
                            landmarkCircle.scale.set(_this.pulseBaseScale, _this.pulseBaseScale, 1); // Reset scale
                        }
                        // Glow halo behind each joint
                        var halo = new THREE.Mesh(new THREE.CircleGeometry(radius * 2.8, 20), _this._getHaloMaterial(currentHandMaterial));
                        halo.position.copy(landmarkPosition);
                        halo.position.z = 1.05;
                        halo.scale.copy(landmarkCircle.scale);
                        lineGroup.add(halo);
                        lineGroup.add(landmarkCircle);
                    }
                });
                this._drawTrails(handIndex, points3D, lineGroup, currentHandMaterial.color);
                lineGroup.visible = true;
            }
        },
        {
            key: "_animate",
            value: function _animate() {
                requestAnimationFrame(this._animate.bind(this));
                var deltaTime = this.clock.getDelta();
                // Update hands if tracking
                if (this.gameState === 'tracking') {
                // Smoothly return model rotation to default (0, 0, 0) when not rotating
             if (this.pandaModel && !this.isRotatingModel) {
                 var defaultQuaternion = new THREE.Quaternion(); // Identity = default upright rotation (0,0,0)
                 this.pandaModel.quaternion.slerp(defaultQuaternion, 0.08);
             }
                    this._updateHands();
                }
                // Update animation mixer
                if (this.animationMixer) {
                    this.animationMixer.update(deltaTime);
                }
                this._updateHud();
                this._updateHoloRing();
                // Bounding box helper visibility logic REMOVED
                // _updateGhosts and _updateParticles calls removed.
                // Always render the scene
                this.renderer.render(this.scene, this.camera);
            }
        },
        {
            key: "start",
            value: function start() {
                var _this = this;
                // Add click listener for resuming audio context and potentially restarting on error
                this.renderDiv.addEventListener('click', function() {
                    _this.audioManager.resumeContext();
                    _this.sfx.resume();
                    if (_this.gameState === 'error' || _this.gameState === 'paused') {
                        _this._restartGame(); // Restart tracking
                    }
                });
                console.log('Game setup initiated. Waiting for async operations...');
            // Note: Game interaction now starts automatically after _init completes.
            }
        },
        {
            key: "_updateSpeechBubbleAppearance",
            value: function _updateSpeechBubbleAppearance() {
                if (!this.speechBubble) return;
                var isPlaceholder = this.speechBubble.innerHTML === "..." || this.speechBubble.innerText === "...";
                // Apply active styling only if recognition is generally active AND we are not displaying the placeholder.
                // This means interim/final text will get the active style, but the "..." placeholder will not,
                // even if the recognition service itself is still running in the background.
                var showActiveStyling = this.isSpeechActive && !isPlaceholder;
                var translateY = isPlaceholder ? '-5px' : '0px';
                var scale = showActiveStyling ? '1.15' : '1.0';
                this.speechBubble.style.transform = "translateX(-50%) translateY(".concat(translateY, ") scale(").concat(scale, ")");
                if (showActiveStyling) {
                    // Cyan glow, blue drop shadow, enhanced original shadow
                    // Active speech bubble: brighter color, stronger shadow
                    this.speechBubble.style.boxShadow = '5px 5px 0px #007bff'; // Active blue shadow
                    this.speechBubble.style.border = '1px solid rgba(0, 229, 255, 0.45)'; // Keep black border
                    this.speechBubble.style.padding = '18px 28px'; // Slightly larger padding
                    this.speechBubble.style.fontSize = 'clamp(20px, 3.5vw, 26px)'; // Larger font when active
                    this.speechBubble.style.top = '15px'; // Increased top margin when active, reduced from 30px to complement base 10px
                } else {
                    // Default/inactive styling
                    // Default/inactive speech bubble styling
                    this.speechBubble.style.boxShadow = '0 0 22px rgba(0, 229, 255, 0.25)'; // Hard black shadow
                    this.speechBubble.style.border = '1px solid rgba(0, 229, 255, 0.45)'; // Black border
                    this.speechBubble.style.padding = '15px 25px';
                    this.speechBubble.style.fontSize = 'clamp(16px, 3vw, 22px)'; // Original font size
                    this.speechBubble.style.top = '10px'; // Original top margin, changed from 20px
                }
            }
        },
        {
            key: "_setupSpeechRecognition",
            value: function _setupSpeechRecognition() {
                var _this = this;
                this.speechManager = new SpeechManager(function(finalTranscript, interimTranscript) {
                    if (finalTranscript) _this._handleVoiceTranscript(finalTranscript);
                    if (_this.speechBubble) {
                        clearTimeout(_this.speechBubbleTimeout);
                        if (finalTranscript) {
                            _this.speechBubble.innerHTML = finalTranscript;
                            _this.speechBubble.style.opacity = '1';
                            _this.speechBubbleTimeout = setTimeout(function() {
                                _this.speechBubble.innerHTML = "...";
                                _this.speechBubble.style.opacity = '0.7';
                                _this._updateSpeechBubbleAppearance(); // Update appearance for "..."
                            }, 2000);
                        } else if (interimTranscript) {
                            _this.speechBubble.innerHTML = '<i style="color: #888;">'.concat(interimTranscript, "</i>");
                            _this.speechBubble.style.opacity = '1';
                        } else {
                            _this.speechBubbleTimeout = setTimeout(function() {
                                if (_this.speechBubble.innerHTML !== "...") {
                                    _this.speechBubble.innerHTML = "...";
                                }
                                _this.speechBubble.style.opacity = '0.7';
                                _this._updateSpeechBubbleAppearance(); // Update appearance for "..."
                            }, 500);
                        }
                        _this._updateSpeechBubbleAppearance();
                    }
                }, function(isActive) {
                    _this.isSpeechActive = isActive;
                    _this._updateSpeechBubbleAppearance();
                }, function(command) {
                    console.log("Game received command: ".concat(command));
                    var validCommands = [
                        'drag',
                        'rotate',
                        'scale',
                        'animate'
                    ];
                    if (validCommands.includes(command.toLowerCase())) {
                        // Voice commands are handled in _handleVoiceTranscript
                    } else {
                        console.warn("Unrecognized command via speech: ".concat(command));
                    }
                });
                // Initialize speech bubble with "..." and apply initial appearance
                if (this.speechBubble) {
                    this.speechBubble.innerHTML = "...";
                    this.speechBubble.style.opacity = '0.7';
                    this._updateSpeechBubbleAppearance(); // Apply initial styles (isSpeechActive will be false)
                }
            // We will call requestPermissionAndStart() on user interaction (e.g., start button)
            }
        },
        {
            key: "_handleVoiceTranscript",
            value: function _handleVoiceTranscript(raw) {
                var text = String(raw).toLowerCase().replace(/[^a-z\s]/g, ' ').replace(/\s+/g, ' ').trim();
                var now = performance.now();
                if (!text || (text === this.lastVoiceText && now - this.lastVoiceTime < 3000)) return;
                this.lastVoiceText = text;
                this.lastVoiceTime = now;
                var modeMatch = text.match(/\b(drag|rotate|scale|animate)\b/);
                var wantsOff = /\b(deactivate|disable|stop|exit)\b/.test(text) || /\bturn off\b/.test(text);
                if (modeMatch) {
                    this._setModeActive(modeMatch[1], !wantsOff);
                } else if (/\b(reset|recenter|center)\b/.test(text)) {
                    this._resetModel();
                } else if (/\bnext\b/.test(text)) {
                    this._stepAnimation(1);
                } else if (/\b(previous|back)\b/.test(text)) {
                    this._stepAnimation(-1);
                }
            }
        },
        {
            key: "_setModeActive",
            value: function _setModeActive(mode, active) {
                if (mode === 'animate') {
                    if (active && this.interactionMode !== 'animate') this._setInteractionMode('animate');
                    else if (!active && this.interactionMode === 'animate') this._setInteractionMode('drag');
                } else {
                    this.enabledModes[mode] = active;
                    if (active && this.interactionMode === 'animate') this._setInteractionMode(mode);
                    if (!active) {
                        this.isModelTouched = false;
                        this.grabbingHandIndex = -1;
                        this.pickedUpModel = null;
                        this.rotateLastHandX = null;
                        this.rotateLastHandY = null;
                        this.scaleInitialPinchDistance = null;
                        this.scaleInitialModelScale = null;
                    }
                }
                var label = mode.charAt(0).toUpperCase() + mode.slice(1);
                this._flashMessage(label + (active ? " on" : " off"));
            }
        },
        {
            key: "_resetModel",
            value: function _resetModel() {
                if (!this.pandaModel) return;
                var sceneHeight = this.renderDiv.clientHeight;
                this.pandaModel.scale.set(80, 80, 80);
                this.pandaModel.position.set(0, sceneHeight * -0.45, -1000);
                this.pandaModel.rotation.set(0, 0, 0);
                this.isModelTouched = false;
                this.grabbingHandIndex = -1;
                this.pickedUpModel = null;
                this.rotateLastHandX = null;
                this.rotateLastHandY = null;
                this.scaleInitialPinchDistance = null;
                this.scaleInitialModelScale = null;
                this._flashMessage("Model reset");
            }
        },
        {
            key: "_stepAnimation",
            value: function _stepAnimation(direction) {
                var names = Object.keys(this.animationActions);
                if (names.length === 0) {
                    this._flashMessage("This model has no animations");
                    return;
                }
                var currentIndex = -1;
                for (var j = 0; j < names.length; j++) {
                    if (this.animationActions[names[j]] === this.currentAction) { currentIndex = j; break; }
                }
                var nextIndex = (currentIndex + direction + names.length) % names.length;
                this._playAnimation(names[nextIndex]);
                this._flashMessage(names[nextIndex]);
            }
        },
        {
            key: "_flashMessage",
            value: function _flashMessage(message) {
                var _this = this;
                if (!this.instructionTextElement) return;
                this.instructionTextElement.innerText = message;
                this.sfx.confirm();
                clearTimeout(this.voiceFlashTimeout);
                this.voiceFlashTimeout = setTimeout(function() {
                    _this._updateInstructionText();
                }, 1800);
            }
        },
        {
            key: "_setupFx",
            value: function _setupFx() {
                var style = document.createElement('style');
                style.textContent = HOLO_CSS;
                document.head.appendChild(style);
                // Cool, darkened camera feed so the model and hands stand out
                this.videoElement.style.filter = 'brightness(0.55) contrast(1.15) saturate(0.55) sepia(0.35) hue-rotate(155deg)';
                // Vignette and scan lines over the scene
                var fx = document.createElement('div');
                fx.id = 'fx-overlay';
                this.renderDiv.appendChild(fx);
                // HUD readout with gesture icon
                var hud = document.createElement('div');
                hud.id = 'holo-hud';
                hud.innerHTML = '<svg id="hud-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + HUD_ICONS.ready + '</svg>' +
                    '<div><div id="hud-gesture">Ready</div><div id="hud-stats">Size 100%   Tilt 0\u00b0 / 0\u00b0</div></div>';
                this.renderDiv.appendChild(hud);
                this.hudElement = hud;
                this.hudIcon = hud.querySelector('#hud-icon');
                this.hudGesture = hud.querySelector('#hud-gesture');
                this.hudStats = hud.querySelector('#hud-stats');
                // Upload button (images become 3D models; .glb/.gltf models load as before)
                var upBtn = document.createElement('button');
                upBtn.id = 'upload-btn';
                upBtn.type = 'button';
                upBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M12 4l-4 4M12 4l4 4M4 20h16"/></svg>Add image or model';
                var upInput = document.createElement('input');
                upInput.type = 'file';
                upInput.accept = 'image/*,.glb,.gltf';
                upInput.style.display = 'none';
                var self = this;
                upBtn.addEventListener('click', function() { upInput.click(); });
                upInput.addEventListener('change', function() {
                    var f = upInput.files && upInput.files[0];
                    if (f) self._handleDroppedFile(f);
                    upInput.value = '';
                });
                this.renderDiv.appendChild(upBtn);
                this.renderDiv.appendChild(upInput);
                // Boot screen
                var boot = document.createElement('div');
                boot.id = 'boot-screen';
                boot.innerHTML = '<div class="boot-core"><svg class="boot-logo" viewBox="0 0 64 64" fill="none"><path d="M32 6 55 19v26L32 58 9 45V19z" stroke="#00e5ff" stroke-width="3"/><path d="M32 6v26m0 0 23-13M32 32 9 19m23 13v26" stroke="#7c5cff" stroke-width="2"/></svg>' +
                    '<div class="boot-name">HOLOSENSE</div><div class="boot-bar"><div id="boot-fill"></div></div><div id="boot-status">Initializing sensors</div></div>';
                this.renderDiv.appendChild(boot);
                this.bootElement = boot;
                var _this = this;
                setTimeout(function() { _this._hideBoot(); }, 25000); // Failsafe so the screen never gets stuck
            }
        },
        {
            key: "_bootStatus",
            value: function _bootStatus(text, pct) {
                var st = document.getElementById('boot-status');
                var fill = document.getElementById('boot-fill');
                if (st) st.textContent = text;
                if (fill) fill.style.width = pct + '%';
            }
        },
        {
            key: "_hideBoot",
            value: function _hideBoot() {
                var b = this.bootElement;
                if (!b || b.classList.contains('hide')) return;
                b.classList.add('hide');
                setTimeout(function() { if (b.parentNode) b.parentNode.removeChild(b); }, 800);
            }
        },
        {
            key: "_getHaloMaterial",
            value: function _getHaloMaterial(baseMaterial) {
                if (!this.haloMaterial) {
                    this.haloMaterial = new THREE.MeshBasicMaterial({
                        transparent: true,
                        opacity: 0.16,
                        blending: THREE.AdditiveBlending,
                        depthWrite: false
                    });
                }
                this.haloMaterial.color.copy(baseMaterial.color);
                return this.haloMaterial;
            }
        },
        {
            key: "_drawTrails",
            value: function _drawTrails(handIndex, points3D, lineGroup, color) {
                var now = performance.now();
                var trail = this.handTrails[handIndex];
                if (now - trail.last > 250) trail.tips = {}; // Hand was gone, start fresh
                trail.last = now;
                if (!this.trailMaterial) {
                    this.trailMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending });
                }
                var maxLen = 14;
                var _this = this;
                [4, 8, 12, 16, 20].forEach(function(idx) {
                    var arr = trail.tips[idx] || (trail.tips[idx] = []);
                    arr.push(points3D[idx].clone().setZ(0.95));
                    if (arr.length > maxLen) arr.shift();
                    if (arr.length < 2) return;
                    var pos = new Float32Array(arr.length * 3);
                    var col = new Float32Array(arr.length * 3);
                    for (var i = 0; i < arr.length; i++) {
                        var f = i / (arr.length - 1);
                        f = f * f; // Fade toward the tail
                        pos[i * 3] = arr[i].x; pos[i * 3 + 1] = arr[i].y; pos[i * 3 + 2] = arr[i].z;
                        col[i * 3] = color.r * f; col[i * 3 + 1] = color.g * f; col[i * 3 + 2] = color.b * f;
                    }
                    var g = new THREE.BufferGeometry();
                    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
                    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
                    lineGroup.add(new THREE.Line(g, _this.trailMaterial));
                });
            }
        },
        {
            key: "_applyHologram",
            value: function _applyHologram(model) {
                var u = this.holoUniforms;
                var frag = [
                    "float holoRim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.2);",
                    "float holoScan = 0.5 + 0.5 * sin(gl_FragCoord.y * 0.8 - uTime * 3.0);",
                    "vec3 holoCol = vec3(0.0, 0.9, 1.0);",
                    "gl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.rgb * vec3(0.55, 0.85, 1.0) + holoCol * 0.12, 0.6);",
                    "gl_FragColor.rgb += holoCol * holoRim * (1.1 + uGlow * 1.6);",
                    "gl_FragColor.rgb *= 0.86 + 0.14 * holoScan;",
                    "#include <dithering_fragment>"
                ].join("\n");
                model.traverse(function(o) {
                    if (!o.isMesh || !o.material) return;
                    var isArray = Array.isArray(o.material);
                    var mats = isArray ? o.material : [o.material];
                    var out = mats.map(function(m) {
                        // Only lit PBR materials have the normal / view data the effect needs
                        if (!m || m.userData.holo || !(m.isMeshStandardMaterial || m.isMeshPhysicalMaterial)) return m;
                        var c = m.clone();
                        c.userData.holo = true;
                        c.onBeforeCompile = function(shader) {
                            shader.uniforms.uTime = u.uTime;
                            shader.uniforms.uGlow = u.uGlow;
                            shader.fragmentShader = shader.fragmentShader
                                .replace('#include <common>', '#include <common>\nuniform float uTime;\nuniform float uGlow;')
                                .replace('#include <dithering_fragment>', frag);
                        };
                        c.customProgramCacheKey = function() { return 'holosense-holo'; };
                        c.needsUpdate = true;
                        return c;
                    });
                    o.material = isArray ? out : out[0];
                });
            }
        },
        {
            key: "_updateHoloRing",
            value: function _updateHoloRing() {
                if (!this.pandaModel) {
                    if (this.holoRing) this.holoRing.visible = false;
                    return;
                }
                if (!this.holoRing) {
                    var mk = function(inner, outer, opacity) {
                        return new THREE.Mesh(new THREE.RingGeometry(inner, outer, 72), new THREE.MeshBasicMaterial({
                            color: 0x00e5ff, transparent: true, opacity: opacity, side: THREE.DoubleSide,
                            blending: THREE.AdditiveBlending, depthWrite: false
                        }));
                    };
                    var group = new THREE.Group();
                    this.holoRingOuter = mk(0.96, 1.0, 0.7);
                    this.holoRingInner = mk(0.58, 0.6, 0.45);
                    group.add(this.holoRingOuter);
                    group.add(this.holoRingInner);
                    this.scene.add(group);
                    this.holoRing = group;
                }
                var box = new THREE.Box3().setFromObject(this.pandaModel);
                if (box.isEmpty()) return;
                var size = new THREE.Vector3();
                box.getSize(size);
                var r = Math.max(60, Math.max(size.x, size.y * 0.5) * 0.7);
                this.holoRing.visible = true;
                this.holoRing.position.set((box.min.x + box.max.x) / 2, box.min.y + 4, this.pandaModel.position.z - 5);
                this.holoRing.scale.set(r, r * 0.28, 1);
                var pulse = 1 + 0.06 * Math.sin(this.clock.elapsedTime * 2);
                this.holoRingInner.scale.set(pulse, pulse, 1);
                var glow = this.holoUniforms.uGlow.value;
                this.holoRingOuter.material.opacity = 0.5 + 0.45 * glow;
                this.holoRingInner.material.opacity = 0.3 + 0.4 * glow;
            }
        },
        {
            key: "_updateHud",
            value: function _updateHud() {
                this.holoUniforms.uTime.value = this.clock.elapsedTime;
                var g = 'ready';
                if (this.interactionMode === 'animate') g = 'animate';
                else if (this.thumbHoldFrames >= 4 && this.lastThumbDir !== 0 && this.enabledModes.scale) g = this.lastThumbDir > 0 ? 'grow' : 'shrink';
                else if (this.scaleInitialPinchDistance !== null) g = 'resize';
                else if (this.isRotatingModel) g = 'rotate';
                else if (this.grabbingHandIndex !== -1 && this.isModelTouched) g = 'drag';
                var sizePct = this.pandaModel ? Math.round(this.pandaModel.scale.x / 80 * 100) : 100;
                if (g !== this.activeGesture) {
                    if (g !== 'ready') this.sfx.start(g);
                    else this.sfx.release();
                    this.activeGesture = g;
                    this.hudIcon.innerHTML = HUD_ICONS[g];
                    this.hudGesture.textContent = HUD_LABELS[g];
                    this.hudElement.classList.toggle('active', g !== 'ready');
                }
                if (g === 'grow' || g === 'shrink' || g === 'resize') {
                    var step = Math.round(sizePct / 5);
                    if (step !== this.lastSizeStep) this.sfx.tick(sizePct);
                    this.lastSizeStep = step;
                } else {
                    this.lastSizeStep = Math.round(sizePct / 5);
                }
                var target = (g === 'ready' || g === 'animate') ? 0 : 1;
                this.holoUniforms.uGlow.value += (target - this.holoUniforms.uGlow.value) * 0.12;
                this.hudFrame++;
                if (this.hudFrame % 4 === 0 && this.pandaModel) {
                    var e = new THREE.Euler().setFromQuaternion(this.pandaModel.quaternion, 'YXZ');
                    var deg = function(v) { return Math.round(v * 180 / Math.PI); };
                    this.hudStats.textContent = "Size " + sizePct + "%   Tilt " + deg(e.x) + "\u00b0 / " + deg(e.y) + "\u00b0";
                }
            }
        },
        {
            key: "_handleDroppedFile",
            value: function _handleDroppedFile(file) {
                var name = file.name.toLowerCase();
                var type = (file.type || '').toLowerCase();
                if (type.indexOf('image/') === 0 || /\.(png|jpe?g|webp|gif|bmp|avif)$/.test(name)) {
                    this._loadImageAsModel(file);
                } else if (name.endsWith('.glb') || name.endsWith('.gltf')) {
                    this._loadDroppedModel(file);
                } else {
                    this._holdMessage("Unsupported file. Add an image, .glb or .gltf", 3000);
                }
            }
        },
        {
            key: "_holdMessage",
            value: function _holdMessage(text, restoreAfterMs) {
                var _this = this;
                if (!this.instructionTextElement) return;
                clearTimeout(this.voiceFlashTimeout);
                this.instructionTextElement.innerText = text;
                if (restoreAfterMs) {
                    this.voiceFlashTimeout = setTimeout(function() { _this._updateInstructionText(); }, restoreAfterMs);
                }
            }
        },
        {
            key: "_loadImageAsModel",
            value: function _loadImageAsModel(file) {
                var _this = this;
                if (this._imageBusy) {
                    this._holdMessage("Still building the previous model. One moment", 2500);
                    return;
                }
                this._imageBusy = true;
                this._holdMessage("Reading image...");
                var url = URL.createObjectURL(file);
                var img = new Image();
                img.onload = function() {
                    _this._buildImageModel(img).then(function() {
                        _this._flashMessage("3D model ready. Open palm to rotate");
                    }).catch(function(err) {
                        console.error("Image to 3D failed:", err);
                        _this._holdMessage("Could not build a 3D model from this image", 4000);
                    }).then(function() {
                        _this._imageBusy = false;
                        URL.revokeObjectURL(url);
                    });
                };
                img.onerror = function() {
                    _this._imageBusy = false;
                    URL.revokeObjectURL(url);
                    _this._holdMessage("Could not read this image", 4000);
                };
                img.src = url;
            }
        },
        {
            key: "_estimateDepth",
            value: function _estimateDepth(canvas) {
                var _this = this;
                return (async function() {
                    var mod, pipe, out, d, arr, i;
                    {
                        {
                            try {
                                if (!_this._depthPipeline) {
                                    _this._holdMessage("Loading depth AI (first time downloads about 30 MB)...");
                                    mod = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2');
                                    mod.env.allowLocalModels = false;
                                    pipe = await mod.pipeline('depth-estimation', 'Xenova/depth-anything-small-hf', {
                                        progress_callback: function(p) {
                                            if (p && p.status === 'progress' && typeof p.progress === 'number') {
                                                _this._holdMessage("Downloading depth AI " + Math.round(p.progress) + "%");
                                            }
                                        }
                                    });
                                    _this._depthPipeline = pipe;
                                }
                                _this._holdMessage("Estimating depth...");
                                await new Promise(function(r) { setTimeout(r, 30); }); // Let the message paint
                                out = await _this._depthPipeline(canvas.toDataURL('image/jpeg', 0.92));
                                d = out.depth;
                                arr = new Float32Array(d.width * d.height);
                                for (i = 0; i < arr.length; i++) arr[i] = d.data[i * (d.channels || 1)];
                                return { data: arr, w: d.width, h: d.height };
                            } catch (e) {
                                console.warn("Depth AI unavailable, using brightness depth instead:", e);
                                return null;
                            }
                        }
                    }
                })();
            }
        },
        {
            key: "_buildImageModel",
            value: function _buildImageModel(img) {
                var _this = this;
                return (async function() {
                    // 1. Texture canvas (max 1024px) and alpha check
                    var maxTex = 1024;
                    var k = Math.min(1, maxTex / Math.max(img.naturalWidth, img.naturalHeight));
                    var tw = Math.max(2, Math.round(img.naturalWidth * k));
                    var th = Math.max(2, Math.round(img.naturalHeight * k));
                    var tex = document.createElement('canvas');
                    tex.width = tw; tex.height = th;
                    var tctx = tex.getContext('2d', { willReadFrequently: true });
                    tctx.drawImage(img, 0, 0, tw, th);
                    var probe = tctx.getImageData(0, 0, tw, th).data;
                    var hasAlpha = false;
                    for (var a = 3; a < probe.length; a += 4 * 37) {
                        if (probe[a] < 250) { hasAlpha = true; break; }
                    }
                    // 2. Depth map: AI if available, otherwise brightness
                    var depth = await _this._estimateDepth(tex);
                    var dw, dh, dd;
                    if (depth) {
                        dw = depth.w; dh = depth.h; dd = depth.data;
                    } else {
                        dw = Math.min(tw, 192); dh = Math.max(2, Math.round(dw * th / tw));
                        var sc = document.createElement('canvas');
                        sc.width = dw; sc.height = dh;
                        var sctx = sc.getContext('2d', { willReadFrequently: true });
                        sctx.drawImage(tex, 0, 0, dw, dh);
                        var px = sctx.getImageData(0, 0, dw, dh).data;
                        dd = new Float32Array(dw * dh);
                        for (var q = 0; q < dd.length; q++) dd[q] = 0.299 * px[q * 4] + 0.587 * px[q * 4 + 1] + 0.114 * px[q * 4 + 2];
                    }
                    _this._holdMessage("Building 3D mesh...");
                    await new Promise(function(r) { setTimeout(r, 30); });
                    // 3. Normalize depth to 0..1 using 2nd and 98th percentiles
                    var sorted = Array.prototype.slice.call(dd).sort(function(m, n) { return m - n; });
                    var lo = sorted[Math.floor(sorted.length * 0.02)];
                    var hi = sorted[Math.floor(sorted.length * 0.98)];
                    if (hi - lo < 1e-6) hi = lo + 1;
                    var norm = new Float32Array(dd.length);
                    for (var z = 0; z < dd.length; z++) norm[z] = Math.max(0, Math.min(1, (dd[z] - lo) / (hi - lo)));
                    // light smoothing (two box blur passes)
                    for (var pass = 0; pass < 2; pass++) {
                        var tmp = new Float32Array(norm.length);
                        for (var yy = 0; yy < dh; yy++) {
                            for (var xx = 0; xx < dw; xx++) {
                                var sum = 0, cnt = 0;
                                for (var oy = -1; oy <= 1; oy++) {
                                    for (var ox = -1; ox <= 1; ox++) {
                                        var sx = xx + ox, sy = yy + oy;
                                        if (sx >= 0 && sx < dw && sy >= 0 && sy < dh) { sum += norm[sy * dw + sx]; cnt++; }
                                    }
                                }
                                tmp[yy * dw + xx] = sum / cnt;
                            }
                        }
                        norm = tmp;
                    }
                    var sample = function(u, v) {
                        var fx = u * (dw - 1), fy = v * (dh - 1);
                        var x0 = Math.floor(fx), y0 = Math.floor(fy);
                        var x1 = Math.min(dw - 1, x0 + 1), y1 = Math.min(dh - 1, y0 + 1);
                        var tx = fx - x0, ty = fy - y0;
                        var top = norm[y0 * dw + x0] * (1 - tx) + norm[y0 * dw + x1] * tx;
                        var bot = norm[y1 * dw + x0] * (1 - tx) + norm[y1 * dw + x1] * tx;
                        return top * (1 - ty) + bot * ty;
                    };
                    // 4. Size: about 42% of screen height, capped by width. World units at the default 80x scale.
                    var aspect = tw / th;
                    var vh = _this.renderDiv.clientHeight, vw = _this.renderDiv.clientWidth;
                    var pxH = vh * 0.42;
                    var pxW = pxH * aspect;
                    if (pxW > vw * 0.7) { pxW = vw * 0.7; pxH = pxW / aspect; }
                    var W = pxW / 80, H = pxH / 80;
                    var T = 0.25 * Math.max(W, H); // relief thickness
                    // 5. Front relief grid
                    var longSegs = 150;
                    var nx = aspect >= 1 ? longSegs : Math.max(8, Math.round(longSegs * aspect));
                    var ny = aspect >= 1 ? Math.max(8, Math.round(longSegs / aspect)) : longSegs;
                    var vcount = (nx + 1) * (ny + 1);
                    var pos = new Float32Array(vcount * 3);
                    var uvs = new Float32Array(vcount * 2);
                    for (var j = 0; j <= ny; j++) {
                        for (var i = 0; i <= nx; i++) {
                            var vi = j * (nx + 1) + i;
                            var u = i / nx, v = j / ny;
                            pos[vi * 3] = (u - 0.5) * W;
                            pos[vi * 3 + 1] = (1 - v) * H; // origin at bottom center, like the default model
                            pos[vi * 3 + 2] = sample(u, v) * T;
                            uvs[vi * 2] = u;
                            uvs[vi * 2 + 1] = 1 - v;
                        }
                    }
                    var idx = [];
                    for (var j2 = 0; j2 < ny; j2++) {
                        for (var i2 = 0; i2 < nx; i2++) {
                            var a0 = j2 * (nx + 1) + i2, b0 = a0 + 1, c0 = a0 + (nx + 1), d0 = c0 + 1;
                            idx.push(a0, c0, b0, b0, c0, d0);
                        }
                    }
                    var fg = new THREE.BufferGeometry();
                    fg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
                    fg.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
                    fg.setIndex(idx);
                    fg.computeVertexNormals();
                    var map = new THREE.CanvasTexture(tex);
                    map.colorSpace = THREE.SRGBColorSpace;
                    map.anisotropy = 4;
                    var frontMat = new THREE.MeshStandardMaterial({
                        map: map, roughness: 0.75, metalness: 0.0, side: THREE.DoubleSide,
                        alphaTest: hasAlpha ? 0.5 : 0, transparent: false
                    });
                    var group = new THREE.Group();
                    group.add(new THREE.Mesh(fg, frontMat));
                    // 6. Solid back and side walls (skipped for cut-out images with transparency)
                    if (!hasAlpha) {
                        var zb = -0.05 * Math.max(W, H);
                        var wp = [];
                        var P = function(ii, jj) { var n = jj * (nx + 1) + ii; return [pos[n * 3], pos[n * 3 + 1], pos[n * 3 + 2]]; };
                        var Bk = function(pt) { return [pt[0], pt[1], zb]; };
                        var quad = function(p1, p2) {
                            var b1 = Bk(p1), b2 = Bk(p2);
                            wp.push.apply(wp, p1.concat(p2, b2, p1, b2, b1));
                        };
                        for (var ei = 0; ei < nx; ei++) { quad(P(ei, 0), P(ei + 1, 0)); quad(P(ei, ny), P(ei + 1, ny)); }
                        for (var ej = 0; ej < ny; ej++) { quad(P(0, ej), P(0, ej + 1)); quad(P(nx, ej), P(nx, ej + 1)); }
                        var x0b = -W / 2, x1b = W / 2;
                        wp.push(x0b, 0, zb, x1b, 0, zb, x1b, H, zb, x0b, 0, zb, x1b, H, zb, x0b, H, zb);
                        var bg = new THREE.BufferGeometry();
                        bg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(wp), 3));
                        bg.computeVertexNormals();
                        var backMat = new THREE.MeshStandardMaterial({
                            color: 0x10304a, emissive: 0x00404f, roughness: 0.5, metalness: 0.3,
                            flatShading: true, side: THREE.DoubleSide
                        });
                        group.add(new THREE.Mesh(bg, backMat));
                    }
                    group.userData.imageModel = true;
                    _this._installModel(group);
                })();
            }
        },
        {
            key: "_installModel",
            value: function _installModel(group) {
                var _this = this;
                if (this.pandaModel) {
                    this.scene.remove(this.pandaModel);
                    if (this.animationMixer) {
                        this.animationMixer.stopAllAction();
                    }
                    if (this.pandaModel.userData && this.pandaModel.userData.imageModel) {
                        this.pandaModel.traverse(function(o) {
                            if (o.geometry) o.geometry.dispose();
                            if (o.material) {
                                if (o.material.map) o.material.map.dispose();
                                o.material.dispose();
                            }
                        });
                    }
                }
                this.currentAction = null;
                while (this.animationButtonsContainer.firstChild) {
                    this.animationButtonsContainer.removeChild(this.animationButtonsContainer.firstChild);
                }
                this.animationActions = {};
                this.animationClips = [];
                this.pandaModel = group;
                this.pandaModel.scale.set(80, 80, 80);
                this.pandaModel.position.set(0, this.renderDiv.clientHeight * -0.45, -1000);
                this.pandaModel.quaternion.identity();
                this.scene.add(this.pandaModel);
                this.animationMixer = new THREE.AnimationMixer(this.pandaModel);
                this.isModelTouched = false;
                this.grabbingHandIndex = -1;
                this.pickedUpModel = null;
                this.rotateLastHandX = null;
                this.rotateLastHandY = null;
                this.scaleInitialPinchDistance = null;
                this.scaleInitialModelScale = null;
                this.animationControlHandIndex = -1;
                this.animationControlInitialPinchY = null;
                this._updateInteractionModeButtonStyles();
            }
        },
        {
            key: "_playAnimation",
            value: function _playAnimation(name) {
                if (!this.animationActions[name]) {
                    console.warn('Animation "'.concat(name, '" not found.'));
                    return;
                }
                var newAction = this.animationActions[name];
                if (this.currentAction === newAction && newAction.isRunning()) {
                    console.log('Animation "'.concat(name, '" is already playing.'));
                    return; // Already playing this animation
                }
                if (this.currentAction) {
                    this.currentAction.fadeOut(0.5); // Fade out current animation over 0.5 seconds
                }
                newAction.reset().fadeIn(0.5).play(); // Reset, fade in and play new animation
                this.currentAction = newAction;
                console.log("Playing animation: ".concat(name));
                this._updateButtonStyles(name);
            }
        },
        {
            key: "_updateButtonStyles",
            value: function _updateButtonStyles(activeAnimationName) {
                var buttons = this.animationButtonsContainer.children;
                for(var i = 0; i < buttons.length; i++){
                    var button = buttons[i];
                    var isActive = button.innerText === activeAnimationName;
                    button.style.backgroundColor = isActive ? '#00b8d4' : 'rgba(10, 18, 36, 0.62)'; // Blue if active, light grey if not
                    button.style.color = isActive ? '#04060c' : '#d8e6f5';
                    button.style.fontWeight = isActive ? 'bold' : 'normal';
                    // Active button has its shadow "pressed"
                    button.style.boxShadow = isActive ? '0 0 6px rgba(0, 229, 255, 0.55)' : '0 0 12px rgba(0, 229, 255, 0.22)';
                }
            }
        },
        {
            key: "_setInteractionMode",
            value: function _setInteractionMode(mode) {
            if (mode === 'animate' && this.interactionMode === 'animate') {
    mode = 'drag';
}
                var _this = this;
                if (this.interactionMode === mode) return; // No change
                console.log("Setting interaction mode to: ".concat(mode));
                this.interactionMode = mode;
                // If currently grabbing, release the model
                if (this.grabbingHandIndex !== -1 && this.pickedUpModel) {
                    console.log("Interaction mode changed while grabbing. Releasing model from hand ".concat(this.grabbingHandIndex, "."));
                    this.grabbingHandIndex = -1;
                    this.pickedUpModel = null;
                    this.rotateLastHandX = null;
                    this.scaleInitialPinchDistance = null; // Reset scaling variables
                    this.scaleInitialModelScale = null;
                // if (this.grabMarker && this.pandaModel) this.grabMarker.visible = true; // Grab marker removed
                }
                this._updateHandMaterialsForMode(mode); // Update hand colors for new mode
                this._updateInteractionModeButtonStyles();
                // Show/hide animation buttons container based on mode
                if (this.animationButtonsContainer) {
                    if (mode === 'animate') {
                        this.animationButtonsContainer.style.display = 'flex';
                        requestAnimationFrame(function() {
                            _this.animationButtonsContainer.style.opacity = '1';
                        });
                    } else {
                        this.animationButtonsContainer.style.opacity = '0';
                        // Wait for transition to complete before setting display to none
                        setTimeout(function() {
                            if (_this.interactionMode !== 'animate') {
                                _this.animationButtonsContainer.style.display = 'none';
                            }
                        }, 300); // Corresponds to transition duration
                    }
                }
                this._updateInstructionText(); // Update instruction text when mode changes
            }
        },
        {
            key: "_updateInstructionText",
            value: function _updateInstructionText() {
                if (this.instructionTextElement) {
                    var instruction = this.interactionModeInstructions[this.interactionMode] || "Use hand gestures to interact.";
                    this.instructionTextElement.innerText = instruction;
                    // The instruction text should always be 10px from the bottom.
                    // The animation buttons are positioned from the top-left and should not affect this.
                    this.instructionTextElement.style.bottom = '10px'; // Decreased bottom margin
                }
            }
        },
        {
            key: "_updateHandMaterialsForMode",
            value: function _updateHandMaterialsForMode(mode) {
                var modeConfig = this.interactionModeColors[mode];
                var colorToSet = modeConfig ? modeConfig.hand : new THREE.Color(0x00ccff); // Fallback color
                if (this.fingertipMaterialHand1) {
                    this.fingertipMaterialHand1.color.set(colorToSet);
                }
                if (this.fingertipMaterialHand2) {
                    this.fingertipMaterialHand2.color.set(colorToSet);
                }
                if (this.handLineMaterial) this.handLineMaterial.color.set(colorToSet);
                if (this.handLineGlowMaterial) this.handLineGlowMaterial.color.set(colorToSet);
            }
        },
        {
            key: "_updateInteractionModeButtonStyles",
            value: function _updateInteractionModeButtonStyles() {
                var _this = this;
                for(var modeKey in this.interactionModeButtons){
                    var button = this.interactionModeButtons[modeKey];
                    var modeConfig = this.interactionModeColors[modeKey];
                    var fallbackColor = '#6c757d';
                    var fallbackTextColor = 'white';
                    if (modeKey === this.interactionMode) {
                        button.style.border = '1px solid rgba(0, 229, 255, 0.45)'; // All buttons have black border
                        if (modeConfig) {
                            button.style.backgroundColor = modeConfig.base;
                            button.style.color = modeConfig.text;
                        } else {
                            button.style.backgroundColor = fallbackColor;
                            button.style.color = fallbackTextColor;
                        }
                        button.style.fontWeight = 'bold'; // Already bold from initial setup, but ensure it stays
                        button.style.boxShadow = '0 0 6px rgba(0, 229, 255, 0.55)'; // "Pressed" shadow for active button
                    } else {
                        button.style.backgroundColor = 'rgba(10, 18, 36, 0.62)'; // More opaque transparent white background
                        button.style.border = '1px solid rgba(0, 229, 255, 0.45)'; // Black border for inactive
                        if (modeConfig) {
                            button.style.color = modeConfig.base; // Neon text color
                        } else {
                            button.style.color = fallbackColor; // Fallback text color for inactive
                        }
                        button.style.fontWeight = 'bold'; // Always bold
                        button.style.boxShadow = '0 0 12px rgba(0, 229, 255, 0.22)'; // Default shadow for inactive
                    }
                }
                // Explicitly set display for animationButtonsContainer based on current mode
                // This ensures it's correct even on initial load if default mode isn't 'animate'
                if (this.animationButtonsContainer) {
                    if (this.interactionMode === 'animate') {
                        this.animationButtonsContainer.style.display = 'flex';
                        requestAnimationFrame(function() {
                            _this.animationButtonsContainer.style.opacity = '1';
                        });
                    } else {
                        this.animationButtonsContainer.style.opacity = '0';
                        this.animationButtonsContainer.style.display = 'none'; // Set display none immediately if not animate
                    }
                }
                this._updateInstructionText(); // Also call here to adjust position if animation buttons are shown/hidden
            }
        },
        {
            key: "_setupDragAndDrop",
            value: function _setupDragAndDrop() {
                var _this = this;
                this.renderDiv.addEventListener('dragover', function(event) {
                    event.preventDefault(); // Prevent default behavior to allow drop
                    event.dataTransfer.dropEffect = 'copy'; // Show a copy icon
                    _this.renderDiv.style.border = '2px dashed #00e5ff'; // Visual feedback
                });
                this.renderDiv.addEventListener('dragleave', function(event) {
                    _this.renderDiv.style.border = 'none'; // Remove visual feedback
                });
                this.renderDiv.addEventListener('drop', function(event) {
                    event.preventDefault();
                    _this.renderDiv.style.border = 'none'; // Remove visual feedback
                    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
                        var file = event.dataTransfer.files[0];
                        var fileName = file.name.toLowerCase();
                        var fileType = file.type.toLowerCase();
                        if (fileType.indexOf('image/') === 0 || /\.(png|jpe?g|webp|gif|bmp|avif)$/.test(fileName)) {
                            _this._loadImageAsModel(file);
                        } else if (fileName.endsWith('.gltf') || fileName.endsWith('.glb') || fileType === 'model/gltf+json' || fileType === 'model/gltf-binary') {
                            console.log("GLTF file dropped: ".concat(file.name), file);
                            // Next step: Process and load this file.
                            _this._loadDroppedModel(file);
                        } else {
                            console.warn('Dropped file is not a recognized GLTF format:', file.name, file.type);
                            _this._showStatusScreen('"'.concat(file.name, '" is not a GLTF model.'), 'orange', false);
                            setTimeout(function() {
                                if (_this.gameOverContainer.style.display === 'block' && _this.gameOverText.innerText.includes(file.name)) {
                                    _this.gameOverContainer.style.display = 'none';
                                }
                            }, 3000);
                        }
                        event.dataTransfer.clearData();
                    }
                });
            }
        },
        {
            key: "_loadDroppedModel",
            value: function _loadDroppedModel(file) {
                var _this = this;
                console.log("Processing dropped model:", file.name, file.type);
                var reader = new FileReader();
                reader.onload = function(e) {
                    // Pass file.type as well, it might be useful for _parseAndLoadGltf context
                    _this._parseAndLoadGltf(e.target.result, file.name, file.type);
                };
                reader.onerror = function(error) {
                    console.error("FileReader error for ".concat(file.name, ":"), error);
                    _this._showError("Error reading file ".concat(file.name, "."));
                    // Ensure loading message is hidden if it was shown by this function
                    if (_this.gameOverContainer.style.display === 'block' && _this.gameOverText.innerText.startsWith('Loading "'.concat(file.name, '"'))) {
                        _this.gameOverContainer.style.display = 'none';
                    }
                };
                var fileNameLower = file.name.toLowerCase();
                var fileTypeLower = file.type ? file.type.toLowerCase() : '';
                if (fileNameLower.endsWith('.glb') || fileTypeLower === 'model/gltf-binary') {
                    console.log("Reading ".concat(file.name, " as ArrayBuffer."));
                    reader.readAsArrayBuffer(file);
                } else if (fileNameLower.endsWith('.gltf') || fileTypeLower === 'model/gltf+json') {
                    console.log("Reading ".concat(file.name, " as text."));
                    reader.readAsText(file);
                } else {
                    var message = file.type ? "Unsupported file type: ".concat(file.type) : 'Cannot determine file type.';
                    console.warn("Unknown file format for GLTF loader: ".concat(file.name, ", Type: ").concat(file.type));
                    this._showError("".concat(message, " for ").concat(file.name, ". Please drop a .gltf or .glb file."));
                    // Ensure loading message is hidden
                    if (this.gameOverContainer.style.display === 'block' && this.gameOverText.innerText.startsWith('Loading "'.concat(file.name, '"'))) {
                        this.gameOverContainer.style.display = 'none';
                    }
                }
            }
        },
        {
            key: "_parseAndLoadGltf",
            value: function _parseAndLoadGltf(content, fileName, fileType) {
                var _this = this;
                var loader = new GLTFLoader(); // GLTFLoader is already imported at the top
                try {
                    // The 'path' argument is for resolving relative paths for external resources like .bin or textures.
                    // For a single file drop, this is typically empty. If it's a .gltf with external files,
                    // those files would need to be handled separately (e.g., by being dropped together and identified).
                    // This setup works best for self-contained .glb files or .gltf files using data URIs.
                    loader.parse(content, '', function(gltf) {
                        console.log("Successfully parsed GLTF model: ".concat(fileName), gltf);
                        // 1. If a previous model exists, remove it and clean up its animations
                        if (_this.pandaModel) {
                            _this.scene.remove(_this.pandaModel);
                            // Consider disposing geometry/materials of this.pandaModel here for memory management in a larger app
                            console.log("Removed previous model from scene.");
                            if (_this.animationMixer) {
                                _this.animationMixer.stopAllAction();
                                _this.currentAction = null;
                            }
                            // Clear out old animation buttons
                            while(_this.animationButtonsContainer.firstChild){
                                _this.animationButtonsContainer.removeChild(_this.animationButtonsContainer.firstChild);
                            }
                            _this.animationActions = {};
                            _this.animationClips = [];
                        }
                        // 2. Set the new model as the current model
                        _this.pandaModel = gltf.scene;
                        // 3. Scale and position the new model
                        var scale = 80;
                        _this.pandaModel.scale.set(scale, scale, scale);
                        var sceneHeight = _this.renderDiv.clientHeight;
                        _this.pandaModel.position.set(0, sceneHeight * -0.45, -1000);
                        // 4. Add the new model to the scene
                        _this.scene.add(_this.pandaModel);
                                            _this._applyHologram(_this.pandaModel);
                        console.log('Added new model "'.concat(fileName, '" to scene.'));
                        // 5. Setup animations for the new model
                        _this.animationMixer = new THREE.AnimationMixer(_this.pandaModel);
                        _this.animationClips = gltf.animations;
                        _this.animationActions = {}; // Ensure it's clean for new actions
                        if (_this.animationClips && _this.animationClips.length) {
                            _this.animationClips.forEach(function(clip, index) {
                                var action = _this.animationMixer.clipAction(clip);
                                var actionName = clip.name || "Animation ".concat(index + 1);
                                _this.animationActions[actionName] = action;
                                var button = document.createElement('button');
                                button.innerText = actionName;
                                button.style.padding = '5px 10px';
                                button.style.fontSize = '13px';
                                button.style.backgroundColor = 'rgba(10, 18, 36, 0.62)';
                                button.style.color = '#d8e6f5';
                                button.style.border = '1px solid rgba(0, 229, 255, 0.45)';
                                button.style.borderRadius = '4px';
                                button.style.cursor = 'pointer';
                                button.style.transition = 'background-color 0.2s ease, box-shadow 0.2s ease';
                                button.style.boxShadow = '0 0 12px rgba(0, 229, 255, 0.22)';
                                button.addEventListener('click', function() {
                                    return _this._playAnimation(actionName);
                                });
                                _this.animationButtonsContainer.appendChild(button);
                            });
                            var defaultActionName = Object.keys(_this.animationActions)[0];
                            var idleActionKey = Object.keys(_this.animationActions).find(function(name) {
                                return name.toLowerCase().includes('idle');
                            });
                            if (idleActionKey) {
                                defaultActionName = idleActionKey;
                            }
                            if (defaultActionName && _this.animationActions[defaultActionName]) {
                                _this.currentAction = _this.animationActions[defaultActionName];
                                _this.currentAction.reset().play();
                                _this._updateButtonStyles(defaultActionName);
                            } else {
                                _this.currentAction = null;
                            }
                        } else {
                            console.log('New model "'.concat(fileName, '" has no embedded animations.'));
                            _this.currentAction = null;
                        }
                        // 6. Reset interaction states
                        _this.grabbingHandIndex = -1;
                        _this.pickedUpModel = null;
                        _this.rotateLastHandX = null;
                        _this.scaleInitialPinchDistance = null;
                        _this.scaleInitialModelScale = null;
                        _this.animationControlHandIndex = -1;
                        _this.animationControlInitialPinchY = null;
                        // This will ensure animation buttons are shown/hidden correctly based on current mode
                        _this._updateInteractionModeButtonStyles();
                        _this.loadedDroppedModelData = null; // Clear the temp storage
                    }, function(error) {
                        console.error("Error parsing GLTF model ".concat(fileName, ":"), error);
                        _this._showError('Failed to parse "'.concat(fileName, '". Model might be corrupt or unsupported. Check console.'));
                    });
                } catch (e) {
                    // This catch is for synchronous errors during loader.parse() setup, though most errors are async.
                    console.error("Critical error during GLTF parsing setup for ".concat(fileName, ":"), e);
                    this._showError('Error setting up parser for "'.concat(fileName, '".'));
                }
            }
        }
    ]);
    return Game;
}();