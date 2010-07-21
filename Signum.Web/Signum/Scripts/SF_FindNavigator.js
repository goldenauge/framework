﻿$(function() {
    $(".searchControl th")
        .live('click', function(e) {
            if ($(this).hasClass("userColumnEditing"))
                return true;
            Sort(e);
            return false;
        })
        .live('mousedown', function(e) {
            if ($(this).hasClass("userColumnEditing"))
                return true;
            this.onselectstart = function() { return false };
            return false;
        });
});

var FindNavigator = function(_findOptions) {
    this.findOptions = $.extend({
        prefix: "",
        queryUrlName: null,
        searchOnLoad: false,
        allowMultiple: null,
        create: true,
        view: true,
        top: null,
        filters: null,
        filterMode: null,
        orders: null, //A Json array like ["columnName1","-columnName2"] => will order by columnname1 asc, then by columnname2 desc
        userColumns: null, //List of column names "columnName1,columnName2"
        allowUserColumns: null,
        navigatorControllerUrl: "Signum/PartialFind",
        searchControllerUrl: "Signum/Search",
        onOk: null,
        onCancelled: null,
        onOkClosed: null,
        async: true
    }, _findOptions);
};

FindNavigator.prototype = {

    pf: function(s) {
        return "#" + this.findOptions.prefix.compose(s);
    },

    tempDivId: function() {
        return this.findOptions.prefix + "Temp";
    },

    openFinder: function() {
        log("FindNavigator openFinder");
        var self = this;
        $.ajax({
            type: "POST",
            url: this.findOptions.navigatorControllerUrl,
            data: this.requestData(),
            async: false,
            dataType: "html",
            success: function(popupHtml) {
                $('#divASustituir').after(hiddenDiv(self.tempDivId(), popupHtml));
                new popup().show(self.tempDivId());
                $(self.pf(sfBtnOk)).unbind('click').click(function() { self.onSearchOk(); });
                $(self.pf(sfBtnCancel)).unbind('click').click(function() { self.onSearchCancel(); });
            }
        });
    },

    selectedItems: function() {
        log("FindNavigator selectedItems");
        var items = [];
        var selected = $("input:radio[name=" + this.findOptions.prefix.compose("rowSelection") + "]:checked, input:checkbox[name^=" + this.findOptions.prefix.compose("rowSelection") + "]:checked");
        if (selected.length == 0)
            return items;

        selected.each(function(i, v) {
            var __index = v.indexOf("__");
            var __index2 = v.indexOf("__", __index + 2);

            var item = {
                id: v.substring(0, __index),
                type: v.substring(__index + 2, __index2),
                toStr: v.substring(__index2 + 2, v.length),
                link: $('#' + this.id).parent().next(this.pf('tdResults')).children('a').attr('href')
            };
            items.push(item);
        });

        return items;
    },

    splitSelectedIds: function() {
        log("FindNavigator splitSelectedIds");
        var selected = this.selectedItems();
        var result = [];
        $(selected).each(function(i, value) {
            result.push(value.id + ",");
        });
        if (result.length) {
            var result2 = result.join('');
            return result2.substring(0, result2.length - 1);
        }
        return '';
    },

    search: function() {

        this.editColumnsFinish();

        var $btnSearch = $(this.pf("btnSearch"));
        $btnSearch.toggleClass('loading').val(lang['searching']);

        var self = this;
        $.ajax({
            type: "POST",
            url: this.findOptions.searchControllerUrl,
            data: this.requestData(),
            async: this.findOptions.async,
            dataType: "html",
            success: function(r) {
                $btnSearch.val(lang['buscar']).toggleClass('loading');
                if (!empty(r))
                    $(self.pf("divResults tbody")).html(r);
                else {
                    var columns = $(self.pf("divResults th")).length;
                    $(self.pf("divResults tbody")).html("<tr><td colspan=\"" + columns + "\">" + lang['0results'] + "</td></tr>")
                }
            },
            error: function() {
                $btnSearch.val(lang['buscar']).toggleClass('loading');
            }
        });

    },

    requestData: function() {
        var requestData = new Object();
        requestData[sfQueryUrlName] = ((empty(this.findOptions.queryUrlName)) ? $(this.pf(sfQueryUrlName)).val() : this.findOptions.queryUrlName);
        requestData[sfTop] = empty(this.findOptions.top) ? $(this.pf(sfTop)).val() : this.findOptions.top;
        requestData[sfAllowMultiple] = (this.findOptions.allowMultiple == undefined) ? $(this.pf(sfAllowMultiple)).val() : this.findOptions.allowMultiple;

        var canView = $(this.pf(sfView)).val();
        requestData[sfView] = (!this.findOptions.view) ? false : (empty(canView) ? this.findOptions.view : canView);
        requestData["sfSearchOnLoad"] = this.findOptions.searchOnLoad;

        if (this.findOptions.async)
            requestData["sfAsync"] = this.findOptions.async;

        if (this.findOptions.filterMode != null)
            requestData["sfFilterMode"] = this.findOptions.filterMode;

        if (!this.findOptions.create)
            requestData["sfCreate"] = this.findOptions.create;

        var currentfilters = this.serializeFilters();
        if (!empty(currentfilters))
            $.extend(requestData, currentfilters);
        else if (!empty(this.findOptions.filters)) {
            var filterArray = this.findOptions.filters.split("&");
            for (var i = 0, l = filterArray.length; i < l; i++) {
                var pair = filterArray[i];
                if (!empty(pair)) {
                    pair = pair.split("=");
                    if (pair.length == 2)
                        requestData[pair[0]] = pair[1];
                }
            }
        }

        requestData["sfOrderBy"] = empty(this.findOptions.orders) ? this.serializeOrders() : this.findOptions.orders;
        requestData["sfUserColumns"] = empty(this.findOptions.userColumns) ? this.serializeUserColumns() : this.findOptions.userColumns;

        requestData[sfPrefix] = this.findOptions.prefix;

        return requestData;
    },

    serializeFilters: function() {
        var result = "";
        var self = this;
        $(this.pf("tblFilters > tbody > tr")).each(function() {
            result = $.extend(result, self.serializeFilter(this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length)));
        });
        return result;
    },

    serializeFilter: function(index) {
        var tds = $(this.pf("trFilter").compose(index) + " td");
        var columnName = tds[0].id.substring(tds[0].id.indexOf("__") + 2, tds[0].id.length);
        var selector = $(this.pf("ddlSelector").compose(index) + " option:selected");
        var value = $(this.pf("value").compose(index)).val();

        var valBool = $("input:checkbox[id=" + this.findOptions.prefix.compose("value").compose(index) + "]"); //it's a checkbox
        if (valBool.length > 0) value = valBool[0].checked;

        var info = RuntimeInfoFor(this.findOptions.prefix.compose("value").compose(index));
        if (info.find().length > 0) //If it's a Lite, the value is the Id
            value = info.id() + ";" + info.runtimeType();

        var filter = new Object();
        filter["cn" + index] = columnName;
        filter["sel" + index] = selector.val();
        filter["val" + index] = value;
        return filter;
    },

    serializeOrders: function() {
        var currOrder = $(this.pf("OrderBy")).val();
        if (empty(currOrder))
            return "";
        return currOrder.replace(/"/g, "").replace("[", "").replace("]", "");
    },

    getOrdersAsJson: function() {
        var currOrder = $(this.pf("OrderBy"));
        return jQuery.parseJSON(currOrder.val());
    },

    setNewSortOrder: function(columnName, multiCol) {
        log("FindNavigator sort");
        var currOrderArray = this.getOrdersAsJson();

        var found = false;
        var currIndex;
        var oldOrder = "";
        for (var currIndex = 0; currIndex < currOrderArray.length && !found; currIndex++) {
            found = currOrderArray[currIndex] == columnName;
            if (found) {
                oldOrder = "";
                break;
            }
            found = currOrderArray[currIndex] == "-" + columnName;
            if (found) {
                oldOrder = "-";
                break;
            }
        }
        var newOrder = found ? (oldOrder == "" ? "-" : "") : "";
        var currOrder = $(this.pf("OrderBy"));
        if (!multiCol) {
            $(this.pf("divSearchControl")).find(".divResults th").removeClass("headerSortUp headerSortDown");
            currOrder.val("[\"" + newOrder + columnName + "\"]");
        }
        else {
            if (found)
                currOrderArray[currIndex] = newOrder + columnName;
            else
                currOrderArray[currOrderArray.length] = newOrder + columnName;
            var currOrderStr = "";
            for (var i = 0; i < currOrderArray.length; i++)
                currOrderStr = currOrderStr.compose("\"" + currOrderArray[i] + "\"", ",");
            currOrder.val("[" + currOrderStr + "]");
        }

        if (newOrder == "-")
            $(this.pf("divSearchControl")).find(".divResults th[id='" + this.findOptions.prefix.compose(columnName) + "']").removeClass("headerSortDown").addClass("headerSortUp");
        else
            $(this.pf("divSearchControl")).find(".divResults th[id='" + this.findOptions.prefix.compose(columnName) + "']").removeClass("headerSortUp").addClass("headerSortDown");

        return this;
    },

    serializeUserColumns: function() {
        log("FindNavigator serializeUserColumns");
        var result = "";
        var self = this;
        $(this.pf("tblResults thead tr th.userColumn")).each(function() {
            result = result.compose($(this).find("input:hidden").val(), ",");
        });
        return result;
    },

    onSearchOk: function() {
        log("FindNavigator onSearchOk");
        var selected = this.selectedItems();
        if (selected.length == 0)
            return;
        var doDefault = (this.findOptions.onOk != null) ? this.findOptions.onOk(selected) : true;
        if (doDefault != false) {
            $('#' + this.tempDivId()).remove();
            if (this.findOptions.onOkClosed != null)
                this.findOptions.onOkClosed();
        }
    },

    onSearchCancel: function() {
        log("FindNavigator onSearchCancel");
        $('#' + this.tempDivId()).remove();
        if (this.findOptions.onCancelled != null)
            this.findOptions.onCancelled();
    },

    addColumn: function() {
        log("FindNavigator addColumn");

        if (isFalse(this.findOptions.allowUserColumns) || $(this.pf("tblFilters tbody")).length == 0)
            throw "Adding columns is not allowed";

        this.editColumnsFinish();

        var tokenName = this.constructTokenName();
        if (empty(tokenName)) return;

        var prefixedTokenName = this.findOptions.prefix.compose(tokenName);
        if ($(this.pf("tblResults thead tr th[id=\"" + prefixedTokenName + "\"]")).length > 0) return;

        var $tblHeaders = $(this.pf("tblResults thead tr"));
        $tblHeaders.append("<th id=\"" + prefixedTokenName + "\" class=\"userColumn\"><input type=\"hidden\" value=\"" + tokenName + "\" />" + tokenName + "</th>");
        $(this.pf("btnEditColumns")).show();
    },

    editColumns: function() {
        log("FindNavigator editColumns");

        var self = this;
        $(this.pf("tblResults thead tr th.userColumn")).each(function() {
            var th = $(this);
            th.addClass("userColumnEditing");
            var hidden = th.find("input:hidden");
            th.html("<input type=\"text\" value=\"" + th.text() + "\" />" +
                    "<br /><a id=\"link-delete-user-col\" onclick=\"DeleteColumn('" + self.findOptions.prefix + "', '" + hidden.val() + "');\">Delete Column</a>")
              .append(hidden);
        });

        $(this.pf("btnEditColumnsFinish")).show();
        $(this.pf("btnEditColumns")).hide();
    },

    editColumnsFinish: function() {
        log("FindNavigator editColumnsFinish");

        var $btnFinish = $(this.pf("btnEditColumnsFinish:visible"));
        if ($btnFinish.length == 0)
            return;

        var self = this;
        $(this.pf("tblResults thead tr th.userColumn")).each(function() {
            var th = $(this);
            th.removeClass("userColumnEditing");
            var hidden = th.find("input:hidden");
            var newColName = th.find("input:text").val();
            th.html(newColName).append(hidden);
        });

        $btnFinish.hide();
        $(this.pf("btnEditColumns")).show();
    },

    deleteColumn: function(columnName) {
        log("FindNavigator deleteColumn");

        var self = this;
        $(this.pf("tblResults thead tr th.userColumn"))
        .filter(function() { return $(this).find("input:hidden[value='" + columnName + "']").length > 0 })
        .remove();

        $(this.pf("tblResults tbody")).html("");

        if ($(this.pf("tblResults thead tr th.userColumn")).length == 0)
            $(this.pf("btnEditColumnsFinish")).hide();
    },

    addFilter: function() {
        log("FindNavigator addFilter");

        var tableFilters = $(this.pf("tblFilters tbody"));
        if (tableFilters.length == 0)
            throw "Adding filters is not allowed";

        var tokenName = this.constructTokenName();
        if (empty(tokenName)) return;

        var queryUrlName = ((empty(this.findOptions.queryUrlName)) ? $(this.pf(sfQueryUrlName)).val() : this.findOptions.queryUrlName);

        var self = this;
        $.ajax({
            type: "POST",
            url: "Signum/AddFilter",
            data: { "sfQueryUrlName": queryUrlName, "tokenName": tokenName, "index": this.newFilterRowIndex(), "prefix": this.findOptions.prefix },
            async: false,
            dataType: "html",
            success: function(filterHtml) {
                $(self.pf("filters-list .explanation")).hide();
                $(self.pf("filters-list table")).show('fast');
                tableFilters.append(filterHtml);
                $(self.pf("btnClearAllFilters")).show();
            }
        });
    },

    newFilterRowIndex: function() {
        log("FindNavigator newFilterRowIndex");
        var lastRow = $(this.pf("tblFilters tbody tr:last"));
        var lastRowIndex = -1;
        if (lastRow.length == 1)
            lastRowIndex = lastRow[0].id.substr(lastRow[0].id.lastIndexOf("_") + 1, lastRow[0].id.length);
        return parseInt(lastRowIndex) + 1;
    },

    newSubTokensCombo: function(index) {
        log("FindNavigator newSubTokensCombo");
        var selectedColumn = $(this.pf("ddlTokens_" + index));
        if (selectedColumn.length == 0) return;

        //Clear child subtoken combos
        var self = this;
        $("select,span")
        .filter(function() {
            return ($(this).attr("id").indexOf(self.findOptions.prefix.compose("ddlTokens_")) == 0)
            || ($(this).attr("id").indexOf(self.findOptions.prefix.compose("lblddlTokens_")) == 0)
        })
        .filter(function() {
            var currentId = $(this).attr("id");
            var lastSeparatorIndex = currentId.lastIndexOf("_");
            var currentIndex = currentId.substring(lastSeparatorIndex + 1, currentId.length);
            return parseInt(currentIndex) > index;
        })
        .remove();

        if (selectedColumn.children("option:selected").val() == "") return;

        var tokenName = this.constructTokenName();
        var queryUrlName = ((empty(this.findOptions.queryUrlName)) ? $(this.pf(sfQueryUrlName)).val() : this.findOptions.queryUrlName);

        $.ajax({
            type: "POST",
            url: "Signum/NewSubTokensCombo",
            data: { "sfQueryUrlName": queryUrlName, "tokenName": tokenName, "index": index, "prefix": this.findOptions.prefix },
            async: false,
            dataType: "html",
            success: function(newCombo) {
                $(self.pf("ddlTokens_" + index)).after(newCombo);
            }
        });
    },

    constructTokenName: function() {
        log("FindNavigator constructTokenName");
        var tokenName = "",
            stop = false,
            $fieldsList = $(".fields-list");

        for (i = 0; !stop; i++) {
            var currSubtoken = $fieldsList.find(this.pf("ddlTokens_" + i));
            if (currSubtoken.length > 0)
                tokenName = tokenName.compose(currSubtoken.val(), ".");
            else
                stop = true;
        }
        return tokenName;
    },

    quickFilter: function(idTD) {
        log("FindNavigator quickFilter");
        var tableFilters = $(this.pf("tblFilters tbody"));
        if (tableFilters.length == 0)
            return;
        var params;
        var ahref = $('#' + idTD + ' a');
        if (ahref.length == 0)
            params = { "isLite": "false", "sfValue": $('#' + idTD).html() };
        else {
            var route = ahref.attr("href");
            var separator = route.indexOf("/");
            var lastSeparator = route.lastIndexOf("/");
            params = { "isLite": "true", "typeUrlName": route.substring(separator + 1, lastSeparator), "sfId": route.substring(lastSeparator + 1, route.length) };
        }
        var idTDnoPrefix = idTD.substring(this.findOptions.prefix.length, idTD.length);
        var colIndex = parseInt(idTDnoPrefix.substring(idTDnoPrefix.indexOf("_") + 1, idTDnoPrefix.length)) - 1
        var self = this;
        $.ajax({
            type: "POST",
            url: "Signum/QuickFilter",
            data: $.extend(params, { "sfQueryUrlName": $(this.pf(sfQueryUrlName)).val(), "sfColIndex": colIndex, "prefix": this.findOptions.prefix, "index": this.newFilterRowIndex() }),
            async: false,
            dataType: "html",
            success: function(filterHtml) {
                $(self.pf("filters-list .explanation")).hide();
                $(self.pf("filters-list table")).show('fast');
                tableFilters.append(filterHtml);
            }
        });
    },

    deleteFilter: function(index) {
        log("FindNavigator deleteFilter");
        var tr = $(this.pf("trFilter_" + index))
        if (tr.length == 0) return;

        if ($(this.pf("trFilter").compose(index) + " select[disabled]").length == 0) tr.remove();
        if ($(this.pf("tblFilters tbody tr")).length == 0) {
            $(this.pf("filters-list .explanation")).show();
            $(this.pf("filters-list table")).hide('fast');
            $(this.pf("btnClearAllFilters")).hide();
        }
    },

    clearAllFilters: function() {
        log("FindNavigator clearAllFilters");
        var self = this;
        $(this.pf("tblFilters > tbody > tr")).each(function(index) {
            self.deleteFilter(this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length));
        });
    },

    requestDataForSearchPopupCreate: function() {
        var requestData = this.serializeFilters();
        var requestData = $.extend(requestData, { sfQueryUrlName: ((empty(this.findOptions.queryUrlName)) ? $(this.pf(sfQueryUrlName)).val() : this.findOptions.queryUrlName) });
        return requestData;
    },

    viewOptionsForSearchCreate: function(_viewOptions) {
        log("FindNavigator viewOptionsForSearchCreate");
        if (this.findOptions.prefix != _viewOptions.prefix)
            throw "FindOptions prefix and ViewOptions prefix don't match";
        _viewOptions.prefix = "New".compose(_viewOptions.prefix);
        var self = this;
        return $.extend({
            type: $(this.pf(sfEntityTypeName)).val(),
            containerDiv: null,
            onCancelled: null,
            controllerUrl: empty(this.findOptions.prefix) ? "Signum/Create" : "Signum/PopupCreate"
        }, _viewOptions);
    },

    viewOptionsForSearchPopupCreate: function(_viewOptions) {
        log("FindNavigator viewOptionsForSearchPopupCreate");
        if (this.findOptions.prefix != _viewOptions.prefix)
            throw "FindOptions prefix and ViewOptions prefix don't match";
        _viewOptions.prefix = "New".compose(_viewOptions.prefix);
        var self = this;
        return $.extend({
            type: $(this.pf(sfEntityTypeName)).val(),
            containerDiv: null,
            requestExtraJsonData: this.requestDataForSearchPopupCreate(),
            onCancelled: null,
            controllerUrl: empty(this.findOptions.prefix) ? "Signum/Create" : "Signum/PopupCreate"
        }, _viewOptions);
    }
};

