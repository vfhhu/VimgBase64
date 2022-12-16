
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
//set onchange to input file
vimg.setInput({input_file_id},function(retA){
    if("type" in retA && retA["type"]==VimgBase64OnData){
        console.log(retA);   
    }
});

//direct load img tag
vimg.readImage({image_id},function (retA){
    console.log(retA)
    if("type" in retA && retA["type"]==VimgBase64OnData){
        console.log(retA);
    }
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



<h1>中文說明</h1>
JS前端將 input 及 img tag 的圖片轉成base64格式
<br>
轉換完成的資料可直接用於顯示或上傳

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
//此函式會設定input file 的 onchange
vimg.setInput({input_file_id},function(retA){
    if("type" in retA && retA["type"]==VimgBase64OnData){
        console.log(retA);   
    }
});

//直接讀取img標籤的圖片內容
vimg.readImage({image_id},function (retA){
    console.log(retA)
    if("type" in retA && retA["type"]==VimgBase64OnData){
        console.log(retA);
    }
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