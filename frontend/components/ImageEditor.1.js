const hyperHTML = require('hyperhtml/cjs').default;
let TuiImageEditor = require('tui-image-editor');
let colorPicker = require('tui-color-picker')

module.exports = class ImageEditor extends hyperHTML.Component {
    
    constructor(params){
        super(params);        
        this.supportingFileAPI = !!(window.File && window.FileList && window.FileReader);
        this.rImageType = /data:(image\/.+);base64,/;
        this.shapeOptions = {};
        this.shapeType;
        this.activeObjectId;

        this.tuiIsShow = false;
        this.showImageEditor = this.showImageEditor.bind(this);

    }
    
    onconnected(event) {
        // Buttons
        this.$btns = $('.menu-item');
        this.$btnsActivatable = this.$btns.filter('.activatable');
        this.$inputImage = $('#input-image-file');
        this.$btnDownload = $('#btn-download');

        this.$btnUndo = $('#btn-undo');
        this.$btnRedo = $('#btn-redo');
        this.$btnClearObjects = $('#btn-clear-objects');
        this.$btnRemoveActiveObject = $('#btn-remove-active-object');
        this.$btnCrop = $('#btn-crop');
        this.$btnFlip = $('#btn-flip');
        this.$btnRotation = $('#btn-rotation');
        this.$btnDrawLine = $('#btn-draw-line');
        this.$btnDrawShape = $('#btn-draw-shape');
        this.$btnApplyCrop = $('#btn-apply-crop');
        this.$btnCancelCrop = $('#btn-cancel-crop');
        this.$btnFlipX = $('#btn-flip-x');
        this.$btnFlipY = $('#btn-flip-y');
        this.$btnResetFlip = $('#btn-reset-flip');
        this.$btnRotateClockwise = $('#btn-rotate-clockwise');
        this.$btnRotateCounterClockWise = $('#btn-rotate-counter-clockwise');
        this.$btnText = $('#btn-text');
        this.$btnTextStyle = $('.btn-text-style');
        this.$btnAddIcon = $('#btn-add-icon');
        this.$btnRegisterIcon = $('#btn-register-icon');
        this.$btnMaskFilter = $('#btn-mask-filter');
        this.$btnImageFilter = $('#btn-image-filter');
        this.$btnLoadMaskImage = $('#input-mask-image-file');
        this.$btnApplyMask = $('#btn-apply-mask');
        this.$btnClose = $('.close');

        // Input etc.
        this.$inputRotationRange = $('#input-rotation-range');
        this.$inputBrushWidthRange = $('#input-brush-width-range');
        this.$inputFontSizeRange = $('#input-font-size-range');
        this.$inputStrokeWidthRange = $('#input-stroke-width-range');
        this.$inputCheckTransparent = $('#input-check-transparent');
        this.$inputCheckGrayscale = $('#input-check-grayscale');
        this.$inputCheckInvert = $('#input-check-invert');
        this.$inputCheckSepia = $('#input-check-sepia');
        this.$inputCheckSepia2 = $('#input-check-sepia2');
        this.$inputCheckBlur = $('#input-check-blur');
        this.$inputCheckSharpen = $('#input-check-sharpen');
        this.$inputCheckEmboss = $('#input-check-emboss');
        this.$inputCheckRemoveWhite = $('#input-check-remove-white');
        this.$inputRangeRemoveWhiteThreshold = $('#input-range-remove-white-threshold');
        this.$inputRangeRemoveWhiteDistance = $('#input-range-remove-white-distance');
        this.$inputCheckBrightness = $('#input-check-brightness');
        this.$inputRangeBrightnessValue = $('#input-range-brightness-value');
        this.$inputCheckNoise = $('#input-check-noise');
        this.$inputRangeNoiseValue = $('#input-range-noise-value');
        this.$inputCheckGradientTransparency = $('#input-check-gradient-transparancy');
        this.$inputRangeGradientTransparencyValue = $('#input-range-gradient-transparency-value');
        this.$inputCheckPixelate = $('#input-check-pixelate');
        this.$inputRangePixelateValue = $('#input-range-pixelate-value');
        this.$inputCheckTint = $('#input-check-tint');
        this.$inputRangeTintOpacityValue = $('#input-range-tint-opacity-value');
        this.$inputCheckMultiply = $('#input-check-multiply');
        this.$inputCheckBlend = $('#input-check-blend');
        this.$inputCheckColorFilter = $('#input-check-color-filter');
        this.$inputRangeColorFilterValue = $('#input-range-color-filter-value');

        // Sub menus
        this.$displayingSubMenu = $();
        this.$cropSubMenu = $('#crop-sub-menu');
        this.$flipSubMenu = $('#flip-sub-menu');
        this.$rotationSubMenu = $('#rotation-sub-menu');
        this.$freeDrawingSubMenu = $('#free-drawing-sub-menu');
        this.$drawLineSubMenu = $('#draw-line-sub-menu');
        this.$drawShapeSubMenu = $('#draw-shape-sub-menu');
        this.$textSubMenu = $('#text-sub-menu');
        this.$iconSubMenu = $('#icon-sub-menu');
        this.$filterSubMenu = $('#filter-sub-menu');
        this.$imageFilterSubMenu = $('#image-filter-sub-menu');

        // Select line type
        this.$selectLine = $('[name="select-line-type"]');

        // Select shape type
        this.$selectShapeType = $('[name="select-shape-type"]');

        // Select color of shape type
        this.$selectColorType = $('[name="select-color-type"]');

        //Select blend type
        this.$selectBlendType = $('[name="select-blend-type"]');

        // Image editor
        this.imageEditor = new TuiImageEditor('.tui-image-editor', {
            cssMaxWidth: 700,
            cssMaxHeight: 500,
            selectionStyle: {
                cornerSize: 20,
                rotatingPointOffset: 70
            }
        });
        
        // Color picker for free drawing
        this.brushColorpicker = colorPicker.create({
            container: $('#tui-brush-color-picker')[0],
            color: '#000000'
        });

        // Color picker for text palette
        this.textColorpicker = colorPicker.create({
            container: $('#tui-text-color-picker')[0],
            color: '#000000'
        });

        // Color picker for shape
        this.shapeColorpicker = colorPicker.create({
            container: $('#tui-shape-color-picker')[0],
            color: '#000000'
        });

        // Color picker for icon
        this.iconColorpicker = colorPicker.create({
            container: $('#tui-icon-color-picker')[0],
            color: '#000000'
        });

        this.tintColorpicker = colorPicker.create({
            container: $('#tui-tint-color-picker')[0],
            color: '#000000'
        });

        this.multiplyColorpicker = colorPicker.create({
            container: $('#tui-multiply-color-picker')[0],
            color: '#000000'
        });

        this.blendColorpicker = colorPicker.create({
            container: $('#tui-blend-color-picker')[0],
            color: '#00FF00'
        });

        // Attach image editor custom events
        this.imageEditor.on({
            objectAdded: (objectProps) => {
                console.info(objectProps);
            },
            undoStackChanged: (length) => {
                if (length) {                    
                    this.$btnUndo.removeClass('disabled');
                } else {
                    this.$btnUndo.addClass('disabled');
                }
                this.resizeEditor();
            },
            redoStackChanged: (length) => {
                if (length) {
                    this.$btnRedo.removeClass('disabled');
                } else {
                    this.$btnRedo.addClass('disabled');
                }
                this.resizeEditor();
            },
            objectScaled: (obj) => {
                if (obj.type === 'text') {
                    this.$inputFontSizeRange.val(obj.fontSize);
                }
            },
            addText: (pos) => {
                this.imageEditor.addText('Double Click', {
                    position: pos.originPosition
                }).then(objectProps => {
                    console.log(objectProps);
                });
            },
            objectActivated: (obj) => {
                this.activeObjectId = obj.id;
                if (obj.type === 'rect' || obj.type === 'circle' || obj.type === 'triangle') {
                    this.showSubMenu('shape');
                    this.setShapeToolbar(obj);
                    this.activateShapeMode();
                } else if (obj.type === 'icon') {
                    this.showSubMenu('icon');
                    this.setIconToolbar(obj);
                    this.activateIconMode();
                } else if (obj.type === 'text') {
                    this.showSubMenu('text');
                    this.setTextToolbar(obj);
                    this.activateTextMode();
                }
            },
            mousedown: (event, originPointer) => {
                if (this.$imageFilterSubMenu.is(':visible') && this.imageEditor.hasFilter('colorFilter')) {
                    this.imageEditor.applyFilter('colorFilter', {
                        x: parseInt(originPointer.x, 10),
                        y: parseInt(originPointer.y, 10)
                    });
                }
            }
        });

        // Attach button click event listeners
        this.$btns.on('click', () => {
            this.$btnsActivatable.removeClass('active');
        });

        this.$btnsActivatable.on('click', () => {
            $(this).addClass('active');
        });

        this.$btnUndo.on('click', () => {
            this.$displayingSubMenu.hide();

            if (!$(this).hasClass('disabled')) {
                this.imageEditor.undo();
            }
        });

        this.$btnRedo.on('click', () => {
            this.$displayingSubMenu.hide();

            if (!$(this).hasClass('disabled')) {
                this.imageEditor.redo();
            }
        });

        this.$btnClearObjects.on('click', () => {
            this.$displayingSubMenu.hide();
            this.imageEditor.clearObjects();
        });

        this.$btnRemoveActiveObject.on('click', () => {
            this.$displayingSubMenu.hide();
            this.imageEditor.removeObject(this.activeObjectId);
        });

        this.$btnCrop.on('click', () => {
            this.imageEditor.startDrawingMode('CROPPER');
            this.$displayingSubMenu.hide();
            this.$displayingSubMenu = this.$cropSubMenu.show();
        });

        this.$btnFlip.on('click', () => {
            this.imageEditor.stopDrawingMode();
            this.$displayingSubMenu.hide();
            this.$displayingSubMenu = this.$flipSubMenu.show();
        });

        this.$btnRotation.on('click', () => {
            this.imageEditor.stopDrawingMode();
            this.$displayingSubMenu.hide();
            this.$displayingSubMenu = this.$rotationSubMenu.show();
        });

        this.$btnClose.on('click', () => {
            this.imageEditor.stopDrawingMode();
            this.$displayingSubMenu.hide();
        });

        this.$btnApplyCrop.on('click', () => {
            this.imageEditor.crop(this.imageEditor.getCropzoneRect()).then(() => {
                this.imageEditor.stopDrawingMode();
                this.resizeEditor();
            });
        });

        this.$btnCancelCrop.on('click', () => {
            this.imageEditor.stopDrawingMode();
        });

        this.$btnFlipX.on('click', () => {
            this.imageEditor.flipX().then(status => {
                console.log('flipX: ', status.flipX);
                console.log('flipY: ', status.flipY);
                console.log('angle: ', status.angle);
            });
        });

        this.$btnFlipY.on('click', () => {
            this.imageEditor.flipY().then(status => {
                console.log('flipX: ', status.flipX);
                console.log('flipY: ', status.flipY);
                console.log('angle: ', status.angle);
            });
        });

        this.$btnResetFlip.on('click', () => {
            this.imageEditor.resetFlip().then(status => {
                console.log('flipX: ', status.flipX);
                console.log('flipY: ', status.flipY);
                console.log('angle: ', status.angle);
            });
        });

        this.$btnRotateClockwise.on('click', () => {
            this.imageEditor.rotate(30);
        });

        this.$btnRotateCounterClockWise.on('click', () => {
            this.imageEditor.rotate(-30);
        });

        this.$inputRotationRange.on('mousedown', () => {
            var changeAngle = () => {
                this.imageEditor.setAngle(parseInt($inputRotationRange.val(), 10)).catch(() => {});
            };
            $(document).on('mousemove', changeAngle);
            $(document).on('mouseup', function stopChangingAngle() {
                $(document).off('mousemove', changeAngle);
                $(document).off('mouseup', stopChangingAngle);
            });
        });

        this.$inputRotationRange.on('change', () => {
            this.imageEditor.setAngle(parseInt($inputRotationRange.val(), 10)).catch(() => {});
        });

        this.$inputBrushWidthRange.on('change', (e) => {
            this.imageEditor.setBrush({width: parseInt(e.target.value, 10)});
        });

        this.$inputImage.on('change', (event) => {
            var file;

            if (!this.supportingFileAPI) {
                alert('This browser does not support file-api');
            }

            file = event.target.files[0];
            this.imageEditor.loadImageFromFile(file).then(result => {
                console.log(result);
                this.imageEditor.clearUndoStack();
            });
        });

        this.$btnDownload.on('click', () => {
            var imageName = this.imageEditor.getImageName();
            var dataURL = this.imageEditor.toDataURL();
            var blob, type, w;

            if (this.supportingFileAPI) {
                blob = this.base64ToBlob(dataURL);
                console.log('--', dataURL);
                
                type = blob.type.split('/')[1];
                if (imageName.split('.').pop() !== type) {
                    imageName += '.' + type;
                }
                console.log(blob);
                
                // Library: FileSaver - saveAs
                saveAs(blob, imageName); // eslint-disable-line
            } else {
                alert('This browser needs a file-server');
                w = window.open();
                w.document.body.innerHTML = '<img src=' + dataURL + '>';
            }
        });

        // control draw line mode
        this.$btnDrawLine.on('click', () => {
            this.imageEditor.stopDrawingMode();
            this.$displayingSubMenu.hide();
            this.$displayingSubMenu = this.$drawLineSubMenu.show();
            this.$selectLine.eq(0).change();
        });

        this.$selectLine.on('change', (e) => {
            var mode = e.target.value;
            var settings = this.getBrushSettings();

            this.imageEditor.stopDrawingMode();
            if (mode === 'freeDrawing') {
                this.imageEditor.startDrawingMode('FREE_DRAWING', settings);
            } else {
                this.imageEditor.startDrawingMode('LINE_DRAWING', settings);
            }
        });

        this.brushColorpicker.on('selectColor', (event) => {
            console.log(event);
            this.imageEditor.setBrush({
                color: this.hexToRGBa(event.color, 0.5)
            });
        });

        // control draw shape mode
        this.$btnDrawShape.on('click', () => {
            this.showSubMenu('shape');

            // step 1. get options to draw shape from toolbar
            this.shapeType = $('[name="select-shape-type"]:checked').val();

            this.shapeOptions.stroke = '#000000';
            this.shapeOptions.fill = '#ffffff';

            this.shapeOptions.strokeWidth = Number(this.$inputStrokeWidthRange.val());

            // step 2. set options to draw shape
            this.imageEditor.setDrawingShape(this.shapeType, this.shapeOptions);

            // step 3. start drawing shape mode
            this.activateShapeMode();
        });

        // TODO: рисование фигурами не меняется фигура this.shapeType = $(this).val();
        this.$selectShapeType.on('change', () => {
            this.shapeType = $(this).val();
            this.imageEditor.setDrawingShape(shapeType);
        });

        this.$inputCheckTransparent.on('change', () => {
            var colorType = this.$selectColorType.val();
            var isTransparent = $(this).prop('checked');
            var color;

            if (!isTransparent) {
                color = this.shapeColorpicker.getColor();
            } else {
                color = 'transparent';
            }

            if (colorType === 'stroke') {
                this.imageEditor.changeShape(this.activeObjectId, {
                    stroke: color
                });
            } else if (colorType === 'fill') {
                this.imageEditor.changeShape(this.activeObjectId, {
                    fill: color
                });
            }

            this.imageEditor.setDrawingShape(shapeType, shapeOptions);
        });

        this.shapeColorpicker.on('selectColor', (event) => {
            var colorType = this.$selectColorType.val();
            var isTransparent = this.$inputCheckTransparent.prop('checked');
            var color = event.color;

            if (isTransparent) {
                return;
            }

            if (colorType === 'stroke') {
                this.imageEditor.changeShape(activeObjectId, {
                    stroke: color
                });
            } else if (colorType === 'fill') {
                this.imageEditor.changeShape(this.defaultStateactiveObjectId, {
                    fill: color
                });
            }

            this.imageEditor.setDrawingShape(this.shapeType, this.shapeOptions);
        });
        // TODO: рисование фигурами при попытке изменить текст: Uncaught (in promise) The object is not in canvas. строка 465 анонимус

        this.$inputStrokeWidthRange.on('change', () => {
            var strokeWidth = Number($(this).val());

            this.imageEditor.changeShape(activeObjectId, {
                strokeWidth: strokeWidth
            });

            this.imageEditor.setDrawingShape(shapeType, shapeOptions);
        });

        // control text mode
        this.$btnText.on('click', () => {
            this.showSubMenu('text');
            this.activateTextMode();
        });

        this.$inputFontSizeRange.on('change', (e) => {
            this.imageEditor.changeTextStyle(this.activeObjectId, {
                fontSize: parseInt(e.target.value, 10)
            });
        });

        this.$btnTextStyle.on('click', (e) => { // eslint-disable-line
            var styleType = $(this).attr('data-style-type');
            var styleObj;

            e.stopPropagation();

            switch (styleType) {
                case 'b':
                    styleObj = {fontWeight: 'bold'};
                    break;
                case 'i':
                    styleObj = {fontStyle: 'italic'};
                    break;
                case 'u':
                    styleObj = {textDecoration: 'underline'};
                    break;
                case 'l':
                    styleObj = {textAlign: 'left'};
                    break;
                case 'c':
                    styleObj = {textAlign: 'center'};
                    break;
                case 'r':
                    styleObj = {textAlign: 'right'};
                    break;
                default:
                    styleObj = {};
            }

            this.imageEditor.changeTextStyle(this.activeObjectId, this.styleObj);
        });

        // TODO: не меняется цает у текста - анонимус 530
        // TODO: не меняется у текста underline left center и т.д. вообще ничего в консоль не выводит

        this.textColorpicker.on('selectColor', (event) => {
            this.imageEditor.changeTextStyle(this.activateShapeModeactiveObjectId, {
                'fill': event.color
            });
        });

        // control icon
        this.$btnAddIcon.on('click', () => {
            this.showSubMenu('icon');
            this.activateIconMode();
        });

        this.$btnRegisterIcon.on('click', () => {
            this.$iconSubMenu.find('.menu-item').eq(3).after(
                '<li id="customArrow" class="menu-item icon-text" data-icon-type="customArrow">↑</li>'
            );
        
            this.imageEditor.registerIcons({
                customArrow: 'M 60 0 L 120 60 H 90 L 75 45 V 180 H 45 V 45 L 30 60 H 0 Z'
            });
        
            this.$btnRegisterIcon.off('click');
        
            this.$iconSubMenu.on('click', '#customArrow', this.onClickIconSubMenu);
        });
        
        this.$iconSubMenu.on('click', '.icon-text', this.onClickIconSubMenu);
        
        this.iconColorpicker.on('selectColor', (event) => {
            this.imageEditor.changeIconColor(this.activeObjectId, event.color);
        });
        
        // control mask filter
        this.$btnMaskFilter.on('click', () => {
            this.imageEditor.stopDrawingMode();
            this.$displayingSubMenu.hide();
        
            this.$displayingSubMenu = this.$filterSubMenu.show();
        });
        
        this.$btnImageFilter.on('click', () => {
            var filters = {
                'grayscale': this.$inputCheckGrayscale,
                'invert': this.$inputCheckInvert,
                'sepia': this.$inputCheckSepia,
                'sepia2': this.$inputCheckSepia2,
                'blur': this.$inputCheckBlur,
                'shapren': this.$inputCheckSharpen,
                'emboss': this.$inputCheckEmboss,
                'removeWhite': this.$inputCheckRemoveWhite,
                'brightness': this.$inputCheckBrightness,
                'noise': this.$inputCheckNoise,
                'gradientTransparency': this.$inputCheckGradientTransparency,
                'pixelate': this.$inputCheckPixelate,
                'tint': this.$inputCheckTint,
                'multiply': this.$inputCheckMultiply,
                'blend': this.$inputCheckBlend,
                'colorFilter': this.$inputCheckColorFilter
            };
        
            TuiImageEditor.util.forEach(filters, ($value, key) => {
                $value.prop('checked', this.imageEditor.hasFilter(key));
            });
            this.$displayingSubMenu.hide();
        
            this.$displayingSubMenu = this.$imageFilterSubMenu.show();
        });
        
        this.$btnLoadMaskImage.on('change', () => {
            var file;
            var imgUrl;
        
            if (!this.supportingFileAPI) {
                alert('This browser does not support file-api');
            }
        
            file = event.target.files[0];
        
            if (file) {
                imgUrl = URL.createObjectURL(file);
        
                this.imageEditor.loadImageFromURL(this.imageEditor.toDataURL(), 'FilterImage').then(() => {
                    this.imageEditor.addImageObject(imgUrl).then(objectProps => {
                        URL.revokeObjectURL(file);
                        console.log(objectProps);
                    });
                });
            }
        });
        
        this.$btnApplyMask.on('click', () => {
            this.imageEditor.applyFilter('mask', {
                maskObjId: activeObjectId
            }).then(result => {
                console.log(result);
            });
        });
        
        this.$inputCheckGrayscale.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'Grayscale', null);
        });
        
        this.$inputCheckInvert.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'Invert', null);
        });
        
        this.$inputCheckSepia.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'Sepia', null);
        });
        
        this.$inputCheckSepia2.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'Sepia2', null);
        });
        
        this.$inputCheckBlur.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'Blur', null);
        });
        
        this.$inputCheckSharpen.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'Sharpen', null);
        });
        
        this.$inputCheckEmboss.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'Emboss', null);
        });
        
        this.$inputCheckRemoveWhite.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'removeWhite', {
                threshold: parseInt(this.$inputRangeRemoveWhiteThreshold.val(), 10),
                distance: parseInt(this.$inputRangeRemoveWhiteDistance.val(), 10)
            });
        });
        
        this.$inputRangeRemoveWhiteThreshold.on('change', (e) => {
            this.applyOrRemoveFilter(this.$inputCheckRemoveWhite.is(':checked'), 'removeWhite', {
                threshold: parseInt(e.target.value, 10)
            });
        });
        
        this.$inputRangeRemoveWhiteDistance.on('change', (e) => {
            this.applyOrRemoveFilter(this.$inputCheckRemoveWhite.is(':checked'), 'removeWhite', {
                distance: parseInt(e.target.value, 10)
            });
        });
        
        this.$inputCheckBrightness.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'brightness', {
                brightness: parseInt(this.$inputRangeBrightnessValue.val(), 10)
            });
        });
        
        this.$inputRangeBrightnessValue.on('change', (e) => {
            this.applyOrRemoveFilter(this.$inputCheckBrightness.is(':checked'), 'brightness', {
                brightness: parseInt(e.target.value, 10)
            });
        });
        
        this.$inputCheckNoise.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'noise', {
                noise: parseInt(this.$inputRangeNoiseValue.val(), 10)
            });
        });
        
        this.$inputRangeNoiseValue.on('change', (e) => {
            this.applyOrRemoveFilter(this.$inputCheckNoise.is(':checked'), 'noise', {
                noise: parseInt(e.target.value, 10)
            });
        });
        
        this.$inputCheckGradientTransparency.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'gradientTransparency', {
                threshold: parseInt(this.$inputRangeGradientTransparencyValue.val(), 10)
            });
        });
        
        this.$inputRangeGradientTransparencyValue.on('change', (e) => {
            this.applyOrRemoveFilter(this.$inputCheckGradientTransparency.is(':checked'), 'gradientTransparency', {
                threshold: parseInt(e.target.value, 10)
            });
        });
        
        this.$inputCheckPixelate.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'pixelate', {
                blocksize: parseInt($inputRangePixelateValue.val(), 10)
            });
        });
        
        this.$inputRangePixelateValue.on('change', (e) => {
            this.applyOrRemoveFilter(this.$inputCheckPixelate.is(':checked'), 'pixelate', {
                blocksize: parseInt(e.target.value, 10)
            });
        });
        
        this.$inputCheckTint.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'tint', {
                color: this.tintColorpicker.getColor(),
                opacity: parseFloat(this.$inputRangeTintOpacityValue.val())
            });
        });
        
        this.tintColorpicker.on('selectColor', (e) => {
            this.applyOrRemoveFilter(this.$inputCheckTint.is(':checked'), 'tint', {
                color: e.color
            });
        });
        
        this.$inputRangeTintOpacityValue.on('change', () => {
            this.applyOrRemoveFilter(this.$inputCheckTint.is(':checked'), 'tint', {
                opacity: parseFloat(this.$inputRangeTintOpacityValue.val())
            });
        });
        
        this.$inputCheckMultiply.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'multiply', {
                color: this.multiplyColorpicker.getColor()
            });
        });
        
        this.multiplyColorpicker.on('selectColor', (e) => {
            this.applyOrRemoveFilter(this.$inputCheckMultiply.is(':checked'), 'multiply', {
                color: e.color
            });
        });
        
        this.$inputCheckBlend.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'blend', {
                color: this.blendColorpicker.getColor(),
                mode: this.$selectBlendType.val()
            });
        });
        
        this.blendColorpicker.on('selectColor', (e) => {
            this.applyOrRemoveFilter(this.$inputCheckBlend.is(':checked'), 'blend', {
                color: e.color
            });
        });
        
        this.$selectBlendType.on('change', (e) => {
            this.applyOrRemoveFilter(this.$inputCheckBlend.is(':checked'), 'blend', {
                mode: e.target.value
            });
        });
        
        this.$inputCheckColorFilter.on('change', () => {
            this.applyOrRemoveFilter(this.checked, 'colorFilter', {
                color: '#FFFFFF',
                threshold: this.$inputRangeColorFilterValue.val()
            });
        });
        
        this.$inputRangeColorFilterValue.on('change', (e) => {
            this.applyOrRemoveFilter(this.$inputCheckColorFilter.is(':checked'), 'colorFilter', {
                threshold: e.target.value
            });
        });


        // Load sample image
        this.imageEditor.loadImageFromURL('/images/login.jpg', 'SampleImage').then(sizeValue => {
            console.log(sizeValue);
            this.imageEditor.clearUndoStack();
        });

        // IE9 Unselectable
        $('.menu').on('selectstart', function() {
            return false;
        });

        this.imageEditorContainer = document.getElementById("body-container");
    }

    // Common global functions
    // HEX to RGBA
    hexToRGBa(hex, alpha) {
        var r = parseInt(hex.slice(1, 3), 16);
        var g = parseInt(hex.slice(3, 5), 16);
        var b = parseInt(hex.slice(5, 7), 16);
        var a = alpha || 1;

        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    }

    base64ToBlob(data) {
        var mimeString = '';
        var raw, uInt8Array, i, rawLength;

        raw = data.replace(this.rImageType, function(header, imageType) {
            mimeString = imageType;

            return '';
        });

        raw = atob(raw);
        rawLength = raw.length;
        uInt8Array = new Uint8Array(rawLength); // eslint-disable-line

        for (i = 0; i < rawLength; i += 1) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], {type: mimeString});
    }

    resizeEditor() {
        var $editor = $('.tui-image-editor');
        var $container = $('.tui-image-editor-canvas-container');
        var height = parseFloat($container.css('max-height'));

        $editor.height(height);
    }

    getBrushSettings() {
        var brushWidth = this.$inputBrushWidthRange.val();
        var brushColor = this.brushColorpicker.getColor();

        return {
            width: brushWidth,
            color: this.hexToRGBa(brushColor, 0.5)
        };
    }

    activateShapeMode() {
        if (this.imageEditor.getDrawingMode() !== 'SHAPE') {
            this.imageEditor.stopDrawingMode();
            this.imageEditor.startDrawingMode('SHAPE');
        }
    }

    activateIconMode() {
        this.imageEditor.stopDrawingMode();
    }

    activateTextMode() {
        if (this.imageEditor.getDrawingMode() !== 'TEXT') {
            this.imageEditor.stopDrawingMode();
            this.imageEditor.startDrawingMode('TEXT');
        }
    }

    setTextToolbar(obj) {
        var fontSize = obj.fontSize;
        var fontColor = obj.fill;

        this.$inputFontSizeRange.val(fontSize);
        this.textColorpicker.setColor(fontColor);
    }

    setIconToolbar(obj) {
        var iconColor = obj.fill;

        this.iconColorpicker.setColor(iconColor);
    }

    setShapeToolbar(obj) {
        var strokeColor, fillColor, isTransparent;
        var colorType = this.$selectColorType.val();

        if (colorType === 'stroke') {
            strokeColor = obj.stroke;
            isTransparent = (strokeColor === 'transparent');

            if (!isTransparent) {
                shapeColorpicker.setColor(strokeColor);
            }
        } else if (colorType === 'fill') {
            fillColor = obj.fill;
            isTransparent = (fillColor === 'transparent');

            if (!isTransparent) {
                this.shapeColorpicker.setColor(fillColor);
            }
        }

        this.$inputCheckTransparent.prop('checked', isTransparent);
        this.$inputStrokeWidthRange.val(obj.strokeWidth);
    }

    showSubMenu(type) {
        var $submenu;

        switch (type) {
            case 'shape':
                $submenu = this.$drawShapeSubMenu;
                break;
            case 'icon':
                $submenu = this.$iconSubMenu;
                break;
            case 'text':
                $submenu = this.$textSubMenu;
                break;
            default:
                $submenu = 0;
        }

        this.$displayingSubMenu.hide();
        this.$displayingSubMenu = $submenu.show();
    }

    applyOrRemoveFilter(applying, type, options) {
        if (applying) {
            this.imageEditor.applyFilter(type, options).then(result => {
                console.log(result);
            });
        } else {
            this.imageEditor.removeFilter(type);
        }
    }

    onClickIconSubMenu(event) {
        var element = event.target || event.srcElement;
        var iconType = $(element).attr('data-icon-type');

        this.imageEditor.once('mousedown', function(e, originPointer) {
            this.imageEditor.addIcon(iconType, {
                left: originPointer.x,
                top: originPointer.y
            }).then(objectProps => {
                // console.log(objectProps);
            });
        });
    }

    showImageEditor() {
        if(!this.tuiIsShow) {
            this.imageEditorContainer.style.display = "block";
            this.tuiIsShow = true;
        } else {
            this.imageEditorContainer.style.display = "none";
            this.tuiIsShow = false;
        }
    }

    render() {

        return this.html`
            <div class='${this.class}' onconnected=${this} >
                <div>
                    <button onclick=${this.showImageEditor}>показать</button>
                    <div class="body-container" id="body-container">
                        <div class="tui-image-editor-controls">
                            <div class="header">
                                    <li class="menu-item border input-wrapper">
                                        Открыть фото
                                        <input type="file" accept="image/*" id="input-image-file">
                                    </li>
                                    <li class="menu-item border" id="btn-download">Скачать фото</li>
                                </ul>
                            </div>
                            <ul class="menu">
                                <li class="menu-item disabled" id="btn-undo">Отменить</li>
                                <li class="menu-item disabled" id="btn-redo">Повторить</li>
                                <li class="menu-item" id="btn-clear-objects">Удалить все объекты</li>
                                <li class="menu-item" id="btn-remove-active-object">Удалить выделенный объект</li>
                                <li class="menu-item" id="btn-crop">Обрезать</li>
                                <li class="menu-item" id="btn-flip">Поворот по оси</li>
                                <li class="menu-item" id="btn-draw-line">Рисование кистью</li>
                                <li class="menu-item" id="btn-draw-shape">Рисование фигурами</li>
                                <li class="menu-item" id="btn-text">Добавить текст</li>
                                <li class="menu-item" id="btn-crop">Crop</li>
                                <li class="menu-item" id="btn-rotation">Rotation</li>
                                <li class="menu-item" id="btn-add-icon">Icon</li>
                                <li class="menu-item" id="btn-mask-filter">Mask</li>
                                <li class="menu-item" id="btn-image-filter">Filter</li>
                            </ul>
                            <div class="sub-menu-container" id="crop-sub-menu">
                                <ul class="menu">
                                    <li class="menu-item" id="btn-apply-crop">Применить</li>
                                    <li class="menu-item" id="btn-cancel-crop">Закрыть меню</li>
                                </ul>
                            </div>
                            <!-- ВРАЩЕНИЕ ПО ОСИ -->
                            <div class="sub-menu-container" id="flip-sub-menu">
                                <ul class="menu">
                                    <li class="menu-item" id="btn-flip-x">отразить по X</li>
                                    <li class="menu-item" id="btn-flip-y">отразить по Y</li>
                                    <li class="menu-item" id="btn-reset-flip">сбросить</li>
                                    <li class="menu-item close">отменить</li>
                                </ul>
                            </div>
                            <!-- РИСОВАНИЕ КИСТЬЮ -->
                            <div class="sub-menu-container menu" id="draw-line-sub-menu">
                                <ul class="menu">
                                    <li class="menu-item">
                                        <label><input type="radio" name="select-line-type" value="freeDrawing" checked="checked"> Free drawing</label>
                                        <label><input type="radio" name="select-line-type" value="lineDrawing"> Straight line</label>
                                    </li>
                                    <li class="menu-item">
                                        <div id="tui-brush-color-picker">Цвет кисти</div>
                                    </li>
                                    <li class="menu-item"><label class="menu-item no-pointer">Толщина кисти<input id="input-brush-width-range" type="range" min="5" max="30" value="12"></label></li>
                                    <li class="menu-item close">Отменить</li>
                                </ul>
                            </div>
                            <!-- РИСОВАНИЕ ФИГУР -->
                            <div class="sub-menu-container" id="draw-shape-sub-menu">
                                <ul class="menu">
                                    <li class="menu-item">
                                        <label><input type="radio" name="select-shape-type" value="rect" checked="checked"> прямоугольник</label>
                                        <label><input type="radio" name="select-shape-type" value="circle"> круг</label>
                                        <label><input type="radio" name="select-shape-type" value="triangle"> треугольник</label>
                                    </li>
                                    <li class="menu-item">
                                        <select name="select-color-type">
                                            <option value="fill">цвет фигуры</option>
                                            <option value="stroke">цвет обводки</option>
                                        </select>
                                        <label><input type="checkbox" id="input-check-transparent">прозрачность</label>
                                        <div id="tui-shape-color-picker"></div>
                                    </li>
                                    <li class="menu-item"><label class="menu-item no-pointer">толщина обводки<input id="input-stroke-width-range" type="range" min="0" max="300" value="12"></label></li>
                                    <li class="menu-item close">отменить</li>
                                </ul>
                            </div>
                            <!-- ИКОНКИ -->
                            <div class="sub-menu-container" id="icon-sub-menu">
                                <ul class="menu">
                                    <li class="menu-item">
                                        <div id="tui-icon-color-picker">Icon color</div>
                                    </li>
                                    <li class="menu-item border" id="btn-register-icon">Register custom icon</li>
                                    <li class="menu-item icon-text" data-icon-type="arrow">➡</li>
                                    <li class="menu-item icon-text" data-icon-type="cancel">✖</li>
                                    <li class="menu-item close">Close</li>
                                </ul>
                            </div>
                            <!-- ТЕКСТ -->
                            <div class="sub-menu-container" id="text-sub-menu">
                                <ul class="menu">
                                    <li class="menu-item">
                                        <div>
                                            <button class="btn-text-style" data-style-type="b">Bold</button>
                                            <button class="btn-text-style" data-style-type="i">Italic</button>
                                            <button class="btn-text-style" data-style-type="u">Underline</button>
                                        </div>
                                        <div>
                                            <button class="btn-text-style" data-style-type="l">Left</button>
                                            <button class="btn-text-style" data-style-type="c">Center</button>
                                            <button class="btn-text-style" data-style-type="r">Right</button>
                                        </div>
                                    </li>
                                    <li class="menu-item"><label class="no-pointer"><input id="input-font-size-range" type="range" min="10" max="100" value="10"></label></li>
                                    <li class="menu-item">
                                        <div id="tui-text-color-picker">Text color</div>
                                    </li>
                                    <li class="menu-item close">Close</li>
                                </ul>
                            </div>
                            <!-- МАСКИ -->
                            <div class="sub-menu-container" id="filter-sub-menu">
                                <ul class="menu">
                                    <li class="menu-item border input-wrapper">
                                        Load Mask Image
                                        <input type="file" accept="image/*" id="input-mask-image-file">
                                    </li>
                                    <li class="menu-item" id="btn-apply-mask">Apply mask filter</li>
                                    <li class="menu-item close">Close</li>
                                </ul>
                            </div>
                            <!-- ФИЛЬТР -->
                            <div class="sub-menu-container" id="image-filter-sub-menu">
                                <ul class="menu">
                                    <li class="menu-item align-left-top">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><label><input type="checkbox" id="input-check-grayscale">Grayscale</label></td>
                                                    <td><label><input type="checkbox" id="input-check-invert">Invert</label></td>
                                                    <td><label><input type="checkbox" id="input-check-sepia">Sepia</label></td>
                                                </tr>
                                                <tr>
                                                    <td><label><input type="checkbox" id="input-check-sepia2">Sepia2</label></td>
                                                    <td><label><input type="checkbox" id="input-check-blur">Blur</label></td>
                                                    <td><label><input type="checkbox" id="input-check-sharpen">Sharpen</label></td>
                                                </tr>
                                                <tr>
                                                    <td><label><input type="checkbox" id="input-check-emboss">Emboss</label></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </li>
                                    <li class="menu-item align-left-top">
                                        <p>
                                            <label><input type="checkbox" id="input-check-remove-white">RemoveWhite</label><br>
                                            <label>Threshold<input class="range-narrow" id="input-range-remove-white-threshold" type="range" min="0" value="60" max="255"></label><br>
                                            <label>Distance<input class="range-narrow" id="input-range-remove-white-distance" type="range" min="0" value="10" max="255"></label>
                                        </p>
                                    </li>
                                    <li class="menu-item align-left-top">
                                        <p>
                                            <label><input type="checkbox" id="input-check-brightness">Brightness</label><br>
                                            <label>Value<input class="range-narrow" id="input-range-brightness-value" type="range" min="-255" value="100" max="255"></label>
                                        </p>
                                    </li>
                                    <li class="menu-item align-left-top">
                                        <p>
                                            <label><input type="checkbox" id="input-check-noise">Noise</label><br>
                                            <label>Value<input class="range-narrow" id="input-range-noise-value" type="range" min="0" value="100" max="1000"></label>
                                        </p>
                                    </li>
                                    <li class="menu-item align-left-top">
                                        <p>
                                            <label><input type="checkbox" id="input-check-gradient-transparancy">GradientTransparency</label><br>
                                            <label>Value<input class="range-narrow" id="input-range-gradient-transparency-value" type="range" min="0" value="100" max="255"></label>
                                        </p>
                                    </li>
                                    <li class="menu-item align-left-top">
                                        <p>
                                            <label><input type="checkbox" id="input-check-pixelate">Pixelate</label><br>
                                            <label>Value<input class="range-narrow" id="input-range-pixelate-value" type="range" min="2" value="4" max="20"></label>
                                        </p>
                                    </li>
                                    <li class="menu-item align-left-top">
                                        <p>
                                            <label><input type="checkbox" id="input-check-tint">Tint</label><br>
                                            <div id="tui-tint-color-picker"></div>
                                            <label>Opacity<input class="range-narrow" id="input-range-tint-opacity-value" type="range" min="0" value="1" max="1" step="0.1"></label>
                                        </p>
                                    </li>
                                    <li class="menu-item align-left-top">
                                        <p>
                                            <label><input type="checkbox" id="input-check-multiply">Multiply</label>
                                            <div id="tui-multiply-color-picker"></div>
                                        </p>
                                    </li>
                                    <li class="menu-item align-left-top">
                                        <p>
                                            <label><input type="checkbox" id="input-check-blend">Blend</label>
                                            <div id="tui-blend-color-picker"></div>
                                            <select name="select-blend-type">
                                                <option value="add" selected>Add</option>
                                                <option value="diff">Diff</option>
                                                <option value="diff">Subtract</option>
                                                <option value="multiply">Multiply</option>
                                                <option value="screen">Screen</option>
                                                <option value="lighten">Lighten</option>
                                                <option value="darken">Darken</option>
                                            </select>
                                        </p>
                                    </li><li class="menu-item align-left-top">
                                        <p>
                                            <label><input type="checkbox" id="input-check-color-filter">ColorFilter</label><br>
                                            <label>Threshold<input class="range-narrow" id="input-range-color-filter-value" type="range" min="0" value="45" max="255"></label>
                                        </p>
                                    </li>
                                    <li class="menu-item close">Close</li>
                                </ul>
                            </div>
                        </div>
                        <div class="tui-image-editor"></div>
                    </div>
                </div>
                
            </div>
        `
    }
}