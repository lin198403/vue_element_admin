<template>
  <div class="editor-component">
    <Toolbar
      :editor="editorRef"
      class="toolbar"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      v-model="contentModel"
      :defaultConfig="editorConfig"
      @onCreated="createdHandler"
      @onBlur="blurHandler"
    />
  </div>
</template>

<script setup>
  import '@wangeditor/editor/dist/css/style.css'
  import { onBeforeUnmount, ref, shallowRef } from 'vue'
  import { i18nChangeLanguage } from '@wangeditor/editor'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import watchLocate from '@/utils/watchLocate'
  import { useFormItem } from 'element-plus'
  import { debugWarn } from 'element-plus/es/utils/error'
  const { formItem } = useFormItem()
 
  const contentModel = defineModel({
    type: String,
    default: ''
  })
  const props = defineProps({
    placeholder: {
      type: String,
      default: ''
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  })

  const editorRef = shallowRef()
  const editorConfig = ref({ 
    placeholder: props.placeholder,
    autoFocus: false,
    MENU_CONF: {
      // 上传图片，上传视频
    }
  })

  const blurHandler = () => {
    if(props.validateEvent) {
      formItem?.validate('blur').catch(err => debugWarn(err))
    }
  }

 
  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
  })

  const createdHandler = (editor) => {
    editorRef.value = editor
  }

  watchLocate(
    (cur) => {
      if(cur === 'en') {
        i18nChangeLanguage('en')
      }
      if(cur === 'zhCn') {
        i18nChangeLanguage('zh-CN')
      }
    },
    {
      immediate: true
    }
  )
</script>

<style lang="scss" scoped>
  :global(.el-form-item.is-error .editor-component) {
    box-shadow: 0 0 0 1px var(--el-color-danger) inset;
  }

  .editor-component {
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    padding: 1px var(--el-input-border-radius, var(--el-border-radius-base));
    transition: var(--el-transition-box-shadow);
  }
</style>