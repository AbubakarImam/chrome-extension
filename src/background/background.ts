let mediaRecorder: MediaRecorder | null;
// let recordedChunks: Blob[] = [];
let mediaStream: MediaStream;


chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'startRecording') {
        startRecording();
    } else if (message.action === 'stopRecording') {
        stopRecording();
    } else if (message.action === 'pauseRecording') {
        pauseRecording();
    } else if (message.action === 'accessCamera') {
        accessCamera();
    } else if (message.action === 'toggleAudio') {
        toggleAudio();
    } else if (message.action === 'deleteRecording') {
        deleteRecording();
    }
});

function startRecording() {
    // const desktopStreamOptions = ['screen'];

    // chrome.desktopCapture.chooseDesktopMedia(desktopStreamOptions, (streamId) => {
    //     if (chrome.runtime.lastError) {
    //         console.error(chrome.runtime.lastError.message);
    //         return;
    //     }

    // const constraints: MediaStreamConstraints = { audio: false, video:{ chromeMediaSource: 'desktop', chromeMediaSourceId: streamId } };

    navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: {
            width: 999999999999,
            height: 99999999999
        },
    }).then((stream) => {

        function approved(stream: MediaStream) {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.start();

            mediaRecorder.onstop = () => {
                stream.getTracks().forEach(function (track: MediaStreamTrack) {
                    if (track.readyState === "live") {
                        track.stop();
                    }
                });
            }
            mediaRecorder.ondataavailable = function (event) {
                const recordedBlob = event.data;
                const url = URL.createObjectURL(recordedBlob);

                const a = document.createElement('a');

                a.style.display = "none";
                a.href = url;
                a.download = "video.webm";

                document.body.appendChild(a);
                a.click();

                document.body.removeChild(a);

                URL.revokeObjectURL(url);
            }
        }
        approved(stream);
        // mediaRecorder = new MediaRecorder(stream);

        // mediaRecorder.ondataavailable = (event) => {
        //     if (event.data && event.data.size > 0) {
        //         recordedChunks.push(event.data);
        //     }
        // };

        // mediaRecorder.onstop = () => {
        //     const blob = new Blob(recordedChunks, { type: 'video/webm' });

        //     fetch('https://your-api-endpoint.com/upload', {
        //         method: 'POST',
        //         body: blob,
        //     })
        //         .then((response) => {
        //             if (!response.ok) {
        //                 throw new Error(`Network response was not ok, status: ${response.status}`);
        //             }
        //             return response.json();
        //         })
        //         .then((data) => {
        //             console.log('Video uploaded successfully:', data);
        //         })
        //         .catch((error) => {
        //             console.error('Error uploading video:', error);
        //         });

        //     recordedChunks = [];
        // };

        // mediaRecorder.start();
    }).catch((err) => {
        console.error('Error accessing screen:', err);
    });
}


function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
}


function pauseRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
    }
}

function accessCamera() {
    const cameraOptions = { video: true, audio: false };

    navigator.mediaDevices.getUserMedia(cameraOptions)
        .then((stream) => {
            mediaStream = stream;
            // Handle access to camera stream (e.g., display in a video element)
        })
        .catch((error) => {
            console.error('Error accessing camera:', error);
        });
}

function toggleAudio() {
    if (mediaStream) {
        const audioTracks = mediaStream.getAudioTracks();
        audioTracks.forEach(track => track.enabled = !track.enabled);
    }
}

function deleteRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }

    // recordedChunks = [];

    // Optionally, delete any partially uploaded video chunks on the server
    // You'll need to implement this part based on your server's API

    // Inform the user that the recording has been deleted (you can use a UI notification or any other method you prefer)
    console.log('Recording deleted successfully');
}

