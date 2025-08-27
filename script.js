console.log("i m bilal");
    let currentSong = new Audio();

let a = fetch("http://127.0.0.1:3000/songs/")
let songs;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(){
        let a = await fetch("http://127.0.0.1:3000/songs/");
        let reponse = await a.text();


        // console.log(reponse);
        let div = document.createElement("div")
        div.innerHTML = reponse
        // console.log(div);
        let as = div.getElementsByTagName("a")
        let songs = []
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if(element.href.endsWith(".mp3")){
                songs.push(element.href.split("/songs/")[1])
            }
        }
        return songs



}
const playMusic = (track, pause = false)=>{
    // let audio = new Audio("/songs/" + track)
    currentSong.src = "/songs/" + track
    if(!pause){
        currentSong.play() 
        play.src = "images/play.png"
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}


async function main(){

    songs = await getsongs()
    // console.log(songs)
    playMusic(songs[0], true)  

    let songsUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songsUL.innerHTML = songsUL.innerHTML + `<li>
                            <div class="musiclogo">
                            <img class="invert" src="images/music.png" alt="">
                            </div>
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Harry</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="images/paused1.png" alt="">
                            </div>
                        </li>`
                        };
                        
                        
                        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{

                            e.addEventListener("click", element=>{
                                playMusic(e.querySelector(".info").firstElementChild.innerHTML)
                                console.log(e.querySelector(".info").firstElementChild.innerHTML)
                                // play.src = "images/play.png"
                            })
                        })   
                        
                        

              play.addEventListener("click", ()=>{
                    if(currentSong.paused){
                        currentSong.play()
                        play.src = "images/play.png"

                    }
                    else{
                        currentSong.pause()
                        play.src = "images/paused.png"

                    }
                    
              }) 
              
              //lisen for timeupdate event

              currentSong.addEventListener("timeupdate", ()=>{
                // console.log(currentSong.currentTime, currentSong.duration)
                document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`

                document.querySelector(".circle").style.left = (currentSong.currentTime/ currentSong.duration)*100 + "%"
              })

              // Add an event to seek bar
              document.querySelector(".seekbar").addEventListener("click", e=>{
                let persent =  (e.offsetX/e.target.getBoundingClientRect().width )* 100
                    document.querySelector(".circle").style.left = persent + "%"
                    currentSong.currentTime = (currentSong.duration)* persent/100
              })

              // add event to previous
              previous.addEventListener("click", ()=>{
                let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
                if((index-1)>=0){
                    playMusic(songs[index-1])
                }
              })

              // add event to next
              next.addEventListener("click", ()=>{
                console.log("next")
                let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
                if((index+1)<songs.length){
                    playMusic(songs[index+1])
                }

              })


              
              // add an event to hamburger
            //   document.querySelector(".hamburger").addEventListener("click", ()=>{

                
            //     document.querySelector(".left").style.left = "0";
            //     document.querySelector(".hamburger").src = "images/close.png"
            //     document.querySelector(".hamburger").className = "close"
            //     console.log("jiiiiii")
            //   })

              // ad event to close



         var pause = document.createElement("img");

         pause.className = "close";
         pause.src = "images/close.png"
         pause.style.width = "25px"
         pause.style.transition = "all 1s"
        pause.addEventListener("click", ()=>{
             document.querySelector(".left").style.left = "-100%";
             pause.replaceWith(open)

        })
             console.log(pause)

        let open = document.querySelector(".hamburger")
        open.addEventListener("click", ()=>{
             document.querySelector(".left").style.left = "0";
             open.replaceWith(pause)
             console.log(pause)
        })
        
                        
                        
}
                        
        


main()





