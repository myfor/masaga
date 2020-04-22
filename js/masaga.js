/**
 * 将传入的方法体在 window.onload 执行。
 * 多次使用会将按顺序执行
 * @param {方法体} fn () => {...}
 */
function appendLoad(fn) {
    if (!fn)
        return;
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
        DIV_BODY.innerText = this._content;

        const DIV_ACTIONS = this.DOC.createElement('div');
        DIV_ACTIONS.className = 'alert-box-actions';

        if (this._click) {
            const BTN_CLICK = this.DOC.createElement('button');
            BTN_CLICK.className = 'btn-flat-primary ml1';
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

    static new(config) {
        return new mAlert(config);
    }
    /**
     * 打开弹窗
     */
    open() {
        this.DOC.body.appendChild(this._box);
        this._box.style.display = 'block'
        return this;
    }

    close() {
        this.DOC.body.removeChild(this._box);
    }
}