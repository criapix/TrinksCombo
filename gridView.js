(function ($) {
    $.fn.gridView = function (options) {
        $(this).html('');
        var settings = $.extend({
            'data': null,
            'headerMappings': null,
            //'columnsAttr': null,
            'tableAttr': {}
        }, options);

        var $table = getTable(this, settings.tableAttr);
        $table.append(createTableHead(this, settings.data, settings.headerMappings, settings.columnsAttr));
        $table.append(createTableBody(this, settings.data, settings.headerMappings, settings.columnsAttr));

        function getTable(element, tableAttr) {

            var $table;
            if (element.is("table")) {
                $table = element;
            }
            else {
                element.append($("<table>", tableAttr));
                $table = element.find("table");
            }
            return $table;

        }

        function createTableHead(element, data, headerMappings, columnsAttr) {
            var thead = $('<thead></thead>');

            var tr = $('<tr></tr>');

            var firstObject = data[0];

            if (headerMappings)
                for (var mapping in headerMappings) {
                    var columnAttr = columnsAttr ? columnsAttr[mapping] : null;
                    tr.append($('<th>', columnAttr).html(headerMappings[mapping]));
                }
            else
                for (property in firstObject) {
                    var columnAttr = columnsAttr ? columnsAttr[property] : null;
                    tr.append($('<th>', columnsAttr[property]).html(property));
                }

            thead.append(tr);

            return thead;
        };
        function createTableBody(element, data, headerMappings, columnsAttr) {
            var tbody = $('<tbody></tbody>');

            element.append(tbody);

            for (var i = 0; i < data.length; i++) {
                var tr = $('<tr></tr>');
                var obj = data[i];
                if (headerMappings)
                    for (var mapping in headerMappings) {
                        var columnAttr = columnsAttr ? columnsAttr[mapping] : null;
                        tr.append($('<td>', columnAttr).html(obj[mapping]));
                    }
                else
                    for (property in obj) {
                        var columnAttr = columnsAttr ? columnsAttr[property] : null;
                        tr.append('<td>', columnAttr).html(obj[property]);
                    }

                tbody.append(tr);
            }

            return tbody;
        };

    };
})(jQuery);