function OpenFinder(_findOptions) {
    new FindNavigator(_findOptions).openFinder();
}

function Search(_findOptions) {
    new FindNavigator(_findOptions).search();
}

function SelectedItems(_findOptions) {
    return new FindNavigator(_findOptions).selectedItems();
}

function SplitSelectedIds(_findOptions) {
    return new FindNavigator(_findOptions).splitSelectedIds();
}

function HasSelectedItems(_findOptions, onSuccess) {
    log("FindNavigator HasSelectedItems");
    var items = SelectedItems(_findOptions);
    if (items.length == 0) {
        NotifyInfo(lang['noElementsSelected']);
        return;
    }
    onSuccess(items);
}

function AddColumn(prefix) {
    new FindNavigator({ prefix: prefix }).addColumn();
}

function EditColumns(prefix) {
    new FindNavigator({ prefix: prefix }).editColumns();
}

function EditColumnsFinish(prefix) {
    new FindNavigator({ prefix: prefix }).editColumnsFinish();
}

function DeleteColumn(prefix, columnName) {
    new FindNavigator({ prefix: prefix }).deleteColumn(columnName);
}

function AddFilter(prefix) {
    new FindNavigator({ prefix: prefix }).addFilter();
}

function NewSubTokensCombo(prefix, index) {
    new FindNavigator({ prefix: prefix }).newSubTokensCombo(index);
}

