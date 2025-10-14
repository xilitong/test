<template>
  <div class="main-layout">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <div class="logo">
        <h2>{{ $t('mainLayout.logoText') }}</h2>
      </div>
      <nav class="menu">
        <ul>
          <li v-for="item in menuItems" :key="item.name" 
              :class="{ active: isItemActive(item) }">
            <div v-if="item.children" class="menu-item has-children" @click="toggleMenu(item)">
              <i :class="item.icon"></i>
              <span>{{ $t(item.label) }}</span>
              <span class="arrow" :class="{ 'arrow-rotate': item.expanded }">▶</span>
            </div>
            <div v-else class="menu-item" @click="navigateTo(item.path, item.name)">
              <i :class="item.icon"></i>
              <span>{{ $t(item.label) }}</span>
            </div>
            
            <!-- 二级菜单 -->
            <ul v-if="item.children && item.expanded" class="submenu">
              <li v-for="child in item.children" :key="child.name"
                  :class="{ active: $route.name === child.name }"
                  @click="navigateTo(child.path, child.name)">
                <i :class="child.icon"></i>
                <span>{{ $t(child.label) }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <header class="header">
        <div class="user-info">
          <span>{{ $t('mainLayout.welcome') }}, {{ $t('mainLayout.admin') }}</span>
          <button @click="logout" class="logout-btn">{{ $t('mainLayout.logout') }}</button>
        </div>
      </header>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'MainLayout',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const menuItems = ref([
      { 
        name: 'dashboard', 
        path: '/dashboard', 
        label: 'mainLayout.dashboard', 
        icon: '📊' 
      },
      { 
        name: 'cattle-management',
        label: 'mainLayout.cattleManagement', 
        icon: '🐄',
        expanded: false,
        children: [
          { name: 'cattle-list', path: '/cattle', label: 'mainLayout.cattleList', icon: '📋' },
          { name: 'cattle-add', path: '/cattle/add', label: 'mainLayout.addCattle', icon: '➕' },
          { name: 'cattle-archive', path: '/cattle/archive', label: 'mainLayout.cattleArchive', icon: '📁' }
        ]
      },
      { 
        name: 'breeding-management',
        label: 'mainLayout.breedingManagement', 
        icon: '❤️',
        expanded: false,
        children: [
          { name: 'breeding-records', path: '/breeding', label: 'mainLayout.breedingRecords', icon: '📝' },
          { name: 'breeding-calendar', path: '/breeding/calendar', label: 'mainLayout.breedingCalendar', icon: '📅' }
        ]
      },
      { 
        name: 'feeding-management',
        label: 'mainLayout.feedingManagement', 
        icon: '🌾',
        expanded: false,
        children: [
          { name: 'feeding-plans', path: '/feeding', label: 'mainLayout.feedingPlans', icon: '📋' },
          { name: 'feed-inventory', path: '/feeding/inventory', label: 'mainLayout.feedInventory', icon: '📦' }
        ]
      },
      { 
        name: 'health-management',
        label: 'mainLayout.healthManagement', 
        icon: '💊',
        expanded: false,
        children: [
          { name: 'health-records', path: '/health', label: 'mainLayout.healthRecords', icon: '📋' },
          { name: 'vaccination', path: '/health/vaccination', label: 'mainLayout.vaccination', icon: '💉' },
          { name: 'diseases', path: '/health/diseases', label: 'mainLayout.diseases', icon: '🦠' }
        ]
      },
      { 
        name: 'statistics',
        label: 'mainLayout.statistics', 
        icon: '📈',
        expanded: false,
        children: [
          { name: 'production-stats', path: '/statistics/production', label: 'mainLayout.productionStats', icon: '📊' },
          { name: 'health-stats', path: '/statistics/health', label: 'mainLayout.healthStats', icon: '📉' }
        ]
      }
    ])
    
    const isItemActive = (item) => {
      if (item.children) {
        return item.children.some(child => child.name === route.name)
      }
      return route.name === item.name
    }
    
    const toggleMenu = (item) => {
      if (item.children) {
        item.expanded = !item.expanded
      }
    }
    
    const navigateTo = (path, name) => {
      router.push({ path, name })
    }
    
    const logout = () => {
      localStorage.removeItem('isAuthenticated')
      router.push('/login')
    }
    
    return {
      menuItems,
      isItemActive,
      toggleMenu,
      navigateTo,
      logout
    }
  }
}
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

.sidebar {
  width: 250px;
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow-y: auto;
}

.logo {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo h2 {
  margin: 0;
  font-size: 20px;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu > ul > li {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.menu-item {
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.3s;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu-item.has-children {
  justify-content: space-between;
}

.menu-item i {
  margin-right: 10px;
  font-size: 18px;
  width: 24px;
  text-align: center;
}

.arrow {
  transition: transform 0.3s ease;
  font-size: 12px;
}

.arrow-rotate {
  transform: rotate(90deg);
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.1);
}

.submenu li {
  padding: 12px 20px 12px 54px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.3s;
  border-left: 3px solid transparent;
}

.submenu li:hover {
  background: rgba(255, 255, 255, 0.1);
}

.submenu li.active {
  background: rgba(255, 255, 255, 0.2);
  border-left: 3px solid white;
}

.submenu li i {
  margin-right: 10px;
  font-size: 16px;
  width: 24px;
  text-align: center;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  padding: 15px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
}

.user-info {
  display: flex;
  align-items: center;
}

.logout-btn {
  margin-left: 15px;
  padding: 8px 15px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.logout-btn:hover {
  background: #45a049;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>