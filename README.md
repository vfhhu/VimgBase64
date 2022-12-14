Conver image to Base64 from input file or img tag
<br>
<h1>
Step1 include and init VimgBase64
</h1>

``````js
<script src="js/VimgBase64.js"></script>
<script>
var vimg=new VimgBase64({"width":1280});
</script>
``````

<h1>
Step2 set input file or load img tag and callback
</h1>

``````js
vimg.setInput({input_file_id},function(retA){
    if("type" in retA && retA["type"]==VimgBase64OnData){
        console.log(retA);   
    }
});

vimg.readImage({image_id},function (retA){
    console.log(retA)
    if("type" in retA && retA["type"]==VimgBase64OnData){
        console.log(retA);
    }

})
``````