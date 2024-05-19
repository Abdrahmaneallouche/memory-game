let splash= document.querySelector('.splash button')

splash.onclick=function(){
  let name = prompt('ENTER YOUR NAME !')
  if(name===''||name===null){
    document.querySelector('.name').innerHTML ='did you forget your name ?'
  }else{
     document.querySelector('.name').innerHTML =name
  }

 document.querySelector('.splash').remove()
}


//variables
let duration = 1000;
let memo=document.querySelector('.memo')
let blocks=Array.from(memo.children)
let range=[...Array.from(blocks.keys())]
let tries=document.querySelectorAll('.tries')
let wrong=0
let fail=document.querySelector('#fail')
let success=document.querySelector('#success')
let win=document.querySelector('#win')
let total=blocks.length/2
let correct=0
let modelFire=document.querySelector('.fire')
let playAgain=document.querySelector('.playAgain')
//variables


shuffle(range)
blocks.forEach((block,index)=>{
 block.style.order=range[index]
 block.addEventListener('click',()=>{
  flip(block)
 })
})


function shuffle(array){
let current=array.length
let temp,random;
while(current>0){
  random=Math.floor(Math.random()*current)
  current--;
  temp=array[current]
  array[current]=array[random]
  array[random]=temp
  
}
return array
}
function flip(selectedBlock){
  selectedBlock.classList.add('isFlipped')
  let flippedCard=blocks.filter(block=>{return block.classList.contains('isFlipped')})
  let matchedCard=blocks.filter(block=>{return block.classList.contains('isMatched')})
  
  
  if(flippedCard.length ===2){
    noClick()
    matched(flippedCard[0],flippedCard[1])
    if(matchedCard.length===20){
      win.play()
       }
  }


}

function noClick(){
  memo.classList.add('noClick')
  setTimeout(()=>{
    memo.classList.remove('noClick')
  },duration)
}
function matched(first,second){
  if(first.dataset.name==second.dataset.name){
    correct++
    if(correct===total){
      setTimeout(()=>{
        win.play()
         },500)
      modelFire.classList.add('open')
      tries[1].innerHTML=wrong
    }
    first.classList.remove('isFlipped')
    second.classList.remove('isFlipped')
    first.classList.add('isMatched')
    second.classList.add('isMatched')
    success.play()
  } else{
    fail.play()
    wrong++
    tries[0].innerHTML=wrong
    setTimeout(()=>{
    first.classList.remove('isFlipped')
    second.classList.remove('isFlipped')
    },500)
   
  }

}
function restartAgain(){
  correct=0;
  wrong=0

  shuffle(range)
  blocks.forEach((block,index)=>{
    block.style.order=range[index]
    block.classList.remove('isMatched');
    
    
   })
   
   win.pause()
   win.currentTime = 0
   tries[1].innerHTML=0
   tries[0].innerHTML=0

   modelFire.classList.remove('open')

}
playAgain.onclick=function(){
  restartAgain()
}





const fire=document.querySelector('.firework')
const fireworks = new Fireworks(fire, {
  autoresize: true,
  opacity: 0.5,
  acceleration: 1.05,
  friction: 0.97,
  gravity: 1.5,
  particles: 50,
  traceLength: 3,
  traceSpeed: 10,
  explosion: 5,
  intensity: 30,
  flickering: 50,
  lineStyle: 'round',
  hue: {
    min: 0,
    max: 360
  },
  delay: {
    min: 30,
    max: 60
  },
  rocketsPoint: {
    min: 50,
    max: 50
  },
  lineWidth: {
    explosion: {
      min: 1,
      max: 3
    },
    trace: {
      min: 1,
      max: 2
    }
  },
  brightness: {
    min: 50,
    max: 80
  },
  decay: {
    min: 0.015,
    max: 0.03
  },
  mouse: {
    click: false,
    move: false,
    max: 1
  }
})
fireworks.start()