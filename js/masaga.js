appendLoad(function () {
    const list = document.querySelectorAll('textarea[autoRows]');
    if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
            const textarea = list[i];
            autoTextarea(textarea);
        }
    }
    //  初始化下拉菜单
    ddl.init();
    //  初始化折叠框
    accordion.init();
});

/**
 * 将传入的方法体在 window.onload 执行。
 * 多次使用会将按顺序执行
 * @param {方法体} fn () => {...}
 */
function appendLoad(fn) {
    if (!fn) {
        return;
    }
    const CURRENT_ONLOAD_FN = window.onload;
    if (typeof CURRENT_ONLOAD_FN !== 'function')
        window.onload = fn;
    else {
        window.onload = function () {
            CURRENT_ONLOAD_FN();
            fn();
        }
    }
}

/**
 * 提示弹窗
 */
class mAlert {
    DOC = document;
    _box = null;
    _content = '';
    _title = '';
    _click = null;
    _clickText = '确定';
    _clickClass = 'btn-flat-primary'
    constructor(config) {
        if (config) {
            if (config.content)
                this._content = config.content
            if (config.title)
                this._title = config.title
            if (config.click)
                this._click = config.click;
            if (config.clickText)
                this._clickText = config.clickText;
            if (config.clickClass)
                this._clickClass = config.clickClass
        }

        this._buildBox();
    }

    _buildBox() {
        this._box = this.DOC.createElement('div');
        this._box.className = 'alert-overlay-container';
        this._box.style.display = 'none'

        const DIV_BACKGROUND = this.DOC.createElement('div');
        DIV_BACKGROUND.className = 'alert-overlay-background';
        this._box.appendChild(DIV_BACKGROUND);
        DIV_BACKGROUND.onclick = () => {
            this.close();
        }

        const DIV_WRAPPER = this.DOC.createElement('div');
        DIV_WRAPPER.className = 'alert-wrapper';
        this._box.appendChild(DIV_WRAPPER);

        const DIV_BOX = this.DOC.createElement('div');
        DIV_BOX.className = 'alert-box';
        DIV_WRAPPER.appendChild(DIV_BOX);

        const DIV_HEADER = this.DOC.createElement('div');
        DIV_HEADER.className = 'alert-box-header';
        DIV_HEADER.innerText = this._title;
        const DIV_BODY = this.DOC.createElement('div');
        DIV_BODY.className = 'alert-box-body';
        DIV_BODY.innerHTML = this._content;

        const DIV_ACTIONS = this.DOC.createElement('div');
        DIV_ACTIONS.className = 'alert-box-actions';

        if (this._click) {
            const BTN_CLICK = this.DOC.createElement('button');
            BTN_CLICK.className = 'ml1';
            BTN_CLICK.classList.add(this._clickClass);
            BTN_CLICK.onclick = this._click;
            BTN_CLICK.innerText = this._clickText;
            DIV_ACTIONS.appendChild(BTN_CLICK);
        }

        const BTN_CLOSE = this.DOC.createElement('button');
        BTN_CLOSE.className = 'btn';
        BTN_CLOSE.innerText = '关闭';
        BTN_CLOSE.onclick = () => {
            this.close();
        }
        DIV_ACTIONS.appendChild(BTN_CLOSE);

        DIV_BOX.appendChild(DIV_HEADER);
        DIV_BOX.appendChild(DIV_BODY);
        DIV_BOX.appendChild(DIV_ACTIONS);

    }

    /**
     * 实例化提示弹窗
     * @param {配置参数} config {title: '标题', content: '内容', click: '新的按钮方法体', clickText: '按钮文本'}
     */
    static new(config) {
        return new mAlert(config);
    }
    /**
     * 打开提示弹窗
     */
    open() {
        this.DOC.body.appendChild(this._box);
        this._box.style.display = 'block'
        return this;
    }
    /**
     * 关闭提示弹窗
     */
    close() {
        this.DOC.body.removeChild(this._box);
    }
}

/**
 * 下拉菜单
 */
