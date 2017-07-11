/**
 * 创建人：李智勇
 * 创建时间： 2017/5/26.
 * 描述：获取dom元素top、left的绝对位置，方法必须传入原生dom对象
 */

const getDomPosition = {
    /*获取dom对象top绝对值*/
    getAbsoluteTop: function (obj) {
        return this._getAbsolute(obj,"offsetTop");
    },
    /*获取dom对象left绝对值*/
    getAbsoluteLeft: function (obj) {
        return this._getAbsolute(obj,"offsetLeft");
    },
    /*实际获取值的内部方法*/
    _getAbsolute:function (obj,type) {
        let num = obj[type];
        while (obj.offsetParent != null) {
            let oParent = obj.offsetParent;
            num += oParent[type];
            obj = oParent;
        }
        return num;
    }
};
export default getDomPosition;