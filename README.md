TableEditor
===========


== Sample Template

    @inherits Umbraco.Web.Mvc.UmbracoViewPage<TableEditorModel>
    @{
        var rowIndex = 0;
    }
    <div class="table-editor-wrapper">
        <table class="@Model.TableStyle">
            @{       
                if(Model.UseFirstRowAsHeader) {
                    <thead>
                        @foreach (var column in Model.Cells.FirstOrDefault())
                        {
                            <th>@Html.Raw(column.Value)</th>
                        }
                    </thead>   
                    rowIndex++;
                }
            
                <tbody>
                    @foreach (var row in Model.Cells)
                    {
                        if(Model.UseFirstRowAsHeader && row == Model.Cells.FirstOrDefault()) {
                            continue;
                        }

                        if (Model.UseLastRowAsFooter && row == Model.Cells.LastOrDefault() && Model.Cells.Count() > 1)
                        {
                            continue;
                        }
            
                        <tr class="@Model.RowStylesSelected.ElementAtOrDefault(rowIndex)">
                            @{
                                var columnIndex = 0;
                            
                                foreach (var column in row)
                                {
                                    <td class="@Model.ColumnStylesSelected.ElementAtOrDefault(columnIndex)">@Html.Raw(column.Value)</td>
                                    columnIndex++;
                                }
                            
                                rowIndex++;
                            }
                        </tr>
                    }
                </tbody>

                if (Model.UseLastRowAsFooter && Model.Cells.Count() > 1)
                {
                    var columnIndex = 0;
                    <tfoot>
                        @foreach (var column in Model.Cells.LastOrDefault())
                        {
                            <td class="@Model.ColumnStylesSelected.ElementAtOrDefault(columnIndex)">@Html.Raw(column.Value)</td>
                            columnIndex++;
                        }
                    </tfoot>  
                }
            }
        </table>
    </div>
