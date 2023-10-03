const setbodysectionheight=()=>{
    const setheight=()=>{
        const headerheight =document.getElementById("headersection").offsetHeight;
        console.log(headerheight)
    
     const windowheight=window.screen.height;
     console.log(windowheight)
     const bodysection=  document.getElementById('bodysection')
        // bodysection.style.minHeight =windowheight-headerheight+"px"
        console.log(bodysection)
    

    }
    return {setheight}
   

}
export default setbodysectionheight
