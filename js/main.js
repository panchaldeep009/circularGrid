"use strict";
(() => {
    class circularGrid {

        constructor(container,child) {
            this.container = container;
            this.child = child;
            this.numberOfTile = 0;
            this.offsetNumberOfTile = 0;
            this.centerArrange();
            this.addEventx();
        }

        centerArrange() {
            let 
            img = document.querySelector(this.container).querySelectorAll(this.child.element),
            rad = this.child.size*2.5,
            numberOfRings = this.countRings(img.length),
            offsetChild = 1,
            changePos = this.changePos;
            img.forEach(m => {
                m.style.width = this.child.size+'px';
                m.style.height = this.child.size+'px';
                changePos(m,0,0);
            });
            for(let i = 1; i <= numberOfRings; i++){
                for(let o = 1; o <= ((i*2)-1); o++){
                    let x = ((1/(((i*2)-1)+1))*o),
                        y = (-x)+1;
                        [[1,-1],[1,1],[-1,1],[-1,-1]].forEach(function([sx,sy]){
                            if(offsetChild < img.length){
                                changePos(img[offsetChild],sx*(x*(rad*i)),sy*(y*(rad*i)));
                                offsetChild++;
                            }
                        });
                }
                [[0,1],[1,0],[0,-1],[-1,0]].forEach(function([sx,sy]){
                    if(offsetChild < img.length){
                        changePos(img[offsetChild],sx*(rad*i),sy*(rad*i));
                        offsetChild++;
                    }
                });
            }
        }
        changePos(e,x,y){
            e.style.marginLeft = x+'px';
            e.style.marginTop = y+'px';
        }
        addEventx(){
            let mouseDownFlag = false,
                mouseClientX = 0,
                mouseClientY = 0,
                moveElement = this.moveElement,
                container = this.container,
                child = this.child.element;
            document.querySelector(this.container).addEventListener('mousedown', function(e){
                mouseDownFlag = true;
                mouseClientX = e.clientX;
                mouseClientY = e.clientY;
            });
            document.querySelector(this.container).addEventListener('mousemove', function(e){
                if(mouseDownFlag){
                    moveElement(-(mouseClientX-e.clientX),-(mouseClientY-e.clientY),container,child);
                    mouseClientX = e.clientX;
                    mouseClientY = e.clientY;
                }
            });
            document.querySelector(this.container).addEventListener('mouseup', function(e){
                mouseDownFlag = false;
            });
        }
        moveElement(x,y,co,child){
            let
                i = document.querySelector(co).querySelectorAll(child);
            i.forEach(im => {
                im.style.marginLeft = parseInt(im.style.marginLeft)+x+'px'; 
                im.style.marginTop = parseInt(im.style.marginTop)+y+'px';
                if((Math.abs((document.documentElement.clientWidth/2) - im.getBoundingClientRect().left) < 120) && (Math.abs((document.documentElement.clientHeight/2) - im.getBoundingClientRect().top) < 120)){
                    im.style.width = 200+'px';
                    im.style.height = 200+'px';
                } else if((Math.abs((document.documentElement.clientWidth/2) - im.getBoundingClientRect().left) < 350) && (Math.abs((document.documentElement.clientHeight/2) - im.getBoundingClientRect().top) < 350)){
                    im.style.width = 120+'px';
                    im.style.height = 120+'px';
                } else {
                    im.style.width = 50+'px';
                    im.style.height = 50+'px';
                }
            });
        }
        countRings(length) {
            let count = 1;
            length--;
            for(let i = 1;length > 0;i+2){
                length = (length-(i * 4))-4;
                if(length > 0){
                    count++;
                }
                i++;
            }
            return count;
        }

    }
    let designGrid = new circularGrid('#circularGrid',{element : "img", size : 100});
})();