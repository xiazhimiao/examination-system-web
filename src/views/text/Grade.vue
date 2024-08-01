<script setup>
import { textGradeListService } from '@/api/text.js'
import useUserInfoStore from '@/stores/userInfo.js'
const userInfoStore = useUserInfoStore();

textGradeListService(userInfoStore.info.id).then(res => {
  data.value = res.data
  console.log(data)
})

import { ref } from 'vue'


const data = ref([])

</script>



<template>
  <el-timeline style="max-width: 600px">

    <!-- <el-timeline-item timestamp="2018/4/1" placement="top">
      <el-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/12 20:46</p>
      </el-card>
    </el-timeline-item>

    <el-timeline-item timestamp="2018/4/3" placement="top">
      <el-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>

    <el-timeline-item timestamp="2018/4/2" placement="top">
      <el-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item> -->


    <el-timeline-item v-for="item in data.slice().reverse()" :key="item.name" :timestamp="item.createdAt" placement="top">
      <el-card>
        <h4>{{ item.name }}</h4>
        <p>Grade: {{ item.grade*10+'分' }}</p>
      </el-card>
    </el-timeline-item>

  </el-timeline>
</template>