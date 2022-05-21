const app = () =>{
      const song = document.querySelector('.song');
      const play = document.querySelector('.play');
      const outline = document.querySelector('.moving-outline circle');
      const video = document.querySelector('.vid-container video');

      //sounds
      const sounds = document.querySelectorAll('.sound-picker button');
      //time display
      const timeDisplay = document.querySelector('.time-display');
      const timeSelect = document.querySelectorAll('.time-select button');

      //length of circle
      const outlineLength = outline.getTotalLength();
      
      //duration
      let fakeDuration = 600;
      outline.style.strokeDashoffset = outlineLength;
      outline.style.strokeDasharray =outlineLength;
     
      //change song
      sounds.forEach(sound =>{
            sound.addEventListener('click',function(){
                  song.src=this.getAttribute('data-sound');
                  video.src=this.getAttribute('data-video');
                  checkPlaying(song);
            })
      })
      //play sound
      play.addEventListener("click",()=>{
            checkPlaying(song);
      });

      //select sound
      timeSelect.forEach(option =>{
            option.addEventListener('click',function(){
                  fakeDuration = this.getAttribute("data-time");
                  timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60) }`;    
            })
      })


      //function for pause and play song
      const checkPlaying = song =>{
            if(song.paused){
                  song.play();
                  video.play();
                  play.src = './svg/pause.svg';
            }else{
                  song.pause();
                  video.pause();
                  play.src = './svg/play.svg';
            }
      }

      //player animation
      song.ontimeupdate = () =>{
            let currentTime = song.currentTime;
            let elapsedTime = fakeDuration - currentTime;
            let seconds = Math.floor(elapsedTime % 60);
            let minutes = Math.floor(elapsedTime /60);
            
            //circle animation
            let progress = outlineLength - ((currentTime/fakeDuration)*outlineLength);

            outline.style.strokeDashoffset = progress;

            //text animation
            timeDisplay.textContent = `${minutes}:${seconds}`;
            if(currentTime >= fakeDuration){
                  song.pause();
                  song.currentTime =0;
                  play.src = './svg/play.svg'
            }

      }     
}

app();