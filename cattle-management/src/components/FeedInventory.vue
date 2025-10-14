<template>
  <div class="feed-inventory">
    <h1>饲料库存</h1>
    <div class="card">
      <p>这是饲料库存页面，可以查看和管理各种饲料的库存情况。</p>
      <div class="actions">
        <button class="btn btn-primary">添加饲料入库</button>
        <button class="btn btn-success">饲料出库记录</button>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>饲料名称</th>
              <th>库存数量(公斤)</th>
              <th>单位</th>
              <th>最后更新</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>青贮饲料</td>
              <td>5000</td>
              <td>公斤</td>
              <td>2023-06-15</td>
              <td>充足</td>
              <td>
                <button class="btn btn-primary">详情</button>
              </td>
            </tr>
            <tr>
              <td>精饲料</td>
              <td>2000</td>
              <td>公斤</td>
              <td>2023-06-10</td>
              <td>一般</td>
              <td>
                <button class="btn btn-primary">详情</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeedInventory'
}
</script>