const carousel = document.querySelector('.carousel'),
img = carousel.querySelectorAll('img')[0],
icons = document.querySelectorAll('i')

let positionDiff, 
initialPositon,
isDragStart = false, 
valueScrollLeft


icons.forEach((icon) => {
    icon.addEventListener('click' , () => {
        carousel.scrollLeft += icon.id == "Left" ? -400 : 400
    })
})

function verifyIcons(){
    icons[0].style.opacity = carousel.scrollLeft == 0 ? '0' : '100'
    icons[1].style.display = carousel.scrollLeft == 2400 ? '0' : '100'
}


function reajustCarousel(){   
    let valueScroll = carousel.scrollLeft
    let reajustScroll

    if( (valueScroll % 400) > 200){
        reajustScroll = (parseInt( valueScroll / 400) + 1) * 400
        carousel.scrollLeft = reajustScroll
    } else if( (valueScroll % 400) <= 200){
        reajustScroll = parseInt( valueScroll / 400) * 400
        carousel.scrollLeft = reajustScroll
    }
}

function dragStart(e){
    e.preventDefault()
    isDragStart = true
    initialPositon = e.pageX
    valueScrollLeft = carousel.scrollLeft
}

function dragging(e){
    e.preventDefault()
    if(!isDragStart) return
    carousel.classList.add("dragging")
    positionDiff = e.pageX - initialPositon
    carousel.scrollLeft = valueScrollLeft - positionDiff
}

function dragStop(e){
    e.preventDefault()
    carousel.classList.remove("dragging")
    isDragStart = false
    reajustCarousel()
    verifyIcons()
}



carousel.addEventListener("mousemove", dragging)
carousel.addEventListener("touchmove", dragging)

carousel.addEventListener("mousedown", dragStart)
carousel.addEventListener("touchstart", dragStart)

carousel.addEventListener("mouseup", dragStop)
carousel.addEventListener("mouseleave", dragStop)
carousel.addEventListener("touchend", dragStop)