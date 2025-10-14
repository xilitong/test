<template>
  <div class="health-stats">
    <h1>健康统计</h1>
    <div class="card">
      <p>这是健康统计页面，展示牛只健康相关的统计数据。</p>
      <div class="stats-container">
        <div class="stat-card">
          <h3>健康牛只</h3>
          <p class="stat-value">125头</p>
        </div>
        <div class="stat-card">
          <h3>患病牛只</h3>
          <p class="stat-value">3头</p>
        </div>
        <div class="stat-card">
          <h3>疫苗接种率</h3>
          <p class="stat-value">98%</p>
        </div>
        <div class="stat-card">
          <h3>月度死亡率</h3>
          <p class="stat-value">0.5%</p>
        </div>
      </div>
      <div class="chart-placeholder">
        [健康统计图表]
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HealthStats'
}
</script>

<style scoped>
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.stat-card {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #4CAF50;
  margin: 10px 0 0;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  border-radius: 4px;
  color: #999;
  margin-top: 20px;
}
</style>