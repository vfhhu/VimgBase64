// https://popup.js.org
//<script src="https://cdn.jsdelivr.net/npm/@simondmc/popup-js@1.4.2/popup.min.js"></script>

//https://github.com/fengyuanchen/cropperjs
var VpopCropCnt=0;
class VpopCrop{
    _GetId(){
        return (VpopCropCnt++)+"_"+new Date().getTime();
    }

    constructor(vimgBase64,option={},cb,cb_cancel=null) {
        let _self = this;
        _self.vimgBase64ID="VpopCrop_"+_self._GetId();
        _self.btn_cropTxID="VpopCrop_btn_crop_"+_self._GetId();
        _self.btn_CancelTxID="VpopCrop_btn_Cancel_"+_self._GetId();
        _self.btn_rotateTxID="VpopCrop_btn_rotate_"+_self._GetId();
        _self.cb = cb;
        _self.cb_cancel = cb_cancel;
        _self.vimgBase64 = vimgBase64;
        _self.height = 500;
        _self.cb_ret_cnt = 0;
        let aspectRatio=3 / 2;
        if("height" in option && parseFloat(option["height"])>10)_self.height=option["height"];
        if("ratio" in option)aspectRatio=option["ratio"];
        if("aspectRatio" in option)aspectRatio=option["aspectRatio"];
        if("type" in option && option["type"]=="circle")_self.addStyle()
        else _self.removeStyle()
        //https://github.com/fengyuanchen/cropperjs
        _self.input_id = _self.vimgBase64.pCreatInputFile({"accept": ".png, .jpg, .jpeg","auto_click":true}, function (ret) {
            // console.log(ret)
            if (ret["index"] >= 2) return;
            $("#"+_self.vimgBase64ID).attr("src", ret["data"]);
            let image = document.getElementById(_self.vimgBase64ID);
            _self.corp1 = new Cropper(image, {
                aspectRatio: aspectRatio,
                guides:false,
                cropBoxMovable:false,
                cropBoxResizable:false,
                dragMode:"move",
                crop(event) {
                    // console.log("crop",event.detail.x);
                    // console.log("crop",event.detail.y);
                    // console.log("crop",event.detail.width);
                    // console.log("crop",event.detail.height);
                    // console.log("crop",event.detail.rotate);
                    // console.log("crop",event.detail.scaleX);
                    // console.log("crop",event.detail.scaleY);

                },
                ready() {
                    $(".cropper-container").css("height", _self.height+"px")
                    let top = (_self.height - _self.corp1.getCanvasData()["height"]) / 2
                    _self.corp1.setCanvasData({top: top})
                    let top2 = (_self.height - _self.corp1.getCropBoxData()["height"]) / 2
                    let width=_self.corp1.getContainerData()["width"]
                    _self.corp1.setCropBoxData({top: top2,width:width,left:0})
                    _self.corp1.move(1, -1);
                },
            });
            _self.pop_photo_box.show();
        });

        //https://popup.js.org/
        // <script src="https://cdn.jsdelivr.net/npm/@simondmc/popup-js@1.4.2/popup.min.js"></script>
        _self.pop_photo_box = new Popup({
            id: _self.vimgBase64ID,
            hideTitle: true,
            title: "crop",
            content: '<img id="'+_self.vimgBase64ID+'" style="height:'+_self.height+'px" />' +
                '<button id="'+_self.btn_rotateTxID+'">rotate</button><br>' +
                '<button id="'+_self.btn_cropTxID+'">crop</button>' +
                '<button id="'+_self.btn_CancelTxID+'">cancel</button>',
        });
        setTimeout(function () {
            $("#"+_self.btn_cropTxID).click(function () {
                // console.log("crop2",_self.corp1.getCropBoxData())
                // let data = _self.corp1.getCroppedCanvas(_self.corp1.getCropBoxData())//縮圖大小
                let data = _self.corp1.getCroppedCanvas()//原圖大小
                if("type" in option && option["type"]=="circle") data = _self.getRoundedCanvas(data);

                if (typeof cb === 'function') {
                    cb(data.toDataURL("image/jpeg"),_self.cb_ret_cnt++)
                }
                // _self.v_pu.upload_image(articleid, data.toDataURL("image/jpeg"), article_type1);
                _self.pop_photo_box.hide();
                _self.corp1.destroy();
            });
            $("#"+_self.btn_CancelTxID).click(function () {
                _self.pop_photo_box.hide();
                _self.corp1.destroy();
                if (typeof cb_cancel === 'function') {
                    cb_cancel()
                }
            });
            $("#"+_self.btn_rotateTxID).click(function () {
                _self.corp1.rotate(90);
            });
        }, 2000);

    }
    get_photo_box_id(){
        let _self = this;
        return _self.vimgBase64ID
    }

    get_input_id() {
        let _self = this;
        return _self.input_id
    }
    getRoundedCanvas(sourceCanvas) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;

        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fill();
        return canvas;
    }
    addStyle() {
        let sheet = new CSSStyleSheet();
        sheet.insertRule(`.cropper-view-box,.cropper-face { border-radius: 50%;}`);
        sheet.insertRule(`.cropper-view-box {outline: 0;box-shadow: 0 0 0 1px #39f;}`);
        document.adoptedStyleSheets = [sheet];
    }
    removeStyle(){
        let sheet = new CSSStyleSheet();
        document.adoptedStyleSheets = [sheet];
    }



}