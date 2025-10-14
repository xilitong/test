<template>
  <div class="breeding-records">
    <h1>繁殖记录</h1>
    <div class="card">
      <p>这是繁殖记录页面，可以查看和管理牛只的繁殖信息。</p>
      <div class="actions">
        <button class="btn btn-primary">添加繁殖记录</button>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>母牛耳标号</th>
              <th>配种日期</th>
              <th>公牛耳标号</th>
              <th>预计产犊日期</th>
              <th>实际产犊日期</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>N001234</td>
              <td>2023-05-10</td>
              <td>N002345</td>
              <td>2024-02-15</td>
              <td>-</td>
              <td>怀孕中</td>
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
  name: 'BreedingRecords'
}
</script>