
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