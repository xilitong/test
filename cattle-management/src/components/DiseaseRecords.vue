<template>
  <div class="disease-records">
    <h1>疾病记录</h1>
    <div class="card">
      <p>这是疾病记录页面，可以记录和追踪牛只的疾病治疗情况。</p>
      <div class="actions">
        <button class="btn btn-primary">添加疾病记录</button>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>耳标号</th>
              <th>发病日期</th>
              <th>疾病名称</th>
              <th>治疗措施</th>
              <th>负责兽医</th>
              <th>康复状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>N001235</td>
              <td>2023-06-01</td>
              <td>消化不良</td>
              <td>调整饲料，药物治疗</td>
              <td>王兽医</td>
              <td>已康复</td>
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
  name: 'DiseaseRecords'
}
</script>