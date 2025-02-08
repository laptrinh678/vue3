<!-- <script setup>
import TheWelcome from '../components/TheWelcome.vue'
import Interpolation from '../components/Interpolation.vue'
import TowWayBinding from '@/components/TowWayBinding.vue'
import Masonry from '../components/Masonry.vue'
</script> -->

  <template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="Masonry" name="first">Masonry
      <p>Show data send from component Child: {{ message }}</p>
      <Masonry :message="message" @updateDataParent="showDataChild" @changeTabFromChild="changeTab"/>
    </el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>
</template>


<script lang="ts" setup>
import {ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Masonry from '../components/Masonry.vue'
const activeName = ref('first')
const handleClick = () => {
  console.log(activeName.value);
}
const message = ref('kkkk');
const showDataChild = (dataFromComponentChild)=>{
console.log(dataFromComponentChild)
message.value =   dataFromComponentChild

}
const changeTab = ()=>{
  activeName.value = 'second'
}
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>