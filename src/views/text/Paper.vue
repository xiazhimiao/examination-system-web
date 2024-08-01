<script lang="ts" setup>
import { ref } from 'vue';
const form = ref({
    types: '',
    table: '',
    delivery: false,
    type: []
})

const data = ref([])

const tableName = ref([{
    id: 0,
    name: '请选择分类',
    state: 1,//1:未发布 0:已发布
    createTime: new Date() // 初始赋值为null
}])



import { textCategoryListService, textListService } from '@/api/text.js'
const infoTypes = () => {
    console.log('submit!');
    textCategoryListService().then(res => {
        console.log('进入请求方法');
        for (let i = 0; i < res.data.length; i++) {
            console.log('进入请求方法循环');
            const item = res.data[i];
            data.value.push({
                label: item,
                value: i + 1
            })
        }
        console.log(data.value);

    })
}

infoTypes()

const onSubmit = () => {
    console.log('submit!');
}



//选择类别后触发的函数
const selectTrigger = (val) => {
    console.log(val)
    //form.value.types = val; // 更新 form.types 的值
    console.log(form.value.types)
    console.log(form)




    textListService(val).then(res => {
        console.log('进入请求方法');
        tableName.value = res.data

    })
}

const edit = (row) => {
  console.log(row)
  console.log(row.state)

    if(row.state==0){
        open1(row)
    }else{
        open()
    }
}

import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const open = () => {
  ElMessageBox.alert('你选择的是未发布试卷，无法进行作答', '温馨提示', {
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

const open1 = (row) => {
  ElMessageBox.confirm(
    '你确定要开始考试吗?',
    row.name,
    {
      confirmButtonText: '废话少说',
      cancelButtonText: '还是不考了',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '开始考试',
      });
      console.log("考试逻辑开始")
      textPaperSkip(row)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消考试',
      })
    })
}


import {paperName} from '@/stores/paperName.js'
import {useRouter} from 'vue-router'
const router = useRouter()
const textPaperName = paperName()
const textPaperSkip=(row)=>{
    if(row.name){
      //把得到的paperName存储到pinia中
      textPaperName.setPaperName(row.name)
        //跳转到首页 路由完成跳转
        router.push('/text/textPaper')
   }
}



</script>
<template>
    <el-card class="box-card">
        <div class="clearfix">
            <span>选择考试试卷</span>
            <el-divider></el-divider>
        </div>

        <el-form ref="for" :model="form" label-width="80px">

            <el-form-item label="语种选择">

                <el-select @change="selectTrigger(form.types)" v-model="form.types" placeholder="请选择考试语种">

                    <el-option v-for="item in data" :key="item.value" :label="item.label"
                        :value="item.label"></el-option>
                </el-select>

            </el-form-item>

            <el-card class="box-card">
                <div class="clearfix">
                    <span>试卷列表</span>
                    <el-divider></el-divider>
                </div>

                <div class="text item">
                    <el-table :data="tableName" :border=true styleid="width: 100%">

                        <el-table-column prop="id" label="ID">
                        </el-table-column>
                        <el-table-column prop="name" label="试卷名">

                        </el-table-column>
                        <el-table-column prop="state" label="试卷状态">

                            <template #default="{ row }">
                                <el-tag :type="row.state == 0 ? 'success' : 'danger'" disable-transitions>
                                    <!-- {{ row.state }} -->
                                    {{ row.state === 0 ? '已发布' : '未发布' }}
                                </el-tag>
                            </template>
                        </el-table-column>

                        <el-table-column prop="createTime" label="创建时间">
                        </el-table-column>


                        <el-table-column label="操作" show-overflow-tooltip>
                            <template #default="{ row }">
                                <el-button type="primary" plain @click="edit(row)">开始考试</el-button>
                            </template>
                        </el-table-column>


                    </el-table>
                </div>
            </el-card>





            <!-- <el-form-item>
            <el-button type="primary" @click="onSubmit">开始考试</el-button>
            <el-button>取消</el-button>
        </el-form-item> -->



        </el-form>
    </el-card>
</template>

<style scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 100%;
}
</style>