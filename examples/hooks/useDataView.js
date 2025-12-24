/*
 * @Name: useDataView.js
 * @Description:
 * @Date: 2025-12-24 08:50:40
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2025-12-24 08:50:40
 */
import {onMounted} from "vue"
import {initDataView} from "@vensst/js-toolkit"
export default function (){
  onMounted(()=>{
    const myDataView = initDataView(document.getElementById('app'), {
      width: 1920, // 设计稿宽度
      height: 1080, // 设计稿高度
      mode: "scaleToFill",
      // mode: "aspectFit",
    })
    window.onresize = function () {
      myDataView.resize()
    }
  })
}
