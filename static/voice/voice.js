const contentsUpload = document.querySelector('.contents-upload');
const record = document.getElementById("record")
const stop = document.getElementById("stop")
const soundClips = document.getElementById("sound-clips")
const chkHearMic = document.getElementById("chk-hear-mic")

const audioCtx = new (window.AudioContext || window.webkitAudioContext)() // 오디오 컨텍스트 정의
console.log('audioContext start')
const analyser = audioCtx.createAnalyser()

// 음성 녹음
function makeSound(stream) {
    const source = audioCtx.createMediaStreamSource(stream)

    source.connect(analyser)
    analyser.connect(audioCtx.destination)

}

function touchStarted() {
    getAudioContext().resume();
}


console.log('navigator: '+ navigator)
console.log('navigator mediaDevices: '+ navigator.mediaDevices)
if (navigator.mediaDevices) {
    console.log('getUserMedia supported.')

    const constraints = {
        audio: true
    }
    let chunks = []

   

    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {

            var options = {
                audioBitsPerSecond : 128000,
                mimeType : 'audio/wav'
              }

            const mediaRecorder = new MediaRecorder(stream)

            chkHearMic.onchange = e => {
                console.log('changedHEAR')
                if (e.target.checked == true) {
                    audioCtx.resume()
                    makeSound(stream)
                } else {
                    audioCtx.suspend()
                }
            }

            record.onclick = () => {
                console.log('clicked')
                mediaRecorder.start()
                console.log(mediaRecorder.state)
                console.log("recorder started")
                record.style.background = "red"
                record.style.color = "black"
                // contentsUpload.querySelector('.upload-file').style.display="none";
            }

            stop.onclick = () => {
                console.log('stopped')
                mediaRecorder.stop()
                console.log(mediaRecorder.state)
                console.log("recorder stopped")
                record.style.background = ""
                record.style.color = ""
            }

            mediaRecorder.onstop = e => {
                console.log("data available after MediaRecorder.stop() called.")

                // const clipName = prompt("오디오 파일 제목을 입력하세요.", new Date())
                const clipName = new Date()

                const clipContainer = document.createElement('article')
                const clipLabel = document.createElement('p')
                const audio = document.createElement('audio')
                // const buttonDiv = document.createElement('div')
                const deleteButton = document.createElement('i') //delete
                const saveButtonIcon = document.createElement('i') //save
                const saveButton = document.createElement('a')

                clipContainer.classList.add('clip')
                deleteButton.classList.add('fas')
                deleteButton.classList.add('fa-trash-alt')
                saveButtonIcon.classList.add('fas')
                saveButtonIcon.classList.add('fa-download')
                audio.setAttribute('controls', '')
                // buttonDiv.classList.add('btn-DelSave')
                // deleteButton.innerHTML = "삭제"
                // saveButton.innerHTML = "저장"
                clipLabel.innerHTML = clipName

                clipContainer.appendChild(audio)
                // clipContainer.appendChild(clipLabel)
                clipContainer.appendChild(deleteButton)
                saveButton.appendChild(saveButtonIcon)
                clipContainer.appendChild(saveButton)
                // clipContainer.appendChild(buttonDiv)
                soundClips.appendChild(clipContainer)

                audio.controls = true
                const blob = new Blob(chunks, {
                    'type' : 'audio/ogg; codecs=opus'
                })
                chunks = []
                const audioURL = URL.createObjectURL(blob)
                audio.src = audioURL
                console.log("recorder stopped")

                deleteButton.onclick = e => {
                    evtTgt = e.target
                    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode)
                }
                saveButton.setAttribute('href', audioURL)
                saveButton.setAttribute('download', "voice")
            }

            mediaRecorder.ondataavailable = e => {
                chunks.push(e.data)
            }
        })
        .catch(err => {
            console.log('The following error occurred: ' + err)
        })
}

$(document).ready(function () {
    temp = location.href.split("=");
    data = temp[1].split(":");

    var big = data[0];
    var small = data[1];

    const contents = document.querySelector('.show-voice');
    const topic = document.createElement('p');
    topic.innerHTML = decodeURI(big) + " > " + decodeURI(small);
    topic.classList.add('topicSentence');

    contents.prepend(topic);

});