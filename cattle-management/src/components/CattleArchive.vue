<template>
  <div class="cattle-archive">
    <h1>牛只档案</h1>
    <div class="card">
      <p>这是牛只档案页面，可以查看所有牛只的详细档案信息。</p>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>耳标号</th>
              <th>品种</th>
              <th>性别</th>
              <th>出生日期</th>
              <th>当前状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>N001234</td>
              <td>西门塔尔</td>
              <td>母</td>
              <td>2022-03-15</td>
              <td>健康</td>
              <td>
                <button class="btn btn-primary">查看详情</button>
              </td>
            </tr>
            <tr>
              <td>N001235</td>
              <td>夏洛莱</td>
              <td>公</td>
              <td>2022-04-21</td>
              <td>健康</td>
              <td>
                <button class="btn btn-primary">查看详情</button>
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
  name: 'CattleArchive'
}
</script>