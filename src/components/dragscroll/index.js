import React, { useState, useEffect } from 'react';
import './index.css';


let timer = null;
function interval(ele,target) {
  const offset = ele.scrollLeft;
  const stap = Math.floor(target / 20);
  timer = setInterval(() => {
    if(Math.abs(ele.scrollLeft - offset) >= Math.abs(target)) {
      clearInterval(timer)
    }
    ele.scrollLeft += stap
  }, 15);
}


function DragContainer () {
  const [isDown,setIsDown] = useState(false);

  const handleMouseDown = (e) => {
    clearInterval(timer)
    let down = true;
    const dragsDom = document.querySelector(".dragscroll-wrapper");
    const scrollLeft = dragsDom.scrollLeft;
    const tmp = dragsDom.getBoundingClientRect();
    let startX = e.clientX - tmp.left;
    setIsDown(down);

    dragsDom.onmousemove = (evt) => {
      if(down) {
          let endX = evt.clientX - tmp.left;
          let dragsWidth = endX - startX;
          dragsDom.scrollLeft = scrollLeft - dragsWidth;
      }
    }

    document.onmouseup = () => {
      down = false;
      setIsDown(down);
    }
  }
  return (
    <div onMouseDown={(e)=>{handleMouseDown(e)}} className="dragscroll-wrapper showcase-scroll no-select" style={{cursor:isDown?"grabbing":"grab"}}>

          <div className="showcase">
           
          </div>

          <div className="showcase">
            
          </div>

          <div className="showcase">
            
          </div>

          <div className="showcase">
            
          </div>

          <div className="showcase">
            
          </div>

          <div className="showcase">
            
          </div>


        </div>
  )
}



function NoDragContainer () {
  return (
    <div className="dragscroll-wrapper showcase-scroll no-select">
      <div className="showcase">
        
      </div>

      <div className="showcase">
        
      </div>

      <div className="showcase">
        
      </div>

      <div className="showcase">
        
      </div>

      <div className="showcase">
        
      </div>

      <div className="showcase">
        
      </div>
    </div>
  )
}


const Dragscroll = (props) => {

  const [isDrag,setIsDrag] = useState(true);

  useEffect(()=>{
    const dragsBox = document.querySelector("#dragscroll-container");
    const dragsDom = document.querySelector("#dragscroll-container .dragscroll-wrapper");
    if(dragsBox.offsetWidth  >= dragsDom.scrollWidth ){
      setIsDrag(false)
    }

    return ()=>{
      dragsBox.remove()
      dragsDom.remove()
    }
  },[])

  const handleDragscrollLeft = () => {
      const dragsDom = document.querySelector("#dragscroll-container .dragscroll-wrapper");
      clearInterval(timer)
      interval(dragsDom,-300);
  }

  const handleDragscrollRight = () => {
    const dragsDom = document.querySelector("#dragscroll-container .dragscroll-wrapper");
    clearInterval(timer)
    interval(dragsDom,300);
  }

  return (
    <div id="dragscroll-container" className="dragscroll-container">
      {isDrag?(
        <>
          <div onClick={()=>{handleDragscrollLeft()}} className="dragscroll-btn dragscroll-btn-left">&lt;</div>
          <div onClick={()=>{handleDragscrollRight()}} className="dragscroll-btn dragscroll-btn-right">&gt;</div>
        </>
      ):""}
      {isDrag?(<DragContainer />):(<NoDragContainer/>)}
    </div>
  );
}

export default Dragscroll;
