document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const radioPlayer = document.getElementById('radio-player');
    const playerStatus = document.getElementById('player-status');

    const streamUrls = [
        'https://s33.myradiostream.com:18972/;',
        'https://s33.myradiostream.com:18972/stream',
        'https://s33.myradiostream.com:18972/;type=mp3',
        'https://s33.myradiostream.com:18972/;stream.mp3'
    ];
    let currentStreamIndex = 0;
    let isPlaying = false;

    const setStatus = (text, isError = false) => {
        playerStatus.textContent = text;
        playerStatus.classList.toggle('error', isError);
    };

    const loadStream = () => {
        radioPlayer.src = streamUrls[currentStreamIndex];
        radioPlayer.load();
        setStatus(`Conectando a: ${streamUrls[currentStreamIndex]}`);
    };

    const tryNextStream = () => {
        currentStreamIndex += 1;
        if (currentStreamIndex < streamUrls.length) {
            loadStream();
        } else {
            setStatus('No se pudo conectar al stream. Verifica URL, SSL o CORS.', true);
            playPauseBtn.textContent = 'Error';
            playPauseBtn.disabled = false;
        }
    };

    playPauseBtn.addEventListener('click', async () => {
        if (isPlaying) {
            radioPlayer.pause();
            playPauseBtn.textContent = 'Escucha Ahora';
            setStatus('Reproducción detenida');
        } else {
            if (!radioPlayer.src) {
                loadStream();
            }
            try {
                await radioPlayer.play();
            } catch (error) {
                setStatus(`No se pudo reproducir: ${error.message}`, true);
                console.error(error);
            }
        }
    });

    radioPlayer.addEventListener('play', () => {
        isPlaying = true;
        playPauseBtn.textContent = 'Pausar';
        setStatus('Reproduciendo...');
    });

    radioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        playPauseBtn.textContent = 'Escucha Ahora';
        setStatus('Reproducción en pausa');
    });

    radioPlayer.addEventListener('error', () => {
        console.error('Error al cargar el stream de radio.', radioPlayer.error);
        if (radioPlayer.error && radioPlayer.error.code !== 0) {
            tryNextStream();
        } else {
            setStatus('Error del reproductor. Revisa la consola.', true);
        }
    });
});