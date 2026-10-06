"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Sparkles, RotateCcw, Eye, ChevronDown } from "lucide-react";
import {
  VERTEX_SHADER_SRC,
  FRAGMENT_SHADER_SRC,
  createShader,
} from "./ui/curtain-shaders";

interface CurtainRevealProps {
  children: React.ReactNode;
}

export const CurtainReveal: React.FC<CurtainRevealProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [hasStarted, setHasStarted] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // Time in seconds when the curtains reach fully parted tied-back state
  const COMPLETION_TIME = 4.8;

  // Track scroll position through the intro track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /**
   * Complete the reveal: smoothly hide the curtain overlay and unlock full portfolio interaction.
   */
  const handleRevealComplete = useCallback(() => {
    setIsRevealed(true);
    setIsPlaying(false);
    setProgress(1);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  /**
   * Replay the curtain reveal animation.
   */
  const handleReplay = useCallback(() => {
    setIsRevealed(false);
    setProgress(0);
    setHasStarted(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = 1.15;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, []);

  /**
   * WebGL Render Loop with video texture update and real-time white background removal.
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: false,
        antialias: true,
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    if (!gl) {
      setWebglSupported(false);
      return;
    }

    // Compile shaders & create program
    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vertShader || !fragShader) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Quad geometry (full screen triangle strip)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const scaleUniform = gl.getUniformLocation(program, "u_scale");
    const textureUniform = gl.getUniformLocation(program, "u_texture");
    gl.uniform1i(textureUniform, 0);

    // Setup video texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Transparent alpha blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    let animationFrameId: number;
    let isSubscribed = true;

    const render = () => {
      if (!isSubscribed || !gl || !canvas || !video) return;

      // Responsive canvas size matching display pixels (capped DPR for silky 60fps)
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(rect.width * dpr);
      const displayHeight = Math.floor(rect.height * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }

      // Compute aspect ratio cover scale (video is 16:9 = 1.777)
      const canvasAspect = displayWidth / Math.max(displayHeight, 1);
      const videoAspect = 16 / 9;
      let scaleX = 1.0;
      let scaleY = 1.0;

      if (canvasAspect > videoAspect) {
        scaleX = 1.0;
        scaleY = videoAspect / canvasAspect;
      } else {
        scaleX = canvasAspect / videoAspect;
        scaleY = 1.0;
      }

      gl.uniform2f(scaleUniform, scaleX, scaleY);

      // Upload video frame only when timestamp changes (saves 60% GPU texture bus transfers on 24fps video)
      if (video.readyState >= 2 && document.visibilityState === "visible") {
        const currentTime = video.currentTime;
        if (currentTime !== lastUploadedTime) {
          lastUploadedTime = currentTime;
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        }

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        const currentProgress = Math.min(currentTime / COMPLETION_TIME, 1);
        setProgress(currentProgress);

        // When curtains reach fully parted position (~4.8s or ended)
        if (currentTime >= COMPLETION_TIME || video.ended) {
          handleRevealComplete();
          return;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    let lastUploadedTime = -1;
    animationFrameId = requestAnimationFrame(render);

    return () => {
      isSubscribed = false;
      cancelAnimationFrame(animationFrameId);
      if (gl) {
        gl.deleteTexture(texture);
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
      }
    };
  }, [handleRevealComplete]);

  /**
   * Link scroll progress to video time (scrub ahead when user scrolls)
   */
  useEffect(() => {
    if (isRevealed) return;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const video = videoRef.current;
      if (video && latest > 0.05) {
        const targetTime = latest * COMPLETION_TIME;
        if (targetTime > video.currentTime) {
          video.currentTime = targetTime;
        }
        if (latest >= 0.82) {
          handleRevealComplete();
        }
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, isRevealed, handleRevealComplete]);

  /**
   * Intersection observer: Auto-play the curtain reveal when Section 3 enters the viewport.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted && !isRevealed) {
            setHasStarted(true);
            const video = videoRef.current;
            if (video) {
              video.currentTime = 0;
              video.playbackRate = 1.15; // Refined luxury pace
              video.play().then(() => {
                setIsPlaying(true);
              }).catch(() => {
                // Browser autoplay fallback
              });
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hasStarted, isRevealed]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${!isRevealed ? "min-h-[140vh]" : "min-h-0"}`}
    >
      {/* Hidden HTML5 Video element used as texture source */}
      <video
        ref={videoRef}
        playsInline
        muted
        preload="auto"
        onEnded={handleRevealComplete}
        className="hidden"
      >
        <source src="/design/new/gemini_generated_video_e3bc0188-opt.mp4" type="video/mp4" />
        <source src="/design/new/gemini_generated_video_e3bc0188.mp4" type="video/mp4" />
      </video>

      {/* STICKY CURTAIN ANIMATION OVERLAY */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="sticky top-0 h-[100svh] w-full z-40 overflow-hidden select-none pointer-events-auto flex flex-col justify-between"
          >
            {/* Real-time WebGL Canvas: removes white background and renders golden/burgundy curtains */}
            {webglSupported ? (
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              />
            ) : (
              /* High-compatibility fallback using CSS mix-blend multiply */
              <video
                autoPlay
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
              >
                <source src="/design/new/gemini_generated_video_e3bc0188-opt.mp4" type="video/mp4" />
                <source src="/design/new/gemini_generated_video_e3bc0188.mp4" type="video/mp4" />
              </video>
            )}

            {/* TOP ORNAMENTAL ROYAL ARCH VALANCE */}
            <div className="relative z-50 w-full pointer-events-none flex flex-col items-center">
              <div className="w-full h-8 sm:h-10 bg-gradient-to-b from-[#24060E] to-[#3D0C18] border-b-2 border-[#D4AF37]/70 shadow-[0_4px_25px_rgba(212,175,55,0.3)] flex items-center justify-center px-4">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-serif text-[#D4AF37] tracking-[0.3em] uppercase">
                  <span>✦</span>
                  <span>Jaipur Royal Pavilion • Heritage Atelier</span>
                  <span>✦</span>
                </div>
              </div>
              <div
                className="w-full h-3 sm:h-4 opacity-80"
                style={{
                  backgroundImage: `radial-gradient(circle at 10px 0, #D4AF37 4px, transparent 5px)`,
                  backgroundSize: "20px 15px",
                }}
              />
            </div>

            {/* CENTER PROMPT BADGE (Fades out gently as curtains part) */}
            <motion.div
              style={{
                opacity: Math.max(0, 1 - progress * 2.2),
                scale: Math.max(0.85, 1 - progress * 0.15),
              }}
              className="relative z-50 flex flex-col items-center justify-center px-4 my-auto cursor-pointer"
              onClick={handleRevealComplete}
            >
              <div className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-[#1A060E]/90 backdrop-blur-md border-2 border-[#D4AF37]/70 shadow-[0_20px_60px_rgba(0,0,0,0.85)] max-w-sm transition-all duration-300 hover:scale-105 hover:border-[#D4AF37]">
                <div className="w-12 h-12 rounded-full bg-[#4A1521] text-[#D4AF37] flex items-center justify-center mb-4 shadow-inner border border-[#D4AF37]/50 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 animate-pulse text-[#D4AF37]" />
                </div>

                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-1">
                  ✦ Atelier Exhibition ✦
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF7F2] tracking-wide mb-2">
                  Signature Portfolio
                </h3>

                <p className="text-xs sm:text-sm text-[#FAF7F2]/70 font-light max-w-xs mb-4">
                  Bespoke heirloom henna creations for bridal grandeur and sacred ceremonies.
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4A1521]/80 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest shadow-sm">
                  <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{isPlaying ? "Unveiling Portfolio..." : "Scroll or Tap to Unveil"}</span>
                </div>

                <ChevronDown className="w-5 h-5 text-[#D4AF37] mt-3 animate-bounce opacity-90" />
              </div>
            </motion.div>

            {/* BOTTOM SKIP / FAST-FORWARD BUTTON */}
            <div className="relative z-50 pb-6 px-4 flex justify-center items-center">
              <button
                onClick={handleRevealComplete}
                className="px-4 py-1.5 rounded-full bg-[#1A060E]/80 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] tracking-widest uppercase font-medium hover:bg-[#4A1521] hover:border-[#D4AF37] transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Tap to Enter Gallery</span>
                <span>→</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING REPLAY BADGE (Visible once revealed so users can watch again anytime) */}
      {isRevealed && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30">
          <button
            onClick={handleReplay}
            aria-label="Replay Curtain Reveal"
            title="Replay Curtain Reveal"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#8B3A2B]/20 text-[#4A1521] text-xs font-medium tracking-wide shadow-sm hover:bg-[#FAF7F2] hover:border-[#D4AF37] hover:text-[#8B3A2B] transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Replay Unveiling</span>
          </button>
        </div>
      )}

      {/* UNDERLYING PORTFOLIO SECTION (Revealed seamlessly behind the parting curtains) */}
      <div
        className={`relative z-10 w-full ${
          !isRevealed ? "sticky top-0 -mt-[100svh]" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default CurtainReveal;
