<script setup>
import { ref } from 'vue'
const tableData = ref([])

import { textCategoryListService } from '@/api/text.js'
textCategoryListService().then(res => {
    //ref.data = res.data
    // console.log(res.data)

    // 循环遍历 res.data 并将每个元素添加到 ref 数组中
    // res.data.forEach(item => {
    //   data.value.push({ name: item, id: 1 });
    // });


    //     tableData.value.push({ name: 'Alice', id: 1 });
    //     tableData.value.push({ name: 'Bob', id: 2 });
    // })

    for (let i = 0; i < res.data.length; i++) {
        const item = res.data[i]; i
        tableData.value.push({ name: item, id: i });
    }
})

</script>

<template>
    <el-card class="box-card">
        <div class="clearfix">
            <span>试卷分类</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="link">操作按钮</el-button> -->
            <el-divider></el-divider>
        </div>
        <div class="text item">
            <el-table :data="tableData" :border=true  styleid="width: 100%">

                <el-table-column prop="id" label="ID" >
                </el-table-column>
                <el-table-column prop="name" label="语种" >
                </el-table-column>

            </el-table>
        </div>
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
      width: 480px;
  }
</style>
