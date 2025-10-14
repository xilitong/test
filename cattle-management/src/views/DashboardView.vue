<template>
  <div class="dashboard">
    <h1>{{ $t('dashboard.title') }}</h1>
    <div class="stats-container">
      <div class="stat-card" v-for="stat in stats" :key="stat.title">
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-info">
          <h3>{{ $t(stat.title) }}</h3>
          <p>{{ stat.value }}</p>
        </div>
      </div>
    </div>
    
    <div class="charts-container">
      <div class="chart">
        <h2>{{ $t('dashboard.totalCattle') }}</h2>
        <div class="chart-placeholder">
          [图表区域]
        </div>
      </div>
      <div class="chart">
        <h2>{{ $t('dashboard.recentActivities') }}</h2>
        <div class="activities">
          <div class="activity" v-for="activity in recentActivities" :key="activity.id">
            <p>{{ $t(activity.description) }}</p>
            <span>{{ activity.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'DashboardView',
  setup() {
    const stats = ref([
      { icon: '🐄', title: 'dashboard.totalCattle', value: '128 头' },
      { icon: '❤️', title: 'dashboard.breedingPairs', value: '24 对' },
      { icon: '💊', title: 'dashboard.healthStatus', value: '良好 98%' },
      { icon: '🌾', title: 'dashboard.feedInventory', value: '充足' }
    ])
    
    const recentActivities = ref([
      { id: 1, description: 'dashboard.addCattle', time: '2小时前' },
      { id: 2, description: 'dashboard.vaccinationCompleted', time: '5小时前' },
      { id: 3, description: 'dashboard.feedingPlanUpdated', time: '1天前' },
      { id: 4, description: 'dashboard.healthCheckCompleted', time: '2天前' }
    ])
    
    return {
      stats,
      recentActivities
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 32px;
  margin-right: 15px;
}

.stat-info h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.stat-info p {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #4CAF50;
}

.charts-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.chart {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.chart h2 {
  margin-top: 0;
  color: #333;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  border-radius: 4px;
  color: #999;
}

.activities {
  max-height: 300px;
  overflow-y: auto;
}

.activity {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.activity:last-child {
  border-bottom: none;
}

.activity p {
  margin: 0 0 5px 0;
}

.activity span {
  font-size: 12px;
  color: #999;
}
</style>