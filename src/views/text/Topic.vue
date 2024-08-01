
<script setup>
import { ref } from 'vue'
const radio = ref(1)
const topic = ref(
  {
    "id": 0,
    "topic": '',
    "select1": '',
    "select2": '',
    "select3": '',
    "select4": '',
    "answer": ''
  }
)
</script>
<template>

    <el-card style="max-width: 480px" >
      <template #header>
        <div class="card-header">
          <span>{{topic.name}}</span>
        </div>
      </template>
      
      <p>{{ topic.select1 }}</p>
      <p>{{ topic.select2 }}</p>
      <p>{{ topic.select3 }}</p>
      <p>{{ topic.select4 }}</p>
      
  
      <template #footer>
        <el-radio-group v-model="radio">
          <el-radio :value="1">Option A</el-radio>
          <el-radio :value="2">Option B</el-radio>
          <el-radio :value="3">Option C</el-radio>
          <el-radio :value="4">Option C</el-radio>
        </el-radio-group>
        {{ radio }}
      </template>
    </el-card>
  
  
  
  
  </template>