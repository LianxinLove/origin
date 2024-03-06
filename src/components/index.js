//入口文件=>插件的入口=>统一管理文件
//动态引入文件
const requireComponent =  import.meta.glob('./**/*.vue', { eager: true })
 
const install = (Vue) => {
    if (install.installed) return
    install.installed
 
    Object.keys(requireComponent).forEach(fileName=>{
        //第i个组件
        const config =  requireComponent[fileName]
        //组件名 刚才写的组件名派上用场了
        const conponentName = config.default.name
 
        Vue.component(conponentName,config.default || config)
    })
    //这里也可以创建全局自定义指令 这里是创建了一个自动获取焦点的指令
    Vue.directive('focus',{
        mounted:function(el){
            el.focus()
        }
    })
}
//环境检测
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
//对外暴露install方法
export default {
    install
}