function QuickFilter(prefix, idTd) {
    new FindNavigator({ prefix: prefix }).quickFilter(idTd);
}

function DeleteFilter(prefix, index) {
    new FindNavigator({ prefix: prefix }).deleteFilter(index);
}

function ClearAllFilters(prefix) {
    new FindNavigator({ prefix: prefix }).clearAllFilters();
}

function SearchCreate(viewOptions){
    var findNavigator = new FindNavigator({prefix: viewOptions.prefix});
    if (empty(viewOptions.prefix)) {
        var viewOptions = findNavigator.viewOptionsForSearchCreate(viewOptions);
        new ViewNavigator(viewOptions).navigate();
    }
    else{
        var viewOptions = findNavigator.viewOptionsForSearchPopupCreate(viewOptions);
        new ViewNavigator(viewOptions).createSave();
    }
}

function Sort(evt) {
    var $target = $(evt.target);
    var columnName = $target.find("input:hidden").val();
    if (empty($target[0].id))
        return;
       
    var searchControlDiv = $target.parents("div[id$=divSearchControl]");
    
    var prefix = searchControlDiv[0].id;
    prefix = prefix.substring(0, prefix.indexOf("divSearchControl"));
    if (prefix.lastIndexOf("_") == prefix.length-1)
        prefix = prefix.substring(0, prefix.length-1);
    var findNavigator = new FindNavigator({ prefix: prefix });
    
    var multiCol = evt.shiftKey;

    findNavigator.setNewSortOrder(columnName, multiCol).search();    
}

function toggleVisibility(elementId) {
	$('#' + elementId).toggle();
}

function toggleFilters(elem) {
    var $elem = $(elem);
    $elem.toggleClass('close').siblings(".filters").toggle();
    if ($elem.hasClass('close')) $elem.html('Mostrar filtros');
    else $elem.html('Ocultar filtros');
    return false;
}

var asyncSearchFinished = new Array();
function SearchOnLoad(btnSearchId) {    
    var $button = $("#" + btnSearchId);
    var makeSearch = function() {
        if (!asyncSearchFinished[btnSearchId]) {
            $button.click();
            asyncSearchFinished[btnSearchId] = true;
        }
    };
    
    if ($button.is(':visible')) {
        makeSearch();
    }
    else {
        var $tabContainer = $button.parents(".tabs").first();
        if ($tabContainer.length) {
            $tabContainer.find("a").click(
                function() {                    
                    if ($button.is(':visible')) makeSearch();
                });
        } else{
            makeSearch();
        }                
    }
}
