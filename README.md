
<h1>VimgBase64</h1>
Use JS conver image to Base64 from input file or img tag 

[sample](https://tool.vfhhu.xyz/a_js_sample/vbase64.php)
<h2>
Step1 include js
</h2>

``````js
<script src="js/VimgBase64.js"></script>
``````


<h2>
Step2 init VimgBase64
</h2>

``````js
var vimg=new VimgBase64();
//or
//var vimg=new VimgBase64({"width":1280,"imagetype":"image/jpeg","delay":300});
``````

<h2>
Step3 set input file or load img tag and callback
</h2>

``````js
//sample 1
//use in click function,it will creat input file and pop file window
vimg.creatInputFile({"accept": ".png, .jpg, .jpeg","auto_click":true}, function (retA){
    if("type" in retA && retA["type"]==VimgBase64OnData){
        console.log(retA);
        vimg.clear();
    }
});

//sample 2
//set onchange to input file
vimg.setInput({input_file_id},function(retA){
    if("type" in retA && retA["type"]==VimgBase64OnData){
        console.log(retA);   
    }
});

//sample 3
//direct load img tag
vimg.readImage({image_id},function (retA){
    if("type" in retA && retA["type"]==VimgBase64OnData){
        console.log(retA);
    }
})

//sample4
//pop and crop
let vimg2pop=new VimgBase64({"width":1280,"limit":1,"compression_ratio":0.8});
let vcrop=new VpopCrop(vimg2pop,{aspectRatio:1/1,type: 'circle'},function(img){
    
})
``````

<h2>
Other setting
</h2>

``````js
//setting export image width
vimg.setExportWidth(1024);

//setting export image type only image/jpeg and image/png
vimg.setImageType("image/jpeg");

//setting delay for draw image
vimg.setDelay(300);
``````
<h2>
Remark
</h2>
When you want to upload base64 data
<br>
Please use the image_encode or data_encode of the returned data
<br>
it use urlsafe_encode base64
<br>
<h2>
use pop image
</h2>

``````js
<img class="classname" src="image1.jpg" />
<img class="classname" src="image2.jpg" />
new VpopShowImage("classname") 
``````
[php load sample](https://github.com/vfhhu/VimgBase64/blob/master/sample.php)

<br><br><br>
######################################
<h1>中文說明</h1>
JS前端將 input 及 img tag 的圖片轉成base64格式
<br>
轉換完成的資料可直接用於顯示或上傳
<br>
[範例網址](https://tool.vfhhu.xyz/a_js_sample/vbase64.php)
<h2>
第一步: 引入js
</h2>

``````js
<script src="js/VimgBase64.js"></script>
``````

<h2>
第二步 初始化 VimgBase64
</h2>

``````js
var vimg=new VimgBase64();
//or
//var vimg=new VimgBase64({"width":1280,"imagetype":"image/jpeg","delay":300});
``````

<h2>
第三步 設定圖片來源的 input file 或 img 的 tag id 及callback
</h2>

``````js
//範例 1
//用於click function內,會自動建立input並跳出讀取畫面
vimg.creatInputFile({"accept": ".png, .jpg, .jpeg","auto_click":true}, function (retA){
    if("type" in retA && retA["type"]==VimgBase64OnData){
        console.log(retA);
        vimg.clear();
    }
});

//範例 2
//此函式會設定input file 的 onchange
vimg.setInput({input_file_id},function(retA){
    if("type" in retA && retA["type"]==VimgBase64OnData){
        console.log(retA);   
    }
});

//範例 3
//直接讀取img標籤的圖片內容
vimg.readImage({image_id},function (retA){    
    if("type" in retA && retA["type"]==VimgBase64OnData){
        console.log(retA);
    }
})

//範例 4
//跳出視窗和裁切
let vimg2pop=new VimgBase64({"width":1280,"limit":1,"compression_ratio":0.8});
let vcrop=new VpopCrop(vimg2pop,{aspectRatio:1/1,type: 'circle'},function(img){

})
``````

<h2>
其他設定
</h2>

``````js
//設定輸出圖片的寬度
vimg.setExportWidth(1024);

//設定輸出圖片的格式,只能輸出 image/jpeg and image/png
vimg.setImageType("image/jpeg");

//設定轉換的延遲時間,圖片轉換失敗時可加大延遲時間試試
vimg.setDelay(300);
``````

<h2>
備註
</h2>
當你想上傳base64數據時
<br>
請使用返回數據的 image_encode 或 data_encode
<br>
它使用 urlsafe_encode base64
<br>
<h2>
pop image 用法
</h2>

``````js
<img class="classname" src="image1.jpg" />
<img class="classname" src="image2.jpg" />
new VpopShowImage("classname") 
``````


[php 的讀取範例](https://github.com/vfhhu/VimgBase64/blob/master/sample.php)
