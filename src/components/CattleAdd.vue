<template>
  <div class="cattle-add">
    <h1>添加牛只</h1>
    <div class="card">
      <form>
        <div class="form-group">
          <label for="earTag">耳标号:</label>
          <input type="text" id="earTag" class="form-control" placeholder="请输入耳标号">
        </div>
        <div class="form-group">
          <label for="breed">品种:</label>
          <select id="breed" class="form-control">
            <option value="">请选择品种</option>
            <option value="1">西门塔尔</option>
            <option value="2">夏洛莱</option>
            <option value="3">利木赞</option>
          </select>
        </div>
        <div class="form-group">
          <label for="gender">性别:</label>
          <select id="gender" class="form-control">
            <option value="">请选择性别</option>
            <option value="male">公</option>
            <option value="female">母</option>
          </select>
        </div>
        <div class="form-group">
          <label for="birthDate">出生日期:</label>
          <input type="date" id="birthDate" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">添加牛只</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CattleAdd'
}
</script>