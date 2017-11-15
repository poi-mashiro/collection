# <center>three.js笔记</center>

## this is only for Chinese and it is only writing for myself

使用的 three.js 版本为 87

### 目录

1. [基础页面结构](#1)

2. [照相机 camera](#2)

3. [几何形状 Geometry](#3)

4. [文字形状 TextGeometry](#4)

5. [自定义形状 TextGeometry](#5)

6. [基本材质 BasicMaterial](#6)

7. [Lambert材质 MeshLambertMaterial](#7)

8. [Phong材质 MeshPhongMaterial](#8)

9. [法向材质](#9)

10. [材质的纹理贴图](#10)

11. [网格 Mesh](#11)

12. [使用stat.js记录fps](#12)

13. [外部模型](#13)

14. [环境光 AmbientLight](#14)

15. [点光源 PointLight](#15)

16. [平行光 DirectionalLight](#16)

17. [聚光灯 SpotLight](#17)

18. [阴影 shadiw](#18)

19. [着色器 Shader](#19)

<span id='1'></span>
#### 1. 基础页面结构
```
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script src="../js/three.min.js"></script>
  <style>
    #mainCanvas {
      width: 1200px;
      height: 900px;
    }
  </style>
</head>

<body>
  <canvas id="mainCanvas" width="1200" height="900"></canvas>
  <script>
    // init render
    var renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('mainCanvas')
    });
    renderer.setClearColor(0x000000); // black
    // init scene
    var scene = new THREE.Scene();
    // init camera
    var camera = new THREE.PerspectiveCamera(60, 12 / 9, 1, 100);

    camera.position.set(1, 1, 8);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // a cube in the scene
    var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3),
            new THREE.MeshBasicMaterial({
                color: 0xff0000
            })
    );
    scene.add(cube);

    // render
    renderer.render(scene, camera);
  </script>
</body>
```

<span id='2'></span>
#### 2. 照相机 camera  

###### 正交投影照相机（Orthographic Camera）
```
var camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far)
```
为了保持照相机的横竖比例，需要保证(right - left)与(top - bottom)的比例与Canvas宽度与高度的比例一致。

near与far都是指到照相机位置在深度平面的位置，而照相机不应该拍摄到其后方的物体，因此这两个值应该均为正值。为了保证场景中的物体不会因为太近或太远而被照相机忽略，一般near的值设置得较小，far的值设置得较大，具体值视场景中物体的位置等决定。

修改 left right top bottom 将影响渲染的画布的位置，物体位置保持不变，例如 left right 整体右移将使画面看起来像 将物体向左移动

使用 camera.position.set(x, y, z); 设置照相机的位置

使用 camera.lookAt(new THREE.Vector3(x, y, z)); 设置照相机观察方向，默认照相机看向z轴负方向

###### 透视投影照相机（Perspective Camera）
```
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
```
aspect 等于 width / height，是照相机水平方向和竖直方向长度的比值，通常设为 Canvas 的横纵比例。

near 和 far 分别是照相机到视景体最近、最远的距离，均为正值，且far应大于near。

<span id='3'></span>
#### 3. 几何形状 Geometry

###### 立方体 CubeGeometry
构造函数 THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)

width 是 x 方向上的长度；height 是 y 方向上的长度；depth 是 z 方向上的长度；后三个参数分别是在三个方向上的分段数，如 widthSegments 为 3 的话，代表 x 方向上水平分为三份。

###### 平面 PlaneGeometry
这个平面是一个长方形，并不是无限的平面，构造函数为 THREE.PlaneGeometry(width, height, widthSegments, heightSegments)

如果需要创建的平面在x轴和z轴所在的平面内，可以通过物体的旋转来实现  
为了配合阴影效果 width : widthSegments 至少为 1 : 1， height : heightSegments 至少为 1 : 1 ，建议 1 : 2 起

###### 球体 SphereGeometry
构造函数 THREE.SphereGeometry(radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength)

其中，radius是半径；segmentsWidth表示经度上的切片数；segmentsHeight表示纬度上的切片数；phiStart表示经度开始的弧度；phiLength表示经度跨过的弧度；thetaStart表示纬度开始的弧度；thetaLength表示纬度跨过的弧度。

###### 圆形 CircleGeometry
构造函数 THREE.CircleGeometry(radius, segments, thetaStart, thetaLength)

###### 圆柱体 CylinderGeometry
构造函数 THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)

radiusTop与radiusBottom分别是顶面和底面的半径，由此可知，当这两个参数设置为不同的值时，实际上创建的是一个圆台；height是圆柱体的高度；radiusSegments与heightSegments可类比球体中的分段；openEnded是一个布尔值，表示是否没有顶面和底面，缺省值为false，表示有顶面和底面。

###### 正四面体 TetrahedronGeometry
构造函数 THREE.TetrahedronGeometry(radius, detail)

###### 正八面体 OctahedronGeometry
构造函数 THREE.OctahedronGeometry(radius, detail)

###### 正二十面体 IcosahedronGeometry
构造函数 THREE.IcosahedronGeometry(radius, detail)

radius是半径；detail是细节层次（Level of Detail）的层数，对于大面片数模型，可以控制在视角靠近物体时，显示面片数多的精细模型，而在离物体较远时，显示面片数较少的粗略模型。这里我们不对detail多作展开，一般可以对这个值缺省。

###### 圆环面 TorusGeometry
构造函数 THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)

radius是圆环半径；tube是管道半径；radialSegments 是圆环截面分段数，tubularSegments 是圆环的分段数；arc是圆环面的弧度，缺省值为Math.PI * 2

###### 圆环结 TorusKnotGeometry
构造函数 THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale)

p和q是控制其样式的参数，一般可以缺省，如果需要详细了解，请学习圆环结的相关知识；heightScale是在z轴方向上的缩放。

例： new THREE.TorusKnotGeometry(2, 0.5, 32, 8)

<span id='4'></span>
#### 4. 文字形状 TextGeometry
使用文字形状需要下载和引用额外的字体库，具体参见Three.js GitHub说明。

这里，我们以 helvetiker字体为例。我们在Three.js GitHub master/examples/fonts目录下，下载helvetiker_regular.typeface.json文件放在你的目录下，然后用以下方法加载：
```
var loader = new THREE.FontLoader();
loader.load('../lib/helvetiker_regular.typeface.json', function(font) {
    var mesh = new THREE.Mesh(new THREE.TextGeometry('Hello', {
        font: font,
        size: 1,
        height: 1
    }), material); // 材质后续记录
    scene.add(mesh);

    // render
    renderer.render(scene, camera);
});
```

构造函数 THREE.TextGeometry(text, parameters)
其中，text是文字字符串，parameters是以下参数组成的对象：

* size：字号大小，一般为大写字母的高度
* height：文字的厚度
* curveSegments：弧线分段数，使得文字的曲线更加光滑
* font：字体，默认是'helvetiker'，需对应引用的字体文件
* weight：值为'normal'或'bold'，表示是否加粗
* style：值为'normal'或'italics'，表示是否斜体
* bevelEnabled：布尔值，是否使用倒角，意为在边缘处斜切
* bevelThickness：倒角厚度
* bevelSize：倒角宽度

<span id='5'></span>
#### 5. 自定义形状 TextGeometry
构造函数 var geometry = new THREE.Geometry();

设置顶点位置 geometry.vertices.push(new THREE.Vector3(x, y, z));

设置顶点链接情况 geometry.faces.push(new THREE.Face3(0, 1, 3));

需要注意的是，new THREE.Vector3(-1, 2, -1)创建一个矢量，作为顶点位置追加到geometry.vertices数组中。

而由new THREE.Face3(0, 1, 3)创建一个三个顶点组成的面片，追加到geometry.faces数组中。三个参数分别是四个顶点在geometry.vertices中的序号。

<span id='6'></span>
#### 6. 基本材质 BasicMaterial
构造函数 THREE.MeshBasicMaterial(opt)

opt可以缺省，或者为包含各属性的值

例如 一个不透明度为0.75的黄色材质
```
new THREE.MeshBasicMaterial({
    color: 0xffff00,
    opacity: 0.75
});
```
* visible：是否可见，默认为true
* side：渲染面片正面或是反面，默认为正面THREE.FrontSide，可设置为反面THREE.BackSide，或双面THREE.DoubleSide
* wireframe：是否渲染线而非面，默认为false
* color：十六进制RGB颜色，如红色表示为0xff0000
* map：使用纹理贴图，详见后续

<span id='7'></span>
#### 7. Lambert材质 MeshLambertMaterial
效果需要配合光照查看

光照模型公式为： Idiffuse = Kd * Id * cos(theta)  
Idiffuse是漫反射光强，Kd是物体表面的漫反射属性，Id是光强，theta是光的入射角弧度。

对于使用Three.js的Lambert材质，不需要了解以上公式就可以直接使用  
例：
```
new THREE.MeshLambertMaterial({
    color: 0xffff00
})
```
color是用来表现材质对散射光的反射能力，也是最常用来设置材质颜色的属性。除此之外，还可以用ambient和emissive控制材质的颜色。

// ambient有误
ambient表示对环境光的反射能力，只有当设置了AmbientLight后，该值才是有效的，材质对环境光的反射能力与环境光强相乘后得到材质实际表现的颜色。

emissive是材质的自发光颜色，可以用来表现光源的颜色。单独使用红色的自发光：
```
new THREE.MeshLambertMaterial({
    emissive: 0xff0000
})
```
同时使用红色的自发光与黄色的散射光：
```
new THREE.MeshLambertMaterial({
    color: 0xffff00,
    emissive: 0xff0000
})
```

<span id='8'></span>
#### 8. Phong材质 MeshPhongMaterial
效果需要配合光照查看

漫反射模型 Idiffuse = Kd * Id * cos(theta)  
镜面反射模型 Ispecular = Ks * Is * (cos(alpha)) ^ n  
Ispecular是镜面反射的光强，Ks是材质表面镜面反射系数，Is是光源强度，alpha是反射光与视线的夹角，n是高光指数，越大则高光光斑越小。

例：
```
new THREE.MeshPhongMaterial({
    color: 0xffff00
});
```
specular值指定镜面反射系数
```
var material = new THREE.MeshPhongMaterial({
    specular: 0xff0000
});
var sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 20, 8), material);
```
shininess属性控制光照模型中的n值，当shininess值越大时，高光的光斑越小，默认值为30
```
new THREE.MeshPhongMaterial({
    specular: 0xff0000,
    shininess: 1000
});
```
黄色的镜面光，红色的散射光
```
material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    specular: 0xffff00,
    shininess: 100
});
```

<span id='9'></span>
#### 9. 法向材质
构造函数 new THREE.MeshNormalMaterial()
法向材质的设定很简单，甚至不用设置任何参数  
材质的颜色与照相机与该物体的角度相关  
在调试时，要知道物体的法向量，使用法向材质就很有效

<span id='10'></span>
#### 10. 材质的纹理贴图
```
var texture = THREE.ImageUtils.loadTexture('../img/0.png', {}, function() {
    renderer.render(scene, camera);
});
var material = new THREE.MeshLambertMaterial({
    map: texture
});
```
多张图片  
```
var materials = [];
for (var i = 0; i < 6; ++i) {
    materials.push(new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('../img/' + i + '.png',
                {}, function() {
                    renderer.render(scene, camera);
                }),
        overdraw: true
    }));
}

var cube = new THREE.Mesh(new THREE.CubeGeometry(5, 5, 5),
        new THREE.MeshFaceMaterial(materials));
scene.add(cube);
```
棋盘格图片
```
var texture = THREE.ImageUtils.loadTexture('../img/chess.png', {}, function() {
    renderer.render(scene, camera);
});
// 指定重复方式为两个方向（wrapS和wrapT）都重复：
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
// 设置两个方向上都重复4次
texture.repeat.set(4, 4);
```

<span id='11'></span>
#### 11. 网格
###### 创建网格
构造函数 Mesh(geometry, material)
```
var material = new THREE.MeshLambertMaterial({
    color: 0xffff00
});
var geometry = new THREE.CubeGeometry(1, 2, 3);
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```
###### 修改属性
除了在构造函数中指定材质，在网格被创建后，也能对材质进行修改：
```
var material = new THREE.MeshLambertMaterial({
    color: 0xffff00
});
var geometry = new THREE.CubeGeometry(1, 2, 3);
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

mesh.material = new THREE.MeshLambertMaterial({
    color: 0xff0000
});
```
位置、缩放、旋转是物体三个常用属性。由于THREE.Mesh基础自THREE.Object3D，因此包含scale、rotation、position三个属性。它们都是THREE.Vector3实例，因此修改其值的方法是相同的  
THREE.Vector3有x、y、z三个属性  
```
mesh.position.z = 1;
```
如果需要同时设置多个属性，可以使用以下两种方法：
```
mesh.position.set(1.5, -0.5, 0);
```
```
mesh.position = new THREE.Vector3(1.5, -0.5, 0);
```
缩放对应的属性是scale，旋转对应的属性是rotation，具体方法与上例相同，分别表示沿x、y、z三轴缩放或旋转  
例： 绕 x 轴旋转一个平面
```
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100),
      new THREE.MeshBasicMaterial({
        color: 0xffff00,
        // opacity: 0.75
      }));
    plane.position.set(0, -1, 0)
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);
```

<span id='12'></span>
#### 12. 使用stat.js记录fps
```
    <script src="js/stats.min.js"></script>
```
```
    // 帧数
    var stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
    function animate() {
      stats.begin();
      // monitored code goes here
      stats.end();
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
```

<span id='13'></span>
#### 13. 外部模型
###### 支持格式
Three.js有一系列导入外部文件的辅助函数，是在three.js之外的，使用前需要额外下载，在https://github.com/mrdoob/three.js/tree/master/examples/js/loaders可以找到  
\*.obj是最常用的模型格式，导入\*.obj文件需要OBJLoader.js；导入带\*.mtl材质的\*.obj文件需要MTLLoader.js以及OBJMTLLoader.js。另有PLYLoader.js、STLLoader.js等分别对应不同格式的加载器，可以根据模型格式自行选择  
目前，支持的模型格式有：

* *.obj
* \*.obj, \*.mtl
* *.dae
* *.ctm
* *.ply
* *.stl
* *.wrl
* *.vtk

###### 无材质模型
例
```
<script type="text/javascript" src="OBJLoader.js"></script>
```
```
var loader = new THREE.OBJLoader();
loader.load('../lib/port.obj', function(obj) {
    obj.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material.side = THREE.DoubleSide;
        }
    });

    mesh = obj;
    scene.add(obj);
});
```
###### 有材质模型
例
```
var loader = new THREE.OBJLoader();
loader.load('../lib/port.obj', function(obj) {
    obj.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshLambertMaterial({
                color: 0xffff00,
                side: THREE.DoubleSide
            });
        }
    });

    mesh = obj;
    scene.add(obj);
});
```
或
```
<script type="text/javascript" src="MTLLoader.js"></script>
<script type="text/javascript" src="OBJMTLLoader.js"></script>
```
```
var loader = new THREE.OBJMTLLoader();
loader.addEventListener('load', function(event) {
    var obj = event.content;
    mesh = obj;
    scene.add(obj);
});
loader.load('../lib/port.obj', '../lib/port.mtl');
```
<span id='14'></span>
#### 14. 环境光 AmbientLight
THREE.AmbientLight(hex, intensity) hex 是十六进制的RGB颜色信息, intensity 是光源强度 0~1
例
```
var light = new THREE.AmbientLight(0xffffff);
scene.add(light);
```
添加2个长方体
```
var greenCube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2),
        new THREE.MeshLambertMaterial({color: 0x00ff00}));
greenCube.position.x = 3;
scene.add(greenCube);

var whiteCube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2),
        new THREE.MeshLambertMaterial({color: 0xffffff}));
whiteCube.position.x = -3;
scene.add(whiteCube);
```
例  将环境光设置为红色
```
var light = new THREE.AmbientLight(0xff0000);
scene.add(light);
```
<span id='15'></span>
#### 15. 点光源 PointLight
构造函数 THREE.PointLight(hex, intensity, distance) hex 是光源十六进制的颜色值；intensity 是亮度，缺省值为1，表示100%亮度；distance 是光源最远照射到的距离，缺省值为0。

例
```
var light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(0, 1.5, 2);
scene.add(light);
```

<span id='16'></span>
#### 16. 平行光 DirectionalLight
构造函数 THREE.DirectionalLight(hex, intensity) hex 是光源十六进制的颜色值；intensity 是亮度，缺省值为1，表示100%亮度。

例
```
var light = new THREE.DirectionalLight();
light.position.set(2, 5, 3);
scene.add(light);
```

<span id='17'></span>
#### 17. 聚光灯 SpotLight
构造函数 THREE.SpotLight(hex, intensity, distance, angle, exponent)  
angle是聚光灯的张角，缺省值是Math.PI / 3，最大值是Math.PI / 2；exponent是光强在偏离target的衰减指数（target需要在之后定义，缺省值为(0, 0, 0)），缺省值是10

在调用构造函数之后，除了设置光源本身的位置，一般还需要设置target：
```
light.position.set(x1, y1, z1);
light.target.position.set(x2, y2, z2);
```
除了设置light.target.position的方法外，如果想让聚光灯跟着某一物体移动（就像真的聚光灯！），可以target指定为该物体：
```
var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
                    new THREE.MeshLambertMaterial({color: 0x00ff00}));

var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
light.target = cube;
```
例
```
<canvas id="mainCanvas" width="1200" height="900"></canvas>

  <script>
    var renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('mainCanvas')
    });
    renderer.setClearColor(0x000000); // black

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(60, 1200 / 900, 1, 100);

    camera.position.set(6, 10, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // var light = new THREE.SpotLight(0xffffff, 1, 100);
    // light.position.set(0, 1.5, 2);


    var greenCube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2),
      new THREE.MeshLambertMaterial({ color: 0x00ff00 }));
    greenCube.position.x = 3;
    greenCube.position.z = -10;
    scene.add(greenCube);

    var whiteCube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2),
      new THREE.MeshLambertMaterial({ color: 0xffffff }));
    whiteCube.position.x = -3;

    scene.add(whiteCube);

    var plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 200, 200),
      new THREE.MeshBasicMaterial({
        color: 0xffff00,
        // opacity: 0.75
      }));
    plane.position.set(0, -1, 0)
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);



    var light = new THREE.SpotLight(0xffff00, 2, 100, Math.PI / 6, 25);
    light.position.set(0, 10, 0);
    light.target = greenCube;
    scene.add(light);
    // renderer.render(scene, camera);s

    function run() {
      if (greenCube.position.z < 5) {
        greenCube.position.z += 0.1;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(run)
    }
    requestAnimationFrame(run)
  </script>
```

<span id='18'></span>
#### 18. 阴影 shadow
能形成阴影的光源只有 THREE.DirectionalLight 与 THREE.SpotLight；而相对地，能表现阴影效果的材质只有 THREE.LambertMaterial 与 THREE.PhongMaterial

全局开启阴影 renderer.shadowMap.Enabled = true;  
接收阴影的物体 xxx.receiveShadow = true;  
光及缠身阴影的物体 xxx.castShadow = true;

聚光灯，需要设置shadowCameraNear、shadowCameraFar、shadowCameraFov三个值，类比透视投影照相机，只有介于shadowCameraNear与shadowCameraFar之间的物体将产生阴影，shadowCameraFov表示张角。

平行光，需要设置shadowCameraNear、shadowCameraFar、shadowCameraLeft、shadowCameraRight、shadowCameraTop以及shadowCameraBottom六个值，相当于正交投影照相机的六个面。同样，只有在这六个面围成的长方体内的物体才会产生阴影效果。

显示照相机位置，便于调试
```
var showCamera = new THREE.CameraHelper(light.shadow.camera);
scene.add(showCamera);
```
这里实现阴影效果的方法是Shadow Mapping，即阴影是作为渲染前计算好的贴图贴上去的，因而会受到贴图像素大小的限制。所以可以通过设置 light.shadow.mapSize.width 与 light.shadow.mapSize.height 值控制贴图的大小，来改变阴影的精确度。

而如果想实现软阴影的效果，可以通过 renderer.shadowMap.soft = true;方便地实现

例
```
var renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('mainCanvas')
    });
    renderer.setClearColor(0xffffff); // black
    renderer.shadowMap.enabled = true; //开启阴影
    renderer.shadowMap.soft = true;

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(60, 1200 / 900, 1, 100);

    camera.position.set(6, 10, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // var light = new THREE.SpotLight(0xffffff, 1, 100);
    // light.position.set(0, 1.5, 2);


    var greenCube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2),
      new THREE.MeshLambertMaterial({ color: 0x00ff00 }));
    greenCube.position.x = 3;
    greenCube.position.z = -10;
    // greenCube.receiveShadow = true;
    greenCube.castShadow = true;
    scene.add(greenCube);

    var whiteCube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2),
      new THREE.MeshLambertMaterial({ color: 0xffffff }));
    whiteCube.position.x = -3;

    scene.add(whiteCube);

    var plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 200, 200),
      new THREE.MeshLambertMaterial({ color: '#ccc' }));
    plane.position.set(0, -1, 0)
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);



    var light = new THREE.SpotLight(0xffff00, 2, 100, Math.PI / 6, 25);
    light.position.set(0, 10, 0);
    light.target = greenCube;
    light.castShadow = true;
    light.shadow.camera.near = 2;
    light.shadow.camera.far = 1000;
    light.shadow.camera.fov = 30;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    scene.add(light);

    var showCamera = new THREE.CameraHelper(light.shadow.camera);
    scene.add(showCamera);
    // renderer.render(scene, camera);

    function run() {
      if (greenCube.position.z < 5) {
        greenCube.position.z += 0.1;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(run)
    }
    requestAnimationFrame(run)
```

<span id='19'></span>
#### 19. 着色器 Shader
###### 顶点着色器（Vertex Shader）
顶点着色器中的“顶点”指的正是 Mesh 中的顶点，对于每个顶点调用一次。因此，如果场景中有一个正方体，那么对八个顶点将各自调用一次顶点着色器，可以修改顶点的位置或者颜色等信息，然后传入片元着色器

###### 片元着色器（Fragment Shader）
片元是栅格化之后，在形成像素之前的数据。片元着色器是每个片元会调用一次的程序，因此，片元着色器特别适合用来做图像后处理

例
```
<canvas id="mainCanvas" width="1200" height="900"></canvas>

  <script id="vs" type="x-shader/x-vertex">
    varying vec2 vUv;
    
    void main()
    {    
        // passing texture to fragment shader
        vUv = uv;
    
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  </script>
  <script id="fs" type="x-shader/x-fragment">
    varying vec2 vUv;
    void main() {
        gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);
    }
  </script>
  <script>
    var renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('mainCanvas')
    });
    renderer.setClearColor(0xffffff); // black
    renderer.shadowMap.enabled = true; //开启阴影
    renderer.shadowMap.soft = true;

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(60, 1200 / 900, 1, 100);
    camera.position.set(6, 10, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // var light = new THREE.SpotLight(0xffffff, 1, 100);
    // light.position.set(0, 1.5, 2);

    var material = new THREE.ShaderMaterial({
      vertexShader: document.getElementById('vs').textContent,
      fragmentShader: document.getElementById('fs').textContent
    });

    var greenCube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2),
      material);
    greenCube.position.x = 3;
    greenCube.position.z = -10;
    // greenCube.receiveShadow = true;
    greenCube.castShadow = true;
    scene.add(greenCube);

    var plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 200, 200),
      new THREE.MeshLambertMaterial({ color: '#ccc' }));
    plane.position.set(0, -1, 0)
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    var light = new THREE.SpotLight(0xffff00, 2, 100, Math.PI / 6, 25);
    light.position.set(0, 10, 0);
    light.target = greenCube;
    light.castShadow = true;
    light.shadow.camera.near = 2;
    light.shadow.camera.far = 1000;
    light.shadow.camera.fov = 30;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    scene.add(light);

    var showCamera = new THREE.CameraHelper(light.shadow.camera);
    scene.add(showCamera);
    // renderer.render(scene, camera);

    function run() {
      if (greenCube.position.z < 5) {
        greenCube.position.z += 0.1;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(run)
    }
    requestAnimationFrame(run)
  </script>
```