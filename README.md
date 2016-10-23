# Nullchan

一个P2P揭示板引擎，为 [ZeroNet](https://github.com/HelloZeroNet/ZeroNet) 设计  

### 示例

* [本地ZeroNet](http://127.0.0.1:43110/1fu1iNKkkCZRwD37N6oB6mv1oHWiPVUCf) (如果你安装并运行了Zeronet)
* [zero.pags.to](https://onlyzero.net:43110/1fu1iNKkkCZRwD37N6oB6mv1oHWiPVUCf) 镜像
* [bit.no.com](https://onlyzero.net:43110/1fu1iNKkkCZRwD37N6oB6mv1oHWiPVUCf) 镜像

### 中文版建站步骤（小白专用，Windows平台，没有git）：
1.在ZeroNet目录下按住Shift，在空白处点击右键打开菜单，点击“在此处运行命令窗口”  
2.复制 `..\Python\python.exe zeronet.py siteCrate` ，粘贴，回车  
3.过一会会出现网站的地址和密钥，Ctrl+A，Ctrl+V，在一个靠谱的地方新建一个文本文档，粘贴进去，保存，别弄丢了。  
4.输入yes，回车  
5.在ZeroNet\data找到以地址命名的文件夹  
6.下载这个repo，将文件解压到ZeroNet创建的网站文件夹中  
7.在根目录下打开文件 `content.example.json` 和ZeroNet创建的 `content.json` 文件  
8.把 `content.example.json` 中最外面两个大括号中间的内容，复制到 `content.json` 最后一个大括号之前 
9.将 `data/settings.example.json` 复制到 `data/settings.json`。编辑 `data/settings.json`, 他看起来像这样：  
    
        {  
          "siteName": "0chan",          // 你网站的名字  
          "siteAddress": "0chan.bit",   // 有namecion域名就填域名，没域名填写地址  
                                        // 例如. "1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6" or "0chan.bit"  
          "threadsPerPage": 15,         // 每页显示的帖子数目（其实chan术语叫“串”）  
          "boards": [   
        {  
          "priority": 1,            // 这个板块显示在首页列表的第几个  
          "key": "b",               // 板块目录名称  
          "name": "Random stuff"    // 板块标题，暂时只能用英文  
        }  
        {  
          "priority": 2,            // 另一个板块  
          "key": "c",  
          "name": "someting"  
        }  
      ]  
    }  
    
10.复制 `data/users/user-content.example.json` 到 `data/users/content.json`,   
11.打开你之前创建的文本文档  
12.在ZeroNet目录下按住Shift，在空白处点击右键打开菜单，点击“在此处运行命令窗口”  
13.复制 `..\Python\python.exe zeronet.py siteSign 1fu1iNKkkCZRwD37N6oB6mv1oHWiPVUCf --publish` ，粘贴，回车  
14.复制你之前保存的密钥，粘贴，回车  
15.输入 `..\Python\python.exe zeronet.py siteSign 网站地址 --inner_path data/users/content.json --publish` ，粘贴，回车  
16.复制你之前保存的密钥，粘贴，回车  
17.运行Zeronet，打开网站检查一下  
18.按照GFWtalk的置顶帖发布一下


### 截图

![截图](http://p1.bqimg.com/567571/eaaca9b91673f0da.png)
