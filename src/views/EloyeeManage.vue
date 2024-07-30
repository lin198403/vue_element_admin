<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="success" @click="importHandler" v-permission="'importUser'">
          {{ $t('eloyeeManage.excel_import') }}
        </el-button>
        <el-button type="danger" @click="exportHandler">{{ $t('eloyeeManage.excel_export') }}</el-button>
      </el-col>
      <el-col :span="24">
        <el-table
          :data="eloyeeList.list"
          :border="true"
        >
          <el-table-column type="index" label="id"></el-table-column>
          <el-table-column prop="username" :label="$t('eloyeeManage.name')"></el-table-column>
          <el-table-column prop="mobile" :label="$t('eloyeeManage.phone')"></el-table-column>
          <el-table-column :label="$t('eloyeeManage.avatar')">
            <template #default="scope">
              <el-avatar :size="30" :src="scope.row.avatar"/>
            </template>
          </el-table-column>
          <el-table-column :label="$t('eloyeeManage.role')">
            <template #default="scope">
              <el-tag 
                v-for="(item, index) in scope.row.role"
                :key="index"
              >
                {{ item.title }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('eloyeeManage.opening_time')">
            <template #default="scope">
              {{ dayFormat.format(scope.row.openTime) }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('eloyeeManage.operate')">
            <template #default="scope">
              <el-button type="success" size="small" @click="viewInfoHandler(scope.row._id)">
                {{ $t('eloyeeManage.view') }}
              </el-button>
              <el-button  type="info" size="small" @click="roleHandler(scope.row)" v-permission="'distributeRole'">
                {{ $t('eloyeeManage.role') }}
              </el-button>
              <el-button type="danger" size="small" @click="deleteHandler(scope.row)" v-permission="'removeUser'">
                {{ $t('eloyeeManage.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination 
          v-model:current-page="page"
          v-model:page-size="size"
          :total="Number(eloyeeList.total)"
          layout="prev, pager, next, jumper, total"
        />
      </el-col>
    </el-row>

    <dialog-component 
      v-model="roleOpts.showDialog" 
      :title="$t('eloyeeManage.dialog_title')"
      @confirm-event="dialogConfirmHandler"
    >
      <el-checkbox-group v-model="roleOpts.userRoleList">
        <el-checkbox 
          v-for="item in roleListStore.roleList" 
          :key="item.id" 
          :label="item.title" 
          :value="item.title"
        />
      </el-checkbox-group>
    </dialog-component>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch, onActivated, inject, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { userManageListApi, userManageDeteleByIdApi, updateRoleApi } from '@/api'
  import watchLocate from '@/utils/watchLocate'
  import { useI18n } from 'vue-i18n'
  import excel from '@/utils/excel'
  import { EXCEL_HEADERS } from '@/constant'
  import useLocaleStore from '@/stores/locale'
  import userRoleListStore from '@/stores/roleList'
  
  import DialogComponent from '@/components/DialogComponent.vue'
  const router = useRouter()
  const dayFormat = inject('dayFormat')
  const i18n = useI18n()
  const localeStore = useLocaleStore()
  const roleListStore = userRoleListStore()
  

  const page = ref(1)
  const size = ref(10)
  const eloyeeList = ref([])


  // http 请求数据
  const httpRequestFunc = async ({ page, size } = { page: 0, size: 0 }) => {
    const { data: userManageListData } = await userManageListApi({
      page,
      size
    })

    return userManageListData
  }

  // 初始化函数
  const initFunc = async () => {

    eloyeeList.value = await httpRequestFunc({
      page: page.value,
      size: size.value
    })

  }

  // 导入 Excel
  const importHandler = () => {
    router.push('/user/import')
  }

  // 删除某条数据
  const deleteHandler = row => {

    const { _id, username } = row

    ElMessageBox.confirm(i18n.t('eloyeeManage.comfirm_tip', [`${username}`]), {
      type: 'warning',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    })
    .then(async value => {
      if(value === 'confirm') {

        const { success, message } = await userManageDeteleByIdApi(_id)

        if(success) {
          await initFunc()
        }

        ElMessage({
          message: `${username}, ${message}`,
          type: success ? 'success' : 'error'
        })
      }
    }).catch(() => {})
  }

  // 导出 Excel
  const exportHandler = () => {

    ElMessageBox.prompt(
      i18n.t('eloyeeManage.import_tip'),
      {
        confirmButtonText: i18n.t('eloyeeManage.import_ok_btn'),
        cancelButtonText: i18n.t('eloyeeManage.import_close_btn'),
        inputValue: i18n.t('eloyeeManage.import_input_value'),
        autofocus: false,
      }
    )
    .then(async ({value, action}) => {

      if(action === 'confirm') {
        const { list } = await httpRequestFunc()
        const filterData = list.map(el => {
          const { mobile, openTime, role, username } = el
          return {
            username,
            role: role.map(el => el.title).toString().replace(',', ' '),
            mobile,
            openTime: dayFormat(openTime)
          }
        })

        excel.exportFunc(filterData, value, EXCEL_HEADERS.eloyeeTable[localeStore.locale])

      }

    }).catch((err) => { console.log(err)})

  }


  // 查看详情
  const viewInfoHandler = _id => {
    router.push({ name: 'userInfo', params: { id: _id } })
    // router.push(`/user/userInfo/${_id}`)
  }



  // 角色
  const roleOpts = reactive({
    showDialog: false,
    userRoleList: [],
    userId: '',
    username: ''
  })
  const roleHandler = row => {
    const { role, _id, username } = row
    roleOpts.showDialog = true
    roleOpts.userRoleList = role.map(el => el.title)
    roleOpts.userId = _id
    roleOpts.username = username
  }
  const dialogConfirmHandler = async () => {
    
    const roles = roleOpts.userRoleList.map(title => {
      return roleListStore.roleList.find(el => el.title === title)
    })
  
    const { success, message } = await updateRoleApi(roleOpts.userId, {
      roles
    })

    if(success) {

      await initFunc()

    }

    ElMessage({
      message: `${roleOpts.username}, ${message}`,
      type: success ? 'success' : 'error'
    })

  }


  // mounted
  onMounted(async () => {

    await initFunc()

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