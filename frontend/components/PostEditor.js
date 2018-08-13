const hyperHTML = require('hyperhtml/cjs').default;

import Uppy from 'uppy/lib/core';
import Dashboard from 'uppy/lib/plugins/Dashboard';
import XHRUpload from 'uppy/lib/plugins/XHRUpload';
import Webcam from 'uppy/lib/plugins/Webcam';

import imageToBlob from 'image-to-blob';

let editorInstanceCounter = 0;
let editorHelperIsShow = false;

module.exports = class PostEditor extends hyperHTML.Component {
    
    /**
     * @param  {} params
     * @param.that {} 
     * @param.autoFocus bool focus on textarea after render
     * @param.content string
     * @param.class string
     * @param.buttons [] 
     * @param.buttons[i] {}
     * @param.buttons[i].title string
     * @param.buttons[i].class string
     * @param.buttons[i].onClick function
     */
    constructor(params) {
        super();
        editorInstanceCounter++;
        let that = params.that;
        this.autoFocus = params.autoFocus || false;
        this.textAreaId = `editor-${editorInstanceCounter}`;
        this.post = params.post;
        this.class = `editor ${params.class || ''}`;
        this.buttons = params.buttons;
        this.buttons.forEach((b) => {
            b.onClick = b.onClick.bind(that, this);
            b.class = b.class || 'btn';
        })
        this.state.image = this.post.image || {};
        // console.log(params);
        
        this.actions = params.actions || {};
        this.showUploadModal = this.showUploadModal.bind(this);
        this.showHelp = this.showHelp.bind(this);
    }

    onconnected(event) {
        this.element = event.srcElement;
        this.dashboardContainer = this.element.querySelector('.DashboardContainer');
        
        if (this.autoFocus) this.element.querySelector('textarea').focus();

        this.uppy = new Uppy({
            autoProceed: false,
            restrictions: {
                maxFileSize: 1000000,
                maxNumberOfFiles: 1,
                minNumberOfFiles: 1,
                allowedFileTypes: ['image/*'],
            },
            locale: {
                strings: {
                    youCanOnlyUploadX: {
                        0: 'Вы можете загрузить максимум %{smart_count} файл',
                        1: 'Вы можете загрузить максимум %{smart_count} файлов'
                    },
                    youHaveToAtLeastSelectX: {
                        0: 'Выберите минимум %{smart_count} файл',
                        1: 'Выберите минимум %{smart_count} файлов'
                    },
                    exceedsSize: 'Размер файла превышает ',
                    youCanOnlyUploadFileTypes: 'Вы можете загружать только:',
                    uppyServerError: 'Соединение с сервером разорвано',
                    failedToUpload: 'Ошибка загрузки %{file}',
                    noInternetConnection: 'Вы не подключены к Интернету',
                    connectedToInternet: 'Подключено к Интернету',
                    // Strings for remote providers
                    noFilesFound: 'Не выбрано ни одного файла',
                    selectXFiles: {
                        0: 'Выбран %{smart_count} файл',
                        1: 'Выбрано %{smart_count} файлов'
                    },
                    cancel: 'Отменить',
                    logOut: 'Выйти',
                }
            }
        });

        this.uppy.use(Dashboard, {
            // trigger: '#UppyModalOpenerBtn',
            inline: true,
            target: this.dashboardContainer,
            closeModalOnClickOutside: true,
            replaceTargetContent: false,
            showProgressDetails: true,
            note: 'Только изображения, 1 файл, размер до 1 MB',
            width: 100,
            height: 50,
            // metaFields: [
            //   { id: 'name', name: 'Название', placeholder: 'Имя файла' },
            //   { id: 'caption', name: 'Описание', placeholder: 'Описание' }
            // ],
            browserBackButtonClose: true,
            locale: {
                strings: {
                    selectToUpload: 'Выберите файл для загрузки',
                    closeModal: 'Закрыть окно',
                    upload: 'Загрузить',
                    importFrom: 'Импортировать из %{name}',
                    dashboardWindowTitle: 'Окно загрузки (закрыть -  escape)',
                    dashboardTitle: 'Окно загрузки',
                    copyLinkToClipboardSuccess: 'Ссылка сокопирована в буфер обмена',
                    copyLinkToClipboardFallback: 'Скопировать URL',
                    copyLink: 'Копировать ссылку',
                    fileSource: 'Файл: %{name}',
                    done: 'Готово>',
                    name: 'Имя',
                    removeFile: 'Удалить файл',
                    editFile: 'Редактировать файл',
                    editing: 'Редактируется %{file}',
                    finishEditingFile: 'Завершиьт редактирование файла',
                    saveChanges: 'Сохранить изменения',
                    localDisk: 'Локальный диск',
                    myDevice: 'Моё устройство',
                    dropPasteImport: 'Перенесите файлы, или %{browse}',
                    dropPaste: 'Перенесите файлы, или %{browse}',
                    browse: 'Выберите',
                    fileProgress: 'Прогресс: скорость загрузки, ожидаемое время',
                    numberOfSelectedFiles: 'Количество выбранных файлов',
                    uploadAllNewFiles: 'Загрузиьт все новые файлы',
                    emptyFolderAdded: 'Папка пуста, файлы не были добавлены',
                    uploadComplete: 'Загрузка завершена',
                    uploading: 'Загрузка',
                    complete: 'Завершено',
                    uploadFailed: 'Ошибка загрузки',
                    pleasePressRetry: 'Пожалуйста, нажмите Повторить для повторной попытки',
                    paused: 'Пауза',
                    error: 'Ошибка',
                    retry: 'Повторить',
                    cancel: 'Отменить',
                    pressToRetry: 'Нажмите для повтора',
                    retryUpload: 'Повторить загрузку',
                    resumeUpload: 'Продолжить загрузку',
                    cancelUpload: 'Отменить загрузку',
                    pauseUpload: 'Пауза',
                    filesUploadedOfTotal: {
                        0: '%{complete} из %{smart_count} файлов загружено',
                        1: '%{complete} из %{smart_count} файлов загружено'
                    },
                    dataUploadedOfTotal: '%{complete} из %{total}',
                    xTimeLeft: '%{time} осталось',
                    folderAdded: {
                        0: 'Добавлен %{smart_count} файл из папки %{folder}',
                        1: 'Добавлено %{smart_count} файлов из папки %{folder}'
                    },
                    uploadXFiles: {
                        0: 'Загрузить %{smart_count} файл',
                        1: 'Загрузиьт %{smart_count} файлов'
                    },
                    uploadXNewFiles: {
                        0: 'Загрузить +%{smart_count} файл',
                        1: 'Загрузить +%{smart_count} файлов'
                    }
                    }
            }
        });

        this.uppy.use(XHRUpload, {
            endpoint: '/api/file/uploadImage',
            formData: true,
            fieldName: 'files',
            locale: {
                strings: {
                    timedOut: 'Загрузка подвисла на %{seconds} секунд. Отменено.'
                    }
            }
        });

        this.uppy.use(Webcam, {
            target: Dashboard,
            locale: {
                strings: {
                    smile: 'А сейчас вылетит птичка',
                    takePicture: 'Снять',
                    startRecording: 'Идет запись',
                    stopRecording: 'Остановить запись'
                    }
            }
        });

        this.uppy.on('complete', (result) => {
            let success = result.successful[0];
            this.actions.getUploadedFiles(success);
            this.render();
        });
        
        this.setImageFromPostToDashboard()
    }

    setImageFromPostToDashboard() {
        let imageFileName = this.state.image.filename;
        if (imageFileName) {
            imageToBlob(`/${imageFileName}`, (err, blob) => {
                if (err) console.log('err', err);
                if (blob) {
                    this.uppy.addFile({
                        name: imageFileName,
                        type: '',
                        data: blob,
                        source: 'Local',
                        isRemote: false // optional, set to true if actual file is not in the browser, but on some remote server, for example, when using uppy-server in combination with Instagram
                    })
                }
            });
        }
    }

    showUploadModal() {
        if ( this.uppyDashboard === undefined ) this.onconnected(this);
        this.uppy.getPlugin('Dashboard').openModal();
    }

    showHelp(e) {
        let editorHelper = document.getElementById('editorHelper');
        if(editorHelperIsShow == false) {
            editorHelper.style.display = "block";
            editorHelperIsShow = true;
        } else {
            editorHelper.style.display = "none";
            editorHelperIsShow = false;
        }
    }

    render() {

        return this.html`
            <div class='${this.class}' onconnected=${this} >
                <textarea class='form-control' id='${this.textAreaId}' value=${this.post.content}></textarea>
                ${this.buttons.map((b) => {
                    return hyperHTML.wire()`
                        <button class='${b.class}' onclick=${b.onClick}>${b.title}</button>
                        <button class="btn btn-success btn-help" onclick=${this.showHelp.bind(this)}>Нужна помощь?</button>
                        <div id="editorHelper">
                            <h2>Я должен делать ссылки на источник материала?</h2>
                            <p>Вы не обязаны этого делать, однако мы призываем вас быть честными: используя чужой труд, оставьте ссылку на источник. Это необходимо также для того, чтобы нам было легче верифицировать информацию, которую вы решили опубликовать.</p>
                            <h2>Как сделать ссылку?</h2>
                            <p>Просто скопируйте следующий текст и подставьте свои значения:</p>
                            <p class="editorHelperP">&lt;a target="_blank" href="ВАШ URL"&gt;ВАША ССЫЛКА ДЛЯ КЛИКА&lt;/a&gt;</p>
                            <h2>Как выбрать изображение?</h2>
                            <p>Старайтесь выбирать маленькие картинки. Идеально, если ширина изображения не будет больше 700 пикселей.</p>
                            <h2>Как вставить видео с ютуба?</h2>
                            <p>Найдите нужное видео на ютубе. Под видео найдите кнопку "поделиться" и нажмите на ссылку "встроить" рядом с таким значком: "< >"</p>
                            <p>Вы увидите примерно такой код:</p>
                            <p class="editorHelperP">&lt;iframe width="560" height="315" src="https://www.youtube.com/embed/h70PjN_Gu_A" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen&gt&lt;/iframe&gt</p>
                            <p>Скопируйте его и вставьте в поле для публикации. Когда вы нажмёте кнопку "опубликовать", на странице вместо кода появится видео.</p>
                            <h2>Остались вопросы?</h2>
                            <p>Свяжитесь с нами по почте pushkinvk@gmail.com</p>
                        </div>
                    `
                })}
                <hr>
                <div>
                    <div class="DashboardContainer"></div>
                </div>
                
            </div>
        `
        // <button class='btn btn-link' onclick=${this.showUploadModal}>Добавить изображение</button>
    }
}