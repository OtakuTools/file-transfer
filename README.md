##  快传助手

## 作者简介

[zhutaohuang](https://github.com/ZTao-z)

## 作品介绍

本作品的使用场景主要是实现多端文件即时互传，通过将文件资源保存在云端可以实现随时随处下载。

### 项目架构
![image](https://user-images.githubusercontent.com/23055040/119536034-36bfb700-bdbb-11eb-942d-2bfcf86087b0.png)

### 交互流程
![image](https://user-images.githubusercontent.com/23055040/119536055-3cb59800-bdbb-11eb-81fa-5fda60033b5e.png)


### 界面截图
1. 上传功能
    - 选择文件或文本（以文本为例）
    
    ![上传2](https://user-images.githubusercontent.com/23055040/119532516-8ac89c80-bdb7-11eb-843e-ffefd695f81e.PNG)
    
    - 拿到下载码

    ![上传3](https://user-images.githubusercontent.com/23055040/119532551-90be7d80-bdb7-11eb-953f-a27185e74a97.PNG)
    
2. 下载功能
    - 输入下载码
    
    ![下载1](https://user-images.githubusercontent.com/23055040/119532565-94520480-bdb7-11eb-9519-b38c64a98642.PNG)
    
    - 获取下载内容
    
   ![下载2](https://user-images.githubusercontent.com/23055040/119532580-97e58b80-bdb7-11eb-955b-6fc7d6cd3d0a.PNG)

## 模块介绍

1. 前端网站（静态网站托管）：作品前端页面，主要负责用户交互。

2. 网站后端（云函数）: 主要负责文件上传下载以及鉴权功能，包括获取COS Token，生成下载码等。

3. 网站数据库（云数据库）：主要负责保存下载码与文件资源的对应关系。

4. 文件资源存储（对象存储COS）：主要负责保存文件资源。

