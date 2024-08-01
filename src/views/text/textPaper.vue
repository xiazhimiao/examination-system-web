<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { paperName } from '@/stores/paperName.js'
const name = paperName();
const router = useRouter()
if (name.paperName == '') {
  console.log('不允许在未选择试卷的情况下进入本页面')
  router.push('/')
}

const radio = ref({})
const show = ref(false)

const topic = ref([
  {
    "id": 0,
    "topic": '',
    "select1": '',
    "select2": '',
    "select3": '',
    "select4": '',
    "answer": ''
  }
])

const topic1 = ref(
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


import { textService, textUploadService } from '@/api/text.js'

textService(name.paperName).then(res => {
  console.log(res)
  topic.value = res.data
  topic1.value = topic.value[0]
});


import {
  ArrowLeft,
  ArrowRight,
  Delete,
  Edit,
  Share,
  Upload
} from '@element-plus/icons-vue'

const up = () => {
  const id = topic1.value.id - 1
  if (id > 0) {
    topic1.value = topic.value[id - 1]
  } else {
    open1()
  }
}
const down = () => {
  const id = topic1.value.id + 1
  if (id <= topic.value.length) {
    topic1.value = topic.value[id - 1]
  } else {
    open2()
    show.value = true
  }
}

import useUserInfoStore from '@/stores/userInfo.js'
const userInfoStore = useUserInfoStore();


const upload = () => {
  console.log(radio.value)


  const rsp = {
    name: name.paperName,
    userId: userInfoStore.info.id,
    answer: radio.value
  }

  textUploadService(rsp).then(res => {
    console.log(res)
    if (res.data) {
      open3(res.data)
      router.push('/text/Grade')


    } else {
      open4()
    }

  })
}

import { ElNotification } from 'element-plus'

const open3 = (grade) => {
  ElNotification({
    title: '考试完毕',
    message: '你的成绩为' + grade * 10 + '分',
    type: 'success',
  })
}

const open4 = () => {
  ElNotification({
    title: '考试失败',
    message: '请联系管理员',
    type: 'error',
  })
}


import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'


const open1 = () => {
  ElMessageBox.alert('大人，这已经第一题了', '温馨提示', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: '好的，朕知道了',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}，这里并没有后续逻辑`,
      })
    },
  })
}


const open2 = () => {
  ElMessageBox.alert('大人，这已经是最后一题了', '温馨提示', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: '好的，朕知道了',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}，这里并没有后续逻辑`,
      })
    },
  })
}



</script>

<template>



  <el-card style="max-width: 480px">
    <template #header>
      <div class="card-header">
        <span>{{ '第' + topic1.id + '题目：' }}</span>
        <br />
        <span>{{ topic1.topic }}</span>
      </div>
    </template>

    <p>{{ 'A:' + topic1.select1 }}</p>
    <p>{{ 'B:' + topic1.select2 }}</p>
    <p>{{ 'C:' + topic1.select3 }}</p>
    <p>{{ 'D:' + topic1.select4 }}</p>





    <el-button-group>
      <el-button type="primary" :icon="ArrowLeft" @click=up()>上一题</el-button>
      <el-button type="primary" @click=down()>下一题<el-icon class="el-icon--right">
          <ArrowRight />
        </el-icon>
      </el-button>
      <el-button type="primary" v-show="show" @click=upload()>
        提交<el-icon class="el-icon--right">
          <Upload />
        </el-icon>
      </el-button>
    </el-button-group>




    <template #footer>
      <el-radio-group v-model="radio[topic1.id]">
        <el-radio :value="1">Option A</el-radio>
        <el-radio :value="2">Option B</el-radio>
        <el-radio :value="3">Option C</el-radio>
        <el-radio :value="4">Option C</el-radio>
      </el-radio-group>
      {{ '当前选择' + radio[topic1.id] }}
    </template>

  </el-card>
  
  


</template>
