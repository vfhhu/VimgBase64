var VimgBase64OnData="onData";
var VimgBase64OnStop="onStop";
var VimgBase64OnStart="onStart";
var VimgBase64IdCnt=0;
/*
* Github:
* https://github.com/vfhhu/VimgBase64
* example:
* https://tool.vfhhu.xyz/a_js_sample/vbase64.php
*
* option has:
* 1 width
* 2 limite
* 3 imagetype: image/jpeg,image/png
* */
class VimgBase64{
    _GetId(){
        return (VimgBase64IdCnt++)+"_"+new Date().getTime();
    }
    setExportWidth(w=100){
        let _self = this;
        _self.def_width=w;
        if(_self.def_width<10)_self.def_width=10;
    }
    setImageType(type){
        let _self = this;
        if(_self.acceptImage.indexOf(type)>=0){
            _self.imagetype=type;
            return true;
        }
        return false;
    }
    setLimite(lim){
        let _self = this;
        _self.limite=parseInt(lim);
    }
    constructor(option={},) {
        let _self = this;
        _self.progname = "VimgBase64";
        _self.workdiv_id=_self._CreatWorkDiv(_self.progname);
        _self.acceptImage = ["image/jpeg","image/png"];
        _self.imagetype="image/jpeg"
        _self.limite=-1;
        _self.option=option;
        _self.tmpMap= {};

        let width=1280;
        if("width" in _self.option)width=Number(_self.option["width"]);
        _self.setExportWidth(width);
        if("limite" in _self.option)_self.setLimite(_self.option["limite"]);
        if("imagetype" in _self.option )_self.setImageType(_self.option["imagetype"]);
    }
    setInput(input_id="",callback){
        if(input_id==null || typeof input_id!="string" ){
            if(window.console)console.log("必須有input file的id");
            return false;
        }
        let _self = this;
        let input = document.getElementById(input_id);
        input.addEventListener("change", function(event) {
            if (input.files && input.files.length>0){
                if(callback!=null && typeof callback=="function"){
                    callback({"type":VimgBase64OnStart,"data":""});
                }
                _self.upload_input=input;
                _self.upload_index=0;
                _self.readURL_file(callback);
            }
        }, false);
    }
    readImage(imageID="",callback){
        if(imageID==null || typeof imageID!="string"){
            if(window.console)console.log("必須有 image 的id");
            return false;
        }
        let _self = this;
        let tmpImageElement = $("#"+imageID)[0];
        let img=new Image();
        img.crossOrigin="*"
        img.src=tmpImageElement.src;
        img.onload=function(e){
            if(callback!=null && typeof callback=="function"){
                callback({"type":VimgBase64OnStart,"data":""});
            }
            let canvasid=_self._CreatCanvas(_self.progname,_self.workdiv_id);
            _self.slider_move_image(img ,canvasid,_self.Orientation ,function(ret) {
                setTimeout(function () {
                    if (callback != null && typeof callback == "function") {
                        let can=_self.tmpMap[canvasid]["can"];
                        let data = can.toDataURL(_self.imagetype);
                        let data_head = "data:" + _self.imagetype + ";base64,";
                        callback({
                            "type": VimgBase64OnData,
                            "data": data,
                            "imagetype": _self.imagetype,
                            "image_encode": _self.urlsafe_encode(data),
                            "data_encode": _self.urlsafe_encode(data.substring(data_head.length)),
                            "data_head": data_head,
                            "index": _self.upload_index
                        });
                    }else tmpImageElement.src = _self.can.toDataURL();
                    // _self.readURL_file();
                }, 300);
            });
        }
    }
    readURL_file(callback){
        let _self = this;

        _self.Orientation=-2;
        let reader = new FileReader();
        reader.onload = function (e) {
            // if(console.log)console.log(reader.result);
            let imageElement=new Image();
            imageElement.crossOrigin="*"
            imageElement.src=reader.result;

            let canvasid=_self._CreatCanvas(_self.progname,_self.workdiv_id);
            setTimeout(function(){
                _self.slider_move_image(imageElement ,canvasid ,_self.Orientation ,function(ret){
                    setTimeout(function(){
                        if(callback!=null && typeof callback=="function"){
                            let can=_self.tmpMap[canvasid]["can"];
                            let data=can.toDataURL(_self.imagetype);
                            let data_head="data:"+_self.imagetype+";base64,";
                            callback({"type":VimgBase64OnData,
                                "data":data,
                                "imagetype":_self.imagetype,
                                "image_encode":_self.urlsafe_encode(data),
                                "data_encode":_self.urlsafe_encode(data.substring(data_head.length)),
                                "data_head":data_head,
                                "index":_self.upload_index});
                        }
                        _self.readURL_file(callback);
                    },300);
                });
            },300);
        }
        if(_self.upload_index>=_self.upload_input.files.length || (_self.limite>0 && _self.upload_index>=_self.limite)){
            if(_self.callback!=null && typeof(_self.callback)=="function"){
                _self.callback({"type":VimgBase64OnStop});
            }
            return;
        }else{
            let file=_self.upload_input.files[_self.upload_index];
            _self.upload_index++;
            // if(console.log)console.log(file);
            _self.getOrientation(file, function(r){
                _self.Orientation=r;
                reader.readAsDataURL(file);
            })
        }
    }
    slider_move_image(el,canvasid, Orientation,callback){
        let _self = this;
        let nw = el.naturalWidth;
        let nh = el.naturalHeight;
        let rate_r=_self.def_width/nw;
        let sWidth = parseInt(rate_r * nw);
        let sHeight = parseInt(rate_r * nh);
        let top = 0;
        let left = 0;
        let can=_self.tmpMap[canvasid]["can"];
        let ctx=_self.tmpMap[canvasid]["ctx"];
        can.width=sWidth;
        can.height=sHeight;
        let ret="";
        ret+="image:"+nw+"x"+nh+"<br>";
        //if(console.log)console.log("image source nw nh ",nw,nh);
        let radian = Math.PI / 180;
        if(Orientation==2 || Orientation==4 || Orientation==5 || Orientation==7 ){//鏡像

        }
        if(Orientation==3 || Orientation==4){//+180
            can.width=sWidth;
            can.height=sHeight;

            ctx.rotate(180*radian);
            ctx.drawImage(el, left, top, nw, nh, 0, 0, can.width, can.height);
        }else if(Orientation==5 || Orientation==6){//+90


            let rotation = 90;
            let sWidth = _self.def_width;
            let sHeight = parseInt(_self.def_width*nh/nw);
            can.width=sWidth;
            can.height=sHeight;

            let w =  Math.max(sWidth,sHeight);
            let real_w = w * nw / nh;
            let start_x = parseInt((w -real_w));
            let canvas4 = document.createElement('canvas');
            canvas4.width = w;
            canvas4.height = w;
            let ctx4 = canvas4.getContext("2d");
            ctx4.save();
            ctx4.translate(w/2, w/2);
            ctx4.rotate(Math.PI* rotation / 180);
            ctx4.translate(0, 0);
            ctx4.drawImage(el, 0, 0,nw, nh, -w/2,-w/2, w, w);
            ctx4.restore();
            ctx.drawImage(canvas4, start_x, 0,  w-start_x, w, 0, 0, can.width, can.height);

            ret+="sWidth:"+sWidth+",sHeight"+sHeight+",start_x:"+start_x +"<br>";
        }else if(Orientation==7 || Orientation==8){//-90
            let rotation = -90;
            let sWidth = _self.def_width;
            let sHeight = parseInt(_self.def_width*nh/nw);
            can.width=sWidth;
            can.height=sHeight;

            let w =  Math.max(sWidth,sHeight);
            let real_w = w * nw / nh;
            let start_x = parseInt((w -real_w));
            let canvas4 = document.createElement('canvas');
            canvas4.width = w;
            canvas4.height = w;
            let ctx4 = canvas4.getContext("2d");
            ctx4.save();
            ctx4.translate(w/2, w/2);
            ctx4.rotate(Math.PI* rotation / 180);
            ctx4.translate(0, 0);
            ctx4.drawImage(el, 0, 0,nw, nh, -w/2,-w/2, w, w);
            ctx4.restore();
            ctx.drawImage(canvas4, start_x, 0,  w-start_x, w, 0, 0, can.width, can.height);
        }else{
            can.width=sWidth;
            can.height=sHeight;
            ctx.drawImage(el, left, top, nw, nh, 0, 0, can.width, can.height);
        }
        ret+="can:"+can.width+"x"+can.height+"<br>";
        //if(console.log)console.log("slider_move_image ",left,top,sWidth, sHeight, 0, 0, can.width, can.height);

        if( callback!=null && typeof callback === 'function' ){
            callback(ret);
        }
    }


