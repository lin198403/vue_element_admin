<template>
  <i class="iconfont" @click="driverObj.drive()">&#xe640;</i>
</template>

<script setup>
  import "driver.js/dist/driver.css"
  import { driver } from "driver.js"
  import { useI18n } from 'vue-i18n'
  import watchLocate from '@/utils/watchLocate'
  const i18n = useI18n()


  let driverObj = null

  const driveInit = () => {
    return driver({
      allowClose: false,
      showProgress: true,
      nextBtnText: i18n.t('guide.next_btn_text'),
      prevBtnText: i18n.t('guide.prev_btn_text'),
      doneBtnText: i18n.t('guide.done_btn_text'),
      steps: [
        {
          element: '.guide-start',
          popover: {
            title: i18n.t('guide.guide_start_title'),
            description: i18n.t('guide.guide_start_description')
          }
        },
        {
          element: '.guide-search',
          popover: {
            title: i18n.t('guide.guide_search_title'),
            description: i18n.t('guide.guide_search_description')
          }
        },
        {
          element: '.guide-fullscreen',
          popover: {
            title: i18n.t('guide.guide_fullscreen_title'),
            description: i18n.t('guide.guide_fullscreen_description')
          }
        },
        {
          element: '.guide-skin',
          popover: {
            title: i18n.t('guide.guide_skin_title'),
            description: i18n.t('guide.guide_skin_description')
          }
        },
        {
          element: '.guide-lang-select',
          popover: {
            title: i18n.t('guide.guide_lang_select_title'),
            description: i18n.t('guide.guide_lang_select_description')
          }
        },
        {
          element: '.guide-personal',
          popover: {
            title: i18n.t('guide.guide_personal_title'),
            description: i18n.t('guide.guide_personal_description')
          }
        },
        {
          element: '.guide-setting',
          popover: {
            title: i18n.t('guide.guide_setting_title'),
            description: i18n.t('guide.guide_setting_description')
          }
        },
        {
          element: '.guide-breadcrumb',
          popover: {
            title: i18n.t('guide.guide_breadcrumb_title'),
            description: i18n.t('guide.guide_breadcrumb_description')
          }
        },
        {
          element: '.guide-tag-bar',
          popover: {
            title: i18n.t('guide.guide_tag_bar_title'),
            description: i18n.t('guide.guide_tag_bar_description')
          }
        },
        {
          element: '.guide-side-menu',
          popover: {
            title: i18n.t('guide.guide_side_menu_title'),
            description: i18n.t('guide.guide_side_menu_description')
          }
        }
      ]
    })
  }
  
  watchLocate(() => {
    driverObj = driveInit()
  }, { immediate: true})
</script>