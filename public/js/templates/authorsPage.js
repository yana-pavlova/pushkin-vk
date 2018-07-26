const AUTHOR_DATE_OPTS = {
    // era: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // weekday: 'long',
    timezone: 'UTC',
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric'
};

class AuthorSidebar extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {
        let authorPhoto = this.state.authorPhoto;
        let name = `${this.state.authorName.first} ${this.state.authorName.last} ${this.state.authorPatronymic}`;
        let birthDay = new Date(this.state.birthDay);
        birthDay = birthDay.toLocaleString('ru', AUTHOR_DATE_OPTS);
        return this.html`
          <div class="flexContainerForAllContent">
            <div class='sidebar-nav'>
                <img class='img-circle user-picture' src='${(authorPhoto) ? `/${authorPhoto.filename}` : '/images/avatar-default.png'}' alt='${name}'>
                <h2 class='text-center'>${name}</h2>
                <hr>
                <p class='text-center user-description hidden-xs'>
                    <i>${birthDay}</i>
                    <br>
                    <i>${this.state.birthCity}, ${this.state.birthCountry}</i>
                </p>
            </div>
            `
    }
}

class AuthorInfo extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {
        let authorPhoto = this.state.authorPhoto;
        let name = `${this.state.authorName.first} ${this.state.authorName.last} ${this.state.authorPatronymic}`;
        let birthDay = new Date(this.state.birthDay);
        birthDay = birthDay.toLocaleString('ru', AUTHOR_DATE_OPTS);
        let deathDay = new Date(this.state.birthDay);
        deathDay = deathDay.toLocaleString('ru', AUTHOR_DATE_OPTS);
        
        return this.html`
            <div class='card-post'>
                <table class='table table-condensed'>
                    <caption>${name}</caption>
                    <tbody>
                        <tr>
                            <th>Дата рождения</th>
                            <td>${birthDay}</td>
                        </tr>
                        <tr>
                            <th>Дата смерти</th>
                            <td>${deathDay}</td>
                        </tr>
                        <tr>
                            <th>Место рождения</th>
                            <td>${this.state.birthCity}, ${this.state.birthCountry}</td>
                        </tr>
                        <tr>
                            <th>Родители</th>
                            <td>${this.state.parents}</td>
                        </tr>
                        <tr>
                            <th>Дети</th>
                            <td>${this.state.children}</td>
                        </tr>
                        <tr>
                            <th>Награды</th>
                            <td>${this.state.honors}</td>
                        </tr>
                        <tr>
                            <th>Ссылки</th>
                            <td><a>${this.state.wikipediaLink}</a></td>
                        </tr>
                        <tr>
                            <th>Куратор страницы автора</th>
                            <td>${this.state.name.first} ${this.state.name.last}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    }
}

class AuthorsPage extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
        this.state.uploadedFiles = [];
    }

    onconnected() {
        if (_LOCALS.registered && _LOCALS.user._id == this.state.author._id) {
            this.state.uploadedFiles = [];

            this.uppy = new Uppy.Core({
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
            })
            .use(Uppy.Dashboard, {
                trigger: '#UppyModalOpenerBtn',
                inline: false,
                target: '.DashboardContainer',
                closeModalOnClickOutside: true,
                replaceTargetContent: false,
                showProgressDetails: true,
                note: 'Только изображения, 1 файл, размер до 1 MB',
                height: 370,
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
                        finishEditingFile: 'Завершиьт редактироавние файла',
                        saveChanges: 'Сохраниьт изменения',
                        localDisk: 'Локальный диск',
                        myDevice: 'Моё устройство',
                        dropPasteImport: 'Перенесите файлы, вставьте из буфера или %{browse}',
                        dropPaste: 'Перенесите файлы, вставьте из буфера, или %{browse}',
                        browse: 'Выберите',
                        fileProgress: 'Прогресс: скорость загрузки, ожидаемое время',
                        numberOfSelectedFiles: 'Количество выбранных файлов',
                        uploadAllNewFiles: 'Загрузиьт все новые файлы',
                        emptyFolderAdded: 'Папка пуста, файлы не были добавлены',
                        uploadComplete: 'Загрузка завершена',
                        uploading: 'Загрузка',
                        complete: 'Завершено',
                        uploadFailed: 'Ошибка загрузки',
                        pleasePressRetry: 'Пожалуйста нажмите Повторить для повторной попытки',
                        paused: 'Пауза',
                        error: 'Ошибка',
                        retry: 'Повторить',
                        cancel: 'Отменить',
                        pressToRetry: 'Нажмите для повтора',
                        retryUpload: 'Повторить загрузку',
                        resumeUpload: 'Продолжить загрузку',
                        cancelUpload: 'Отмениьт загрузку',
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
            })
            .use(Uppy.XHRUpload, {
                endpoint: '/api/file/uploadImage',
                formData: true,
                fieldName: 'files',
                locale: {
                    strings: {
                        timedOut: 'Загрузка подвисла на %{seconds} секунд. Отменено.'
                      }
                }
            })
            .use(Uppy.Webcam, {
                target: Uppy.Dashboard,
                locale: {
                    strings: {
                        smile: 'А сейчас вылетит птичка',
                        takePicture: 'Снять',
                        startRecording: 'Идет запись',
                        stopRecording: 'Остановить запись'
                      }
                }
            })

            this.uppy.on('complete', (result) => {
                let success = result.successful[0];
                this.state.uploadedFiles.push({
                    preview: success.preview,
                    path: success.response.body.fullPath,
                    fileName: success.response.body.fileName,
                });
                this.uppy.getPlugin('Dashboard').closeModal();
                // this.uppy = null;
                this.render();
            })
        }
    }


    addNewPost(content) {
        content = content.render().querySelector('textarea').value;
        let image = (this.state.uploadedFiles.length != 0) ? `&image=${this.state.uploadedFiles[0].fileName}` : '';
        let that = this;
        const xhr = new XMLHttpRequest();
        let query = '/api/post/create/?content=' + content + image;
        xhr.open('GET', query, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                let newPost = JSON.parse(this.responseText);
                that.state.posts.results.unshift(newPost.post);
                that.state.uploadedFiles = [];
                that.uppy.reset();
                that.render();
            }
        }
    }

    render() {
        return this.html`
            <div onconnected=${this} >
                ${new NavBar (this.state)}
                <div class='profile flexContainerForAll'>
                    ${new AuthorSidebar(this.state.author)}
                    <div class='content-posts profile-content'>
                        <div class='container-fluid container-posts'>
                            ${(_LOCALS.registered && _LOCALS.user._id == this.state.author._id)
                                ? hyperHTML.wire(_LOCALS, ':registered')`
                                    <div class='card-post'>
                                        <div>Новая публикация</div>
                                        ${new Editor({that: this, autoFocus: false, content: '', class: '', buttons: [{title: 'Опубликовать', class: 'btn btn-primary', onClick: this.addNewPost}]})}
                                        <hr>
                                        <button class='btn btn-link' id='UppyModalOpenerBtn'>Добавить изображение</button>
                                        <div class="DashboardContainer"></div>
                                        ${(this.state.uploadedFiles.length)
                                            ? hyperHTML.wire()`
                                                <div class='image-preview'>
                                                    Добавлено 1 изображение:
                                                    <br>
                                                    <img src='${this.state.uploadedFiles[0].preview}'>
                                                </div>
                                                `
                                            : ''
                                        }
                                    </div>
                                `
                                : ''
                            }
                            ${new AuthorInfo(this.state.author)}
                        </div>
                        ${new Posts(this.state)}
                    </div>
                </div>
            </div>
        `
    }
}