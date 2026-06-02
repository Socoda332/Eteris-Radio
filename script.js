document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const radioPlayer = document.getElementById('radio-player');

    let isPlaying = false;

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            radioPlayer.pause();
            playPauseBtn.textContent = 'Escucha Ahora';
        } else {
            radioPlayer.play();
            playPauseBtn.textContent = 'Pausar';
        }
        isPlaying = !isPlaying;
    });

    radioPlayer.addEventListener('play', () => {
        isPlaying = true;
        playPauseBtn.textContent = 'Pausar';
    });

    radioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        playPauseBtn.textContent = 'Escucha Ahora';
    });

    radioPlayer.addEventListener('error', () => {
        console.error('Error al cargar el stream de radio.');
        playPauseBtn.textContent = 'Error';
        playPauseBtn.disabled = true;
    });
});