### LeanCloud
+ 引用SDK
```javascript
// 加载存储服务的LiveQuery模块
import AV from 'leancloud-storage/live-query'

// 初始化，使用应用的APP ID和APP Key
AV.init({
  appId: 'maMd3SMW377AXQtKAkBCS3WU-gzGzoHsz',
  appKey: 'QppscR1Rt2sEyiL4J7DnCKaT'
});
```
+ 订阅数据变更
> actions中除了初始数据拉取，后续的操作都不再触发commit，统一放在subscribe中触发
```javaScript
query.subscribe().then(liveQuery => {
  const { state, commit } = store;
  liveQuery.on("create", newTodo => {
    commit("add", { name: newTodo.attributes.name, id: newTodo.id });
  });
  ...
}
```

### 参考资料
+ [实时数据同步 LiveQuery 开发指南](https://leancloud.cn/docs/livequery-guide.html)
