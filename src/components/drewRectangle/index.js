import React, {useEffect} from "react";

import "./index.css";

let mouseDwon = false;
let wIndex = 0;
const DrewRectangle = (props) => {

    useEffect(()=>{
        return () => {            
            for(let i =0;i<50;i++){
                if (document.getElementById(`w${i}`)) {
                    document.getElementById(`w${i}`).remove();
                }
            }
        }
    },[])

    const handleMouseDown = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (document.getElementById(`w${wIndex}`)) {
            document.getElementById(`w${wIndex}`).remove();
        }
        const DOM = document.getElementById("drewArea");

        let startX = 0;
        let startY = 0;
        let startPointX = 0;
        let startPointY = 0;
        let endPointX = 0;
        let endPointY = 0;
        let retcLeft = '0px';
        let retcTop = '0px';
        let retcHeight = '0px';
        let retcWidth = '0px';

        mouseDwon = true;

        const evt = event;
        const tmp = DOM.getBoundingClientRect();

        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        startX = evt.clientX + scrollLeft;
        startY = evt.clientY + scrollTop;
        startPointX = startX - scrollLeft - tmp.left;
        startPointY = startY - scrollTop - tmp.top;
        wIndex += 1;
        const rectangle = document.createElement('div');
        rectangle.id = `w${wIndex}`;
        rectangle.style.position = 'absolute';
        rectangle.style.left = `${startX}px`;
        rectangle.style.top = `${startY}px`;
        rectangle.style.border = `2px dashed red`;
        rectangle.style.zIndex = `1000`;
        document.body.appendChild(rectangle);

        DOM.onmousemove = (moveEvent) => {

            if(mouseDwon){
                
                try {
                    // 设置拖动框
                    const evt = moveEvent;
                    const tmp = DOM.getBoundingClientRect();
                    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                    const scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
                    retcLeft = `${(startX - evt.clientX - scrollLeft > 0 ? evt.clientX + scrollLeft : startX)}px`;
                    retcTop = `${(startY - evt.clientY - scrollTop > 0 ? evt.clientY + scrollTop : startY)}px`;
                    retcHeight = `${Math.abs(startY - evt.clientY - scrollTop)}px`;
                    retcWidth = `${Math.abs(startX - evt.clientX - scrollLeft)}px`;
                    endPointX = evt.clientX - tmp.left;
                    endPointY = evt.clientY - tmp.top;

                    const wIdEle = document.getElementById(`w${wIndex}`);
                    if (wIdEle) {
                        wIdEle.style.left = retcLeft;
                        wIdEle.style.top = retcTop;
                        wIdEle.style.width = retcWidth;
                        wIdEle.style.height = retcHeight;
                    }
                } catch (error) {
                    throw new Error(error);
                }
            } 
        }

        document.onmouseup = (upEvent) => {

            if(mouseDwon) {
                let widthRe = tmp.width / 1920;
                let heightRe = tmp.height / 1080;

                let x1 = Math.floor(startPointX/widthRe);
                let y1 = Math.floor(startPointY/heightRe);
                let x2 = Math.floor(endPointX/widthRe);
                let y2 = Math.floor(endPointY/heightRe);

                if(endPointX !==0 || endPointY !==0){
                    props.getPointer({
                        startPointX:x1,
                        endPointX:x2,
                        startPointY:y1,
                        endPointY:y2,
                    });
                }
            }
            mouseDwon = false;
        }
    }

    return (
        <div className="drew-area-box">
            {props.children}
            <div id="drewArea" className="drew-area" onMouseDown={(e)=>{handleMouseDown(e)}}></div>
        </div>
    )
}


export default DrewRectangle;