class ddl {
    /**
     * 背景点击事件，初始化时加载
     */
    static _clickBackgroudFn = null;
    /**
     * 下拉框点击事件，初始化时加载
     */
    static _clickDDLFn = null;
    /**
     * 是否已经初始化过下拉框，防止重复初始化
     */
    static _isInit = null;
    /**
     * 初始化下拉菜单
     */
    static init() {
        if (!this._isInit)
            this._isInit = true;
        else
            return;

        let newDDL = new ddl();

        //  绑定点击按钮展开事件
        if (!newDDL.bindDropDownListButtonClickFn())
            return;

        //  点击背景时的关闭事件
        const CURRENT_CLICK = document.onclick;
        ddl._clickBackgroudFn = newDDL.bindClickBackgroudFn;
        if (typeof CURRENT_CLICK === 'function')
            document.onclick = function () {
                CURRENT_CLICK();
                ddl._clickBackgroudFn(event);
            }
        else
            document.onclick = function () {
                ddl._clickBackgroudFn(event);
            }
        newDDL = null;
    }
    /**
     * 绑定下拉框按钮点击展开事件
     */
    bindDropDownListButtonClickFn() {
        const ddlList = document.querySelectorAll('[data-toggle=dropdown]');
        if (ddlList.length === 0)
            return false;
        for (let i = 0; i < ddlList.length; i++) {
            const BTN = ddlList[i];
            const P = BTN.parentNode;
            if (P.childElementCount <= 1)
                continue;
            let c = P.firstElementChild;
            while (c) {
                if (c.getAttribute('data-for') === BTN.id) {
                    BTN.onclick = function () {
                        if (c.style.display === 'none' || !c.style.display)
                            c.style.display = 'block';
                        else
                            c.style.display = 'none';
                    }
                    break;
                }
                c = c.nextElementSibling;
            }
        }
        return true;
    }
    /**
     * 绑定点击背景的方法
     */
    bindClickBackgroudFn(event) {
        let x = event.clientX;
        let y = event.clientY;
        let ele = document.elementFromPoint(x, y);
        //  点击到下拉菜单之外的元素，收起下拉框
        if (ele && ele.getAttribute('data-toggle') === 'dropdown')
            return;
        let ddlEles = document.querySelectorAll('[data-toggle=dropdown]');
        if (!ddlEles)
            return;
        for (let i = 0; i < ddlEles.length; i++) {
            const e = ddlEles[i];
            const P = e.parentNode;
            if (P && P.childElementCount > 1) {
                let child = P.firstElementChild;
                while (child) {
                    if (child.getAttribute('data-for') === e.id)
                        child.style.display = 'none';
                    child = child.nextElementSibling;
                }
            }
        }
    }
}

class accordion {
    /**
     * 点击折叠框头事件
     */
    static _clickHeader = null;
    /**
     * 是否已经初始化过折叠框，防止重复初始化
     */
    static _isInit = null;
    /**
     * 初始化折叠框
     */
    static init() {
        if (!this._isInit)
            this._isInit = true;
        else
            return;
        const accordions = document.querySelectorAll('div[data-toggle=accordion]');
        if (accordions.length === 0)
            return;
        
    }
}

/**
 * 文本框根据输入内容自适应高度
 * @param                {HTMLElement}        输入框元素
 * @param                {Number}                设置光标与输入框保持的距离(默认0)
 * @param                {Number}                设置最大高度(可选)
 */
var autoTextarea = function (elem, extra, maxHeight) {
    extra = extra || 0;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = function (type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ? function (name) {
            var val = elem.currentStyle[name];

            if (name === 'height' && val.search(/px/i) !== 1) {
                var rect = elem.getBoundingClientRect();
                return rect.bottom - rect.top -
                    parseFloat(getStyle('paddingTop')) -
                    parseFloat(getStyle('paddingBottom')) + 'px';
            };

            return val;
        } : function (name) {
            return getComputedStyle(elem, null)[name];
        },
        minHeight = parseFloat(getStyle('height'));

    elem.style.resize = 'none';

    var change = function () {
        var scrollTop, height,
            padding = 0,
            style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        };
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        };
    };

    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
};