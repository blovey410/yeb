<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router>
            <el-sub-menu
              index="1"
              v-for="(item, index) in navLeft"
              :key="index">
              <template #title>
                <el-icon><Menu /></el-icon>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="children.path"
                  v-for="(children, indexj) in item.children"
                  :key="indexj"
                  ><span>{{ children.name }}</span></el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main> <RouterView /> </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const navLeft = ref([]);
navLeft.value = router.options.routes.filter(item => {
  return item.hidden == false;
});
console.log(navLeft.value);
</script>
