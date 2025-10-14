<template>
  <div class="vaccination">
    <h1>疫苗接种</h1>
    <div class="card">
      <p>这是疫苗接种页面，可以管理牛只的疫苗接种计划和记录。</p>
      <div class="actions">
        <button class="btn btn-primary">添加疫苗记录</button>
        <button class="btn btn-success">疫苗接种计划</button>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>耳标号</th>
              <th>疫苗名称</th>
              <th>接种日期</th>
              <th>下次接种</th>
              <th>接种人员</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>N001234</td>
              <td>口蹄疫疫苗</td>
              <td>2023-05-15</td>
              <td>2023-11-15</td>
              <td>李技术员</td>
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
  name: 'Vaccination'
}
</script>