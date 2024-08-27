var VpopShowImageCnt=0;
class VpopShowImage{
    _GetId(){
        return (VpopShowImageCnt++)+"_"+new Date().getTime();
    }
    constructor(classname=""){
        let _self = this;
        if(VpopShowImageCnt==0){
            _self.style_id=_self._CreatStyle();
        }
        _self.workdiv_id=_self._CreatWorkDiv(_self.constructor.name);
        _self.close_sapn=_self._CreatSpan(_self.constructor.name,_self.workdiv_id);
        _self.show_image=_self._CreatImage(_self.constructor.name,_self.workdiv_id);
        document.getElementById(_self.workdiv_id).classList.add(_self.style_id);
        document.getElementById(_self.show_image).classList.add(_self.style_id+"-content");


        let elements = document.getElementsByClassName(classname);
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener("click", function() {
                document.getElementById(_self.workdiv_id).style.display = "block";
                document.getElementById(_self.show_image).src = this.src;
            });
        }
        // 停止事件传播
        document.getElementById(_self.show_image).onclick = function(e) {
            e.stopPropagation();
        };

        // 点击模态框时关闭模态框
        document.getElementById(_self.workdiv_id).onclick = function() {
            document.getElementById(_self.workdiv_id).style.display = "none";
        };


    }
    _CreatStyle(head="",append="head"){
        let _self = this;
        let style_id=head+"_style"+_self._GetId();
        let style = document.createElement("style");

        // 添加CSS規則
        style.innerHTML = `
            .`+style_id+` {
                display: none; /* Hidden by default */
                position: fixed; /* Stay in place */
                z-index: 1; /* Sit on top */
                padding-top: 100px; /* Location of the box */
                left: 0;
                top: 0;
                width: 100%; /* Full width */
                height: 100%; /* Full height */
                overflow: auto; /* Enable scroll if needed */
                background-color: rgb(0,0,0); /* Fallback color */
                background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
            }
            .`+style_id+`-content {
                margin: auto;
                display: block;
                width: 80%;
                max-width: 700px;
            } 
            /* The Close Button */
            .`+style_id+`close {
                position: absolute;
                top: 15px;
                right: 35px;
                color: #f1f1f1;
                font-size: 40px;
                font-weight: bold;
                transition: 0.3s;
            }
                
            .`+style_id+`close:hover,
            .`+style_id+`close:focus {
                color: #bbb;
                text-decoration: none;
                cursor: pointer;
            }
                
            /* 100% Image Width on Smaller Screens */
            @media only screen and (max-width: 700px){
                .`+style_id+`-content {
                    width: 100%;
                }
            }
        `;

        // 將 <style> 元素添加到 <head> 中

        if(append==null || typeof append!="string" || append=="" || append=="head") document.head.appendChild(style);
        else if(append=="body")document.body.appendChild(style);
        else document.getElementById(append).appendChild(style);
        return style_id;

    }
    _CreatWorkDiv(head="",append="body"){
        let _self = this;
        let workdiv_id=head+"_Workdiv"+_self._GetId();
        let s=document.createElement('div');
        s.setAttribute("id", workdiv_id);
        s.style.cssText="display:none";
        if(append==null || typeof append!="string" || append=="" || append=="body") document.body.appendChild(s);
        else document.getElementById(append).appendChild(s);
        return workdiv_id;
    }
    _CreatSpan(head="",append="body"){
        let _self = this;
        let workdiv_id=head+"_Workspan"+_self._GetId();
        let s=document.createElement('span');
        s.setAttribute("id", workdiv_id);
        if(append==null || typeof append!="string" || append=="" || append=="body") document.body.appendChild(s);
        else document.getElementById(append).appendChild(s);
        return workdiv_id;
    }
    _CreatImage(head="",append="body"){
        let _self = this;
        let imageID=head+"_image"+_self._GetId();
        let img = document.createElement('img');
        img.setAttribute("id", imageID);
        if(append==null || typeof append!="string" || append=="" || append=="body") document.body.appendChild(img);
        else document.getElementById(append).appendChild(img);
        return imageID;
    }

}