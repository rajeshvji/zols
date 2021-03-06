(function($) {

    var formDiv;

    $.fn.makeform = function(entityUrl, theme, themeUrl, onRender, dataObj) {
        console.log('dataObj ' + JSON.stringify(dataObj));
        formDiv = this;
        this.themeUrl = themeUrl;
        this.theme = theme;
        this.onRender = onRender;
        this.entityUrl = entityUrl;
        formDiv.dataObj = dataObj;
        this.prefix = [];

        formDiv.empty();
        formDiv.htmlText = "";
        formDiv.firstEntity = true;
        formDiv.renderEntity(formDiv.attr('name'));
        formDiv.firstEntity = true;
        formDiv.html(formDiv.htmlText);
        formDiv.onRender();
        $('.jqte-test').jqte();
        formDiv.htmlText = "";

        return this;
    };

    $.fn.patchNameField = function() {
        if (formDiv.firstEntity) {

            var nameattribute = new Object();
            nameattribute.name = "name";
            nameattribute.type = "String";
            nameattribute.description = "Name";
            nameattribute.label = "Name";
            if(formDiv.dataObj){
                nameattribute.value = formDiv.dataObj.name;
            }            

            namecontrol = formDiv.getControl(nameattribute);

            nameattribute.type = 'control-open';
            namecontrolOpen = formDiv.getControl(nameattribute);
            nameattribute.type = 'control-close';
            namecontrolClose = formDiv.getControl(nameattribute);

            formDiv.appendHtmlText(namecontrolOpen);
            formDiv.appendHtmlText(namecontrol);
            formDiv.appendHtmlText(namecontrolClose);

        }

    };

    $.fn.renderEntity = function(entityName) {

        $.ajax({
            url: formDiv.entityUrl.replace('{{name}}', entityName),
            success: function(result) {
                if (result.entity) {

                    entity = result.entity;

                    var entityattribute = entity;
                    entityattribute.type = 'entity-open';
                    entitycontrolOpen = formDiv.getControl(entityattribute);
                    formDiv.appendHtmlText(entitycontrolOpen);


                    formDiv.patchNameField();
                    formDiv.firstEntity = false;

                    $.each(entity.attributes, function(k, attribute) {
                        if (formDiv.dataObj) {
                            attribute.value = formDiv.dataObj[attribute.name];

                            var x = attribute.value.replace(" ", '-');
                            console.log("valueew is::" + x);
                        }
                        control = formDiv.getControl(attribute);
                        if (control) {
                            attribute.type = 'control-open';
                            controlOpen = formDiv.getControl(attribute);
                            attribute.type = 'control-close';
                            controlClose = formDiv.getControl(attribute);

                            formDiv.appendHtmlText(controlOpen);
                            formDiv.appendHtmlText(control);
                            formDiv.appendHtmlText(controlClose);
                        }
                        else {
                            formDiv.prefix.push(attribute.name);
                            formDiv.renderEntity(attribute.type);
                            formDiv.prefix.pop(attribute.name);
                        }
                    });

                    entityattribute.type = 'entity-close';
                    entitycontrolClose = formDiv.getControl(entityattribute);
                    formDiv.appendHtmlText(entitycontrolClose);
                }

            },
            async: false
        });
    };

    $.fn.appendHtmlText = function(htmlText) {
        formDiv.htmlText += htmlText;
    };
    $.fn.getControl = function(attribute) {
        var template = this.loadTemplate(attribute.type);

        if (template) {
            var prefixString = formDiv.getPrefixString(attribute);
            if (prefixString) {
                attribute.name = prefixString + '.' + attribute.name;
            }
            return template(attribute);
        }
        return null;

    };

    $.fn.getPrefixString = function(attribute) {
        if (formDiv.prefix.length !== 0) {
            var prefixString = '';
            $.each(formDiv.prefix, function(index, prefix) {
                if (index !== 0) {
                    prefixString += '.';
                }
                prefixString += prefix;
            });
            return prefixString;
        }

        return null;

    };

    $.fn.loadTemplate = function(type) {
        var template = null;

        $.ajax({
            cache: true,
            url: formDiv.themeUrl + '/' + formDiv.theme + '/' + type + '.js',
            success: function(result) {

                template = Handlebars.compile(result);
            },
            dataType: 'html',
            async: false
        });


        return template;

    };
}(jQuery));