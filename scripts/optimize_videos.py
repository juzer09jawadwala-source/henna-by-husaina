import subprocess
import os
import imageio_ffmpeg

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
print(f"Using FFmpeg: {ffmpeg_exe}")

videos = [
    {
        "input": "public/mehndi_video.mp4",
        "output": "public/mehndi_video-opt.mp4",
        "audio": True
    },
    {
        "input": "public/design/new/gemini_generated_video_e3bc0188.mp4",
        "output": "public/design/new/gemini_generated_video_e3bc0188-opt.mp4",
        "audio": False
    }
]

for v in videos:
    inp = v["input"]
    out = v["output"]
    if not os.path.exists(inp):
        continue
    
    orig_size = os.path.getsize(inp)
    cmd = [
        ffmpeg_exe,
        "-y",
        "-i", inp,
        "-c:v", "libx264",
        "-crf", "23",
        "-preset", "slow",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
    ]
    if v["audio"]:
        cmd.extend(["-c:a", "aac", "-b:a", "128k"])
    else:
        cmd.extend(["-an"])
    cmd.append(out)

    print(f"Optimizing {inp} -> {out}...")
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode == 0:
        new_size = os.path.getsize(out)
        savings = (1 - new_size / orig_size) * 100
        print(f"[OK] {inp}: {orig_size / (1024*1024):.2f}MB -> {new_size / (1024*1024):.2f}MB (-{savings:.1f}%)")
    else:
        print(f"Error optimizing {inp}: {res.stderr.decode('utf-8', errors='ignore')}")

# Also copy to root public/ if needed
if os.path.exists("public/design/new/gemini_generated_video_e3bc0188-opt.mp4"):
    import shutil
    shutil.copyfile(
        "public/design/new/gemini_generated_video_e3bc0188-opt.mp4",
        "public/gemini_generated_video_e3bc0188-opt.mp4"
    )
    print("Copied curtain video opt to public/gemini_generated_video_e3bc0188-opt.mp4")
