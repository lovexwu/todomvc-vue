### LeanCloud
+ 安装与引用SDK
```shell
// 安装存储服务模块
yarn add leancloud-storage -S
```
```javascript
// 加载存储服务模块
import AV from 'leancloud-storage'

// 初始化，使用应用的APP ID和APP Key
AV.init({
  appId: 'maMd3SMW377AXQtKAkBCS3WU-gzGzoHsz',
  appKey: 'QppscR1Rt2sEyiL4J7DnCKaT'
});
```
+ 增删改、查
```
对象：增save、删destory、改save
查：find
批量：删find => destroyAll、改find => saveAll
```

### 参考资料
+ [LeanCloud](https://leancloud.cn/)
