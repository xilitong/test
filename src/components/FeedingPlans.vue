<template>
  <div class="feeding-plans">
    <h1>饲喂计划</h1>
    <div class="card">
      <p>这是饲喂计划页面，可以制定和管理牛只的饲喂计划。</p>
      <div class="actions">
        <button class="btn btn-primary">创建饲喂计划</button>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>饲料类型</th>
              <th>饲喂时间</th>
              <th>饲喂量(公斤)</th>
              <th>适用牛群</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>青贮饲料</td>
              <td>每日早晚各一次</td>
              <td>5</td>
              <td>成年母牛</td>
              <td>2023-06-01</td>
              <td>
                <button class="btn btn-primary">编辑</button>
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
  name: 'FeedingPlans'
}
</script>