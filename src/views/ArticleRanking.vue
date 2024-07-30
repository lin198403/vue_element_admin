<template>
  <div>
    <el-row>
      <el-col :span="24">
        {{ $t('articleRanking.dynamic_display', [' :']) }}
        <el-checkbox-group 
          v-model="checkList"
          :min="2"
        >
          <el-checkbox 
            v-for="(opt, index) in checkOptions"
            :key="index"
            :label="$t(`articleRanking.${opt}`)" 
            :value="opt"
          />
        </el-checkbox-group>
      </el-col>
      <el-col :span="24">
        <el-table
          ref="tableRef"
          :border="true"
          :data="articleData.list"
          :row-key="generateRowKey"
          :row-class-name="generateRowClassName"
        >
          <el-table-column 
            v-for="item in checkList"
            :label="$t(`articleRanking.${item}`)"
            :column-key="item"
          >
            <template #default="scope">
              {{ item === 'publicDate' ?  dayFormat.relativeFormat(scope.row[item]) : scope.row[item]}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('articleRanking.operate')" class-name="filtered">
            <template #default="scope">
              <el-button type="success" size="small" @click="viewInfoHandler(scope.row._id)">
                {{ $t('articleRanking.view_btn') }}
              </el-button>
              <el-button type="danger" size="small" @click="deleteHandler(scope.row)">
                {{ $t('articleRanking.delete_btn') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination 
          v-model:current-page="page"
          v-model:page-size="size"
          :total="Number(articleData.total)"
          layout="prev, pager, next, jumper, total"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch, onActivated, inject } from 'vue'
  import { articleListApi, articleSortApi, articleDeleteApi } from '@/api'
  import watchLocate from '@/utils/watchLocate'
  import Sortable from 'sortablejs'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  const dayFormat = inject('dayFormat')
  const i18n = useI18n()
  const router = useRouter()
  const page = ref(1)
  const size = ref(5)
  const articleData = ref({})
  const checkList = ref([])
  const checkOptions = ref([])
  const tableRef = ref(null)

  // 初始化函数
  const initFunc = async () => {

    const { data } = await articleListApi({
      page: page.value,
      size: size.value
    })
    
    articleData.value = data
  }

  
  // 初始化动态展示
  const checkBoxInitFunc = arr => {
    const [_id, ...rest] = Object.keys(arr)
    checkList.value = rest
    checkOptions.value = rest
  }


  // 拖拽
  const generateRowKey = row => {
    return row._id
  }
  const generateRowClassName = row => {
    const { row: { ranking } } = row
    return `data-ranking-${ranking}`
  }
  const sortTableFunc = {
    rowDrop: () => {
      const rowEl = tableRef.value.$refs.tableBody.querySelector('tbody')
      let initRanking = null, finalRanking = null
      const regex = /data-ranking-(\d+)/g
      Sortable.create(rowEl, {
        onMove: evt => {
          initRanking = evt.dragged.classList.value.match(regex)[0].split('-')[2]
          finalRanking = evt.related.classList.value.match(regex)[0].split('-')[2]
        },
        onEnd: async () => {
          const { success, message } = await articleSortApi({
            initRanking,
            finalRanking,
          })

          if(success) {
            await initFunc()
          }
      
          ElMessage({
            type: success ? 'success' : 'error',
            message
          })
        }
      })
    },
    colDrop: () => {
      /** 
       * const colEl = tableRef.value.$refs.tableHeader.querySelector('thead tr')
       * Sortable.create(colEl, {
       *  filter: '.filtered',
       *  onEnd: evt => {
       *    
       *  }
       */
    }
  }

  // 查看详情
  const viewInfoHandler = id => {
    router.push(`/article/articleDetail/${id}`)
  }

  // 删除某条数据
  const deleteHandler = async row => {

    const { _id, title } = row

    ElMessageBox.confirm(i18n.t('articleRanking.comfirm_tip', [`${title}`]), {
      type: 'warning',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    })
    .then(async value => {
      if(value === 'confirm') {
        const { success, message } = await articleDeleteApi(_id)

        if(success) {
          await initFunc()    
        }

        ElMessage({
          message: `${title}, ${message}`,
          type: success ? 'success' : 'error'
        })

      }
    }).catch(() => {})
  }

  // mounted
  onMounted(async () => {

    await initFunc()

    if(articleData.value?.list?.length !== 0 ) {
      checkBoxInitFunc(articleData.value.list[0])
    }

    sortTableFunc.rowDrop()
    sortTableFunc.colDrop()
  })


  // 国际化
  watchLocate(async () => {
    await initFunc()
  })


  // 切换页码
  watch(
    () => page.value,
    async () => {
      await initFunc()
    }
  )
  
 
  // 组件活跃态，更新
  let isFirst = true
  onActivated(async() => {
    if(!isFirst) {
      await initFunc()
      return 
    }
    isFirst = false
  })
  
</script>