Umbraco 7 TableEditor
===========
Table editor is a simple table... editor... :)

Features:
- Use your own markup.
- Editor adds/removes rows/cols.
- Set limit on rows/cols.
- Add table, row and column styles.
- Denote a header, footer row (first or last).

![TableEditor](https://pbs.twimg.com/media/BouPOV3IYAAHghE.png)

###Install
Presently it's a manual install:

 - Create a `~/App_Plugins/TableEditor` folder.
 - Drop the `/css`, `/js`, `/views` and `package.manifest` into your `~/App_Plugins/TableEditor` folder.
 - Drop the dll in `/bin`
 - Touch web.config
 - Configure in `Developer->Datatypes`

###Sample Partial Call
`@Html.Partial("~/pathtopartial/partialname.cshtml", Model.Content.GetPropertyValue<TableEditorModel>("propname"))`

###Sample Partial Template
You can use the sample template below or customize your own.

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
