<!--
 * @Author: your name
 * @Date: 2022-04-01 14:07:24
 * @LastEditTime: 2022-04-08 19:15:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-nestjs-ci-cd/fe-end/src/components/HelloWorld.vue
-->
<script setup lang="ts">
import axios from 'axios'

import { ref, onMounted } from 'vue'

const count = ref(0)

defineProps<{ msg: string }>()

const getAPIData = async function () {
  const data = await axios.get('/api/data')
  count.value = data.data
}

const initData = async function() {
  const data = await axios.get('/api/initData')
  count.value = data.data
}

onMounted(() => {
  initData()
})

const getData = function() {
  count.value = 1000
  getAPIData()
}

</script>

<template>
  <p>
    Home
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
