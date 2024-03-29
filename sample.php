<?php

//$type=VimgBase64 imagetype
//$data=VimgBase64 data_encode
//data2img($type,$data);
function data2img($type,$data){
    $ret=array();
    $ret["su"]=false;
    $data=urlsafe_decode($data);
    if($type!="image/jpeg" && $type!="image/png"){
        $ret["msg"]="type error";
        return $ret;
    }
    $head="data:".$type.";base64,";
    $base=$data;
    if(!is_base64($base)){
        $ret["msg"]="data error";
        return $ret;
    }
    $data=$head.$base;
    $ret["data"]=$data;
    $ret["su"]=true;
    return $ret;
}
function is_base64($s) {
    if (!preg_match('/^[a-zA-Z0-9\/\r\n+]*={0,2}$/', $s)) return false;
    $decoded = base64_decode($s, true);
    if(false === $decoded) return false;
    if(base64_encode($decoded) != $s) return false;
    return true;
}
function urlsafe_decode($base64S){
    $base64S = str_replace(array('-','_'),array('+','/'),$base64S);
    $mod4 = strlen($base64S) % 4;
    if ($mod4) {
        $base64S .= substr('====', $mod4);
    }
    return $base64S;
}
function urlsafe_encode($base64S) {
    $base64S = str_replace(array('+','/','='),array('-','_',''),$base64S);
    return $base64S;
}
?>
<!DOCTYPE html>
<html >
<head>
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="base64圖片轉換" />
    <meta name="robots" content="noindex , nofollow">
    <meta name="revisit-after" content="1 month">
    <meta name="language" content="zh-tw">
    <meta name="generator" content="N/A">
    <title>無心碎碎念 base64圖片轉換</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.2.min.js"></script>
    <script src="js/VimgBase64.js"></script>

</head>
<style>
    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media (min-width: 768px) {
        .bd-placeholder-img-lg {
            font-size: 3.5rem;
        }
    }
</style>
<body class="text-center">
<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <header class="masthead mb-auto">
        <div class="inner">
            <h3 class="masthead-brand">base64圖片轉換</h3>
            <nav class="nav nav-masthead justify-content-center">
            </nav>
        </div>
    </header>

    <main role="main" class="inner cover">
        <br><br><br>
        <img id='img'  width="100"  border="1"/>
        <div class="box border" >
            <h3 class="masthead-brand">input file</h3>
            <input type="file" accept="image/*"  id="tx_cm_image" >

            <div style='display:none'>
                <div id="upload_work_div" style="display: none"></div>
            </div>
        </div>
        <script>
            var vimg
            $(function() {
                vimg=new VimgBase64({"width":1280,"limit":6,"compression_ratio":0.8});
                vimg.setInput("tx_cm_image",function(retA){
                    if("type" in retA && retA["type"]==VimgBase64OnData){
                        console.log(retA)
                        $("#img").attr("src",retA["data"])
                    }
                });
            });
        </script>

        <br><br><br>


        <div class="box border" >
            <h3 class="masthead-brand">image to base64</h3>
            <img id='img_rnd'  width="300" height="200" src="./img/500441667.gif"/>
            <button onclick="loadImage()">loadImage</button>
        </div>
        <script>

            function loadImage(){
                vimg.readImage("img_rnd",function (retA){
                    console.log(retA)
                    if("type" in retA && retA["type"]==VimgBase64OnData){
                        $("#img").attr("src",retA["data"])
                    }

                })
            }
        </script>



    </main>

    <footer class="mastfoot mt-auto">
        <div class="inner">
        </div>
    </footer>
</div>
</body>
</html>