    getOrientation(file, callback) {
        let reader = new FileReader();
        reader.onload = function(e) {

            let view = new DataView(e.target.result);
            if (view.getUint16(0, false) != 0xFFD8) {
                return callback(-2);
            }
            let length = view.byteLength, offset = 2;
            while (offset < length) {
                if (view.getUint16(offset+2, false) <= 8) return callback(-1);
                let marker = view.getUint16(offset, false);
                offset += 2;
                if (marker == 0xFFE1) {
                    if (view.getUint32(offset += 2, false) != 0x45786966) {
                        return callback(-1);
                    }

                    let little = view.getUint16(offset += 6, false) == 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    let tags = view.getUint16(offset, little);
                    offset += 2;
                    for (let i = 0; i < tags; i++) {
                        if (view.getUint16(offset + (i * 12), little) == 0x0112)  {
                            return callback(view.getUint16(offset + (i * 12) + 8, little));
                        }
                    }
                } else if ((marker & 0xFF00) != 0xFF00) {
                    break;
                } else {
                    offset += view.getUint16(offset, false);
                }
            }
            return callback(-1);
        };
        reader.readAsArrayBuffer(file);
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
    _CreatImage(head="",append="body"){
        let _self = this;
        let imageID=head+"_image"+_self._GetId();
        let img = document.createElement('img');
        img.setAttribute("id", imageID);
        img.style.cssText="display:none";
        if(append==null || typeof append!="string" || append=="" || append=="body") document.body.appendChild(img);
        else document.getElementById(append).appendChild(img);
        return imageID;
    }
    _CreatCanvas(head="",append="body"){
        let _self = this;
        let canvas_id=head+"_canvas"+_self._GetId();
        let s=document.createElement('canvas');
        s.setAttribute("id", canvas_id);
        s.style.cssText="display:none";
        if(append==null || typeof append!="string" || append=="" || append=="body") document.body.appendChild(s);
        else document.getElementById(append).appendChild(s);

        let can = document.getElementById(canvas_id)
        _self.tmpMap[canvas_id]= {
            "can":can,
            "ctx":can.getContext('2d')
        }

        return canvas_id;
    }

    urlsafe_encode(base64_string=""){
        return base64_string
            .replace(/\+/g, '-') // Convert '+' to '-'
            .replace(/\//g, '_') // Convert '/' to '_'
            .replace(/=+$/, ''); // Remove ending '='

    }
    urlsafe_decode(base64_string=""){
        if(base64_string=="")return "";
        //base64_string += Array(5 - base64_string.length % 4).join('=');
        while(base64_string.length % 4)
            base64_string+="=";
        return base64_string
            .replace(/\-/g, '+') // Convert '-' to '+'
            .replace(/\_/g, '/'); // Convert '_' to '/'
    }
}