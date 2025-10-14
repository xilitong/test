<template>
  <div class="health-records">
    <h1>健康档案</h1>
    <div class="card">
      <p>这是健康档案页面，可以查看和管理牛只的健康信息。</p>
      <div class="actions">
        <button class="btn btn-primary">添加健康记录</button>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>耳标号</th>
              <th>检查日期</th>
              <th>健康状况</th>
              <th>兽医</th>
              <th>备注</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>N001234</td>
              <td>2023-06-10</td>
              <td>健康</td>
              <td>张兽医</td>
              <td>定期检查</td>
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
  name: 'HealthRecords'
}
</script>