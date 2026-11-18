# V-1 Flying Bomb — Proyek Remotion

1920x1080, 30 FPS, MP4 H.264. Versi ini sudah dilengkapi voice-over Bahasa Indonesia per adegan.
Komposisi: `V1FlyingBomb`.

## Voice-over
File audio berada di `public/vo/` dan otomatis diputar pada masing-masing adegan melalui `src/Video.tsx`.

## Render di GitHub
1. Push semua isi folder ini ke repo GitHub.
2. Tab Actions → "Render video" → Run workflow.
3. Setelah selesai, unduh artifact `v1-flying-bomb` (isinya mp4).

## Ubah durasi
Edit angka `dur` (frame, 30 = 1 detik) di `src/Video.tsx`.

## Pratinjau satu frame
`npx remotion still V1FlyingBomb out/frame.png --frame=300`
